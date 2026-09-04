<template>
    <div class="lang-switch" ref="root">
        <button type="button"
                class="lang-switch-btn"
                :class="{ 'is-open': open }"
                :aria-label="t('langSwitchLabel')"
                :aria-expanded="open"
                aria-haspopup="listbox"
                @click="open = !open">
            <i class="pi pi-globe"/>
            <span class="lang-switch-current">{{ localeMeta[locale].short }}</span>
            <i class="pi pi-chevron-down lang-switch-caret"/>
        </button>

        <transition name="lang-fade">
            <ul v-if="open" class="lang-switch-menu" role="listbox">
                <li v-for="code in LOCALES" :key="code">
                    <router-link :to="pathForLocale(code)"
                                 role="option"
                                 :aria-selected="code === locale"
                                 :class="{ 'is-active': code === locale }"
                                 @click="open = false">
                        <span>{{ localeMeta[code].label }}</span>
                        <i v-if="code === locale" class="pi pi-check"/>
                    </router-link>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue"
import { useRoute } from "vue-router"
import { useI18n } from "/src/composables/i18n.js"
import { LOCALES, localeMeta } from "/src/data/i18n.js"

const { t, locale, pathForLocale } = useI18n()
const route = useRoute()

const open = ref(false)
const root = ref(null)

const onDocumentClick = (e) => {
    if (root.value && !root.value.contains(e.target)) open.value = false
}
const onKeydown = (e) => {
    if (e.key === 'Escape') open.value = false
}

onMounted(() => {
    document.addEventListener('click', onDocumentClick)
    document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
    document.removeEventListener('click', onDocumentClick)
    document.removeEventListener('keydown', onKeydown)
})

// The navbar persists across navigation, so the menu would otherwise stay open
// when a selection changes the route.
watch(() => route.fullPath, () => { open.value = false })
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.lang-switch {
    position: relative;
}

.lang-switch-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    height: 32px;
    padding: 0 0.6rem;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 6px;
    background: transparent;
    color: $light-4;
    font-size: 0.75rem;
    font-weight: 700;
    font-family: $font-family-base;
    cursor: pointer;
    transition: background-color 0.25s, border-color 0.25s, color 0.25s;

    .pi-globe { font-size: 0.8rem; }

    .lang-switch-caret {
        font-size: 0.6rem;
        opacity: 0.7;
        transition: transform 0.25s ease;
    }

    &:hover,
    &.is-open {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.45);
        color: $white;
    }

    &.is-open .lang-switch-caret {
        transform: rotate(180deg);
    }
}

.lang-switch-menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    z-index: 20;
    min-width: 132px;
    margin: 0;
    padding: 0.3rem;
    list-style: none;
    border-radius: 8px;
    background: $white;
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.22);

    a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        padding: 0.45rem 0.6rem;
        border-radius: 5px;
        color: #444;
        font-size: 0.82rem;
        font-weight: 600;
        text-decoration: none;
        white-space: nowrap;
        transition: background-color 0.2s, color 0.2s;

        &:hover {
            background-color: rgba($primary, 0.1);
            color: $primary;
        }

        &.is-active {
            color: $primary;
        }

        .pi-check { font-size: 0.7rem; }
    }
}

.lang-fade-enter-active,
.lang-fade-leave-active {
    transition: opacity 0.16s ease, transform 0.16s ease;
}

.lang-fade-enter-from,
.lang-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
