<template>
    <!-- Services Section -->
    <PageSection variant="primary"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="客戶 *評價*"
                           subtitle="人們對我們的評價！"/>

        <!-- Content -->
        <PageSectionContent>
            <ArticleTestimonials>
                <ItemTestimonial title="Spotify"
                                 image="images/clients/client-spotify.svg"
                                 quote="我對 Vue3 網站模板感到 <b>驚艷</b>！極簡設計簡直令人驚嘆，而且 <b>非常容易</b> 根據我的需求進行自訂。此外，它載入速度超快，這對我的業務至關重要。我強烈推薦這個模板給您！"
                                 author="John Lee"
                                 role="工程師"/>

                <ItemTestimonial title="Voloco"
                                 image="images/clients/client-voloco.svg"
                                 quote="我對這個網站模板讚不絕口。作為一個 <b>沒有編碼經驗</b> 的人，我能夠在短時間內創建一個專業的網站。"
                                 author="Any Heather"
                                 role="人力資源主管"/>

                <ItemTestimonial title="Facebook"
                                 image="images/clients/client-facebook.svg"
                                 quote="<b>Vue3 主題超出了預期</b>，其令人驚嘆的設計、無縫整合和卓越的效能。強烈推薦用於變革性的網站體驗。"
                                 author="Mark Zuckie"
                                 role="執行長"/>

                <ItemTestimonial title="Microsoft"
                                 image="images/clients/client-microsoft.svg"
                                 quote="這無疑是我使用過的 <b>最好的網站模板</b>。輕量級的程式碼庫使網站速度極快，完全靈活的特質讓我能夠為用戶創造獨特且引人入勝的體驗。"
                                 author="Bill Gates"
                                 role="執行長"/>

                <ItemTestimonial title="Nasa"
                                 image="images/clients/client-nasa.svg"
                                 quote="我絕對興奮地表達我對這個頂級模板的欽佩，其 <b>簡單且直觀的設計</b>！僅用言語無法表達它為我的生活帶來的喜悅。"
                                 author="John Suarez"
                                 role="技術分析師"/>
            </ArticleTestimonials>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import ArticleTestimonials from "/src/vue/components/articles/ArticleTestimonials.vue"
import ItemTestimonial from "/src/vue/components/articles/items/ItemTestimonial.vue"

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>