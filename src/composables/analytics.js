import { GA_MEASUREMENT_ID } from "/src/data/analytics.js"

/**
 * Loads GA4 and reports one page_view per client-side navigation.
 * Does nothing when no measurement ID is configured.
 */
export function initAnalytics(router) {
    if (!GA_MEASUREMENT_ID) return

    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag("js", new Date())
    // The SPA reports its own page_view per route below, so the automatic
    // one on load is turned off to avoid double-counting the first page.
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false })

    router.afterEach((to) => {
        // Sections set document.title in onMounted, which runs after this hook
        // and — for async article bodies — after the chunk loads. A short
        // deferral lets the real title settle before it is reported.
        setTimeout(() => {
            window.gtag("event", "page_view", {
                page_path: to.fullPath,
                page_location: window.location.href,
                page_title: document.title
            })
        }, 300)
    })
}
