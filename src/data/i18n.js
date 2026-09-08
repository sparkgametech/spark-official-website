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
        defaultTitle: '老虎機遊戲開發外包團隊｜客端 · 美術 · 數值 · 音效 · QA — Spark 星火創盛',
        defaultDescription: 'Spark 星火創盛是承接老虎機與博弈遊戲開發外包的獨立團隊。技術部落格涵蓋客端架構、美術設計、音樂音效、數值設計、QA 測試，記錄 Slot Game 從零到上線的實戰經驗。',
        homeIntro: [
            '這裡記錄一支老虎機遊戲開發團隊的實作經驗，',
            '從客端框架、美術產線、音效設計，到數值模型與 QA 驗證。'
        ],
        homeIntroOutsourcing: '團隊同時承接老虎機與博弈遊戲開發外包。',
        homeIntroCompanyLead: '正在找老虎機遊戲開發公司？合作方式請見',
        homeIntroAboutLink: '關於我們',
        homeIntroEnd: '。',

        heroTitleLead: '老虎機遊戲開發外包',
        heroTitleRest: '從零到上線的開發全紀錄',
        heroSubtitle: 'Slot Game 開發外包 · 獨立團隊',

        themeToggleLabel: '切換深色／淺色模式',
        introCollapse: '收合說明',
        introExpand: '展開說明',

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
        aboutEngagementTitle: '合作方式',
        aboutEngagement: [
            {
                icon: 'fa-solid fa-list-check',
                name: '承接範圍',
                items: ['客端開發', '數值與開獎設計', '美術設計', '音樂音效'],
                note: '可以整包承接，也可以只補其中一項。'
            },
            {
                icon: 'fa-solid fa-calendar-days',
                name: '時程',
                items: [
                    '一款完整遊戲約 1.5 到 3 個月，視遊戲難易度而定',
                    '可同時進行的產線數量依當下人力而定，洽談時一併確認'
                ]
            },
            {
                icon: 'fa-solid fa-file-invoice',
                name: '計價',
                items: ['按專案報價', '先評估難易度，再回覆時程與費用']
            },
            {
                icon: 'fa-solid fa-box-open',
                name: '交付內容',
                items: ['原始碼', '素材檔']
            },
            {
                icon: 'fa-solid fa-certificate',
                name: '送驗',
                items: ['僅包含 RNG 送驗']
            }
        ],
        aboutContactTitle: '聯絡我們',
        aboutContactLead: [
            '我們承接老虎機遊戲的開發外包，可以整包做，也可以只補你缺的那一塊。',
            '建議先加入頻道看看我們的技術文章，覺得合適再聊。'
        ],
        aboutContactDirect: '直接聯繫',
        aboutContactTelegram: '加入 Telegram 頻道',
        teamTitle: '*開發* 團隊',
        teamSubtitle: '我們是一支專注於遊戲開發與系統設計的全方位技術團隊',

        langSwitchLabel: '切換語言',
        translationNoticeTitle: '這篇文章目前只有中文版',
        translationNoticeBody: 'The full English translation of this article is not available yet. The content below is in Traditional Chinese.'
    },

    en: {
        defaultTitle: 'Slot Game Development Outsourcing Team | Client · Art · Math · Audio · QA — Spark',
        defaultDescription: 'Spark is an independent team taking on slot game development outsourcing. The blog covers client architecture, art pipeline, music and sound, math design and QA testing — how a game is actually built, from zero to launch.',
        homeIntro: [
            'This site records the hands-on experience of a slot game development team,',
            'from client frameworks and art pipelines to sound design, math models and QA verification.'
        ],
        homeIntroOutsourcing: 'The team also takes on slot and casino game development outsourcing.',
        homeIntroCompanyLead: 'Looking for a slot game development company? See ',
        homeIntroAboutLink: 'About us',
        homeIntroEnd: ' for how we work.',

        heroTitleLead: 'Slot Game Development Outsourcing',
        heroTitleRest: 'from zero to launch',
        heroSubtitle: 'Slot game development outsourcing · Independent team',

        themeToggleLabel: 'Toggle dark and light mode',
        introCollapse: 'Hide intro',
        introExpand: 'Show intro',

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
        aboutEngagementTitle: 'How we work',
        aboutEngagement: [
            {
                icon: 'fa-solid fa-list-check',
                name: 'Scope',
                items: ['Client development', 'Math and outcome design', 'Art', 'Music and sound'],
                note: 'We can take on a whole production, or fill in a single part of one.'
            },
            {
                icon: 'fa-solid fa-calendar-days',
                name: 'Timeline',
                items: [
                    'Roughly 1.5 to 3 months for a complete game, depending on how complex it is',
                    'How many productions can run at once depends on current capacity, which we confirm when we talk'
                ]
            },
            {
                icon: 'fa-solid fa-file-invoice',
                name: 'Pricing',
                items: ['Quoted per project', 'We assess the complexity first, then come back with a timeline and a cost']
            },
            {
                icon: 'fa-solid fa-box-open',
                name: 'Deliverables',
                items: ['Source code', 'Art assets']
            },
            {
                icon: 'fa-solid fa-certificate',
                name: 'Certification',
                items: ['Covers the RNG submission only']
            }
        ],
        aboutContactTitle: 'Get in touch',
        aboutContactLead: [
            'We take on slot game development work — the whole build, or just the piece you are missing.',
            'Join the channel first to see how we work, then get in touch.'
        ],
        aboutContactDirect: 'Direct contact',
        aboutContactTelegram: 'Join the Telegram channel',
        teamTitle: 'The *team*',
        teamSubtitle: 'A full-stack technical team focused on game development and system design',

        langSwitchLabel: 'Switch language',
        translationNoticeTitle: 'English translation in progress',
        translationNoticeBody: 'The full English version of this article is not ready yet. The content below is in Traditional Chinese.'
    }
}
