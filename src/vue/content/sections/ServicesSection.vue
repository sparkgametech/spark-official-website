<template>
    <!-- Services Section -->
    <PageSection variant="primary"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="*服務* 項目"
                           subtitle="我們專注於網站與遊戲開發、API供應串接與技術支援，協助企業數位轉型"/>

        <!-- Content -->
        <PageSectionContent>
            <ArticleFeatures>
                <ItemFeature title="網頁開發"
                             fa-icon="fa-solid fa-globe"
                             description="提供企業級網站、品牌官網與Landing Page製作，重視SEO、設計美感與響應式體驗。"/>

                <ItemFeature title="遊戲開發與API整合"
                             fa-icon="fa-solid fa-gamepad"
                             description="專注於 Unity 與 Cocos 等跨平台遊戲開發，支援 Web 與行動裝置上線，並提供穩定的第三方 API 串接服務，協助打造具備即時互動與外部服務整合能力的完整遊戲體驗。"/>

                <ItemFeature title="ERP 系統導入"
                             fa-icon="fa-solid fa-database"
                             description="協助企業評估需求、規劃流程，導入合適的ERP系統，提升管理效率與資訊整合能力。支援在地化客製與跨國多據點佈署。"/>

                <ItemFeature title="客戶支援"
                             fa-icon="fa-solid fa-headset"
                             description="完善的專案管理與後續技術支援，確保產品長期穩定營運與持續優化。"/>
            </ArticleFeatures>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import ArticleFeatures from "/src/vue/components/articles/ArticleFeatures.vue"
import ItemFeature from "/src/vue/components/articles/items/ItemFeature.vue"

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>