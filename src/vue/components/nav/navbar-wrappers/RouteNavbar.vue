<template>
    <Navbar :brand-logo="logo"
            :brand-label="label"
            :brand-url="localePath('/')"
            :cta-buttons="ctaButtons"
            :expandable="false"/>
</template>

<script setup>
import {computed} from "vue"
import Navbar from "/src/vue/components/nav/navbar/Navbar.vue"
import {useI18n} from "/src/composables/i18n.js"

const props = defineProps({
    logo: String,
    label: String
})

const {t, localePath} = useI18n()

const ctaButtons = computed(() => [
    { path: localePath('/about'), label: t('navSupport'), faIcon: 'pi pi-comments' }
])
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>
