<template>
    <!-- Services Section -->
    <PageSection variant="primary"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="*開發* 團隊"
                           subtitle="我們是一支專注於產品運營、遊戲與系統開發的全方位團隊"/>

        <!-- Content -->
        <PageSectionContent>
            <ArticleQuotes>
                <ItemQuote title="Ethan"
                           image="images/avatars/person-1.png"
                           role="後端"
                           quote="擅長 Golang 與微服務，專注遊戲伺服器架構與多人連線機制。"
                           :links="[]"/>

                <ItemQuote title="Liam"
                           image="images/avatars/person-2.png"
                           role="後端"
                           quote="專注 Kubernetes 與持續整合，具備雲端伺服器維運與高可用設計，兼具容器化與自動化部署。"
                           :links="[]"/>

                <ItemQuote title="Noah"
                           image="images/avatars/person-3.png"
                           role="後端"
                           quote="擅長 Golang 深耕遊戲邏輯，專長事件驅動架構與跨平台遊戲邏輯設計。"
                           :links="[]"/>

                <ItemQuote title="Mason"
                           image="images/avatars/person-4.png"
                           role="後端"
                           quote="擅長 Golang、Redis Cluster 與 PostgreSQL，專注於玩家儲存、快取優化與分散處理。"
                           :links="[]"/>

                <ItemQuote title="James"
                           image="images/avatars/person-5.png"
                           role="後端"
                           quote="專注網路協定與伺服器安全，兼具反作弊、流量防禦與遊戲帳號驗證設計經驗。"
                           :links="[]"/>

                <ItemQuote title="Nathan"
                           image="images/avatars/person-6.png"
                           role="前端"
                           quote="精通 Phaser 框架，專注遊戲介面設計、動畫渲染與跨端互動體驗。"
                           :links="[]"/>

                <ItemQuote title="Sam"
                           image="images/avatars/person-1.png"
                           role="前端"
                           quote="擅長跨平台遊戲與高效能系統架構，精通 Unity3D/Cocos/PixiJS，具 20+ 年遊戲引擎設計。"
                           :links="[]"/>

                <ItemQuote title="Linking"
                           image="images/avatars/person-2.png"
                           role="測試"
                           quote="擅長手動測試及體感回饋，流程調控建議。"
                           :links="[]"/>

                <ItemQuote title="May"
                           image="images/avatars/person-3.png"
                           role="測試"
                           quote="擅長手動測試及體感回饋；18年遊戲測試經驗，2年博弈測試經驗。"
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

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>