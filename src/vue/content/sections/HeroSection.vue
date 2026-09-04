<template>
    <header :id="props.id" class="spark-hero">
        <div class="spark-hero-inner container-xxl">
            <h1 class="spark-hero-title">
                {{ t('heroTitleLead') }} <span>{{ t('heroTitleRest') }}</span>
            </h1>
            <p class="spark-hero-sub">{{ t('heroSubtitle') }}</p>
        </div>

        <img class="spark-hero-cat"
             src="/images/logo/agency-logo.png"
             alt=""
             aria-hidden="true"/>
    </header>
</template>

<script setup>
import { useI18n } from "/src/composables/i18n.js"

const props = defineProps({
    id: String
})

const { t } = useI18n()
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

// Sits on the hero's bottom edge, below the text, so the dash across never
// covers the heading. Absolute so the exit leaves no gap behind it.
.spark-hero-cat {
    position: absolute;
    left: 6%;
    bottom: 0;
    width: 84px;
    height: 84px;
    transform-origin: 50% 100%;
    animation: spark-cat-hop-run 2.9s ease-in-out 0.7s forwards;

    @include media-breakpoint-down(md) {
        width: 62px;
        height: 62px;
        left: 4%;
    }
}

@keyframes spark-cat-hop-run {
    0%,  10% { transform: translate(0, 0) scale(1, 1); }
    16%      { transform: translate(0, 0) scale(1.08, 0.88); }   // crouch
    28%      { transform: translate(2vw, -46px) scale(0.94, 1.1); } // launch
    38%      { transform: translate(4vw, 0) scale(1.1, 0.86); }  // land
    44%      { transform: translate(5vw, 0) scale(1, 1); }
    58%      { transform: translate(26vw, -9px) scale(1, 1); }
    72%      { transform: translate(52vw, 0) scale(1, 1); }
    86%      { transform: translate(80vw, -9px) scale(1, 1); }
    // Hold full opacity until it is already off-screen; without this stop the
    // browser interpolates opacity from 0% and the cat fades while it jumps.
    92%      { opacity: 1; }
    100%     { transform: translate(115vw, 0) scale(1, 1); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
    .spark-hero-cat {
        animation: none;
    }
}
</style>
