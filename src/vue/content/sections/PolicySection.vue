<template>
    <!-- License Section -->
    <PageSection variant="default"
                 :id="props.id">
        <Breadcrumbs/>

        <PageSectionHeader title="*隱私* 政策"
                           subtitle="了解我們的實務做法"/>

        <PageSectionContent>
            <ArticleParagraph title=""
                              faIcon=""
                              :description="[
                                  `本隱私政策旨在解釋您在 Foxy 上提供的信息如何被收集、儲存、使用和管理。`,
                                  `當您存取 Foxy 時，您即同意按照本隱私政策中所述的方式收集和使用您的個人信息。請注意，本政策可能會定期更新，建議您經常檢查此頁面以了解任何修改。`
                              ]"/>

            <ArticleParagraph title="收集的信息"
                              faIcon="pi pi-address-book"
                              :description="[
                                  `當您存取 Foxy 時，可能會收集和儲存您自願提供的信息。這可能包括儲存在您裝置儲存空間中的圖像檔案、使用信息（如偏好設定、購買歷史和/或會話持續時間）。`,
                                  `此外，如果您的信息在線上分享，例如通過參與排行榜，與其他用戶執行的任何活動都將被視為公開。`,
                                  `最後，每次登入服務時可能會收集其他信息，例如網際網路協定地址、裝置類型、裝置語言、平台類型、點擊次數、瀏覽的頁面、存取順序、在特定頁面上花費的時間以及此活動的日期和時間。此信息用於更好地根據您的興趣自訂應用程式並改善整體應用程式效能。`,
                                  `我們保證，任何存取和收集的數據都不會向非關聯的第三方披露、出租、租賃、借出、出售或自願分發。它僅用於分析目的並增強您的使用體驗。`
                              ]"/>

            <ArticleParagraph title="Cookies"
                              faIcon="pi pi-database"
                              :description="[
                                  `Cookie 是儲存在您裝置硬碟上的小數據檔案。它允許應用程式快速識別您的裝置並檢索您的用戶信息和偏好設定，例如您的用戶名或您已購買的項目清單。`,
                                  `Cookie 中包含的所有信息都可能與您的個人信息相關聯，此數據可用於儲存您的偏好設定、根據您的興趣提供建議，並改善應用程式的整體可用性。如果您願意，您可以隨時停用 cookies。`
                              ]"/>

            <ArticleParagraph title="安全性"
                              faIcon="pi pi-lock"
                              :description="[
                                  `我們認真對待您個人信息的安全性，並已實施合理的技術和組織措施，以保護其免受意外丟失、未經授權的存取、更改或披露。`,
                                  `但是，不能保證未經授權的第三方永遠無法突破這些措施或將您的個人信息用於不當目的。重要的是要注意，電子郵件和訊息系統不被視為安全，因此建議不要通過這些媒介分享個人信息。`,
                                  `請放心，我們會不斷審查和更新安全措施，以確保對您個人信息的最佳保護。`
                              ]"/>

            <ArticleParagraph title="連結"
                              faIcon="pi pi-link"
                              :description="[
                                  `應用程式可能包含指向其他網站的連結。請注意，僅因為應用程式連結到網站、顯示橫幅廣告或顯示其他類型的廣告，並不意味著它認可或授權該第三方服務。也不代表與該第三方的任何形式的關聯。`,
                                  `應該明確的是，從 Foxy 可能存取的其他網站的隱私政策不是我們的責任。因此，強烈建議在退出應用程式之前仔細閱讀此類網站或應用程式的隱私政策。`
                              ]"/>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import ArticleParagraph from "/src/vue/components/articles/ArticleParagraph.vue"
import Breadcrumbs from "/src/vue/components/widgets/Breadcrumbs.vue"

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>