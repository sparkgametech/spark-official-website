<template>
    <div class="mermaid-container" ref="container"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import mermaid from 'mermaid'

const props = defineProps({
    chart: { type: String, required: true },
    id: { type: String, default: () => `mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }
})

const container = ref(null)

mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
        primaryColor: '#e8590c',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#c4500a',
        lineColor: '#666666',
        secondaryColor: '#f5a623',
        secondaryTextColor: '#ffffff',
        tertiaryColor: '#3a3f44',
        tertiaryTextColor: '#ffffff',
        nodeBorder: '#c4500a',
        mainBkg: '#e8590c',
        nodeTextColor: '#ffffff',
        textColor: '#333333',
        titleColor: '#333333',
        edgeLabelBackground: '#ffffff',
        clusterBkg: '#f8f9fa',
        clusterBorder: '#dee2e6',
        fontSize: '14px'
    },
    flowchart: {
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 30,
        rankSpacing: 40
    }
})

const render = async () => {
    if (!container.value) return
    try {
        const { svg } = await mermaid.render(props.id, props.chart)
        // The component can unmount mid-render when navigating between articles,
        // so container must be re-checked after the await, not only before it.
        if (container.value) container.value.innerHTML = svg
    } catch (e) {
        if (container.value) container.value.textContent = e.message
    }
}

onMounted(render)
watch(() => props.chart, render)
</script>

<style lang="scss" scoped>
.mermaid-container {
    width: 100%;
    overflow-x: auto;
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;

    :deep(svg) {
        max-width: 100%;
        height: auto;
    }

    :deep(.node rect),
    :deep(.cluster rect) {
        rx: 8px;
        ry: 8px;
    }
}
</style>
