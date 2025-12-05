<template>
    <!-- Services Section -->
    <PageSection variant="default"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="我們的 *歷史*"
                           subtitle="揭開我們過去的秘密！"/>

        <!-- Content -->
        <PageSectionContent>
            <ArticleTimeline>
                <ItemTimelineEntry title="我們的創立"
                                   dateStart="2010"
                                   dateEnd=""
                                   image="images/history/history-1.png"
                                   description="成立於 2010 年，我們的軟體代理商從一個小團隊開始，憑藉對技術和創新的熱情，致力於提供卓越的數位解決方案。我們為未來的成功奠定了基礎。"
                                   :inverted="true"/>

                <ItemTimelineEntry title="快速成長與擴張"
                                   dateStart="2010"
                                   dateEnd="2013"
                                   image="images/history/history-2.png"
                                   description="到了 2013 年，我們代理商在優質服務方面的聲譽導致快速成長，促使我們擴展團隊並開設新辦公室，以更好地服務全球客戶。我們擁抱擴張的機會。"
                                   :inverted="false"/>

                <ItemTimelineEntry title="多元化與專業化"
                                   dateStart="2013"
                                   dateEnd="2019"
                                   image="images/history/history-3.png"
                                   description="在 2017 年，我們多元化我們的服務，增加了網頁設計、SEO、社群媒體管理和品牌服務，將自己定位為全面的數位解決方案提供商。我們成為客戶的一站式服務商。"
                                   :inverted="true"/>

                <ItemTimelineEntry title="慶祝十年成功"
                                   dateStart="2020"
                                   dateEnd="2022"
                                   image="images/history/history-4.png"
                                   description="自豪地慶祝我們的十週年，我們代理商十年的旅程以創新、卓越的服務和強大的客戶關係為特徵，通過技術和創意賦能企業。我們取得了卓越的成功。"
                                   :inverted="false"/>

                <ItemTimelineEntry title="規劃新事物"
                                   dateStart="2023"
                                   dateEnd="現在"
                                   image="images/history/history-5.png"
                                   description="隨著我們持續成長和演進，我們邀請有才華的個人、合作夥伴和客戶與我們一起塑造數位創新的未來，共同產生有意義的影響。我們對即將到來的一切感到興奮。"
                                   :inverted="true"/>
            </ArticleTimeline>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import ArticleTimeline from "/src/vue/components/articles/ArticleTimeline.vue"
import ItemTimelineEntry from "/src/vue/components/articles/items/ItemTimelineEntry.vue"

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>