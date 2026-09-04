<template>
    <div class="article-carousel">
        <swiper class="article-carousel-swiper"
                :slides-per-view="2"
                :space-between="16"
                :navigation="true"
                :modules="[Navigation]"
                :grab-cursor="true"
                :breakpoints="{
                    0:   { slidesPerView: 1.1 },
                    576: { slidesPerView: 2 },
                    1200: { slidesPerView: 3 }
                }">
            <swiper-slide v-for="post in posts" :key="post.slug">
                <ArticleCard :post="post" :show-category="showCategory"/>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import ArticleCard from "/src/vue/components/articles/ArticleCard.vue"

defineProps({
    posts: { type: Array, required: true },
    showCategory: { type: Boolean, default: false }
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.article-carousel {
    // Arrows sit outside the track on wide screens, so the track needs room for them.
    padding: 0 2.75rem;
    position: relative;

    @include media-breakpoint-down(md) {
        padding: 0;
    }
}

.article-carousel-swiper {
    --swiper-navigation-size: 18px;
    padding-bottom: 4px;

    :deep(.swiper-slide) {
        height: auto;
        display: flex;
    }

    :deep(.swiper-slide > *) {
        width: 100%;
    }

    :deep(.swiper-button-prev),
    :deep(.swiper-button-next) {
        width: 34px;
        height: 34px;
        margin-top: -17px;
        border-radius: 50%;
        background: white;
        color: $primary;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.14);
        transition: background 0.2s, color 0.2s;

        &:hover {
            background: $primary;
            color: white;
        }

        &.swiper-button-disabled {
            opacity: 0;
            pointer-events: none;
        }

        &::after {
            font-size: var(--swiper-navigation-size);
            font-weight: 700;
        }
    }

    :deep(.swiper-button-prev) { left: -2.75rem; }
    :deep(.swiper-button-next) { right: -2.75rem; }

    @include media-breakpoint-down(md) {
        :deep(.swiper-button-prev),
        :deep(.swiper-button-next) {
            display: none;
        }
    }
}
</style>
