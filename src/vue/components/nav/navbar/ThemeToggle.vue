<template>
    <button type="button"
            class="theme-toggle"
            :aria-label="t('themeToggleLabel')"
            :title="t('themeToggleLabel')"
            @click="toggleTheme">
        <i :class="theme === 'dark' ? 'pi pi-sun' : 'pi pi-moon'"/>
    </button>
</template>

<script setup>
import { useI18n } from "/src/composables/i18n.js"
import { theme, toggleTheme } from "/src/composables/theme.js"

const { t } = useI18n()
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 6px;
    background: transparent;
    color: $light-4;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background-color 0.25s, border-color 0.25s, color 0.25s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.45);
        color: $white;
    }
}
</style>
