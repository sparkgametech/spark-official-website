<template>
    <div class="spark-master">
    <!-- Navigation -->
    <Navigation logo="/images/logo/agency-logo-small.png"
                :label="t('brandLabel')"/>

    <!-- Content Display -->
    <div class="spark-main">
        <router-view/>
    </div>

    <!-- Footer -->
    <footer class="spark-footer">
        <div class="spark-footer-links">
            <router-link :to="localePath('/')">{{ t('footerBlog') }}</router-link>
            <span class="spark-footer-dot">·</span>
            <router-link :to="localePath('/about')">{{ t('footerAbout') }}</router-link>
            <span class="spark-footer-dot">·</span>
            <router-link :to="localePath('/privacy-policy')">{{ t('footerPrivacy') }}</router-link>
            <span class="spark-footer-dot">·</span>
            <a href="mailto:sparkgametech@gmail.com">sparkgametech@gmail.com</a>
        </div>
        <div class="spark-footer-copy">{{ t('footerRights') }}</div>
    </footer>
    </div>
</template>

<script setup>
import Navigation from "/src/vue/components/nav/Navigation.vue"
import { useI18n } from "/src/composables/i18n.js"

const { t, localePath } = useI18n()
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.spark-master {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.spark-main {
    flex: 1;
    background-color: $background-color;
}

.spark-footer {
    background-color: darken($nav-background-color, 3%);
    padding: 1.5rem 1rem;
    text-align: center;
}

.spark-footer-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;

    a {
        color: $light-5;
        text-decoration: none;
        font-size: 0.85rem;
        transition: color 0.3s;

        &:hover {
            color: $primary;
        }
    }
}

.spark-footer-dot {
    color: $light-6;
    font-size: 0.85rem;
}

.spark-footer-copy {
    color: $light-6;
    font-size: 0.75rem;
}
</style>