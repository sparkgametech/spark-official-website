<template>
    <PageWrapper id="spark-home-page"
                 :no-padding="true"
                 :sections="sections"/>
</template>

<script setup>
import PageWrapper from "/src/vue/components/layout/PageWrapper.vue"
import SectionInfo from "/src/models/SectionInfo.js"
import AboutSection from "/src/vue/content/sections/AboutSection.vue"
import ContactSection from "/src/vue/content/sections/ContactSection.vue"
import FaqSection from "/src/vue/content/sections/FaqSection.vue"
import FeaturedProjectSection from "/src/vue/content/sections/FeaturedProjectSection.vue"
import HeroSection from "/src/vue/content/sections/HeroSection.vue"
import HistorySection from "/src/vue/content/sections/HistorySection.vue"
import PortfolioSection from "/src/vue/content/sections/PortfolioSection.vue"
import ReviewsSection from "/src/vue/content/sections/ReviewsSection.vue"
import ServicesSection from "/src/vue/content/sections/ServicesSection.vue"
import TeamSection from "/src/vue/content/sections/TeamSection.vue"

const sections = [
    new SectionInfo('hero',         HeroSection,            null,           null),
    new SectionInfo('about',        AboutSection,           '關於我們',        'pi pi-box'),
    new SectionInfo('services',     ServicesSection,        '服務項目',     'pi pi-wrench'),
    // new SectionInfo('history',      HistorySection,         '歷史',      'pi pi-clock'),
    // new SectionInfo('featured',     FeaturedProjectSection, 'Zork',         'pi pi-qrcode'),
    // new SectionInfo('portfolio',    PortfolioSection,       '作品集',    'pi pi-folder-open'),
    new SectionInfo('team',         TeamSection,            '開發團隊',         'pi pi-users'),
    // new SectionInfo('faq',          FaqSection,             '常見問題',          'pi pi-question-circle'),
    // new SectionInfo('reviews',      ReviewsSection,         '客戶評價',      'fa-regular fa-comment'),
    new SectionInfo('contact',      ContactSection,         '聯絡我們',      'fa-regular fa-envelope')
]
</script>

<style lang="scss" scoped>
</style>