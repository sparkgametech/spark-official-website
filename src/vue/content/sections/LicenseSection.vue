<template>
    <!-- License Section -->
    <PageSection variant="default"
                 :id="props.id">
        <Breadcrumbs/>

        <PageSectionHeader title="使用 *授權*"
                           subtitle="條款與歸屬"/>

        <PageSectionContent>
            <ArticleParagraph title=""
                              fa-icon=""
                              :description="[
                                  `本網站基於開源的 Vue 模板建構，該模板採用 <a href='https://opensource.org/licenses/MIT'> MIT 授權</a>。這允許您在包含版權聲明的前提下自由使用、修改和分發。雖然不需要署名，但我們非常感謝您的支持。`
                              ]"/>

            <ArticleParagraph title="使用"
                              fa-icon="pi pi-briefcase"
                              :description="[
                                  `Spark 星火創盛致力於提供創新的遊戲與軟體解決方案。我們專注於遊戲開發、網站建置及各類軟體開發，為客戶提供專業且可靠的服務。無論您需要商業應用程式開發還是個人專案協助，Spark 都能為您提供專業的技術支援。`,
                                  `此外，我們提供客製化的開發服務，可根據您的特定需求進行調整，確保與專案目標的完美契合。我們的服務範圍涵蓋從概念設計到最終部署的完整開發流程，並提供持續的技術支援與維護服務。`
                              ]"/>

            <ArticleParagraph title="MIT 授權"
                              fa-icon="pi pi-hammer"
                              :description="mitLicenseText"/>

            <ArticleParagraph title="免責聲明"
                              fa-icon="pi pi-exclamation-triangle"
                              :description="[
                                  `作品以其當前狀態提供給您，不提供任何關於其效能或適用於任何特定目的的保證、擔保或保證。這意味著作品是「按原樣」提供的，建議您在使用時充分了解其固有特性和限制。沒有保證意味著作者不承擔確保作品無錯誤運作、穩定性或適用於特定應用的責任。`,
                                  `重要的是要強調，提供「按原樣」作品的原則並不是試圖削弱其價值或品質。相反，它強調了這樣一個現實：由於使用環境和情境的多樣性，軟體和創意作品在效能、相容性和結果方面可能會有所不同。雖然作者無疑已經努力打造一個功能性和可靠的工具，但技術的固有複雜性和用戶情境的多樣性可能會以不可預測的方式影響作品的行為。`
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

const mitLicenseText = [
    'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:',
    'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.',
    'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'
]
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>
