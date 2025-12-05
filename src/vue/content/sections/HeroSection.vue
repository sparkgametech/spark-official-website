<template>
    <!-- Heading Section -->
    <PageHeader :id="props.id"
                title="*Spark* 星火創盛"
                subtitle="點燃星火，創盛未來 – 專注於遊戲與系統開發的專業團隊"
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