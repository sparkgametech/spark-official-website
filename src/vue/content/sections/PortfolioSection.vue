<template>
    <!-- About Section -->
    <PageSection variant="default"
                 :id="props.id">
        <!-- Title -->
        <PageSectionHeader title="我們的 *作品集*"
                           subtitle="了解我們精彩的專案！"/>

        <!-- Content -->
        <PageSectionContent>
            <ArticleProjectGrid>
                <ItemProjectGrid title="SmartCash"
                                 category="工具"
                                 :description="`<b>SmartCash</b> 是您個人理財的智能伴侶，讓您輕鬆掌控您的金錢。憑藉其用戶友好的介面，SmartCash 提供即時的支出和收入追蹤，讓您能夠識別消費模式並做出明智的財務決策。透過 SmartCash 提供的個人化建議來管理預算，在不影響生活方式的情況下省錢並實現您的財務目標。`"
                                 image="images/portfolio/project-logo-1.png"
                                 :tags="['app', 'finance', 'money', 'budget']"
                                 :links="[
                                    { faIcon: 'fa-brands fa-apple', href: 'https://apple.com' },
                                    { faIcon: 'fa-brands fa-google-play', href: 'https://googleplay.com' },
                                    { faIcon: 'fa-brands fa-windows', href: 'https://windows.com' }
                                 ]"
                />

                <ItemProjectGrid title="Snappy"
                                 category="工具"
                                 :description="`<b>Snappy</b> 是您終極的攝影應用程式，讓您輕鬆捕捉和編輯令人驚艷的影像。憑藉其直觀的介面，Snappy 提供廣泛的強大工具和濾鏡來增強您的照片並展現您的創意。無論您是專業攝影師還是業餘愛好者，Snappy 都提供手動控制、進階編輯選項和 AI 驅動的增強功能，將您的攝影提升到新的水平。`"
                                 image="images/portfolio/project-logo-2.png"
                                 :tags="['app', 'photography', 'camera']"
                                 :links="[
                                    { faIcon: 'fa-brands fa-apple', href: 'https://apple.com' },
                                    { faIcon: 'fa-brands fa-google-play', href: 'https://googleplay.com' }
                                 ]"
                />

                <ItemProjectGrid title="BrainPulse"
                                 category="工具"
                                 :description="`<b>BrainPulse</b> 是您終極的大腦訓練應用程式，讓您輕鬆提升認知能力。憑藉其引人入勝的介面，BrainPulse 提供各種刺激性的遊戲和練習，旨在增強記憶、注意力、解決問題能力等。追蹤您的進度，並透過針對您的特定需求和目標量身定制的個人化訓練計劃來挑戰自己，達到新的心理高度。`"
                                 image="images/portfolio/project-logo-3.png"
                                 :tags="['app', 'brain', 'training']"
                                 :links="[
                                    { faIcon: 'fa-brands fa-apple', href: 'https://apple.com' },
                                    { faIcon: 'fa-brands fa-google-play', href: 'https://googleplay.com' },
                                    { faIcon: 'fa-brands fa-windows', href: 'https://windows.com' }
                                 ]"
                />

                <ItemProjectGrid title="Stackers"
                                 category="生產力"
                                 :description="`<b>Stackers</b> 是您終極的生產力應用程式，讓您輕鬆保持組織和專注。憑藉其直觀且簡化的介面，Stackers 提供各種工具來幫助您有效管理任務、筆記和專案。創建待辦事項清單、設定提醒，並與團隊成員協作以無縫實現您的目標。使用 Stackers 作為您可靠的生產力伴侶來掌控您的時間並提升您的生產力。`"
                                 image="images/portfolio/project-logo-6.png"
                                 :tags="['app', 'productivity', 'organization', 'tasks']"
                                 :links="[
                                    { faIcon: 'fa-brands fa-apple', href: 'https://apple.com' },
                                    { faIcon: 'fa-brands fa-google-play', href: 'https://googleplay.com' },
                                    { faIcon: 'fa-brands fa-windows', href: 'https://windows.com' },
                                    { faIcon: 'fa-brands fa-amazon', href: 'https://amazon.com' }
                                 ]"
                />

                <ItemProjectGrid title="LiveScore Pro"
                                 category="工具"
                                 :description="`使用 <b>LiveScore Pro</b> 領先比賽！獲取來自全球聯賽的即時足球比分、進球更新和比賽結果。絕不錯過任何精彩時刻！`"
                                 image="images/portfolio/project-logo-4.png"
                                 :tags="['soccer', 'scores', 'sports', 'results']"
                                 :links="[
                                    { faIcon: 'fa-brands fa-apple', href: 'https://apple.com' },
                                    { faIcon: 'fa-brands fa-google-play', href: 'https://googleplay.com' },
                                    { faIcon: 'fa-brands fa-windows', href: 'https://windows.com' }
                                 ]"
                />

                <ItemProjectGrid title="Sweet Scoops"
                                 category="社交"
                                 :description="`<b>Sweet Scoops</b> 是您探索冰淇淋世界的愉快伴侶。憑藉其令人垂涎的介面，SweetScoops 提供廣泛的冰淇淋口味、食譜和獨特組合來挑逗您的味蕾。無論您是冰淇淋愛好者還是鑑賞家，SweetScoops 都讓您能夠發現新口味、找到附近的冰淇淋店，甚至創建您個人化的冰淇淋傑作。`"
                                 image="images/portfolio/project-logo-5.png"
                                 :tags="['app', 'food', 'ice cream', 'dessert']"
                                 :links="[
                                    { faIcon: 'fa-brands fa-apple', href: 'https://apple.com' },
                                    { faIcon: 'fa-brands fa-google-play', href: 'https://googleplay.com' },
                                    { faIcon: 'fa-brands fa-windows', href: 'https://windows.com' }
                                 ]"
                />

                <ItemProjectGrid title="MailM8"
                                 category="生產力"
                                 :description="`<b>MailM8</b> 是您可靠的郵件應用程式，讓您高效管理您的電子郵件。憑藉其時尚且用戶友好的介面，MailM8 提供直觀組織、智能篩選器以及與其他生產力工具的無縫整合等功能。掌控您的收件匣，輕鬆起草電子郵件，並使用 MailM8 作為您值得信賴的電子郵件伴侶來提升您的生產力。`"
                                 image="images/portfolio/project-logo-7.png"
                                 :tags="['app', 'mail', 'email', 'productivity']"
                                 :links="[
                                    { faIcon: 'fa-brands fa-apple', href: 'https://apple.com' },
                                    { faIcon: 'fa-brands fa-google-play', href: 'https://googleplay.com' },
                                    { faIcon: 'fa-brands fa-windows', href: 'https://windows.com' },
                                    { faIcon: 'fa-brands fa-chrome', href: 'https://chrome.com' }
                                 ]"
                />

                <ItemProjectGrid title="RockVerse"
                                 category="社交"
                                 :description="`<b>RockVerse</b> 是您通往迷人搖滾世界的門戶，讓您輕鬆沉浸在搖滾的精髓中。憑藉其動態且沉浸式的介面，RockVerse 提供廣泛的標誌性搖滾歌曲、傳奇專輯和迷人的搖滾藝術家庫。發掘稀有影片，深入了解搖滾歷史，並體驗您最喜愛樂隊的令人驚嘆的現場表演。與充滿活力的搖滾愛好者社群聯繫，分享您的播放清單，並與 RockVerse 一起踏上傳奇的音樂之旅，作為您終極的搖滾音樂天堂。`"
                                 image="images/portfolio/project-logo-9.png"
                                 :tags="['app', 'rock', 'music', 'bands']"
                                 :links="[
                                    { faIcon: 'fa-brands fa-apple', href: 'https://apple.com' },
                                    { faIcon: 'fa-brands fa-google-play', href: 'https://googleplay.com' }
                                 ]"
                />
            </ArticleProjectGrid>
        </PageSectionContent>

        <!-- Footer -->
        <PageSectionFooter title="與我們合作並 *省錢！*"
                           description="想要專案預算報價嗎？聯繫我們，我們會立即提供您需要的資訊。我們的團隊隨時準備以任何可能的方式協助您！"
                           :include-divider="true"
                           button-label="聯絡我們！"
                           button-fa-icon="fa-solid fa-message"
                           button-url="#contact"/>
    </PageSection>
</template>

<script setup>
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import PageSectionFooter from "/src/vue/components/layout/PageSectionFooter.vue"
import ArticleProjectGrid from "/src/vue/components/articles/ArticleProjectGrid.vue"
import ItemProjectGrid from "/src/vue/components/articles/items/ItemProjectGrid.vue"

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>