<template>
    <PageSection variant="default"
                 :id="props.id">
        <Breadcrumbs/>

        <PageSectionHeader v-if="category"
                           :title="`*${category.name}*`"
                           :subtitle="category.subtitle"/>

        <PageSectionContent v-if="category">
            <p class="category-intro">{{ category.description }}</p>

            <h2 class="category-grid-heading">{{ category.name }}{{ t('articleListSuffix') }}</h2>
            <div class="article-grid">
                <ArticleCard v-for="post in posts"
                             :key="post.slug"
                             :post="post"/>
            </div>

            <div class="category-nav">
                <h2 class="category-nav-title">{{ t('otherCategories') }}</h2>
                <div class="category-nav-links">
                    <router-link v-for="c in otherCategories"
                                 :key="c.slug"
                                 :to="localePath(`/category/${c.slug}`)"
                                 class="category-nav-link">
                        <i :class="c.icon"></i> {{ c.name }}
                    </router-link>
                </div>
            </div>
        </PageSectionContent>

        <PageSectionContent v-else>
            <p>{{ t('categoryNotFound') }}</p>
            <router-link :to="localePath('/')">{{ t('backHome') }}</router-link>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import Breadcrumbs from "/src/vue/components/widgets/Breadcrumbs.vue"
import ArticleCard from "/src/vue/components/articles/ArticleCard.vue"
import { categories } from "/src/data/categories.js"
import { blogPosts } from "/src/data/blogPosts.js"
import { useI18n } from "/src/composables/i18n.js"

const props = defineProps({
    id: String
})

const route = useRoute()
const { t, locale, localePath, localizedCategory } = useI18n()

const category = computed(() => {
    const c = categories.find(c => c.slug === route.params.slug)
    return c ? localizedCategory(c) : null
})

const posts = computed(() => blogPosts.filter(p => p.category === route.params.slug))

const otherCategories = computed(() => categories
    .filter(c => c.slug !== route.params.slug)
    .map(localizedCategory))

function updateMeta() {
    if (!category.value) return
    document.title = `${category.value.name} | Spark${locale.value === 'zh' ? ' 星火創盛' : ''}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', category.value.description)
}

onMounted(updateMeta)
watch(() => [route.params.slug, locale.value], updateMeta)
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.category-intro {
    max-width: 760px;
    margin: 0 auto 2.5rem;
    text-align: center;
    color: #666;
    font-size: 0.95rem;
    line-height: 1.8;
}

// The grid needs a heading between the page h1 and the h3 card titles, but the
// category name is already stated above it, so it carries no visual weight.
.category-grid-heading {
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

.category-nav {
    margin-top: 3.5rem;
    padding-top: 1.75rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.category-nav-title {
    font-size: 1rem;
    font-weight: 700;
    color: #444;
    margin: 0 0 1rem;
}

.category-nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
}

.category-nav-link {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.5rem 1rem;
    border-radius: 24px;
    background: rgba($primary, 0.08);
    color: $primary;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
        background: rgba($primary, 0.16);
    }
}
</style>
