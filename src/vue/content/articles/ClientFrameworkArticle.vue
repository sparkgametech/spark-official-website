<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-circle-question" aria-hidden="true"></i>一款老虎機客端需要解決什麼問題？</h2>
        <p>
            開發一款老虎機遊戲的客端，遠不只是「畫面上有幾個滾輪在轉」這麼簡單。
            從技術角度來看，一個成熟的老虎機客端至少需要解決以下幾大核心挑戰：
        </p>
        <ul>
            <li><strong>流暢的滾輪動畫</strong>：滾輪是玩家最直覺的體驗核心，必須在 60fps 下維持穩定、自然的旋轉效果，包含加速、減速、彈跳等多種動態過渡</li>
            <li><strong>即時的伺服器通訊</strong>：每一次下注都需要與伺服器即時交換資料，從發送請求到接收結果、處理斷線重連，通訊層必須穩定且容錯</li>
            <li><strong>大量的資源管理</strong>：一款遊戲可能包含數百張圖片、數十段動畫與音效，如何分階段載入、快取、釋放記憶體，直接影響載入速度與執行效能</li>
            <li><strong>多語系與在地化</strong>：面向全球市場的遊戲需要支援數十種語言，不只是文字翻譯，還包含不同語系的排版方向、字型替換與素材切換</li>
            <li><strong>高度可復用性</strong>：市場上需要持續推出新遊戲，如果每款遊戲都從零開始開發，成本將無法控制。架構必須支援「一次開發核心、多次復用產出」</li>
        </ul>
        <p>
            這些挑戰彼此並不獨立。本文先處理最根本的兩個結構性問題：
            程式碼如何分層，以及一局遊戲的流程如何被有秩序地描述。
        </p>

        <h2><i class="fa-solid fa-layer-group" aria-hidden="true"></i>分層框架：一次開發、多次復用</h2>
        <p>
            為了在持續產出新遊戲的同時，保持程式碼品質與開發效率，
            我們採用了<strong>三層式架構</strong>來組織整個客端系統：
        </p>
        <DiagramFigure caption="分層的目的是一次開發、多次復用：換一款遊戲時，下面兩層原封不動。">
            <svg viewBox="0 0 640 334" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>客端的三層架構</title>
            <desc>由上而下是遊戲應用層、老虎機框架層與通用引擎層，愈下層愈通用、愈能被復用。</desc>
            <defs><marker id="dgArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fill-opacity="0.55"/></marker></defs>
            <rect x="40" y="16" width="560" height="74" rx="8" fill="var(--dg-1)" fill-opacity="0.12"/>
            <rect x="40" y="16" width="5" height="74" rx="3" fill="var(--dg-1)"/>
            <text x="64" y="46" font-size="14" fill="var(--dg-1-ink)" font-weight="700">遊戲應用層</text>
            <text x="64" y="68" font-size="12" fill="currentColor" opacity="0.85">主題素材 / 特殊玩法 / 自訂動畫</text>
            <line x1="320" y1="90" x2="320" y2="106" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="40" y="116" width="560" height="74" rx="8" fill="var(--dg-2)" fill-opacity="0.12"/>
            <rect x="40" y="116" width="5" height="74" rx="3" fill="var(--dg-2)"/>
            <text x="64" y="146" font-size="14" fill="var(--dg-2-ink)" font-weight="700">老虎機框架層</text>
            <text x="64" y="168" font-size="12" fill="currentColor" opacity="0.85">滾輪引擎 / 狀態機 / 中獎展示 / 賠付線</text>
            <line x1="320" y1="190" x2="320" y2="206" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="40" y="216" width="560" height="74" rx="8" fill="var(--dg-3)" fill-opacity="0.12"/>
            <rect x="40" y="216" width="5" height="74" rx="3" fill="var(--dg-3)"/>
            <text x="64" y="246" font-size="14" fill="var(--dg-3-ink)" font-weight="700">通用引擎層</text>
            <text x="64" y="268" font-size="12" fill="currentColor" opacity="0.85">渲染管線 / 資源載入 / 音效 / 通訊 / 事件系統</text>
            <text x="320" y="320" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">愈往下愈通用，換一款遊戲時只有最上層需要重做</text>
            </svg>
        </DiagramFigure>
        <h3>通用引擎層</h3>
        <p>
            最底層是與遊戲類型無關的通用能力，例如渲染管線、資源載入器、音效播放、
            通訊協議封裝、事件系統、計時器與動畫補間工具等。
            這一層的程式碼適用於任何類型的遊戲，不僅限於老虎機。
        </p>
        <h3>老虎機框架層</h3>
        <p>
            中間層封裝了老虎機品類共通的邏輯：滾輪引擎、狀態機、中獎展示排程、
            賠付線繪製、自動遊戲控制器、歷史紀錄面板等。
            所有老虎機遊戲共享這一層的程式碼，當框架修復了一個問題或優化了效能，所有遊戲都會受益。
            遊戲數量越多，每次改善的回報越大。
        </p>
        <h3>遊戲應用層</h3>
        <p>
            最上層才是每款遊戲獨有的內容：主題美術素材、特殊玩法機制（例如擴展百搭、
            累積式獎池觸發條件等）、自訂動畫與音效。
            開發一款新遊戲時，工程師只需專注於這一層，大幅縮短開發週期。
        </p>
        <h3>什麼該往下沉？</h3>
        <p>
            分層架構最容易失守之處，是判斷一段新邏輯該放在哪一層。我們依循三個判準：
        </p>
        <ul>
            <li><strong>重複次數</strong>：同一段邏輯在第三款遊戲再次出現時才該往下沉。一次是巧合，兩次是模式，三次才是共通需求</li>
            <li><strong>是否依賴主題</strong>：只要邏輯內部需要知道特定主題的資訊（符號種類、場景配置、專屬動畫名稱），它就不該進入框架層。下層永遠不該向上層查詢</li>
            <li><strong>變更頻率</strong>：下層變更的影響面是全部遊戲，變動頻繁的邏輯即使重複出現也該先留在上層觀察</li>
        </ul>
        <h3>架構演進歷程</h3>
        <p>
            這套分層架構並非一開始就是完美的形態，而是經歷了多次演進：
        </p>
        <ul>
            <li><strong>第一階段（慣例約束）</strong>：透過約定俗成的組織方式區分層級，但缺乏強制隔離，容易出現跨層耦合</li>
            <li><strong>第二階段（模組命名空間）</strong>：引入模組化的命名空間機制，讓各層邊界更明確，依賴關係受到約束。跨層引用從「不建議」變成「不可能」</li>
            <li><strong>第三階段（共享元件庫）</strong>：將常用的介面元件（按鈕、彈窗、進度條、數字滾動器等）抽取為獨立的共享元件庫，新遊戲直接引用，確保視覺與行為一致性</li>
        </ul>

        <h2><i class="fa-solid fa-diagram-project" aria-hidden="true"></i>遊戲狀態機：一局 Spin 的完整生命週期</h2>
        <p>
            老虎機的每一局遊戲看似簡單，按下按鈕、滾輪轉動、顯示結果，但背後的狀態管理卻相當複雜。
            我們使用<strong>有限狀態機（Finite State Machine）</strong>來管理一局遊戲的完整生命週期：
        </p>
        <DiagramFigure caption="生命週期不會總是順利走完：快速停止、斷線與逾時都必須有明確的恢復路徑。">
            <svg viewBox="0 0 640 182" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>一局 Spin 的生命週期</title>
            <desc>從開始新局到結算共六個狀態，結算後回到開始，形成封閉循環。</desc>
            <defs><marker id="dgArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fill-opacity="0.55"/></marker></defs>
            <rect x="24" y="44" width="92" height="54" rx="7" fill="var(--dg-1)" fill-opacity="0.14"/>
            <rect x="24" y="44" width="92" height="3" rx="2" fill="var(--dg-1)"/>
            <text x="70" y="76" font-size="12.5" fill="currentColor" text-anchor="middle" font-weight="700">開始新局</text>
            <line x1="117" y1="71" x2="123" y2="71" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="124" y="44" width="92" height="54" rx="7" fill="var(--dg-2)" fill-opacity="0.14"/>
            <rect x="124" y="44" width="92" height="3" rx="2" fill="var(--dg-2)"/>
            <text x="170" y="76" font-size="12.5" fill="currentColor" text-anchor="middle" font-weight="700">啟動滾輪</text>
            <line x1="217" y1="71" x2="223" y2="71" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="224" y="44" width="92" height="54" rx="7" fill="var(--dg-3)" fill-opacity="0.14"/>
            <rect x="224" y="44" width="92" height="3" rx="2" fill="var(--dg-3)"/>
            <text x="270" y="76" font-size="12.5" fill="currentColor" text-anchor="middle" font-weight="700">持續滾動</text>
            <line x1="317" y1="71" x2="323" y2="71" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="324" y="44" width="92" height="54" rx="7" fill="var(--dg-1)" fill-opacity="0.14"/>
            <rect x="324" y="44" width="92" height="3" rx="2" fill="var(--dg-1)"/>
            <text x="370" y="69" font-size="12.5" fill="currentColor" text-anchor="middle" font-weight="700">停輪寫入</text>
            <text x="370" y="86" font-size="12.5" fill="currentColor" text-anchor="middle" font-weight="700">結果</text>
            <line x1="417" y1="71" x2="423" y2="71" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="424" y="44" width="92" height="54" rx="7" fill="var(--dg-2)" fill-opacity="0.14"/>
            <rect x="424" y="44" width="92" height="3" rx="2" fill="var(--dg-2)"/>
            <text x="470" y="76" font-size="12.5" fill="currentColor" text-anchor="middle" font-weight="700">中獎展示</text>
            <line x1="517" y1="71" x2="523" y2="71" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="524" y="44" width="92" height="54" rx="7" fill="var(--dg-3)" fill-opacity="0.14"/>
            <rect x="524" y="44" width="92" height="3" rx="2" fill="var(--dg-3)"/>
            <text x="570" y="76" font-size="12.5" fill="currentColor" text-anchor="middle" font-weight="700">結算</text>
            <path d="M 570 98 L 570 128 L 70 128 L 70 102" fill="none" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <text x="320" y="144" font-size="12" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">結算後回到開始新局</text>
            <text x="320" y="168" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">狀態機讓每一步的進入與離開條件都是明確且可測試的</text>
            </svg>
        </DiagramFigure>
        <h3>為什麼不用旗標加回呼？</h3>
        <p>
            最直覺的做法是用布林旗標記錄現況：是否正在旋轉、是否已收到結果、是否正在播放中獎動畫。
            但五個獨立旗標就有三十二種組合，其中絕大多數是不該存在的非法狀態，程式碼裡卻沒有地方明確禁止它們。
            狀態機把合法狀態縮限到有限且可列舉，並把轉換規則寫死。
            不該發生的轉換會在當下被攔截，而不是等玩家看到異常畫面才被發現。
        </p>
        <h3>各階段職責</h3>
        <ul>
            <li><strong>開始新局</strong>：鎖定操作介面、發送下注請求、更新下注數值顯示。鎖定必須在請求送出前完成，否則會有重複下注的風險</li>
            <li><strong>啟動滾輪</strong>：依據設定的延遲間隔逐欄啟動滾輪動畫，讓旋轉呈現由左至右的波浪效果</li>
            <li><strong>持續滾動</strong>：滾輪以恆定速度旋轉，等待伺服器回傳結果。需處理「提前收到結果」與「結果延遲」兩種情境：前者要維持最短視覺旋轉時間，後者要能無限期延續而不失真</li>
            <li><strong>停輪寫入結果</strong>：將伺服器回傳的符號矩陣寫入各滾輪的目標位置，觸發逐欄停止動畫</li>
            <li><strong>中獎展示</strong>：依據中獎資訊播放對應的動畫與音效，可能包含逐線展示、全屏特效、大獎慶祝動畫等</li>
            <li><strong>結算</strong>：更新數值顯示、記錄本局結果、解鎖操作介面，準備進入下一局</li>
        </ul>
        <h3>狀態機的可擴展性</h3>
        <p>
            狀態機的設計允許在任意兩個階段之間<strong>插入自訂邏輯</strong>。
            例如，某款遊戲在停輪後需要觸發「符號變換」動畫，只需在「停輪寫入結果」與「中獎展示」之間
            註冊一個額外的狀態處理器，完全不需要修改框架層的程式碼。
        </p>
        <p>
            這個機制依賴<strong>觀察者模式</strong>：每個階段進出時都會發出事件，上層訂閱後即可插入節點。
            關鍵在於插入的節點必須能<strong>非同步地宣告完成</strong>。狀態機會等它回報完成才繼續推進，
            因此數秒長的自訂動畫也能自然嵌入生命週期，框架層完全不需要預先知道它的存在。
        </p>
        <h3>多流程與例外中斷</h3>
        <p>
            老虎機經常涉及<strong>多流程切換</strong>：主遊戲與免費遊戲之間的轉場、
            特殊玩法模式的進入與退出。我們讓每種流程擁有獨立的狀態機實例，
            彼此透過明確的進入／退出事件溝通，避免流程之間的狀態污染。
        </p>
        <p>
            生命週期也不會總是順利走完：玩家可能中途按下快速停止，網路可能在等待結果時斷開。
            因此每個階段都要標記自己是否<strong>可被中斷</strong>。展示類階段通常可跳過，
            涉及資料一致性的階段則必須完整執行。被跳過的階段不是直接丟棄，而是被要求「立即完成」，
            確保跳過後的畫面與正常流程一致。
        </p>

        <p>
            分層與狀態機構成了客端的骨架。骨架之上還有兩組值得深入的主題：滾輪的動畫曲線與停輪控制，
            以及通訊、資源與介面層級這些支撐系統。我們在同系列的另外兩篇文章中分別展開。
        </p>

    </div>
</template>

<script setup>
import DiagramFigure from '/src/vue/components/generic/DiagramFigure.vue'
</script>

<style lang="scss" scoped>
.blog-article {
    line-height: 1.8;
    font-size: 1rem;
    color: #333;

    h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid rgba(13, 110, 253, 0.2);
    }

    h3 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
    }

    p {
        margin-bottom: 1rem;
    }

    ul {
        margin-bottom: 1rem;
        padding-left: 1.5rem;

        li {
            margin-bottom: 0.5rem;
        }
    }

    strong {
        color: #222;
    }
}
</style>
