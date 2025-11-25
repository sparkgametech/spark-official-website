import "./scss/style.scss"
import {createApp} from "vue"
import {createRouter, createWebHistory} from "vue-router"
import App from "/src/vue/stack/App.vue"
import HomePage from "/src/vue/content/pages/HomePage.vue"
import LicensePage from "/src/vue/content/pages/LicensePage.vue"
import PolicyPage from "/src/vue/content/pages/PolicyPage.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage,
            props: {
                label: "Home",
                faIcon: "fa-solid fa-home",
                inPageNavbar: true,
                shouldAlwaysPreload: true,
                breadcrumbs: []
            }
        },

        {
            path: "/privacy-policy",
            name: "policy",
            component: PolicyPage,
            props: {
                label: "Privacy Policy",
                faIcon: "pi pi-hammer",
                inPageNavbar: false,
                shouldAlwaysPreload: false,
                breadcrumbs: [
                    "/"
                ]
            }
        },

        {
            path: "/license",
            name: "license",
            component: LicensePage,
            props: {
                label: "License",
                faIcon: "pi pi-briefcase",
                inPageNavbar: false,
                shouldAlwaysPreload: false,
                breadcrumbs: [
                    "/"
                ]
            }
        },

        {
            path: "/:pathMatch(.*)*",
            redirect: "/"
        }
    ]
})

createApp(App).use(router).mount("#app")