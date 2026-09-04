import { computed } from "vue"
import { useRoute } from "vue-router"
import { ui, localeMeta, DEFAULT_LOCALE } from "/src/data/i18n.js"
import { postsEn, categoriesEn } from "/src/data/i18n-content.js"

/**
 * The locale is read from the route rather than stored, so every language has a
 * real URL (/blog/x vs /en/blog/x) that can be indexed and linked with hreflang.
 */
export const useI18n = () => {
    const route = useRoute()

    const locale = computed(() => route.params.lang === 'en' ? 'en' : DEFAULT_LOCALE)

    const t = (key, params) => {
        const raw = ui[locale.value]?.[key] ?? ui[DEFAULT_LOCALE][key] ?? key
        if (!params) return raw
        return Object.entries(params).reduce(
            (out, [k, v]) => out.replace(`{${k}}`, v), raw)
    }

    /** Prefixes an app path with the current locale. */
    const localePath = (path) => {
        if (locale.value === DEFAULT_LOCALE) return path
        return path === '/' ? '/en' : `/en${path}`
    }

    /** The current page addressed in a specific language. */
    const pathForLocale = (code) => {
        const bare = route.path.replace(/^\/en(?=\/|$)/, '') || '/'
        if (code !== 'en') return bare
        return bare === '/' ? '/en' : `/en${bare}`
    }

    /** The same page in the other language, for a two-way toggle. */
    const alternatePath = () => pathForLocale(locale.value === 'en' ? 'zh' : 'en')

    const localizedPost = (post) => {
        if (!post) return post
        const over = locale.value === 'en' ? postsEn[post.slug] : null
        return over ? { ...post, ...over } : post
    }

    const localizedCategory = (category) => {
        if (!category) return category
        const over = locale.value === 'en' ? categoriesEn[category.slug] : null
        return over ? { ...category, ...over } : category
    }

    const htmlLang = computed(() => localeMeta[locale.value].htmlLang)

    return {
        locale, t, localePath, alternatePath, pathForLocale,
        localizedPost, localizedCategory, htmlLang
    }
}
