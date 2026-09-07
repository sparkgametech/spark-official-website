<template>
    <slot/>
</template>

<script setup>
import {provide, ref} from "vue"

/**
 * Global state FLAGS
 **/
const currentPageSections = ref([])
const projectModalTarget = ref(null)
const spinnerActive = ref(false)
const spinnerMessage = ref("")

/**
 * @param {Boolean} enabled
 * @param {String} [message=""]
 */
const setSpinnerEnabled = (enabled, message) => {
    spinnerActive.value = enabled
    spinnerMessage.value = message
}

provide("currentPageSections", currentPageSections)
provide("projectModalTarget", projectModalTarget)
provide("spinnerActive", spinnerActive)
provide("spinnerMessage", spinnerMessage)

provide("setSpinnerEnabled", setSpinnerEnabled)
</script>

<style lang="scss" scoped>

</style>
