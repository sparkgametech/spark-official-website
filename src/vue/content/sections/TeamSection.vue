<template>
    <!-- Team Section -->
    <PageSection variant="primary"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader :title="t('teamTitle')"
                           :subtitle="t('teamSubtitle')"/>

        <!-- Content -->
        <PageSectionContent>
            <ArticleQuotes>
                <ItemQuote v-for="member in team"
                           :key="member.name"
                           :title="member.name"
                           :image="teamAvatarUrl(member)"
                           :role="member.role[locale] || member.role.zh"
                           :quote="quoteOf(member)"
                           :links="[]"/>
            </ArticleQuotes>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import ArticleQuotes from "/src/vue/components/articles/ArticleQuotes.vue"
import ItemQuote from "/src/vue/components/articles/items/ItemQuote.vue"
import { useI18n } from "/src/composables/i18n.js"
import { team, teamAvatarUrl } from "/src/data/team.js"

const props = defineProps({
    id: String
})

const { t, locale } = useI18n()

/** Skills are shown as a bullet list inside the quote balloon. */
const quoteOf = (member) => {
    const skills = member.skills[locale.value] || member.skills.zh
    return skills.map(skill => `• ${skill}`).join('<br/>')
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>
