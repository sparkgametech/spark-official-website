<template>
    <!-- About Section -->
    <PageSection variant="default"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="*關於* 我們"
                           subtitle="我們是一群熱愛創作的設計師、開發者與策略規劃者"/>

        <!-- Content -->
        <PageSectionContent>
            <!-- About Template -->
            <ArticleInfoBlock image="images/logo/agency-logo.png"
                              :paragraphs="[
                                  `Spark 致力於提供創新的遊戲與軟體解決方案，專注於遊戲開發、網站建置及各類軟體開發。我們的團隊擁有豐富的行業經驗，提供從遊戲企劃、開發、串接到整合系統的服務，助力客戶打造卓越的數位體驗。`,
                                  `我們是一群熱愛創作的設計師、開發者與策略規劃者，致力於打造有溫度的數位體驗。從極簡著陸頁到完整的數位平台，我們以乾淨的程式碼、聰明的用戶體驗與強大的視覺呈現實現每個想法。`,
                                  `我們相信每一個像素都重要，每一次互動都關鍵。不論您是新創還是成長中的品牌，我們都能為您打造專屬網站，講好品牌故事、助力成長。`
                              ]"/>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import PageSectionFooter from "/src/vue/components/layout/PageSectionFooter.vue"
import ArticleInfoBlock from "/src/vue/components/articles/ArticleInfoBlock.vue"

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>