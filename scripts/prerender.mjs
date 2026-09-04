/**
 * Generates a real HTML file per route per language after `vite build`,
 * plus the sitemap.
 *
 * The app is a SPA, so without this every URL serves the same index.html: the
 * canonical points at the homepage, the Open Graph tags describe the homepage,
 * and the body is an empty div. Crawlers that don't run JavaScript — every
 * social share preview, Bing, and the AI crawlers — therefore see the homepage
 * for all URLs. Vue fixes the tags after mount, which only helps Google.
 *
 * Each generated file reuses the built index.html (so hashed asset paths stay
 * correct) with the head rewritten and a plain-HTML fallback of the page's
 * heading and summary inside #app. Vue replaces that fallback on mount.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { blogPosts } from '../src/data/blogPosts.js'
import { categories } from '../src/data/categories.js'
import { postsEn, categoriesEn } from '../src/data/i18n-content.js'
import { ui, localeMeta } from '../src/data/i18n.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const SITE = 'https://www.sparkgametech.com'
const LOGO = `${SITE}/images/logo/agency-logo.png`
const LOCALES = ['zh', 'en']

const brand = (locale) => locale === 'zh' ? 'Spark 星火創盛' : 'Spark'
const suffix = (locale) => locale === 'zh' ? ' | Spark 星火創盛' : ' | Spark'

/** Same locale prefix rule as the router and the useI18n composable. */
const localePath = (locale, p) =>
    locale === 'zh' ? p : (p === '/' ? '/en' : `/en${p}`)

const localizedPost = (locale, p) =>
    locale === 'en' && postsEn[p.slug] ? { ...p, ...postsEn[p.slug] } : p

const localizedCategory = (locale, c) =>
    locale === 'en' && categoriesEn[c.slug] ? { ...c, ...categoriesEn[c.slug] } : c

const esc = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const publisherOf = (locale) => ({
    '@type': 'Organization',
    name: brand(locale),
    url: SITE,
    logo: { '@type': 'ImageObject', url: LOGO },
    email: 'sparkgametech@gmail.com'
})

const crumbs = (trail) => ({
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
        '@type': 'ListItem', position: i + 1, name: c.name, item: SITE + c.path
    }))
})

function buildRoutes(locale) {
    const t = ui[locale]
    const lang = localeMeta[locale].htmlLang
    const publisher = publisherOf(locale)
    const home = localePath(locale, '/')
    const homeName = locale === 'zh' ? '首頁' : 'Home'
    const routes = []

    routes.push({
        locale,
        basePath: '/',
        urlPath: home,
        title: t.defaultTitle,
        description: t.defaultDescription,
        ogType: 'website',
        heading: `${t.heroTitleLead} ${t.heroTitleRest}`,
        summary: t.heroSubtitle,
        graph: [
            { '@type': 'WebSite', name: brand(locale), url: SITE, inLanguage: lang, publisher },
            {
                '@type': 'Blog',
                name: locale === 'zh' ? `${brand(locale)} 技術部落格` : 'Spark tech blog',
                url: SITE + home,
                inLanguage: lang,
                blogPost: blogPosts.map(p => {
                    const v = localizedPost(locale, p)
                    return {
                        '@type': 'BlogPosting',
                        headline: v.title,
                        url: SITE + localePath(locale, `/blog/${p.slug}`),
                        datePublished: p.date
                    }
                })
            }
        ],
        links: blogPosts.map(p => ({
            href: localePath(locale, `/blog/${p.slug}`),
            text: localizedPost(locale, p).title
        }))
    })

    for (const rawCat of categories) {
        const c = localizedCategory(locale, rawCat)
        const url = localePath(locale, `/category/${rawCat.slug}`)
        const posts = blogPosts.filter(p => p.category === rawCat.slug)
        routes.push({
            locale,
            basePath: `/category/${rawCat.slug}`,
            urlPath: url,
            title: c.name + suffix(locale),
            description: c.description,
            ogType: 'website',
            heading: c.name,
            summary: c.subtitle,
            graph: [
                {
                    '@type': 'CollectionPage',
                    name: c.name + suffix(locale),
                    description: c.description,
                    url: SITE + url,
                    inLanguage: lang,
                    isPartOf: { '@type': 'WebSite', name: brand(locale), url: SITE },
                    hasPart: posts.map(p => {
                        const v = localizedPost(locale, p)
                        return {
                            '@type': 'BlogPosting',
                            headline: v.title,
                            url: SITE + localePath(locale, `/blog/${p.slug}`),
                            datePublished: p.date
                        }
                    })
                },
                crumbs([{ name: homeName, path: home }, { name: c.name, path: url }])
            ],
            links: posts.map(p => ({
                href: localePath(locale, `/blog/${p.slug}`),
                text: localizedPost(locale, p).title
            }))
        })
    }

    for (const rawPost of blogPosts) {
        const p = localizedPost(locale, rawPost)
        const cat = localizedCategory(locale, categories.find(c => c.slug === rawPost.category))
        const url = localePath(locale, `/blog/${rawPost.slug}`)
        routes.push({
            locale,
            basePath: `/blog/${rawPost.slug}`,
            urlPath: url,
            title: p.title + suffix(locale),
            description: p.description,
            ogType: 'article',
            heading: p.title,
            summary: p.subtitle,
            graph: [
                {
                    '@type': 'BlogPosting',
                    headline: p.title,
                    description: p.description,
                    url: SITE + url,
                    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE + url },
                    datePublished: rawPost.date,
                    dateModified: rawPost.date,
                    inLanguage: lang,
                    image: LOGO,
                    keywords: (p.tags ?? []).join(', '),
                    articleSection: cat?.name,
                    author: { '@type': 'Organization', name: brand(locale), url: SITE },
                    publisher
                },
                crumbs([
                    { name: homeName, path: home },
                    { name: cat?.name ?? 'Articles', path: localePath(locale, `/category/${rawPost.category}`) },
                    { name: p.title, path: url }
                ])
            ],
            links: [
                {
                    href: localePath(locale, `/category/${rawPost.category}`),
                    text: ui[locale].backToCategory.replace('{name}', cat?.name ?? '')
                },
                ...(rawPost.related ?? []).map(s => {
                    const r = blogPosts.find(x => x.slug === s)
                    return r ? {
                        href: localePath(locale, `/blog/${r.slug}`),
                        text: localizedPost(locale, r).title
                    } : null
                }).filter(Boolean)
            ]
        })
    }

    routes.push({
        locale,
        basePath: '/about',
        urlPath: localePath(locale, '/about'),
        title: (locale === 'zh' ? '關於我們' : 'About us') + suffix(locale),
        description: t.aboutP1,
        ogType: 'website',
        heading: locale === 'zh' ? '關於我們' : 'About us',
        summary: t.aboutSubtitle,
        graph: [
            {
                '@type': 'AboutPage',
                name: (locale === 'zh' ? '關於我們' : 'About us') + suffix(locale),
                url: SITE + localePath(locale, '/about'),
                inLanguage: lang,
                about: publisher
            },
            crumbs([
                { name: homeName, path: home },
                { name: locale === 'zh' ? '關於我們' : 'About us', path: localePath(locale, '/about') }
            ])
        ],
        links: categories.map(c => ({
            href: localePath(locale, `/category/${c.slug}`),
            text: localizedCategory(locale, c).name
        }))
    })

    routes.push({
        locale,
        basePath: '/privacy-policy',
        urlPath: localePath(locale, '/privacy-policy'),
        title: (locale === 'zh' ? '隱私政策' : 'Privacy policy') + suffix(locale),
        description: locale === 'zh'
            ? 'Spark 星火創盛 網站隱私政策。'
            : 'Privacy policy for the Spark website.',
        ogType: 'website',
        heading: locale === 'zh' ? '隱私政策' : 'Privacy policy',
        graph: [crumbs([
            { name: homeName, path: home },
            { name: locale === 'zh' ? '隱私政策' : 'Privacy policy', path: localePath(locale, '/privacy-policy') }
        ])],
        links: []
    })

    return routes
}

function render(template, route) {
    const url = SITE + route.urlPath
    const lang = localeMeta[route.locale].htmlLang
    const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': route.graph })

    const alternates = [
        `<link rel="alternate" hreflang="zh-Hant" href="${esc(SITE + route.basePath)}" />`,
        `<link rel="alternate" hreflang="en" href="${esc(SITE + localePath('en', route.basePath))}" />`,
        `<link rel="alternate" hreflang="x-default" href="${esc(SITE + route.basePath)}" />`
    ].join('\n        ')

    // Fallback markup for crawlers that never execute the bundle. Vue clears
    // #app on mount, so this is only ever seen without JavaScript.
    const fallback = [
        '<h1>' + esc(route.heading) + '</h1>',
        route.summary ? '<p>' + esc(route.summary) + '</p>' : '',
        '<p>' + esc(route.description) + '</p>',
        route.links.length
            ? '<nav><ul>' + route.links.map(l =>
                `<li><a href="${esc(l.href)}">${esc(l.text)}</a></li>`).join('') + '</ul></nav>'
            : ''
    ].join('')

    let html = template

    const swap = (pattern, replacement, label) => {
        if (!pattern.test(html)) throw new Error(`模板缺少 ${label}，無法產生 ${route.urlPath}`)
        html = html.replace(pattern, replacement)
    }

    swap(/<html lang="[^"]*">/, `<html lang="${lang}">`, '<html lang>')
    swap(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`, '<title>')
    swap(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${esc(route.description)}" />`, 'description')
    swap(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
        `<link rel="canonical" href="${esc(url)}" />\n        ${alternates}`, 'canonical')
    swap(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
        `<meta property="og:type" content="${route.ogType}" />`, 'og:type')
    swap(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
        `<meta property="og:title" content="${esc(route.title)}" />`, 'og:title')
    swap(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
        `<meta property="og:description" content="${esc(route.description)}" />`, 'og:description')
    swap(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
        `<meta property="og:url" content="${esc(url)}" />`, 'og:url')
    swap(/<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/,
        `<meta property="og:locale" content="${route.locale === 'zh' ? 'zh_TW' : 'en_US'}" />`, 'og:locale')
    swap(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
        `<meta name="twitter:title" content="${esc(route.title)}" />`, 'twitter:title')
    swap(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
        `<meta name="twitter:description" content="${esc(route.description)}" />`, 'twitter:description')
    swap(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        `<script type="application/ld+json">${jsonLd}</script>`, 'JSON-LD')
    swap(/<div id="app">\s*<\/div>/, `<div id="app">${fallback}</div>`, '#app')

    return html
}

const templatePath = path.join(DIST, 'index.html')
if (!fs.existsSync(templatePath)) {
    console.error('找不到 dist/index.html — 請先執行 vite build')
    process.exit(1)
}
const template = fs.readFileSync(templatePath, 'utf8')

/**
 * Static hosts disagree on how to resolve an extensionless path like
 * /blog/foo: some map it to foo.html, others redirect to foo/ and serve
 * foo/index.html. Canonical and sitemap both use the extensionless form, so
 * write both spellings and let whichever the host prefers answer directly —
 * otherwise the request falls through to the SPA shell and the crawler sees
 * the homepage again, which is the exact bug this script exists to fix.
 */
const outputsFor = (urlPath) => urlPath === '/'
    ? ['index.html']
    : [`${urlPath.slice(1)}/index.html`, `${urlPath.slice(1)}.html`]

const routes = LOCALES.flatMap(buildRoutes)
let written = 0
for (const route of routes) {
    const html = render(template, route)
    for (const rel of outputsFor(route.urlPath)) {
        const out = path.join(DIST, rel)
        fs.mkdirSync(path.dirname(out), { recursive: true })
        fs.writeFileSync(out, html)
        written++
    }
}

// GitHub Pages serves 404.html for unknown paths; the SPA router then resolves them.
fs.copyFileSync(path.join(DIST, 'index.html'), path.join(DIST, '404.html'))

// Generated here rather than kept in public/ so it can never drift from the
// routes above, and so both languages are declared as alternates of each other.
const basePaths = [...new Set(routes.map(r => r.basePath))]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${basePaths.map(bp => {
    const post = blogPosts.find(p => `/blog/${p.slug}` === bp)
    const lastmod = post ? post.date : '2026-09-04'
    const priority = bp === '/' ? '1.0' : bp.startsWith('/category/') ? '0.9'
        : bp.startsWith('/blog/') ? '0.8' : bp === '/about' ? '0.5' : '0.3'
    return LOCALES.map(loc => `  <url>
    <loc>${SITE}${localePath(loc, bp)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${bp.startsWith('/blog/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="zh-Hant" href="${SITE}${bp}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${localePath('en', bp)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${bp}"/>
  </url>`).join('\n')
}).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap)

console.log(`預渲染完成：${routes.length} 條路由（${LOCALES.length} 種語言）→ ${written} 個檔案`)
console.log(`sitemap：${basePaths.length * LOCALES.length} 個 URL，含 hreflang 互指 + 404.html`)
