<template>
    <!-- About Section -->
    <PageSection variant="default"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="*關於* 我們"
                           subtitle="專注老虎機遊戲開發的全方位製作團隊"/>

        <!-- Content -->
        <PageSectionContent>
            <!-- About Template -->
            <ArticleInfoBlock image="images/logo/agency-logo.png"
                              :paragraphs="[
                                  `Spark 星火創盛是一支專注於老虎機（Slot Game）的遊戲製作團隊，<br/>團隊成員擁有超過十年的遊戲產業經驗。`,
                                  `我們提供從企劃到上線的完整製作服務：`,
                                  `<ul>
                                      <li>遊戲客端開發（Unity / Cocos / Phaser）</li>
                                      <li>數值設計與 RTP 調校</li>
                                      <li>美術設計與動畫製作</li>
                                      <li>音樂音效製作</li>
                                      <li>QA 測試與體感優化</li>
                                  </ul>`,
                                  `一條龍交付可上線的老虎機遊戲產品。`
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