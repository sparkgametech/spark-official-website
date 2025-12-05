<template>
    <!-- Heading Section -->
    <PageHeader :id="props.id"
                title="*Foxy* 首頁"
                subtitle="由 <strong>Ryan Balieiro</strong> 製作的代理商模板 – 使用 <strong>Vue3</strong> 和 <strong>Bootstrap 5</strong> 開發"
                logo-url="images/logo/agency-logo.png"
                :show-button="true"
                button-icon="fa-solid fa-search"
                button-label="了解更多"
                button-url="#about"/>
</template>

<script setup>
import PageHeader from "/src/vue/components/layout/PageHeader.vue"

const props = defineProps({
    id: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>