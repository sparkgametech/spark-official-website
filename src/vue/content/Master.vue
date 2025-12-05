<template>
    <!-- Navigation -->
    <Navigation logo="images/logo/agency-logo-small.png"
                label="*Foxy* 模板"/>

    <!-- Content Display -->
    <router-view/>

    <!-- Footer -->
    <Footer>
        <FooterBlock :darken="false"
                     :row="true">
            <FooterColumn title="關於"
                          faIcon="pi pi-lightbulb me-2"
                          :description="[
                              `此模板由 Ryan Balieiro 維護，基於 <a href='https://vuejs.org/'>Vue</a> 框架和 <a href='https://getbootstrap.com/'>Bootstrap</a> 框架開發。`
                          ]"
                          :links="[
                              {label: `隱私政策`, href: `/privacy-policy`, faIcon: null},
                              {label: `授權`, href: `/license`, faIcon: null},
                              {label: `Github 儲存庫`, href: `https://github.com/ryanbalieiro/vue-agency-landing-page-template`, faIcon: null},
                          ]"
                          :displayLinksAsButtons="false"/>

            <FooterColumn title="與我們聯繫"
                          faIcon=""
                          :description="[
                          ]"
                          :links="[
                              {label: `Linkedin`, href: `https://linkedin.com`, faIcon:`fa-brands fa-linkedin`},
                              {label: `Twitter`, href: `https://x.com`, faIcon:`fa-brands fa-x-twitter`},
                              {label: `TikTok`, href: `https://tiktok.com`, faIcon:`fa-brands fa-tiktok`},
                              {label: `Spotify`, href: `https://spotify.com`, faIcon:`fa-brands fa-spotify`},
                          ]"
                          :displayLinksAsButtons="true"/>

            <FooterColumn title="聯絡資訊"
                          faIcon="pi pi-envelope me-2 pe-1"
                          :description="[
                              `999 Vue 開發者大道，4A 套房 32`,
                              `庫比蒂諾 – 加州 01235`
                          ]"
                          :links="[
                              {label: `(555) 555-1234`, href: `tel:123456789`, faIcon: 'pi pi-phone'},
                              {label: `contact@foxyagency.com`, href: `mailto:foxy@agency.com`, faIcon: 'fa-regular fa-envelope'},
                          ]"
                          :displayLinksAsButtons="false"/>
        </FooterBlock>

        <FooterBlock :darken="true"
                     :row="false">
            <FooterCopyright holder="Ryan Balieiro"
                             url="https://github.com/ryanbalieiro"
                             license="採用 MIT 授權條款發布"/>
        </FooterBlock>
    </Footer>
</template>

<script setup>
import Navigation from "/src/vue/components/nav/Navigation.vue"
import Footer from "/src/vue/components/footer/Footer.vue"
import FooterBlock from "/src/vue/components/footer/FooterBlock.vue"
import FooterCopyright from "/src/vue/components/footer/FooterCopyright.vue"
import FooterColumn from "/src/vue/components/footer/FooterColumn.vue"
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>