<template>
    <!-- Services Section -->
    <PageSection variant="primary"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="我們的 *服務*"
                           subtitle="此區塊可用來描述您提供的服務！"/>

        <!-- Content -->
        <PageSectionContent>
            <ArticleFeatures>
                <ItemFeature title="Vue3"
                             fa-icon="fa-brands fa-vuejs"
                             description="此模板使用 Vue3 JavaScript 框架構建，提供現代且高效的開發體驗。"/>

                <ItemFeature title="響應式設計"
                             fa-icon="fa-solid fa-laptop"
                             description="此模板設計為可無縫適應各種螢幕尺寸，在不同裝置上提供一致的用戶體驗。"/>

                <ItemFeature title="極簡風格"
                             fa-icon="fa-solid fa-wand-magic"
                             description="此模板採用簡潔的設計，專注於基本元素，呈現出現代且優雅的外觀。"/>

                <ItemFeature title="完全可自訂"
                             fa-icon="fa-solid fa-hand-sparkles"
                             description="此模板可以輕鬆自訂以符合您品牌的視覺識別和需求，讓您完全控制設計和功能。"/>

                <ItemFeature title="開源"
                             fa-icon="fa-solid fa-code"
                             description="此模板是開源的，意味著程式碼可公開存取，並且可以不受限制地修改或重新分發。"/>

                <ItemFeature title="輕量級"
                             fa-icon="fa-solid fa-feather"
                             description="此模板針對效能和速度進行了優化，具有最少的程式碼庫和依賴項，從而實現更快的載入時間和更好的用戶體驗。"/>
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