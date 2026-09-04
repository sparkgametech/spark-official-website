<template>
    <!-- License Section -->
    <PageSection variant="default"
                 :id="props.id">
        <Breadcrumbs/>

        <PageSectionHeader :title="content.title"
                           :subtitle="content.subtitle"/>

        <PageSectionContent>
            <ArticleParagraph v-for="(block, index) in content.blocks"
                              :key="index"
                              :title="block.title"
                              :faIcon="block.faIcon"
                              :description="block.paragraphs"/>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import { computed } from "vue"
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import ArticleParagraph from "/src/vue/components/articles/ArticleParagraph.vue"
import Breadcrumbs from "/src/vue/components/widgets/Breadcrumbs.vue"
import { useI18n } from "/src/composables/i18n.js"
import { policy } from "/src/data/policy.js"

const props = defineProps({
    id: String
})

const { locale } = useI18n()

const content = computed(() => policy[locale.value] || policy.zh)
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>
