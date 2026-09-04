<template>
    <!-- Services Section -->
    <PageSection variant="primary"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="*服務* 項目"
                           subtitle="從遊戲開發到美術音效，提供完整的老虎機遊戲製作服務"/>

        <!-- Content -->
        <PageSectionContent>
            <ArticleFeatures>
                <ItemFeature title="遊戲客端開發"
                             fa-icon="fa-solid fa-gamepad"
                             :description="`使用 Unity、Cocos、Phaser 等跨平台引擎，<br/>開發老虎機遊戲客端。<br/><br/>支援 Web 與行動裝置上線，<br/>涵蓋遊戲動畫、特效與即時互動體驗。`"/>

                <ItemFeature title="數值設計與 RTP 調校"
                             fa-icon="fa-solid fa-calculator"
                             :description="`專業的老虎機數學模型設計：<br/><br/>• 自然機率演算法與符號權重分配<br/>• Free Game 與 Bonus 觸發機制<br/>• RTP（Return to Player）精準調校<br/>• 波動度控制與玩家體感優化`"/>

                <ItemFeature title="美術音效與品質保證"
                             fa-icon="fa-solid fa-palette"
                             :description="`完整的遊戲視覺與聽覺製作：<br/><br/>• 角色與符號美術設計<br/>• UI 介面與動畫製作<br/>• 音樂音效配置<br/>• QA 測試與體感驗證`"/>
            </ArticleFeatures>
        </PageSectionContent>

        <!-- Free resources moved to top nav -->
    </PageSection>
</template>

<script setup>
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import PageSectionFooter from "/src/vue/components/layout/PageSectionFooter.vue"
import ArticleFeatures from "/src/vue/components/articles/ArticleFeatures.vue"
import ItemFeature from "/src/vue/components/articles/items/ItemFeature.vue"

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>