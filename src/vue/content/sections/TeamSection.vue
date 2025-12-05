<template>
    <!-- Services Section -->
    <PageSection variant="primary"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="*開發* 團隊"
                           subtitle="我們是一支專注於產品運營、遊戲與系統開發的全方位團隊"/>

        <!-- Content -->
        <PageSectionContent>
            <ArticleQuotes>
                <ItemQuote title="NingFang"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=NingFang&facialHairProbability=0&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="總召"
                           quote="負責團隊整體規劃<br/>與協調，統籌專案進度<br/>與資源分配，確保<br/>團隊目標達成。"
                           :links="[]"/>
                <ItemQuote title="Ethan"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="後端"
                           quote="擅長 Golang 與微服務，<br/>專注遊戲伺服器架構<br/>與多人連線機制。"
                           :links="[]"/>
                <ItemQuote title="Liam"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="後端"
                           quote="專注 Kubernetes 與持續整合，<br/>具備雲端伺服器維運<br/>與高可用設計，兼具<br/>容器化與自動化部署。"
                           :links="[]"/>
                <ItemQuote title="Noah"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Noah&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="後端"
                           quote="擅長 Golang 深耕遊戲邏輯，<br/>專長事件驅動架構<br/>與跨平台遊戲邏輯設計。"
                           :links="[]"/>
                <ItemQuote title="Mason"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Mason&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="後端"
                           quote="擅長 Golang、Redis Cluster<br/>與 PostgreSQL，專注於<br/>玩家儲存、快取優化<br/>與分散處理。"
                           :links="[]"/>
                <ItemQuote title="James"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=James&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="後端"
                           quote="專注網路協定與伺服器安全，<br/>兼具反作弊、流量防禦<br/>與遊戲帳號驗證設計經驗。"
                           :links="[]"/>
                <ItemQuote title="Ian"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Ian&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="後端"
                           quote="專精後端系統開發，<br/>具備豐富的伺服器架構設計<br/>與資料庫優化經驗。"
                           :links="[]"/>
                <ItemQuote title="hank"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=hank&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="遊戲後端"
                           quote="專注遊戲後端開發，<br/>擅長遊戲伺服器架構設計<br/>與效能優化，具備豐富的<br/>遊戲專案經驗。"
                           :links="[]"/>
                <ItemQuote title="Nathan"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Nathan&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="前端"
                           quote="精通 Phaser 框架，<br/>專注遊戲介面設計、<br/>動畫渲染與跨端互動體驗。"
                           :links="[]"/>
                <ItemQuote title="Sam"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="遊戲全端"
                           quote="擅長跨平台遊戲<br/>與高效能系統架構，<br/>精通 Unity3D/Cocos/PixiJS，<br/>具 20+ 年遊戲引擎設計。"
                           :links="[]"/>
                <ItemQuote title="Alex"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="後台前端"
                           quote="專精後台管理系統前端開發，<br/>擅長複雜資料視覺化<br/>與使用者介面優化。"
                           :links="[]"/>
                <ItemQuote title="Raymond"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Raymond&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="數值主管"
                           quote="負責遊戲數值平衡設計<br/>與分析，具備豐富的<br/>遊戲經濟系統與戰鬥數值<br/>調校經驗。"
                           :links="[]"/>
                <ItemQuote title="Vince"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Vince&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="總控主管"
                           quote="負責專案總體控制<br/>與品質管理，統籌開發流程<br/>與時程規劃，確保專案<br/>順利執行。"
                           :links="[]"/>
                <ItemQuote title="Jay"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Jay&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="逆向主管"
                           quote="專精逆向工程與安全分析，<br/>具備豐富的系統分析<br/>與漏洞檢測經驗。"
                           :links="[]"/>
                <ItemQuote title="Amy"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Amy&facialHairProbability=0&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="美術"
                           quote="專精遊戲美術設計，<br/>擅長角色設計、介面視覺<br/>與動畫製作，具備豐富的<br/>遊戲美術經驗。"
                           :links="[]"/>
                <ItemQuote title="Chris"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Chris&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="音樂"
                           quote="專精遊戲音樂與音效設計，<br/>擅長背景音樂創作<br/>與音效製作，為遊戲<br/>營造沉浸式體驗。"
                           :links="[]"/>
                <ItemQuote title="Linking"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Linking&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="測試"
                           quote="擅長手動測試及體感回饋，<br/>流程調控建議。"
                           :links="[]"/>
                <ItemQuote title="May"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=May&facialHairProbability=0&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="測試"
                           quote="擅長手動測試及體感回饋；<br/>18年遊戲測試經驗，<br/>2年博弈測試經驗。"
                           :links="[]"/>
                <ItemQuote title="Penny"
                           image="https://api.dicebear.com/7.x/avataaars/svg?seed=Penny&facialHairProbability=0&eyes=happy&eyebrows=default&mouth=smile&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf"
                           role="測試"
                           quote="專精遊戲測試與品質保證，<br/>擅長功能測試、效能測試<br/>與使用者體驗測試。"
                           :links="[]"/>
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