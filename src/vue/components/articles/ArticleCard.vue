<template>
    <router-link :to="localePath(`/blog/${post.slug}`)" class="article-card">
        <div class="article-card-icon">
            <i :class="post.icon"></i>
        </div>
        <div class="article-card-body">
            <span v-if="showCategory && categoryName" class="article-card-cat">{{ categoryName }}</span>
            <h3 class="article-card-title">{{ view.title }}</h3>
            <p class="article-card-desc">{{ view.description }}</p>
            <div class="article-card-meta">
                <span class="article-card-date"><i class="pi pi-calendar"></i> {{ post.date }}</span>
                <div class="article-card-tags">
                    <span v-for="tag in view.tags" :key="tag" class="article-card-tag">{{ tag }}</span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { computed } from "vue"
import { categories } from "/src/data/categories.js"
import { useI18n } from "/src/composables/i18n.js"

const props = defineProps({
    post: { type: Object, required: true },
    showCategory: { type: Boolean, default: false }
})

const { localePath, localizedPost, localizedCategory } = useI18n()

const view = computed(() => localizedPost(props.post))

const categoryName = computed(() => {
    const c = categories.find(c => c.slug === props.post.category)
    return c ? localizedCategory(c).name : null
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.article-card {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
}

.article-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72px;
    background: linear-gradient(135deg, $primary, lighten($primary, 15%));
    color: white;
    font-size: 1.75rem;
}

.article-card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1.15rem;
}

.article-card-cat {
    align-self: flex-start;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 0.12rem 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    background: rgba($primary, 0.12);
    color: $primary;
}

.article-card-title {
    font-size: 0.98rem;
    font-weight: 700;
    color: #333;
    margin: 0 0 0.65rem;
    line-height: 1.5;
}

.article-card-desc {
    font-size: 0.82rem;
    color: #666;
    line-height: 1.65;
    margin: 0 0 1rem;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.article-card-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 0.7rem;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.article-card-date {
    font-size: 0.72rem;
    color: #999;
    display: flex;
    align-items: center;
    gap: 0.3rem;
}

.article-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.article-card-tag {
    font-size: 0.68rem;
    padding: 0.15rem 0.5rem;
    border-radius: 20px;
    background: rgba($primary, 0.1);
    color: $primary;
    font-weight: 600;
}
</style>
