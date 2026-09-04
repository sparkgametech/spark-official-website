<template>
    <PageSection variant="default"
                 :id="props.id">
        <PageSectionHeader :title="t('aboutTitle')"
                           :subtitle="t('aboutSubtitle')"/>

        <PageSectionContent>
            <div class="about-intro">
                <p>{{ t('aboutP1') }}</p>
                <p>{{ t('aboutP2') }}</p>
                <p>
                    {{ t('aboutP3Lead') }}<a href="mailto:sparkgametech@gmail.com">sparkgametech@gmail.com</a>{{ t('aboutP3Tail') }}
                </p>
            </div>
        </PageSectionContent>
    </PageSection>
</template>

<script setup>
import { onMounted, watch } from "vue"
import PageSection from "/src/vue/components/layout/PageSection.vue"
import PageSectionHeader from "/src/vue/components/layout/PageSectionHeader.vue"
import PageSectionContent from "/src/vue/components/layout/PageSectionContent.vue"
import { useI18n } from "/src/composables/i18n.js"

const props = defineProps({
    id: String
})

const { t, locale } = useI18n()

const updateMeta = () => {
    document.title = locale.value === 'en'
        ? 'About us | Spark'
        : '關於我們 | Spark 星火創盛'
    document.querySelector('meta[name="description"]')?.setAttribute("content", t('aboutP1'))
}

onMounted(updateMeta)
watch(locale, updateMeta)
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.about-intro {
    max-width: 720px;
    margin: 0 auto;
    line-height: 1.9;
    font-size: 1.05rem;
    color: #444;

    p {
        margin-bottom: 1.25rem;
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
</style>
