<template>
    <!-- About Section -->
    <PageSection variant="default"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="問題與 *答案*"
                           subtitle="快速回答您的疑問！"/>

        <!-- Content -->
        <PageSectionContent>
            <ArticleFaq>
                <ItemFaqQuestion question="模板是否具有響應式設計？"
                                 answer="絕對可以！模板設計時考慮了響應式設計，確保它能適應 <b>各種螢幕類型和尺寸</b>，包括行動裝置。使用響應式設計技術，如 <b>媒體查詢</b> 和 <b>彈性佈局</b>，確保模板在智慧型手機、平板電腦和其他行動裝置上看起來和運作良好。在自訂過程中，請確保在不同螢幕尺寸和裝置上預覽模板，以確保正確顯示。如果您遇到任何問題，可以相應地調整 CSS 樣式或佈局，以進一步改善行動體驗。"/>

                <ItemFaqQuestion question="如何自訂模板的內容？"
                                 answer="要自訂內容，請編輯 content 資料夾中的 <b>Vue</b> 檔案。這些檔案包含模板的數據，讓您可以根據需要更新文字、圖片、連結和其他元素。只需遵循現有結構即可避免格式問題。如果您想添加新區塊或進行更大的更改，您可能需要調整模板中的 Vue 組件和其他相關檔案。"/>

                <ItemFaqQuestion question="如何啟用聯絡表單的功能？"
                                 answer="The template now integrates <b>EmailJS</b>, making it easy to send emails directly from your website without needing a backend. It’s designed for seamless integration, allowing you to connect your form to an email service with just a few steps. The setup includes predefined configurations to ensure smooth functionality, but you can customize the settings as needed. During customization, be sure to test the email functionality to confirm everything works correctly. If you run into issues, you can adjust the <b>EmailJS</b> settings or API configuration to improve reliability."/>

                <ItemFaqQuestion question="我應該遵循哪些步驟來為主題添加新物件？"
                                 answer="要為主題添加新區塊，首先在 <i>sections</i> 資料夾中創建一個 <b>Vue 組件</b>。使用現有組件作為指南，以保持設計和功能的一致性。在新組件內部，定義必要的數據，如 <b>文字、連結和其他內容</b>。一旦您設置好一切，您的新區塊應該可以無縫整合到主題中。"/>
            </ArticleFaq>
        </PageSectionContent>

        <!-- Footer -->
        <PageSectionFooter title="與 Spark *一起成長*！"
                           description="Spark 星火創盛致力於提供專業的遊戲與系統開發服務，讓我們一起點燃創新的星火！"
                           :include-divider="true"
                           :description-text-class="`text-3`"
                           button-label="聯絡我們"
                           button-fa-icon="fa-solid fa-envelope"
                           button-url="#contact"/>
    </PageSection>
</template>

<script setup>
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import PageSectionFooter from "/src/vue/components/layout/PageSectionFooter.vue"
import ArticleFaq from "/src/vue/components/articles/ArticleFaq.vue"
import ItemFaqQuestion from "/src/vue/components/articles/items/ItemFaqQuestion.vue"

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>