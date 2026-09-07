<template>
    <!-- Main Content -->
    <slot/>

    <!-- Modals -->
    <ProjectModal :project="projectModalTarget"
                  @close="_onProjectModalClosed"/>
</template>

<script setup>
import {inject, nextTick} from "vue"
import {useRouter} from "vue-router"
import ProjectModal from "/src/vue/components/projects/ProjectModal.vue"

const router = useRouter()

const projectModalTarget = inject("projectModalTarget")

// The preloader used to gate this: navigation waited on it, and the viewport
// was moved once it left. With it gone a route change only has to reposition
// the viewport, on the tick after the new page has rendered.
router.afterEach((to, from) => {
    if (from && to && from.path === to.path)
        return

    nextTick(() => {
        const element = to.hash ? document.querySelector(to.hash) : null
        if (element) {
            element.scrollIntoView({behavior: "smooth"})
            return
        }

        window.scrollTo({top: 0, behavior: "instant"})
    })
})

const _onProjectModalClosed = () => {
    projectModalTarget.value = null
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>
