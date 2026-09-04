<template>
    <nav v-if="trail.length" class="breadcrumbs">
        <ul class="breadcrumbs-link-list">
            <li v-for="item in trail"
                :key="item.path"
                class="breadcrumb-link-item text-4">
                <router-link :to="localePath(item.path)">
                    <i v-if="item.path === '/'" class="me-1 fa-solid fa-home"/>
                    <template v-else>{{ t(item.labelKey) }}</template>
                </router-link>
            </li>

            <li class="breadcrumb-link-item text-4">
                {{ currentRouteLabel }}
            </li>
        </ul>
    </nav>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router"
import {computed} from "vue"
import {useI18n} from "/src/composables/i18n.js"

const route = useRoute()
const router = useRouter()
const {t, localePath} = useI18n()

const currentRoute = computed(() =>
    router.getRoutes().find(r => r.name === route.name))

// Each route declares its own trail as {path, labelKey} entries. Matching by
// route path was fragile once the locale param entered the path pattern, and
// silently produced an empty trail.
const trail = computed(() => currentRoute.value?.props?.default?.breadcrumbs ?? [])

const currentRouteLabel = computed(() => {
    const key = currentRoute.value?.props?.default?.labelKey
    return key ? t(key) : currentRoute.value?.props?.default?.label
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

ul.breadcrumbs-link-list {
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;

    @include media-breakpoint-down(md) {
        justify-content: center;
    }
}

li.breadcrumb-link-item {
    margin-right: 0.3rem;

    color: $light-6;
    &:not(:last-child)::after {
        content: "›";
        color: $light-6;
        margin-left: 0.2rem;
    }
}
</style>
