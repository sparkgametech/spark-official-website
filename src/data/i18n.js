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
        aboutIntro: [
            'Spark 星火創盛是一支由資深遊戲開發者組成的獨立團隊，專注老虎機遊戲開發。',
            '我們把多年的實戰經驗整理成這個技術部落格，與業界同好交流。'
        ],
        aboutServicesTitle: '支援項目',
        aboutServices: [
            { icon: 'fa-solid fa-mobile-screen', name: '客端開發', detail: '遊戲框架、滾輪引擎、動畫與介面實作' },
            { icon: 'fa-solid fa-palette', name: '美術設計', detail: '符號設計、Spine 骨骼動畫、UI/UX 與素材交付' },
            { icon: 'fa-solid fa-music', name: '音樂音效', detail: '背景音樂創作、音效設計與引擎整合' },
            { icon: 'fa-solid fa-dice', name: '數值設計', detail: '機率模型、RTP 調校、波動率與體感平衡' },
            { icon: 'fa-solid fa-cubes', name: '系統架構', detail: '遊戲伺服器、結果集架構與調控風控設計' },
            { icon: 'fa-solid fa-vial', name: 'QA 測試', detail: '數學驗證、功能測試、體感測試與合規送測' }
        ],
        aboutContactTitle: '聯絡我們',
        aboutContactLead: '正在尋找老虎機遊戲的開發夥伴，或對文章有任何想法，歡迎直接聯繫：',
        aboutContactDirect: '主要聯繫',
        aboutContactTelegram: 'Telegram 頻道',
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
        aboutIntro: [
            'Spark is an independent team of experienced game developers focused on slot game development.',
            'This blog is where we turn years of hands-on work into something structured and worth sharing.'
        ],
        aboutServicesTitle: 'What we cover',
        aboutServices: [
            { icon: 'fa-solid fa-mobile-screen', name: 'Client development', detail: 'Game framework, reel engine, animation and interface implementation' },
            { icon: 'fa-solid fa-palette', name: 'Art and design', detail: 'Symbol design, Spine skeletal animation, UI/UX and asset delivery' },
            { icon: 'fa-solid fa-music', name: 'Music and sound', detail: 'Background music composition, sound design and engine integration' },
            { icon: 'fa-solid fa-dice', name: 'Math design', detail: 'Probability models, RTP tuning, volatility and play-feel balance' },
            { icon: 'fa-solid fa-cubes', name: 'System architecture', detail: 'Game server, result-set architecture, regulation and risk control design' },
            { icon: 'fa-solid fa-vial', name: 'QA testing', detail: 'Math verification, functional and play-feel testing, certification submission' }
        ],
        aboutContactTitle: 'Get in touch',
        aboutContactLead: 'Looking for a development partner for a slot game, or want to talk about something you read here? Reach us directly:',
        aboutContactDirect: 'Direct contact',
        aboutContactTelegram: 'Telegram channel',
        teamTitle: 'The *team*',
        teamSubtitle: 'A full-stack technical team focused on game development and system design',

        langSwitchLabel: 'Switch language',
        translationNoticeTitle: 'English translation in progress',
        translationNoticeBody: 'The full English version of this article is not ready yet. The content below is in Traditional Chinese.'
    }
}
