<template>
    <PageWrapper id="spark-blog-post-page"
                 :no-padding="false"
                 :sections="sections"/>
</template>

<script setup>
import PageWrapper from "/src/vue/components/layout/PageWrapper.vue"
import SectionInfo from "/src/models/SectionInfo.js"
import BlogPostSection from "/src/vue/content/sections/BlogPostSection.vue"

const sections = [
    new SectionInfo('blog-post', BlogPostSection)
]
</script>

<style lang="scss" scoped>
</style>
