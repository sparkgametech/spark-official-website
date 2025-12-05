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
                                  `Foxy is an open source Vue template that is licensed under the<a href='https://opensource.org/licenses/MIT'> MIT license</a>. This allows you to do pretty much anything you want as long as you include the copyright in “all copies or substantial portions of the Software.” Attribution is not required (though very much appreciated).`
                              ]"/>

            <ArticleParagraph title="使用"
                              fa-icon="pi pi-briefcase"
                              :description="[
                                  `您被授予一系列機會來充分利用 Foxy 的潛力。首先，該框架將其實用性擴展到商業和個人/私人專案，為各種情境提供靈活性。無論您是在開發商業應用程式還是在進行個人專案，Foxy 都可以無縫整合。`,
                                  `此外，修改和改編作品的自由允許您根據特定需求進行調整，確保與專案目標的完美契合。這種適應性也延伸到分發，使您能夠與他人分享您的自訂版本。子授權的規定進一步增強了框架的多功能性，使您能夠將其納入受更嚴格授權條款管轄的專案中，擴展其潛在應用。`
                              ]"/>

            <ArticleParagraph title="MIT 授權"
                              fa-icon="pi pi-hammer"
                              :description="[
                                  `Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:`,
                                  `The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.`,
                                  `THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
                              ]"/>

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
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>