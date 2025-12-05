<template>
    <!-- About Section -->
    <PageSection variant="dark"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="*聯絡* 我們"
                           subtitle="歡迎聯絡我們，取得專業網站、遊戲開發與技術諮詢服務。一起打造高質感且細節完美的產品"
                           :contrast="true"/>

        <!-- Content -->
        <PageSectionContent>
            <ArticleCustomContent class="p-0">
                <ContactForm/>
            </ArticleCustomContent>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import ArticleCustomContent from "/src/vue/components/articles/ArticleCustomContent.vue"
import ContactForm from "/src/vue/components/forms/contact/ContactForm.vue"

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>