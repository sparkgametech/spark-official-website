<template>
    <figure class="diagram-figure">
        <div class="diagram-figure-canvas">
            <slot/>
        </div>
        <figcaption v-if="caption">{{ caption }}</figcaption>
    </figure>
</template>

<script setup>
/**
 * Wrapper for the hand-drawn SVG concept diagrams in articles.
 *
 * The drawings are authored inline in the article templates rather than
 * shipped as images: they land in the prerendered HTML, their labels are
 * indexable text, and they follow the light/dark theme through currentColor
 * without needing a second asset.
 */
defineProps({
    caption: String
})
</script>

<style lang="scss" scoped>
.diagram-figure {
    margin: 1.75rem 0;

    // Two sets of the same three hues. The plain tokens fill shapes and always
    // carry white text; the -ink tokens are for coloured labels sitting on the
    // page itself, which need to be darker on a light page and lighter on a
    // dark one to stay above 4.5:1. The dark values live in _dark.scss.
    --dg-1: #c44200;
    --dg-2: #3b5bdb;
    --dg-3: #087f5b;
    --dg-1-ink: #a13600;
    --dg-2-ink: #2f4bc4;
    --dg-3-ink: #066347;
}

// Narrow screens scroll the drawing rather than shrinking its labels below
// a readable size.
.diagram-figure-canvas {
    overflow-x: auto;

    // Capped at roughly the authored viewBox width. Left to fill the article
    // column the cells blow up to ~80px and the drawing overpowers the prose
    // it is illustrating.
    :deep(svg) {
        display: block;
        width: 100%;
        max-width: 620px;
        min-width: 460px;
        height: auto;
        margin: 0 auto;
    }

    // Labels outside the filled cells follow the body text colour, so the
    // drawing needs no dark-theme variant of its own.
    :deep(svg text) {
        font-family: inherit;
    }
}

figcaption {
    margin-top: 0.6rem;
    font-size: 0.85rem;
    line-height: 1.6;
    text-align: center;
    color: #6c757d;
}
</style>
