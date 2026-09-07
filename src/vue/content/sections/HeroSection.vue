<template>
    <header :id="props.id" class="spark-hero">
        <div class="spark-hero-inner container-xxl">
            <h1 class="spark-hero-title">
                {{ t('heroTitleLead') }} <span>{{ t('heroTitleRest') }}</span>
            </h1>
            <p class="spark-hero-sub">{{ t('heroSubtitle') }}</p>

            <!-- v-show, not v-if: collapsing must leave the copy in the DOM so
                 crawlers still read it. -->
            <div v-show="introOpen" class="spark-hero-intro">
                <p v-for="(line, i) in t('homeIntro')" :key="i">{{ line }}</p>
                <p class="spark-hero-offer">{{ t('homeIntroOutsourcing') }}</p>
                <!-- Kept on one line: the locale string owns any space before the link. -->
                <p>{{ t('homeIntroCompanyLead') }}<router-link :to="localePath('/about')">{{ t('homeIntroAboutLink') }}</router-link>{{ t('homeIntroEnd') }}</p>
            </div>

            <button type="button"
                    class="spark-hero-intro-toggle"
                    :aria-expanded="introOpen"
                    @click="toggleIntro">
                <span>{{ introOpen ? t('introCollapse') : t('introExpand') }}</span>
                <i class="pi" :class="introOpen ? 'pi-chevron-up' : 'pi-chevron-down'"/>
            </button>
        </div>

        <img class="spark-hero-cat"
             :class="{ 'is-playing': catPlaying }"
             src="/images/logo/agency-logo.png"
             alt=""
             aria-hidden="true"/>
    </header>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useI18n } from "/src/composables/i18n.js"

const props = defineProps({
    id: String
})

const { t, localePath } = useI18n()

// Expanded by default. This block carries the only plain statement of what the
// team actually sells, and leaving it collapsed put those words in a
// display:none element while the article list made up most of the visible page.
// A visitor who collapses it still gets their choice remembered.
const STORAGE_KEY = 'spark-intro-open'
const introOpen = ref(true)

onMounted(() => {
    try {
        if (localStorage.getItem(STORAGE_KEY) === 'false') introOpen.value = false
    } catch (e) {
        // Blocked site data just means the preference will not persist.
    }
})

// The cat starts and ends off-screen, so the run has to begin when the hero is
// actually on screen or there is nothing to see. Nothing covers the page any
// more, so mounting is that moment.
const catPlaying = ref(false)

onMounted(() => {
    catPlaying.value = true
})

const toggleIntro = () => {
    introOpen.value = !introOpen.value
    try {
        localStorage.setItem(STORAGE_KEY, String(introOpen.value))
    } catch (e) {
        // ignore
    }
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.spark-hero {
    position: relative;
    overflow: hidden;
    background-color: $nav-background-color;
    padding: 6.5rem 1rem 3.25rem;

    @include media-breakpoint-down(md) {
        padding: 5.5rem 1rem 2.75rem;
    }
}

.spark-hero-inner {
    position: relative;
    z-index: 1;
    text-align: center;
}

.spark-hero-title {
    color: $white;
    font-weight: 700;
    line-height: 1.35;
    margin: 0 0 0.6rem;
    font-size: clamp(1.35rem, 3.4vw, 2.25rem);

    span {
        color: $primary;
        white-space: nowrap;
    }
}

.spark-hero-sub {
    color: $light-5;
    font-family: $font-family-base;
    font-size: clamp(0.85rem, 1.6vw, 1rem);
    margin: 0;
}

// The positioning copy lives here rather than above the article grid so the
// light section below is nothing but articles.
.spark-hero-intro {
    max-width: 660px;
    margin: 1.5rem auto 0;
    color: $light-6;
    font-family: $font-family-base;
    font-size: clamp(0.78rem, 1.35vw, 0.88rem);
    line-height: 1.8;

    // A global `p { color: black }` in typography beats the inherited colour,
    // so the paragraphs have to be coloured directly — inheriting from the
    // wrapper silently produced black text on the dark hero.
    // $light-6 only reaches 3.29:1 on the hero's dark ground; this clears the
    // 4.5:1 minimum while staying dimmer than the subtitle above it.
    p {
        margin: 0;
        color: #98a1aa;
    }

    .spark-hero-offer {
        margin-top: 0.85rem;
    }

    a {
        color: $primary;
        font-weight: 600;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}

.spark-hero-intro-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 1rem;
    padding: 0.3rem 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 20px;
    background: transparent;
    color: #98a1aa;
    font-family: $font-family-base;
    font-size: 0.72rem;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;

    i {
        font-size: 0.6rem;
    }

    &:hover {
        color: $light-4;
        border-color: rgba(255, 255, 255, 0.4);
    }
}

// Sits on the hero's bottom edge, below the text, so the dash across never
// covers the heading. Absolute so the exit leaves no gap behind it.
.spark-hero-cat {
    position: absolute;
    left: 6%;
    bottom: 0;
    width: 84px;
    height: 84px;
    // Pivot at the feet so the head tilts rather than the whole body sliding.
    transform-origin: 50% 100%;
    // Parked off-screen until the hero mounts, so the entrance is seen.
    transform: translateX(-300%);

    &.is-playing {
        animation: spark-cat-peek 3s ease-in-out 0.5s forwards;
    }

    @include media-breakpoint-down(md) {
        width: 62px;
        height: 62px;
        left: 4%;
    }
}

// Pokes out from behind the left edge, has a look around, then backs off the
// same way. No fade needed — the hero's overflow clips it out of sight, which
// reads as hiding rather than vanishing.
@keyframes spark-cat-peek {
    0%      { transform: translateX(-300%) rotate(0deg); }
    16%     { transform: translateX(8%) rotate(0deg); }     // slight overshoot
    24%     { transform: translateX(0) rotate(0deg); }
    36%     { transform: translateX(0) rotate(-9deg); }     // tilts to look
    50%     { transform: translateX(0) rotate(0deg); }
    60%     { transform: translateX(0) rotate(6deg); }      // and once the other way
    72%     { transform: translateX(0) rotate(0deg); }
    100%    { transform: translateX(-300%) rotate(0deg); }
}

@media (prefers-reduced-motion: reduce) {
    .spark-hero-cat {
        animation: none;
    }
}
</style>
