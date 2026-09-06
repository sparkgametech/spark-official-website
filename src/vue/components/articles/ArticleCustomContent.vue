<template>
    <article ref="root"
             class="foxy-custom-content-article"
             :class="props.class">
        <slot/>
    </article>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { applySentenceBreaks } from "/src/composables/sentenceBreaks.js"

const props = defineProps({
    class: String
})

const root = ref(null)
let observer = null

// The body is an async component rendered into this slot, and the slot's owner
// is BlogPostSection — so this component's own onUpdated never fires when the
// text finally arrives. Watching the subtree catches it whenever it lands.
onMounted(() => {
    applySentenceBreaks(root.value)
    observer = new MutationObserver(() => applySentenceBreaks(root.value))
    observer.observe(root.value, { childList: true, subtree: true })
})

onUnmounted(() => observer?.disconnect())
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

article.foxy-custom-content-article {
    @include generate-dynamic-styles-with-hash((
        xxxl: (padding: 2rem 0),
        lg:   (padding: 1rem 0),
        md:   (padding: 0.5rem 0)
    ));

    display: flex;
}
</style>
