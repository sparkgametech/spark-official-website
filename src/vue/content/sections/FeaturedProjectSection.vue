<template>
    <!-- About Section -->
    <PageSection variant="promo"
                 :id="props.id">

        <!-- Content -->
        <PageSectionContent>
            <ArticleCustomContent>
                <!-- Banner -->
                <ProjectInfo image="images/portfolio/project-logo-8.png">
                    <ProjectInfoFeaturedContent title="*Zork* 應用程式"
                                                description="<b>Zork</b> 是您終極的電池壽命管理應用程式，讓您輕鬆掌控裝置的能源消耗。憑藉其直觀的介面，Zork 提供即時的電池狀態監控，讓您能夠識別耗電的應用程式和進程。"
                                                :links="[
                                                   {label: `App Store`, href: `https://apple.com`, faIcon:`fa-brands fa-apple`},
                                                   {label: `Google Play`, href: `https://play.google.com`, faIcon:`fa-brands fa-google-play`},
                                                   {label: `Windows Store`, href: `https://windows.com`, faIcon:`fa-brands fa-windows`},
                                                ]"/>
                </ProjectInfo>
            </ArticleCustomContent>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import ArticleCustomContent from "/src/vue/components/articles/ArticleCustomContent.vue"
import ProjectInfo from "/src/vue/components/projects/ProjectInfo.vue"
import ProjectInfoFeaturedContent from "/src/vue/components/projects/ProjectInfoFeaturedContent.vue"

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>