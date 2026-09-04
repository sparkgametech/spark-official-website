export const LOCALES = ['zh', 'en']
export const DEFAULT_LOCALE = 'zh'

// The locale lives in the URL (/… for Chinese, /en/… for English) so each
// language has its own indexable address; see hreflang wiring in prerender.
export const localeMeta = {
    zh: { htmlLang: 'zh-Hant', hreflang: 'zh-Hant', label: '中文', short: 'ZH' },
    en: { htmlLang: 'en', hreflang: 'en', label: 'English', short: 'EN' }
}

export const ui = {
    zh: {
        defaultTitle: 'Spark 星火創盛 | 老虎機遊戲開發團隊 · 客端開發 · 美術 · 數值 · 音效 · 完整技術分享',
        defaultDescription: 'Spark 星火創盛 — 老虎機遊戲開發團隊技術部落格。涵蓋客端架構、美術設計、音樂音效、數值設計、QA 測試等完整開發技術分享，從零到上線的實戰經驗紀錄。',

        heroTitleLead: '老虎機遊戲',
        heroTitleRest: '從零到上線的開發全紀錄',
        heroSubtitle: '一支獨立開發團隊的實戰技術筆記',

        tabAll: '全部',
        tabHeadingSuffix: '文章',
        goToCategory: '前往「{name}」分類頁',

        furtherReading: '延伸閱讀',
        sameSeries: '同系列文章',
        otherSeries: '其他系列文章',
        articleListSuffix: '文章列表',
        otherCategories: '其他分類',

        contactPrompt: '需要技術支援？歡迎',
        contactLink: '聯繫我們',
        contactPromptTail: '取得更多資訊。',

        backToCategory: '返回{name}',
        allArticles: '所有文章',
        postNotFound: '文章不存在。',
        categoryNotFound: '分類不存在。',
        backHome: '返回首頁',

        brandLabel: '*Spark* 星火創盛',
        routeHome: '首頁',
        routeAbout: '關於我們',
        routeCategory: '文章分類',
        routeArticle: '技術文章',
        routePolicy: '隱私政策',

        navSupport: '技術支援',
        footerBlog: '技術部落格',
        footerAbout: '關於我們',
        footerPrivacy: '隱私政策',
        footerRights: '© 2026 Spark 星火創盛 All rights reserved.',

        aboutTitle: '*關於* 我們',
        aboutSubtitle: '一支熱愛遊戲開發的獨立技術團隊',
        aboutP1: 'Spark 星火創盛是一支由資深遊戲開發者組成的獨立團隊，成員擁有豐富的老虎機與遊戲產業經驗，涵蓋客端開發、美術設計、音樂音效、數值設計、系統架構、QA 測試等完整開發領域。',
        aboutP2: '我們創立這個技術部落格，希望將多年累積的開發經驗與實戰知識整理成系統化的文章，與業界同好交流分享。從遊戲框架設計到美術產線流程，從數學模型到品質保證，每一篇文章都是團隊真實開發經驗的結晶。',
        aboutP3Lead: '如果您正在尋找老虎機遊戲的開發夥伴，或對我們的技術文章有任何想法，歡迎透過 ',
        aboutP3Tail: ' 與我們聯繫。',
        teamTitle: '*開發* 團隊',
        teamSubtitle: '我們是一支專注於遊戲開發與系統設計的全方位技術團隊',

        langSwitchLabel: '切換語言',
        translationNoticeTitle: '這篇文章目前只有中文版',
        translationNoticeBody: 'The full English translation of this article is not available yet. The content below is in Traditional Chinese.'
    },

    en: {
        defaultTitle: 'Spark | Slot Game Development Team · Client · Art · Math · Audio · QA',
        defaultDescription: 'Spark — a slot game development team sharing how a game is actually built: client architecture, art pipeline, music and sound, math design and QA testing, from zero to launch.',

        heroTitleLead: 'Slot Games',
        heroTitleRest: 'building one from zero to launch',
        heroSubtitle: 'Field notes from an independent game development team',

        tabAll: 'All',
        tabHeadingSuffix: ' articles',
        goToCategory: 'Browse all {name} articles',

        furtherReading: 'Further reading',
        sameSeries: 'More in this series',
        otherSeries: 'From other series',
        articleListSuffix: ' article list',
        otherCategories: 'Other categories',

        contactPrompt: 'Need technical support? ',
        contactLink: 'Get in touch',
        contactPromptTail: ' and we will be glad to help.',

        backToCategory: 'Back to {name}',
        allArticles: 'All articles',
        postNotFound: 'This article does not exist.',
        categoryNotFound: 'This category does not exist.',
        backHome: 'Back to home',

        brandLabel: '*Spark*',
        routeHome: 'Home',
        routeAbout: 'About us',
        routeCategory: 'Categories',
        routeArticle: 'Article',
        routePolicy: 'Privacy policy',

        navSupport: 'Technical support',
        footerBlog: 'Tech blog',
        footerAbout: 'About',
        footerPrivacy: 'Privacy policy',
        footerRights: '© 2026 Spark. All rights reserved.',

        aboutTitle: '*About* us',
        aboutSubtitle: 'An independent team that loves building games',
        aboutP1: 'Spark is an independent team of experienced game developers. Between us we cover the whole build: client engineering, art and animation, music and sound, math design, system architecture and QA testing.',
        aboutP2: 'We started this blog to turn years of hands-on experience into something structured and worth sharing. From framework design to art pipelines, from math models to quality assurance, every article comes out of work we have actually shipped.',
        aboutP3Lead: 'If you are looking for a development partner for a slot game, or you simply want to talk about something you read here, reach us at ',
        aboutP3Tail: '.',
        teamTitle: 'The *team*',
        teamSubtitle: 'A full-stack technical team focused on game development and system design',

        langSwitchLabel: 'Switch language',
        translationNoticeTitle: 'English translation in progress',
        translationNoticeBody: 'The full English version of this article is not ready yet. The content below is in Traditional Chinese.'
    }
}
