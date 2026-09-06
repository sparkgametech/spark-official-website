<template>
    <nav class="foxy-navbar"
         :class="shouldExpand ? `foxy-navbar-expanded` : `foxy-navbar-compressed`">
        <div class="foxy-navbar-container container-xxl">
            <Link :url="brandUrl">
                <NavbarBrand :logo="brandLogo"
                             :label="brandLabel"
                             :expand="shouldExpand"/>
            </Link>

            <div class="foxy-navbar-right">
                <Link v-for="btn in props.ctaButtons" :key="btn.label" :url="btn.path">
                    <button class="foxy-nav-cta">
                        <i v-if="btn.faIcon" :class="btn.faIcon"/>
                        <span class="foxy-nav-cta-label">{{ btn.label }}</span>
                    </button>
                </Link>

                <ThemeToggle/>
                <LanguageSwitcher/>
            </div>
        </div>
    </nav>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue"
import Link from "/src/vue/components/generic/Link.vue"
import NavbarBrand from "/src/vue/components/nav/navbar/NavbarBrand.vue"
import LanguageSwitcher from "/src/vue/components/nav/navbar/LanguageSwitcher.vue"
import ThemeToggle from "/src/vue/components/nav/navbar/ThemeToggle.vue"
import {useUtils} from "/src/composables/utils.js"

const utils = useUtils()

const props = defineProps({
    brandLogo: String,
    brandLabel: String,
    brandUrl: String,
    ctaButtons: { type: Array, default: () => [] },
    expandable: Boolean
})

const shouldExpand = ref(false)

onMounted(() => {
    window.addEventListener('scroll', _onWindowEvent)
    window.addEventListener('resize', _onWindowEvent)
    _onWindowEvent()
})

onUnmounted(() => {
    window.removeEventListener('scroll', _onWindowEvent)
    window.removeEventListener('resize', _onWindowEvent)
})

const _onWindowEvent = () => {
    shouldExpand.value = props.expandable && window.scrollY === 0 && window.innerWidth >= utils.BOOTSTRAP_BREAKPOINTS.lg
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

nav.foxy-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: $navbar-height;
    z-index: 10;
    background-color: $nav-background-color;
    transition: 0.3s ease-in-out padding;

    @include media-breakpoint-down(lg) {
        transition: none;
    }

    @media (max-height: 400px) {
        min-height: calc($navbar-height - 20px);
    }
}

nav.foxy-navbar-expanded {
    @include media-breakpoint-up(lg) {
        background-color: rgba(black, 0.01);
        padding: 15px 0;
    }
    @include media-breakpoint-up(xl) {
        padding: 15px;
    }
}

div.foxy-navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: $navbar-height;
    height: 100%;

    @media (max-height: 400px) {
        min-height: calc($navbar-height - 20px);
    }
}

.foxy-navbar-right {
    display: flex;
    align-items: center;
    gap: 10px;

    @include media-breakpoint-down(lg) {
        position: absolute;
        top: 0;
        right: 25px;
        height: $navbar-height;
    }
}

button.foxy-nav-cta {
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 6px 14px;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: $font-family-base;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;

    &:hover {
        background-color: darken($primary, 8%);
        transform: translateY(-1px);
    }

    i {
        font-size: 0.75rem;
    }

    @include media-breakpoint-down(sm) {
        .foxy-nav-cta-label {
            display: none;
        }
        padding: 6px 10px;

        i {
            font-size: 0.85rem;
        }
    }
}
</style>