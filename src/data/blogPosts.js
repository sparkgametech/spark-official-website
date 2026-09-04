export const blogPosts = [
    // ── 客端開發 ──────────────────────────────────────────────
    {
        slug: 'client-framework-architecture',
        category: 'client',
        title: '老虎機客端分層框架與狀態機設計',
        subtitle: '如何設計一套可復用的客端框架，讓每款新遊戲只需開發差異化的部分',
        date: '2023-11-12',
        icon: 'fa-solid fa-layer-group',
        tags: ['客端開發', '框架設計', '狀態機'],
        related: ['gamebox-architecture', 'qa-functional-playtest'],
        description: '從三層式架構的設計動機出發，說明通用引擎層、老虎機框架層與遊戲應用層的職責切分，以及如何用有限狀態機管理一局 Spin 的完整生命週期，實現「一次開發、多次復用」的開發模式。'
    },
    {
        slug: 'client-reel-engine',
        category: 'client',
        title: '滾輪引擎設計：動畫曲線與停輪控制',
        subtitle: '解析老虎機最核心的視覺體驗，如何在 60fps 下做出自然流暢的滾輪動態',
        date: '2024-12-27',
        icon: 'fa-solid fa-arrows-rotate',
        tags: ['客端開發', '滾輪引擎', '動畫設計'],
        related: ['art-symbol-spine-animation', 'audio-sfx-interactive'],
        description: '滾輪是玩家最直覺的體驗核心。本文深入解析滾輪引擎的動態狀態切換、緩動曲線的數學設計、停輪時序與彈跳回彈、預期感營造機制，以及維持穩定幀率的效能最佳化手法。'
    },
    {
        slug: 'client-network-resource',
        category: 'client',
        title: '客端通訊、資源管理與 UI 層級架構',
        subtitle: '從斷線重連到記憶體釋放，撐起遊戲穩定度的底層設計',
        date: '2026-02-11',
        icon: 'fa-solid fa-network-wired',
        tags: ['客端開發', '通訊協議', '資源管理'],
        related: ['art-ui-delivery-pipeline', 'audio-specs-delivery'],
        description: '解析客端與伺服器的即時通訊設計、斷線重連的狀態還原機制、大量資源的分階段載入與記憶體釋放策略、多語系在地化的實作考量，以及 UI 層級與彈窗堆疊的管理架構。'
    },

    // ── 美術設計 ──────────────────────────────────────────────
    {
        slug: 'art-challenges-ai-workflow',
        category: 'art',
        title: '老虎機美術的獨特挑戰與 AI 輔助工作流',
        subtitle: '把 AI 生成放進傳統美術產線的正確位置',
        date: '2024-01-19',
        icon: 'fa-solid fa-wand-magic-sparkles',
        tags: ['美術設計', 'AI 工具', '工作流程'],
        related: ['client-reel-engine', 'audio-bgm-design'],
        description: '老虎機美術與一般遊戲美術有什麼不同？本文說明其獨特的設計限制，並分享如何將 AI 生成工具放進概念發想階段、提示詞迭代策略，以及 AI 產出如何接回傳統繪製流程做細化。'
    },
    {
        slug: 'art-symbol-spine-animation',
        category: 'art',
        title: '老虎機符號設計規範與 Spine 骨骼動畫',
        subtitle: '從符號辨識度到骨骼綁定，美術執行面的核心技術',
        date: '2025-03-05',
        icon: 'fa-solid fa-palette',
        tags: ['美術設計', 'Spine 動畫', '符號設計'],
        related: ['client-reel-engine', 'natural-probability-design'],
        description: '符號是老虎機的視覺主體。本文分享符號的辨識度設計、尺寸與留白規範、高低賠符號的視覺層次，以及 Spine 骨骼動畫的綁定策略、中獎演出製作與效能取捨。'
    },
    {
        slug: 'art-ui-delivery-pipeline',
        category: 'art',
        title: '老虎機 UI/UX 設計與美術交付流程',
        subtitle: '從設計稿到引擎，讓美術資產順利落地的規範',
        date: '2026-04-20',
        icon: 'fa-solid fa-object-group',
        tags: ['美術設計', 'UI/UX', '交付流程'],
        related: ['client-network-resource', 'qa-functional-playtest'],
        description: '解析老虎機的介面佈局原則、跨解析度適配策略、可讀性與操作熱區設計，以及從設計稿到引擎整合的完整交付流程、素材命名與切圖規範、美術技術棧總覽。'
    },

    // ── 音樂音效 ──────────────────────────────────────────────
    {
        slug: 'audio-bgm-design',
        category: 'audio',
        title: '老虎機背景音樂設計：用聲音鋪陳情緒節奏',
        subtitle: '主題旋律、模式轉換與無縫循環的製作思路',
        date: '2024-03-28',
        icon: 'fa-solid fa-music',
        tags: ['音樂', '背景音樂', '情緒設計'],
        related: ['client-network-resource', 'art-challenges-ai-workflow'],
        description: '背景音樂決定了玩家的情緒基調。本文分享主題旋律的記憶點設計、一般模式與免費遊戲模式的音樂轉換、無縫循環的製作技巧，以及調性與配器如何呼應遊戲主題。'
    },
    {
        slug: 'audio-sfx-interactive',
        category: 'audio',
        title: '老虎機遊戲音效分級與互動音頻系統',
        subtitle: '讓每一次中獎都聽得出份量差異',
        date: '2025-05-13',
        icon: 'fa-solid fa-volume-high',
        tags: ['音效', '互動音頻', '遊戲音頻'],
        related: ['client-reel-engine', 'natural-probability-design'],
        description: '解析中獎等級與音效層次的對應設計、連線音階的遞進安排、音效觸發的優先權與閃避機制、同時發聲數的限制策略，以及如何避免長時間遊玩造成的聽覺疲勞。'
    },
    {
        slug: 'audio-specs-delivery',
        category: 'audio',
        title: '遊戲音頻技術規格與交付流程',
        subtitle: '從作曲到引擎整合的規範與檢核',
        date: '2026-06-28',
        icon: 'fa-solid fa-sliders',
        tags: ['音效', '技術規格', '交付流程'],
        related: ['client-network-resource', 'art-ui-delivery-pipeline'],
        description: '說明遊戲音頻的取樣率與位元深度選擇、壓縮格式的取捨、響度標準與動態範圍控制、檔案體積與載入效能的平衡，以及從作曲、混音到引擎整合的完整交付流程。'
    },

    // ── 數值設計 ──────────────────────────────────────────────
    {
        slug: 'natural-probability-design',
        category: 'math',
        title: '老虎機自然機率設計：從數學模型到玩家體感',
        subtitle: '深入解析 Slot Game 中自然機率的演算法原理、符號權重分配與 RTP 計算方式',
        date: '2023-09-04',
        icon: 'fa-solid fa-dice',
        tags: ['數值設計', '自然機率', 'RTP'],
        related: ['qa-math-verification', 'art-symbol-spine-animation'],
        description: '本文深入探討老虎機遊戲中自然機率的數學模型設計，包含符號權重表（Reel Strip）的配置邏輯、各種中獎組合的機率計算方式、RTP（Return to Player）的精準調校方法，以及如何在數學正確性與玩家體感之間取得平衡。'
    },
    {
        slug: 'gamebox-architecture',
        category: 'math',
        title: '結果集架構設計：模組化老虎機開發框架',
        subtitle: '解析如何透過結果集架構實現高效、可擴展的老虎機遊戲開發流程',
        date: '2024-10-19',
        icon: 'fa-solid fa-cubes',
        tags: ['架構設計', '結果集', '遊戲引擎'],
        related: ['rng-security', 'client-framework-architecture'],
        description: '本文介紹結果集架構的設計理念與實作方式，說明如何透過模組化的 Component 架構將老虎機遊戲拆解為可重用的功能模組，包含遊戲狀態機、Spin 流程管理、Feature 觸發與結算機制，實現快速開發與高品質交付。'
    },
    {
        slug: 'gas-control-system',
        category: 'math',
        title: '調控系統設計文件：老虎機動態參數調整引擎',
        subtitle: '從 Spin 請求到結果回傳，完整解析調控管線的兩階段控制架構',
        date: '2025-12-04',
        icon: 'fa-solid fa-sliders',
        tags: ['調控系統', '流程設計', 'RTP'],
        related: ['risk-control-algorithm', 'qa-math-verification'],
        description: '調控系統是老虎機遊戲的核心引擎。本文以流程圖呈現完整的 Spin 處理管線，詳解兩階段控制架構：RTP 表選擇（動態水池、新手扶持）與權重結果選取（SD 壓縮、最大賠率上限），以及 RTP 插值與優雅降級的設計原則。'
    },

    // ── 系統安全 ──────────────────────────────────────────────
    {
        slug: 'rng-security',
        category: 'security',
        title: 'RNG 隨機數安全機制：確保博弈遊戲的公平性與合規性',
        subtitle: '從密碼學等級亂數到可驗證公平性，全面解析遊戲隨機數生成的安全設計',
        date: '2024-08-12',
        icon: 'fa-solid fa-lock',
        tags: ['RNG', '安全', '合規'],
        related: ['gamebox-architecture', 'qa-automation-compliance'],
        description: '隨機數生成器（RNG）是博弈遊戲公平性的核心基石。本文深入說明如何使用密碼學安全的偽隨機數生成器（CSPRNG）、種子管理與熵源設計、隨機數的均勻分佈驗證，以及如何通過第三方認證機構的 RNG 審計標準。'
    },
    {
        slug: 'risk-control-algorithm',
        category: 'security',
        title: '風控演算法設計文件：統計異常偵測與即時告警',
        subtitle: '透過嚴格的統計學檢定方法，即時監控遊戲表現是否偏離理論預期',
        date: '2025-09-27',
        icon: 'fa-solid fa-chart-line',
        tags: ['風控', '統計檢定', '異常偵測'],
        related: ['gas-control-system', 'natural-probability-design'],
        description: '風控演算法是博弈遊戲穩定的安全防線。本文說明如何透過二項式中獎率檢定、RTP Z 檢定與離群值過濾等統計學方法，建立即時的異常偵測與分級告警機制。'
    },

    // ── QA 測試 ──────────────────────────────────────────────
    {
        slug: 'qa-math-verification',
        category: 'qa',
        title: '老虎機測試的特殊性與數學驗證方法',
        subtitle: '為什麼老虎機不能只靠功能測試，還要用統計學驗證',
        date: '2024-06-04',
        icon: 'fa-solid fa-square-root-variable',
        tags: ['QA', '數學驗證', '統計檢定'],
        related: ['natural-probability-design', 'gas-control-system'],
        description: '老虎機測試不只是找 bug，更要驗證數學模型的正確性。本文說明 RTP 收斂需要多少樣本才有統計意義、信賴區間的判讀方式、波動率驗證、極端值與獎項上限驗證，以及模擬局數與誤差的關係。'
    },
    {
        slug: 'qa-functional-playtest',
        category: 'qa',
        title: '老虎機功能測試與玩家體感測試',
        subtitle: '從狀態機路徑覆蓋到真人體感回饋的雙軌驗證',
        date: '2025-07-20',
        icon: 'fa-solid fa-clipboard-check',
        tags: ['QA', '功能測試', '體感測試'],
        related: ['client-framework-architecture', 'client-network-resource'],
        description: '解析老虎機的狀態機路徑覆蓋策略、斷線重連的邊界情境驗證、多解析度與多裝置測試，以及體感評估的量表設計、如何把主觀的體感回饋轉譯成可執行的調整建議。'
    },
    {
        slug: 'qa-automation-compliance',
        category: 'qa',
        title: '老虎機自動化測試與合規認證',
        subtitle: '用自動化撐起大量局數驗證，並通過第三方認證',
        date: '2026-09-04',
        icon: 'fa-solid fa-robot',
        tags: ['QA', '自動化測試', '合規認證'],
        related: ['rng-security', 'gamebox-architecture'],
        description: '分享老虎機自動化測試的架構設計、大量局數模擬與結果比對、迴歸測試的建立與維護，以及第三方認證機構的送測準備、常見退件原因與合規文件要求。'
    }
]

export function getPostsByCategory(categorySlug) {
    return blogPosts.filter(p => p.category === categorySlug)
}
