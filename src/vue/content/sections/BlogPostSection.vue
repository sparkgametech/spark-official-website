<template>
    <PageSection variant="default"
                 :id="props.id">
        <Breadcrumbs/>

        <PageSectionHeader v-if="post"
                           :title="view.title"
                           :subtitle="view.subtitle"/>

        <PageSectionContent v-if="post">
            <div class="blog-post-meta">
                <router-link v-if="category"
                             :to="localePath(`/category/${category.slug}`)"
                             class="blog-post-category">
                    <i :class="category.icon"></i> {{ category.name }}
                </router-link>
                <span class="blog-post-date"><i class="pi pi-calendar"></i> {{ post.date }}</span>
                <span v-for="tag in view.tags" :key="tag" class="blog-post-tag">{{ tag }}</span>
            </div>

            <div v-if="furtherReading.length" class="blog-post-further">
                <div class="blog-post-further-label">
                    <i class="pi pi-book"></i> {{ t('furtherReading') }}
                </div>
                <ul class="blog-post-further-list">
                    <li v-for="r in furtherReading" :key="r.slug">
                        <router-link :to="localePath(`/blog/${r.slug}`)">
                            <span class="blog-post-further-cat">{{ categoryName(r.category) }}</span>
                            <span class="blog-post-further-title">{{ r.title }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div v-if="showTranslationNotice" class="blog-post-translation">
                <strong>{{ t('translationNoticeTitle') }}</strong>
                <p>{{ t('translationNoticeBody') }}</p>
            </div>

            <ArticleCustomContent>
                <component :is="articleComponent"/>
            </ArticleCustomContent>

            <div v-if="sameSeriesPosts.length" class="blog-post-related">
                <h3 class="blog-post-related-title">
                    {{ t('sameSeries') }} · {{ category?.name }}
                </h3>
                <ArticleCarousel :posts="sameSeriesPosts"/>
            </div>

            <div v-if="otherSeriesPosts.length" class="blog-post-related">
                <h3 class="blog-post-related-title">{{ t('otherSeries') }}</h3>
                <ArticleCarousel :posts="otherSeriesPosts" :show-category="true"/>
            </div>

            <div class="blog-post-contact">
                <p>{{ t('contactPrompt') }}<a href="mailto:sparkgametech@gmail.com">{{ t('contactLink') }}</a>{{ t('contactPromptTail') }}</p>
                <router-link :to="localePath('/about')" class="blog-post-contact-cta">
                    <i class="pi pi-comments"></i>
                    <span>{{ t('navSupport') }}</span>
                </router-link>
            </div>

            <div class="blog-post-nav">
                <router-link v-if="category" :to="localePath(`/category/${category.slug}`)" class="back-link">
                    <i class="pi pi-arrow-left"></i> {{ t('backToCategory', { name: category.name }) }}
                </router-link>
                <router-link :to="localePath('/')" class="back-link">
                    <i class="pi pi-home"></i> {{ t('allArticles') }}
                </router-link>
            </div>
        </PageSectionContent>

        <PageSectionContent v-else>
            <p>{{ t('postNotFound') }}</p>
            <router-link :to="localePath('/')">{{ t('backHome') }}</router-link>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import { computed, defineAsyncComponent, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import ArticleCustomContent from "/src/vue/components/articles/ArticleCustomContent.vue"
import ArticleCarousel from "/src/vue/components/articles/ArticleCarousel.vue"
import Breadcrumbs from "/src/vue/components/widgets/Breadcrumbs.vue"
import { blogPosts } from "/src/data/blogPosts.js"
import { categories } from "/src/data/categories.js"
import { useI18n } from "/src/composables/i18n.js"

const props = defineProps({
    id: String
})

const route = useRoute()
const { t, locale, localePath, localizedPost, localizedCategory } = useI18n()

const post = computed(() => {
    return blogPosts.find(p => p.slug === route.params.slug)
})

const view = computed(() => localizedPost(post.value) ?? {})

const category = computed(() => {
    const c = categories.find(c => c.slug === post.value?.category)
    return c ? localizedCategory(c) : null
})

const sameSeriesPosts = computed(() => {
    if (!post.value) return []
    return blogPosts.filter(
        p => p.category === post.value.category && p.slug !== post.value.slug
    )
})

// One pick from each other category, so every article links into all six clusters.
// Picks skip whatever 延伸閱讀 already links to, and rotate by article position so
// inbound links spread out instead of every page pointing at the first of each category.
const otherSeriesPosts = computed(() => {
    if (!post.value) return []
    const alreadyLinked = post.value.related ?? []
    const ownIndex = blogPosts.findIndex(p => p.slug === post.value.slug)

    return categories
        .filter(c => c.slug !== post.value.category)
        .map(c => {
            const pool = blogPosts.filter(p => p.category === c.slug && !alreadyLinked.includes(p.slug))
            return pool.length ? pool[ownIndex % pool.length] : null
        })
        .filter(Boolean)
})

// Curated links into other categories, so the topic clusters are connected
// rather than each category being an isolated island.
const furtherReading = computed(() => {
    return (post.value?.related ?? [])
        .map(slug => blogPosts.find(p => p.slug === slug))
        .filter(Boolean)
        .map(localizedPost)
})

function categoryName(slug) {
    const c = categories.find(c => c.slug === slug)
    return c ? localizedCategory(c).name : null
}

const ARTICLE_FILES = {
    'client-framework-architecture': 'ClientFrameworkArticle.vue',
    'client-reel-engine': 'ClientReelEngineArticle.vue',
    'client-network-resource': 'ClientNetworkArticle.vue',
    'art-challenges-ai-workflow': 'ArtWorkflowArticle.vue',
    'art-symbol-spine-animation': 'ArtSymbolAnimationArticle.vue',
    'art-ui-delivery-pipeline': 'ArtUiDeliveryArticle.vue',
    'audio-bgm-design': 'AudioBgmArticle.vue',
    'audio-sfx-interactive': 'AudioSfxArticle.vue',
    'audio-specs-delivery': 'AudioDeliveryArticle.vue',
    'qa-math-verification': 'QaMathArticle.vue',
    'qa-functional-playtest': 'QaFunctionalArticle.vue',
    'qa-automation-compliance': 'QaAutomationArticle.vue',
    'natural-probability-design': 'NaturalProbabilityArticle.vue',
    'gamebox-architecture': 'GameBoxArticle.vue',
    'rng-security': 'RngSecurityArticle.vue',
    'gas-control-system': 'GasControlArticle.vue',
    'risk-control-algorithm': 'RiskControlArticle.vue'
}

// Globs resolve at build time, so a translation that has not been written yet
// simply is not in the English map — the page falls back to the Chinese body
// and shows the notice, instead of failing the build on a missing import.
const zhBodies = import.meta.glob('/src/vue/content/articles/*.vue')
const enBodies = import.meta.glob('/src/vue/content/articles/en/*.vue')

const loaderFor = (file, loc) => loc === 'en'
    ? enBodies[`/src/vue/content/articles/en/${file}`]
    : zhBodies[`/src/vue/content/articles/${file}`]

const componentCache = new Map()

const articleComponent = computed(() => {
    const file = ARTICLE_FILES[route.params.slug]
    if (!file) return null
    const loc = enBodies[`/src/vue/content/articles/en/${file}`] && locale.value === 'en' ? 'en' : 'zh'
    const key = `${loc}:${file}`
    if (!componentCache.has(key)) {
        const loader = loaderFor(file, loc)
        componentCache.set(key, loader ? defineAsyncComponent(loader) : null)
    }
    return componentCache.get(key)
})

const showTranslationNotice = computed(() => {
    const file = ARTICLE_FILES[route.params.slug]
    return locale.value === 'en' && !!file && !enBodies[`/src/vue/content/articles/en/${file}`]
})

function updateMeta() {
    if (!post.value) return
    document.title = `${view.value.title} | Spark${locale.value === 'zh' ? ' 星火創盛' : ''}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', view.value.description)
}

onMounted(updateMeta)
watch(() => [route.params.slug, locale.value], updateMeta)
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.blog-post-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.blog-post-date {
    font-size: 0.85rem;
    color: #888;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.blog-post-tag {
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    background: rgba(13, 110, 253, 0.1);
    color: var(--bs-primary, #0d6efd);
    font-weight: 600;
}

// Nested inside .blog-post-contact, whose `a` rule is more specific than a
// lone class and would otherwise repaint this orange-on-orange.
.blog-post-contact .blog-post-contact-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-top: 0.9rem;
    padding: 0.5rem 1.1rem;
    border-radius: 24px;
    background: $primary;
    color: white;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
        background: darken($primary, 8%);
        color: white;
    }

    i {
        font-size: 0.8rem;
    }
}

.blog-post-contact {
    margin-top: 2.5rem;
    padding: 1.25rem 1.5rem;
    background: rgba($primary, 0.06);
    border-left: 4px solid $primary;
    border-radius: 0 8px 8px 0;

    p {
        margin: 0;
        color: #555;
        font-size: 0.95rem;
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

.blog-post-category {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.78rem;
    font-weight: 700;
    padding: 0.25rem 0.7rem;
    border-radius: 20px;
    background: $primary;
    color: white;
    text-decoration: none;

    &:hover {
        background: darken($primary, 8%);
    }
}

.blog-post-further {
    margin: 0 0 2.25rem;
    padding: 1rem 1.25rem;
    border-left: 3px solid rgba($primary, 0.4);
    background: rgba($primary, 0.04);
    border-radius: 0 8px 8px 0;
}

.blog-post-further-label {
    font-size: 0.8rem;
    font-weight: 700;
    color: $primary;
    margin-bottom: 0.6rem;

    i {
        margin-right: 0.35rem;
    }
}

.blog-post-further-list {
    list-style: none;
    margin: 0;
    padding: 0;

    li + li {
        margin-top: 0.45rem;
    }

    a {
        display: flex;
        align-items: baseline;
        gap: 0.55rem;
        text-decoration: none;
        font-size: 0.88rem;
        line-height: 1.6;
        color: #555;

        &:hover .blog-post-further-title {
            color: $primary;
            text-decoration: underline;
        }
    }
}

.blog-post-further-cat {
    flex-shrink: 0;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 0.1rem 0.45rem;
    border-radius: 4px;
    background: rgba($primary, 0.14);
    color: $primary;
}

.blog-post-translation {
    margin: 0 0 2rem;
    padding: 0.9rem 1.15rem;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.04);
    border-left: 3px solid rgba(0, 0, 0, 0.18);

    strong {
        display: block;
        font-size: 0.85rem;
        color: #444;
        margin-bottom: 0.25rem;
    }

    p {
        margin: 0;
        font-size: 0.82rem;
        color: #777;
        line-height: 1.6;
    }
}

.blog-post-related {
    margin-top: 3rem;
    padding-top: 1.75rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.blog-post-related-title {
    font-size: 1rem;
    font-weight: 700;
    color: #444;
    margin: 0 0 1.1rem;
}

.blog-post-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--bs-primary, #0d6efd);
    text-decoration: none;
    font-weight: 600;
    transition: gap 0.2s ease;

    &:hover {
        gap: 0.75rem;
    }
}
</style>
