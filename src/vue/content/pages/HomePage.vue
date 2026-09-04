<template>
    <PageWrapper id="spark-home-page"
                 :no-padding="true"
                 :sections="sections"/>
</template>

<script setup>
import PageWrapper from "/src/vue/components/layout/PageWrapper.vue"
import SectionInfo from "/src/models/SectionInfo.js"
import HeroSection from "/src/vue/content/sections/HeroSection.vue"
import BlogGridSection from "/src/vue/content/sections/BlogGridSection.vue"

const sections = [
    new SectionInfo('hero',     HeroSection,     null, null),
    new SectionInfo('articles', BlogGridSection,  null, null),
]
</script>

<style lang="scss" scoped>
</style>