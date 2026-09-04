<template>
    <PageWrapper id="spark-category-page"
                 :no-padding="false"
                 :sections="sections"/>
</template>

<script setup>
import PageWrapper from "/src/vue/components/layout/PageWrapper.vue"
import SectionInfo from "/src/models/SectionInfo.js"
import CategorySection from "/src/vue/content/sections/CategorySection.vue"

const sections = [
    new SectionInfo('category', CategorySection)
]
</script>

<style lang="scss" scoped>
</style>
