<template>
    <!-- About Section -->
    <PageSection variant="default"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="*關於* 模板"
                           subtitle="了解更多專案資訊！"/>

        <!-- Content -->
        <PageSectionContent>
            <!-- About Template -->
            <ArticleInfoBlock image="images/logo/agency-logo.png"
                              :paragraphs="[
                                  `<b>Ryan Balieiro</b> 創建了 <em>Foxy</em>，這是一個免費的 Vue3 和 Bootstrap5 主題。可下載的檔案包含完整的原始碼，包括 HTML、CSS 和 Javascript。歡迎您下載並根據需要自訂主題。`,
                                  `在 <a href='github.com'>GitHub</a> 上提供的模板對開發者來說是寶貴的資源，因為它為各種專案提供了免費且易於使用的解決方案。託管在該平台上，模板讓使用者可以輕鬆存取和利用原始碼，使其成為網頁開發工作的便利起點。`,
                                  `使用此模板，您可以自由創建自訂區塊，用您自己的內容填充現有區塊，並根據喜好個人化顏色、字體等。如果您在嘗試自訂或運行此模板時遇到任何挑戰，請隨時與我聯繫，無需猶豫。我很樂意提供協助，並盡可能幫助您。`
                              ]"/>
        </PageSectionContent>

        <!-- Footer -->
        <PageSectionFooter title="*免費* 取得！"
                           description="您想使用和/或自訂此模板嗎？歡迎從官方 Github 儲存庫複製！"
                           :include-divider="true"
                           button-label="立即下載！"
                           button-fa-icon="fa-solid fa-download"
                           button-url="https://github.com/ryanbalieiro/vue-agency-landing-page-template"/>
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