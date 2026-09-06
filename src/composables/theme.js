import { ref } from "vue"

const STORAGE_KEY = "spark-theme"
export const theme = ref("light")

const apply = (value) => {
    document.documentElement.setAttribute("data-theme", value)
    theme.value = value
}

/**
 * Restores the saved theme, or follows the operating system when the visitor
 * has never chosen one. Called before mount so the correct surface paints on
 * the first frame instead of flashing light.
 */
export function initTheme() {
    let saved = null
    try {
        saved = localStorage.getItem(STORAGE_KEY)
    } catch (e) {
        // Private mode and blocked site data both throw on access.
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    apply(saved ?? (media.matches ? "dark" : "light"))

    // Keep following the system until the visitor picks a side themselves.
    media.addEventListener("change", (e) => {
        let chosen = null
        try {
            chosen = localStorage.getItem(STORAGE_KEY)
        } catch (err) {
            // ignore
        }
        if (!chosen) apply(e.matches ? "dark" : "light")
    })
}

export function toggleTheme() {
    const next = theme.value === "dark" ? "light" : "dark"
    apply(next)
    try {
        localStorage.setItem(STORAGE_KEY, next)
    } catch (e) {
        // Preference simply will not persist; the toggle still works this visit.
    }
}
