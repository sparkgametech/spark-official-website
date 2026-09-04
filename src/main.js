import "./scss/style.scss"
import {createApp} from "vue"
import {createRouter, createWebHistory} from "vue-router"
import App from "/src/vue/stack/App.vue"
import HomePage from "/src/vue/content/pages/HomePage.vue"
import AboutPage from "/src/vue/content/pages/AboutPage.vue"
import PolicyPage from "/src/vue/content/pages/PolicyPage.vue"
import BlogPostPage from "/src/vue/content/pages/BlogPostPage.vue"
import CategoryPage from "/src/vue/content/pages/CategoryPage.vue"
import {ui, localeMeta, DEFAULT_LOCALE} from "/src/data/i18n.js"

// `:lang(en)?` makes one definition serve both /blog/x and /en/blog/x, so the
// two languages can never drift out of sync.
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) return { el: to.hash, behavior: 'smooth' }
        return { top: 0 }
    },
    routes: [
        {
            path: "/:lang(en)?",
            name: "home",
            component: HomePage,
            props: {
                label: "首頁",
                labelKey: "routeHome",
                faIcon: "pi pi-home",
                inPageNavbar: true,
                shouldAlwaysPreload: true,
                breadcrumbs: []
            }
        },

        {
            path: "/:lang(en)?/about",
            name: "about",
            component: AboutPage,
            props: {
                label: "關於我們",
                labelKey: "routeAbout",
                faIcon: "pi pi-users",
                inPageNavbar: false,
                shouldAlwaysPreload: false,
                breadcrumbs: [{ path: "/", labelKey: "routeHome" }]
            }
        },

        {
            path: "/:lang(en)?/category/:slug",
            name: "category",
            component: CategoryPage,
            props: {
                label: "文章分類",
                labelKey: "routeCategory",
                faIcon: "pi pi-folder",
                inPageNavbar: false,
                shouldAlwaysPreload: false,
                breadcrumbs: [{ path: "/", labelKey: "routeHome" }]
            }
        },

        {
            path: "/:lang(en)?/blog/:slug",
            name: "blog-post",
            component: BlogPostPage,
            props: {
                label: "技術文章",
                labelKey: "routeArticle",
                faIcon: "pi pi-file",
                inPageNavbar: false,
                shouldAlwaysPreload: false,
                breadcrumbs: [{ path: "/", labelKey: "routeHome" }]
            }
        },

        {
            path: "/:lang(en)?/privacy-policy",
            name: "policy",
            component: PolicyPage,
            props: {
                label: "隱私政策",
                labelKey: "routePolicy",
                faIcon: "pi pi-hammer",
                inPageNavbar: false,
                shouldAlwaysPreload: false,
                breadcrumbs: [{ path: "/", labelKey: "routeHome" }]
            }
        },

        { path: "/blog", redirect: "/" },
        { path: "/en/blog", redirect: "/en" },
        { path: "/:pathMatch(.*)*", redirect: "/" }
    ]
})

const SITE_URL = "https://www.sparkgametech.com"

// One index.html backs every route, so canonical, hreflang, title, description
// and the document language all have to be reset per navigation — otherwise
// each route reports itself as a duplicate of the homepage in the wrong
// language. Sections with their own metadata override the text in onMounted.
router.afterEach((to) => {
    const locale = to.params.lang === 'en' ? 'en' : DEFAULT_LOCALE
    const bare = to.path.replace(/^\/en(?=\/|$)/, '') || '/'
    const strings = ui[locale]

    document.documentElement.setAttribute("lang", localeMeta[locale].htmlLang)
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", SITE_URL + to.path)
    document.title = strings.defaultTitle
    document.querySelector('meta[name="description"]')?.setAttribute("content", strings.defaultDescription)

    setAlternate("zh-Hant", SITE_URL + bare)
    setAlternate("en", SITE_URL + (bare === '/' ? '/en' : `/en${bare}`))
    setAlternate("x-default", SITE_URL + bare)
})

function setAlternate(hreflang, href) {
    let el = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)
    if (!el) {
        el = document.createElement("link")
        el.setAttribute("rel", "alternate")
        el.setAttribute("hreflang", hreflang)
        document.head.appendChild(el)
    }
    el.setAttribute("href", href)
}

createApp(App).use(router).mount("#app")
