<template>
    <PageSection variant="default" :id="props.id">
        <PageSectionContent>
            <div class="tab-bar" role="tablist">
                <a v-for="tab in tabs"
                   :key="tab.slug"
                   :href="tab.href"
                   role="tab"
                   class="tab"
                   :class="{ 'tab-active': tab.slug === active }"
                   :aria-selected="tab.slug === active"
                   @click="onTabClick($event, tab.slug)">
                    <i v-if="tab.icon" :class="tab.icon"></i>
                    <span>{{ tab.name }}</span>
                    <span class="tab-count">{{ tab.count }}</span>
                </a>
            </div>

            <h2 class="tab-heading">{{ activeTab.name }}{{ t('tabHeadingSuffix') }}</h2>

            <div class="article-grid">
                <ArticleCard v-for="post in visiblePosts"
                             :key="post.slug"
                             :post="post"
                             :show-category="active === 'all'"/>
            </div>

            <div v-if="active !== 'all'" class="tab-more">
                <router-link :to="localePath(`/category/${active}`)">
                    {{ t('goToCategory', { name: activeTab.name }) }} <i class="pi pi-arrow-right"></i>
                </router-link>
            </div>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import { ref, computed } from "vue"
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import ArticleCard from "/src/vue/components/articles/ArticleCard.vue"
import { categories } from "/src/data/categories.js"
import { blogPosts } from "/src/data/blogPosts.js"
import { useI18n } from "/src/composables/i18n.js"

const props = defineProps({
    id: String
})

const { t, localePath, localizedCategory } = useI18n()
const active = ref('all')

const tabs = computed(() => [
    { slug: 'all', name: t('tabAll'), icon: 'fa-solid fa-layer-group', count: blogPosts.length, href: localePath('/') },
    ...categories.map(c => ({
        slug: c.slug,
        name: localizedCategory(c).name,
        icon: c.icon,
        count: blogPosts.filter(p => p.category === c.slug).length,
        href: localePath(`/category/${c.slug}`)
    }))
])

const activeTab = computed(() => tabs.value.find(x => x.slug === active.value))

// The tabs are real links so the category hub pages are reachable from the
// homepage for crawlers and for modified clicks (new tab); a plain click
// filters in place instead of navigating away.
const onTabClick = (event, slug) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    active.value = slug
}

const visiblePosts = computed(() => active.value === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === active.value))
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.tab-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 2rem;

    @include media-breakpoint-down(md) {
        // Keep the row scannable on narrow screens instead of wrapping to four rows.
        flex-wrap: nowrap;
        overflow-x: auto;
        justify-content: flex-start;
        padding-bottom: 0.4rem;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;

        &::-webkit-scrollbar { display: none; }
    }
}

.tab {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    flex-shrink: 0;
    padding: 0.5rem 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    background: white;
    color: #555;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: $font-family-base;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;

    i {
        font-size: 0.8rem;
        opacity: 0.75;
    }

    &:hover {
        border-color: $primary;
        color: $primary;
    }

    &.tab-active {
        background: $primary;
        border-color: $primary;
        color: white;

        i { opacity: 1; }

        .tab-count {
            background: rgba(255, 255, 255, 0.25);
            color: white;
        }
    }
}

.tab-count {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.05rem 0.4rem;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.06);
    color: #777;
}

// The grid needs a heading between the page h1 and the h3 card titles; the tab
// bar already names the active filter, so this carries no visual weight.
.tab-heading {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.article-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
}

.tab-more {
    margin-top: 2rem;
    text-align: center;

    a {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: $primary;
        font-size: 0.9rem;
        font-weight: 600;
        text-decoration: none;
        transition: gap 0.2s ease;

        &:hover { gap: 0.7rem; }
    }
}
</style>
