<template>
    <!-- Navigation -->
    <Navigation logo="images/logo/agency-logo-small.png"
                label="*Spark* 星火創盛"/>

    <!-- Content Display -->
    <router-view/>

    <!-- Footer -->
    <Footer>
        <FooterBlock :darken="false"
                     :row="true">
            <FooterColumn title="關於"
                          faIcon="pi pi-lightbulb me-2"
                          :description="[
                              `Spark 星火創盛致力於提供創新的遊戲與軟體解決方案，專注於遊戲開發、網站建置及各類軟體開發。`
                          ]"
                          :links="[
                              {label: `隱私政策`, href: `/privacy-policy`, faIcon: null},
                              {label: `授權`, href: `/license`, faIcon: null},
                          ]"
                          :displayLinksAsButtons="false"/>

            <FooterColumn title="聯絡資訊"
                          faIcon="pi pi-envelope me-2 pe-1"
                          :description="[
                          ]"
                          :links="[
                              {label: `sparkgametech@gmail.com`, href: `mailto:sparkgametech@gmail.com`, faIcon: 'fa-regular fa-envelope'},
                          ]"
                          :displayLinksAsButtons="false"/>
        </FooterBlock>

        <FooterBlock :darken="true"
                     :row="false">
            <FooterCopyright holder="Spark 星火創盛"
                             url="#"
                             license="© 2025 Spark 星火創盛 All rights reserved."/>
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