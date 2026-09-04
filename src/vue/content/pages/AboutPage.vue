<template>
    <PageWrapper id="spark-about-page"
                 :no-padding="false"
                 :sections="sections"/>
</template>

<script setup>
import PageWrapper from "/src/vue/components/layout/PageWrapper.vue"
import SectionInfo from "/src/models/SectionInfo.js"
import TeamSection from "/src/vue/content/sections/TeamSection.vue"
import AboutAuthorSection from "/src/vue/content/sections/AboutAuthorSection.vue"

const sections = [
    new SectionInfo('about-author', AboutAuthorSection, null, null),
    new SectionInfo('team',         TeamSection,        '開發團隊', 'pi pi-users'),
]
</script>

<style lang="scss" scoped>
</style>
