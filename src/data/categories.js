export const categories = [
    {
        slug: 'client',
        name: '客端開發',
        seoTitle: '老虎機客端開發｜框架 · 滾輪引擎 · 動畫',
        icon: 'fa-solid fa-mobile-screen',
        subtitle: '從遊戲框架到滾輪引擎的客端技術',
        description: '老虎機客端開發技術文章：分層框架設計、遊戲狀態機、滾輪動畫引擎、通訊協議與斷線重連、資源管理與多語系、UI 層級架構。'
    },
    {
        slug: 'art',
        name: '美術設計',
        seoTitle: '老虎機美術設計｜符號 · Spine 動畫 · UI',
        icon: 'fa-solid fa-palette',
        subtitle: 'AI 輔助工作流與高效美術產線',
        description: '老虎機美術設計技術文章：AI 輔助的現代美術工作流、符號設計規範、Spine 骨骼動畫製作、UI/UX 介面佈局與引擎交付流程。'
    },
    {
        slug: 'audio',
        name: '音樂音效',
        seoTitle: '老虎機音樂音效設計｜配樂 · 音效 · 引擎整合',
        icon: 'fa-solid fa-music',
        subtitle: '打造沉浸式的遊戲聽覺體驗',
        description: '老虎機音樂音效設計技術文章：背景音樂的情緒鋪陳、遊戲音效分級觸發、互動音頻系統、音頻技術規格與交付流程。'
    },
    {
        slug: 'math',
        name: '數值設計',
        seoTitle: '老虎機數值設計｜機率模型 · RTP 調校',
        icon: 'fa-solid fa-dice',
        subtitle: '機率模型、RTP 調校與結果集架構',
        description: '老虎機數值設計技術文章：自然機率的數學模型、符號權重表配置、RTP 計算與調校、波動率設計、結果集架構與調控系統。'
    },
    {
        slug: 'security',
        name: '系統安全',
        seoTitle: '老虎機 RNG 與風控系統設計',
        icon: 'fa-solid fa-lock',
        subtitle: '隨機數安全與統計異常偵測',
        description: '博弈遊戲系統安全技術文章：密碼學等級隨機數生成、種子管理與熵源設計、RNG 審計追蹤、統計檢定與風險異常偵測。'
    },
    {
        slug: 'qa',
        name: 'QA 測試',
        seoTitle: '老虎機 QA 測試｜數學驗證 · 合規送測',
        icon: 'fa-solid fa-vial',
        subtitle: '從數學驗證到玩家體感的品質保證',
        description: '老虎機 QA 測試技術文章：RTP 收斂驗證、狀態機路徑覆蓋、功能測試與體感測試、自動化測試框架與第三方合規認證。'
    }
]

export function getCategory(slug) {
    return categories.find(c => c.slug === slug)
}
