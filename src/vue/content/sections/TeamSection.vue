<template>
    <!-- Services Section -->
    <PageSection variant="primary"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="我們的 *團隊*"
                           subtitle="認識我們優秀團隊的主要成員！"/>

        <!-- Content -->
        <PageSectionContent>
            <ArticleQuotes>
                <ItemQuote title="Jonathan Moore"
                           image="images/avatars/person-1.png"
                           role="執行長"
                           quote="憑藉在國際發展方面 <b>超過 20 年的經驗</b>，我致力於為有需要的社群創造可持續的解決方案。"
                           :links="[
                              { faIcon: 'fa-brands fa-twitter', href: 'https://twitter.com' },
                              { faIcon: 'fa-brands fa-instagram', href: 'https://instagram.com' },
                              { faIcon: 'fa-brands fa-linkedin', href: 'https://linkedin.com' }
                           ]"/>

                <ItemQuote title="Alicia Cole"
                           image="images/avatars/person-2.png"
                           role="市場分析師"
                           quote="憑藉我在市場研究和消費者行為方面的專業知識，我幫助企業做出戰略決策，以 <b>推動成長</b> 並 <b>提升整體客戶滿意度</b>。"
                           :links="[
                              { faIcon: 'fa-brands fa-twitter', href: 'https://twitter.com' },
                              { faIcon: 'fa-brands fa-linkedin', href: 'https://linkedin.com' }
                           ]"/>

                <ItemQuote title="Jiang Xi"
                           image="images/avatars/person-4.png"
                           role="產品經理"
                           quote="以戰略視野領導多元化團隊，<b>我推動以客戶為中心的解決方案</b>，促進創新並為市場提供真正的價值。"
                           :links="[
                              { faIcon: 'fa-brands fa-instagram', href: 'https://instagram.com' },
                              { faIcon: 'fa-brands fa-facebook', href: 'https://facebook.com' },
                              { faIcon: 'fa-brands fa-linkedin', href: 'https://linkedin.com' }
                           ]"/>

                <ItemQuote title="Sofia Kondakova"
                           image="images/avatars/person-3.png"
                           role="首席開發者"
                           quote="憑藉創建複雜分散式軟體系統的可靠記錄，我為團隊帶來豐富的 <b>技術專業知識</b>。"
                           :links="[
                              { faIcon: 'fa-brands fa-twitter', href: 'https://twitter.com' },
                              { faIcon: 'fa-brands fa-linkedin', href: 'https://linkedin.com' },
                              { faIcon: 'fa-brands fa-github', href: 'https://github.com' }
                           ]"/>

                <ItemQuote title="Travis Jones"
                           image="images/avatars/person-5.png"
                           role="財務長"
                           quote="引導財務成長，我透過 <b>細緻的規劃和風險管理</b> 確保穩定性。賦能團隊抓住機會，我們實現持久的成功。"
                           :links="[
                              { faIcon: 'fa-brands fa-instagram', href: 'https://instagram.com' },
                              { faIcon: 'fa-brands fa-linkedin', href: 'https://linkedin.com' }
                           ]"/>

                <ItemQuote title="Aaron Friedrich"
                           image="images/avatars/person-6.png"
                           role="資訊安全長"
                           quote="<b>保護有價值的數據</b> 是我的使命。作為一名警覺的 CISO，我主動保護數位環境，透過尖端措施確保客戶和合作夥伴的信任。"
                           :links="[
                              { faIcon: 'fa-brands fa-instagram', href: 'https://instagram.com' },
                              { faIcon: 'fa-brands fa-linkedin', href: 'https://linkedin.com' }
                           ]"/>
            </ArticleQuotes>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import ArticleQuotes from "/src/vue/components/articles/ArticleQuotes.vue"
import ItemQuote from "/src/vue/components/articles/items/ItemQuote.vue"

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>