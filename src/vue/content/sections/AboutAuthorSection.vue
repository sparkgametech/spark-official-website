<template>
    <PageSection variant="default"
                 :id="props.id">
        <PageSectionHeader :title="t('aboutTitle')"
                           :subtitle="t('aboutSubtitle')"/>

        <PageSectionContent>
            <div class="about-body">
                <p v-for="(line, i) in t('aboutIntro')" :key="i" class="about-intro">{{ line }}</p>

                <h2 class="about-heading">{{ t('aboutServicesTitle') }}</h2>
                <ul class="about-services">
                    <li v-for="item in t('aboutServices')" :key="item.name">
                        <i :class="item.icon"></i>
                        <div>
                            <strong>{{ item.name }}</strong>
                            <span>{{ item.detail }}</span>
                        </div>
                    </li>
                </ul>

                <h2 class="about-heading">{{ t('aboutContactTitle') }}</h2>
                <p class="about-contact-lead">{{ t('aboutContactLead') }}</p>
                <div class="about-contact">
                    <a class="is-primary" href="https://t.me/pangamesoft" target="_blank" rel="noopener">
                        <i class="pi pi-telegram"></i>
                        <span>{{ t('aboutContactDirect') }} @pangamesoft</span>
                    </a>
                    <a href="https://t.me/spark_studio_ch" target="_blank" rel="noopener">
                        <i class="pi pi-megaphone"></i>
                        <span>{{ t('aboutContactTelegram') }}</span>
                    </a>
                    <a href="mailto:sparkgametech@gmail.com">
                        <i class="pi pi-envelope"></i>
                        <span>sparkgametech@gmail.com</span>
                    </a>
                </div>
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
    document.querySelector('meta[name="description"]')?.setAttribute("content", t('aboutIntro').join(''))
}

onMounted(updateMeta)
watch(locale, updateMeta)
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.about-body {
    max-width: 760px;
    margin: 0 auto;
}

.about-intro {
    color: #555;
    font-size: 1rem;
    line-height: 1.9;
    margin: 0 0 0.9rem;
}

.about-heading {
    font-size: 1.05rem;
    font-weight: 700;
    color: #2b2b2b;
    margin: 2.5rem 0 1.1rem;
    padding-bottom: 0.6rem;
    border-bottom: 2px solid rgba($primary, 0.15);
}

.about-services {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 1.5rem;

    @include media-breakpoint-down(md) {
        grid-template-columns: 1fr;
    }

    li {
        display: flex;
        align-items: flex-start;
        gap: 0.7rem;
    }

    i {
        flex-shrink: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background: rgba($primary, 0.1);
        color: $primary;
        font-size: 0.8rem;
        margin-top: 0.1rem;
    }

    strong {
        display: block;
        font-size: 0.92rem;
        color: #333;
        margin-bottom: 0.15rem;
    }

    span {
        display: block;
        font-size: 0.82rem;
        color: #777;
        line-height: 1.6;
    }
}

.about-contact-lead {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.8;
    margin: 0 0 1.1rem;
}

.about-contact {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;

    a {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.6rem 1.1rem;
        border-radius: 26px;
        background: rgba($primary, 0.08);
        color: $primary;
        font-size: 0.88rem;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.2s ease;

        &:hover {
            background: rgba($primary, 0.18);
        }

        // The direct contact is the one we actually want people to use.
        &.is-primary {
            background: $primary;
            color: white;

            &:hover {
                background: darken($primary, 8%);
            }
        }

        i {
            font-size: 0.9rem;
        }
    }
}
</style>
