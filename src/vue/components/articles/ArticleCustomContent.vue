<template>
    <article ref="root"
             class="foxy-custom-content-article"
             :class="props.class"
             @click="onClick">
        <slot/>
    </article>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { useRouter } from "vue-router"
import { applySentenceBreaks } from "/src/composables/sentenceBreaks.js"

const props = defineProps({
    class: String
})

const router = useRouter()
const root = ref(null)
let observer = null

/**
 * Article bodies link to each other with plain <a href>, not <router-link>.
 * The prerenderer lifts the template into the static HTML, and a router-link
 * would land there with no href at all — a crawler could not follow it, which
 * is the entire point of these links. A real anchor is crawlable and works
 * without JavaScript; this handler keeps it from reloading the whole app.
 */
const onClick = (event) => {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const anchor = event.target.closest?.('a[href]')
    if (!anchor || anchor.target === '_blank') return

    const href = anchor.getAttribute('href')
    if (!href?.startsWith('/')) return

    event.preventDefault()
    router.push(href)
}

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
