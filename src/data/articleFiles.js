/**
 * Which component file holds each article's body.
 *
 * Both the runtime (BlogPostSection resolves this to an async component) and
 * the build-time prerenderer (which reads the same file to inline the body for
 * crawlers) work from this map, so an article added in one place can never go
 * missing in the other.
 */
export const ARTICLE_FILES = {
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
