<template>
    <PageWrapper id="foxy-home-page"
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
    new SectionInfo('about',        AboutSection,           'About',        'pi pi-box'),
    new SectionInfo('services',     ServicesSection,        'Services',     'pi pi-wrench'),
    new SectionInfo('history',      HistorySection,         'History',      'pi pi-clock'),
    new SectionInfo('featured',     FeaturedProjectSection, 'Zork',         'pi pi-qrcode'),
    new SectionInfo('portfolio',    PortfolioSection,       'Portfolio',    'pi pi-folder-open'),
    new SectionInfo('team',         TeamSection,            'Team',         'pi pi-users'),
    new SectionInfo('faq',          FaqSection,             'Q&A',          'pi pi-question-circle'),
    new SectionInfo('reviews',      ReviewsSection,         'Reviews',      'fa-regular fa-comment'),
    new SectionInfo('contact',      ContactSection,         'Contact',      'fa-regular fa-envelope')
]
</script>

<style lang="scss" scoped>
</style>