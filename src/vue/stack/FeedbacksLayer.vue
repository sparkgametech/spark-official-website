<template>
    <ActivitySpinner :visible="Boolean(spinnerActive)"
                     :message="String(spinnerMessage)"/>

    <slot/>
</template>

<script setup>
import {inject} from "vue"
import ActivitySpinner from "/src/vue/components/loaders/ActivitySpinner.vue"

const spinnerActive = inject("spinnerActive")
const spinnerMessage = inject("spinnerMessage")
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>
