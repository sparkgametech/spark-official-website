<template>
    <Navbar :brand-logo="logo"
            :brand-label="label"
            brand-url="#"
            :cta-buttons="ctaButtons"
            :expandable="true"/>
</template>

<script setup>
import Navbar from "/src/vue/components/nav/navbar/Navbar.vue"
import {useI18n} from "/src/composables/i18n.js"
import {computed, onMounted} from "vue"
import {useRoute} from "vue-router"
import {useLayout} from "/src/composables/layout.js"

const route = useRoute()
const layout = useLayout()


const props = defineProps({
    logo: String,
    label: String
})

const {t, localePath} = useI18n()

const ctaButtons = computed(() => [
    { path: localePath('/about'), label: t('navSupport'), faIcon: 'pi pi-comments' }
])

onMounted(() => {
    setTimeout(() => {
        const hash = route.hash
        if (hash) {
            const sectionDiv = document.querySelector(hash)
            if (sectionDiv) {
                layout.scrollIntoView(sectionDiv)
            }
        }
    }, 400)
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>
