<template>
    <!-- Main Content -->
    <slot v-if="shouldSlot"/>

    <!-- Modals -->
    <ProjectModal :project="projectModalTarget"
                  @close="_onProjectModalClosed"/>
</template>

<script setup>
import {computed, inject, watch} from "vue"
import {useRouter} from "vue-router"
import ProjectModal from "/src/vue/components/projects/ProjectModal.vue"

const router = useRouter()

const loaderEnabled = inject("loaderEnabled")
const loaderActive = inject("loaderActive")
const loaderPageRefreshCount = inject("loaderPageRefreshCount")
const loaderSmoothTransitionEnabled = inject("loaderSmoothTransitionEnabled")
const projectModalTarget = inject("projectModalTarget")
const LoaderAnimationStatus = inject("LoaderAnimationStatus")
const loaderAnimationStatus = inject("loaderAnimationStatus")

const shouldSlot = computed(() => {
    return !loaderEnabled ||
        loaderAnimationStatus.value === LoaderAnimationStatus.TRACKING_PROGRESS ||
        loaderAnimationStatus.value === LoaderAnimationStatus.LEAVING
})

watch(() => loaderAnimationStatus.value, () => {
    if(loaderAnimationStatus.value === LoaderAnimationStatus.LEAVING) {
        const hash = window.location.hash
        const element = hash ?
            document.querySelector(hash) :
            null

        if(!element || !loaderEnabled) {
            window.scrollTo({top: 0, behavior: "instant"})
            return
        }

        element.scrollIntoView({behavior: "smooth"})
    }
})

router.beforeEach((to, from, next) => {
    if(from.name === to.name || !loaderEnabled) {
        next()
        return
    }

    // Redirect routes carry no props, so props.default is undefined for them.
    const shouldIgnorePreloader = to.matched?.length ?
        !to.matched[0].props?.default?.['shouldAlwaysPreload'] :
        false

    if(shouldIgnorePreloader) {
        next()
        window.scrollTo({top: 0, behavior: "instant"})
        return
    }

    loaderActive.value = true
    const isDifferentRoute = from && to && from.path !== to.path
    const isDifferentRouteName = from && to && from.name !== to.name

    loaderPageRefreshCount.value = isDifferentRouteName ?
        loaderPageRefreshCount.value + 1 :
        loaderPageRefreshCount.value

    loaderSmoothTransitionEnabled.value = isDifferentRoute

    setTimeout(() => {
        next()
    }, 850)
})

router.afterEach((to, from) => {
    const isDifferentRoute = from && to && from.path !== to.path
    if(!isDifferentRoute)
        return

    window.scrollTo({top: 0, behavior: "smooth"})
})

const _onProjectModalClosed = () => {
    projectModalTarget.value = null
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>