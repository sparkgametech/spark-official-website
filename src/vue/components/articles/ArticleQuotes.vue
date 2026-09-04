<template>
    <article class="foxy-quotes">
        <swiper
            class="foxy-quotes-swiper px-1"
            :slidesPerView="3"
            :spaceBetween="20"
            :pagination="{clickable: true}"
            :navigation="true"
            :modules="[Pagination, Navigation]"
            :grab-cursor="true"
            :prevent-clicks-propagation="true"
            :breakpoints = "{
                0:   {slidesPerView: 1},
                768: {slidesPerView: 2},
                992: {slidesPerView: 3}
            }">

            <swiper-slide v-for="(slide, index) in slides"
                          :key="index">
                <component :is="slide" />
            </swiper-slide>
        </swiper>
    </article>
</template>

<script setup>
import { Fragment, computed, useSlots } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'

const slots = useSlots()

// A `v-for` in the slot arrives as one Fragment holding every item, which would
// collapse the whole list into a single slide. Flattening fragments keeps one
// slide per item whether the caller writes the children out or loops over data.
const flatten = (nodes) => nodes.flatMap(node =>
    node.type === Fragment && Array.isArray(node.children)
        ? flatten(node.children)
        : [node])

const slides = computed(() => slots.default ? flatten(slots.default()) : [])
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.swiper {
    height: 100%;

    .swiper-slide {
        margin-bottom: 60px;
        height: auto !important;
        text-align: center;
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
            font-size: 16px;
            font-weight: 700;
        }
    }
}
</style>
