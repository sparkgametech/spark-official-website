<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-list-check" aria-hidden="true"></i>功能測試</h2>
        <p>
            功能測試的任務，是確認遊戲邏輯在<strong>所有可能的執行路徑</strong>上都與設計一致，
            並且在異常情境下仍能維持狀態的正確性。
        </p>

        <h3>遊戲狀態機覆蓋</h3>
        <p>
            老虎機的遊戲流程可以建模為一個<strong>有限狀態機（Finite State Machine）</strong>，
            包含基礎遊戲、免費遊戲、Bonus 回合、大獎慶祝等多種狀態。
            功能測試必須覆蓋<strong>每一個可能的狀態轉換路徑</strong>，包括：
        </p>
        <ul>
            <li>基礎遊戲 → 免費遊戲 → 基礎遊戲（正常流程）</li>
            <li>免費遊戲中重新觸發免費遊戲（Retrigger）</li>
            <li>基礎遊戲 → Bonus 回合 → 基礎遊戲</li>
            <li>免費遊戲中觸發 Bonus 回合（若設計允許）</li>
            <li>任何狀態下的錯誤恢復路徑</li>
        </ul>
        <p>
            明確畫出狀態機的價值，在於它讓<strong>覆蓋率變成可量化的指標</strong>。
            覆蓋有層級之分：每個狀態都被進入過只是最低標準，
            每一條合法轉換邊都被走過才是基本門檻；
            而最容易藏 Bug 的是<strong>連續轉換的組合</strong>：
            兩個功能單獨測試都正確，接連觸發卻可能因狀態殘留而出錯。
            此外還須主動嘗試<strong>不該發生的轉換</strong>，
            確認系統明確拒絕而非進入未定義狀態。
        </p>
        <DiagramFigure caption="明確畫出狀態機的價值，在於它讓覆蓋率變成可量化的指標。">
            <svg viewBox="0 0 640 308" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>狀態機覆蓋率的四個層級</title>
            <desc>從每個狀態被進入過，到每條轉換邊被走過，再到連續轉換組合與非法轉換的拒絕。</desc>
            <rect x="40" y="34" width="560" height="50" rx="8" fill="var(--dg-1)" fill-opacity="0.12"/>
            <rect x="40" y="34" width="5" height="50" rx="3" fill="var(--dg-1)"/>
            <rect x="60" y="49" width="20" height="20" rx="4" fill="var(--dg-1)"/>
            <text x="70" y="64" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="700">1</text>
            <text x="94" y="56" font-size="13" fill="var(--dg-1-ink)" font-weight="700">狀態覆蓋</text>
            <text x="94" y="74" font-size="11.5" fill="currentColor" opacity="0.8">每個狀態都被進入過，這只是最低標準</text>
            <rect x="40" y="96" width="560" height="50" rx="8" fill="var(--dg-2)" fill-opacity="0.12"/>
            <rect x="40" y="96" width="5" height="50" rx="3" fill="var(--dg-2)"/>
            <rect x="60" y="111" width="20" height="20" rx="4" fill="var(--dg-2)"/>
            <text x="70" y="126" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="700">2</text>
            <text x="94" y="118" font-size="13" fill="var(--dg-2-ink)" font-weight="700">轉換邊覆蓋</text>
            <text x="94" y="136" font-size="11.5" fill="currentColor" opacity="0.8">每一條合法轉換邊都被走過，才是基本門檻</text>
            <rect x="40" y="158" width="560" height="50" rx="8" fill="var(--dg-3)" fill-opacity="0.12"/>
            <rect x="40" y="158" width="5" height="50" rx="3" fill="var(--dg-3)"/>
            <rect x="60" y="173" width="20" height="20" rx="4" fill="var(--dg-3)"/>
            <text x="70" y="188" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="700">3</text>
            <text x="94" y="180" font-size="13" fill="var(--dg-3-ink)" font-weight="700">連續轉換組合</text>
            <text x="94" y="198" font-size="11.5" fill="currentColor" opacity="0.8">最容易藏 Bug 之處：單獨測試都對，接連觸發卻因狀態殘留出錯</text>
            <rect x="40" y="220" width="560" height="50" rx="8" fill="var(--dg-1)" fill-opacity="0.12"/>
            <rect x="40" y="220" width="5" height="50" rx="3" fill="var(--dg-1)"/>
            <rect x="60" y="235" width="20" height="20" rx="4" fill="var(--dg-1)"/>
            <text x="70" y="250" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="700">4</text>
            <text x="94" y="242" font-size="13" fill="var(--dg-1-ink)" font-weight="700">非法轉換</text>
            <text x="94" y="260" font-size="11.5" fill="currentColor" opacity="0.8">主動嘗試不該發生的轉換，確認系統明確拒絕而非進入未定義狀態</text>
            <text x="320" y="294" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">層級愈高愈能抓到真正的問題，而不只是把流程跑過一遍</text>
            </svg>
        </DiagramFigure>

        <h3>邊界條件測試</h3>
        <p>
            邊界條件是 Bug 最容易藏身之處，關鍵場景包括：
        </p>
        <ul>
            <li><strong>最大注碼 + 最大贏獎</strong>：驗證最高可能獎金不會超出系統的數值範圍（整數溢位風險）</li>
            <li><strong>餘額為零</strong>：確認餘額不足時的行為正確，無法啟動 Spin 且提示明確</li>
            <li><strong>餘額恰好等於下注金額</strong>：最後一次 Spin 的扣除與獎金結算是否正確</li>
            <li><strong>跨時區操作</strong>：伺服器時間與客戶端時間不一致時，遊戲記錄的時間戳是否正確</li>
        </ul>

        <h3>中斷與恢復的邊界情境</h3>
        <p>
            中斷可能發生在<strong>一局遊戲生命週期的任何時間點</strong>，
            而不同時間點的正確行為完全不同，測試應把一局切分成明確階段：
        </p>
        <ul>
            <li><strong>請求已送出、伺服器尚未收到</strong>：應視為該局從未發生，注碼不得被扣除</li>
            <li><strong>伺服器已結算、回應尚未送達</strong>：必須取回既有結果，不可重新產生一局</li>
            <li><strong>回應已送達、動畫播放中</strong>：應直接呈現最終結果或從中斷處續播</li>
            <li><strong>免費遊戲進行中</strong>：剩餘次數、累計獎金與暫存狀態都須完整還原</li>
        </ul>
        <p>
            這些情境共同指向一個原則：<strong>局的結果必須由伺服器端唯一決定並持久保存</strong>，
            客戶端的恢復只是重新取得既有結果的呈現權。
            也要驗證連續多次中斷後結果是否一致。
        </p>

        <h3>特殊功能測試</h3>
        <p>
            隨著機制日益豐富，特殊功能的測試覆蓋面也越來越廣：
        </p>
        <ul>
            <li><strong>Cascading Wins（連鎖消除）</strong>：中獎符號消除後新符號填入，需驗證每一層消除的結算和動畫正確性</li>
            <li><strong>Hold &amp; Spin</strong>：特定符號鎖定後重新旋轉的機制，需測試鎖定狀態的保存和恢復</li>
            <li><strong>Megaways（萬路機制）</strong>：每條轉輪的符號數量隨機變化，需驗證所有可能的排列下勝線計算正確</li>
            <li><strong>Buy Feature</strong>：直接購買進入特殊功能的選項，需驗證扣除與功能觸發的一致性</li>
        </ul>

        <h3>多解析度與多裝置驗證</h3>
        <p>
            同一款遊戲會在比例、像素密度與效能差異極大的裝置上執行，
            因此需先定義一組<strong>代表性的裝置矩陣</strong>，並逐一驗證：
        </p>
        <ul>
            <li>橫向與直向切換後版面能否正確重排，且不中斷進行中的遊戲狀態</li>
            <li>異形螢幕的安全區域是否被正確避開，關鍵操作元件不被遮擋</li>
            <li>低階裝置上的動畫降級策略是否生效，且不影響結算邏輯</li>
        </ul>

        <h3>多幣別與多語系驗證</h3>
        <p>
            面向國際市場的遊戲需支援多種貨幣單位和語言，測試重點包括：
            數值換算的精確度（特別是小數位數不同的單位之間的轉換）、
            不同語系下文字是否溢出介面元素、
            數字格式化是否符合各地區慣例（如千分位分隔符號的差異）。
        </p>

        <h2><i class="fa-solid fa-hand-pointer" aria-hidden="true"></i>體感測試</h2>

        <h3>真人玩家測試</h3>
        <p>
            數學模型通過驗證只代表遊戲在理論上正確，
            但<strong>「數學正確」不等於「體驗良好」</strong>。
            體感測試（Playtest）邀請真實玩家實際遊玩，從主觀角度評估各個面向。
            測試玩家會被要求記錄以下觀察：
        </p>
        <ul>
            <li>中獎的分佈是否「感覺」合理？是否存在長時間完全不中獎的「乾旱期」？</li>
            <li>大獎出現時的興奮度是否足夠？慶祝動畫和音效是否匹配獎金的量級？</li>
            <li>遊戲的整體節奏是否舒適？Spin 速度是否太快或太慢？</li>
            <li>免費遊戲的觸發頻率是否讓人感到有期待感？</li>
        </ul>

        <h3>體感評估的量表設計</h3>
        <p>
            體感測試最大的風險，是產出一堆無法比較、也無法追蹤的主觀描述。
            解決方式是把評估<strong>結構化為量表</strong>：
            不要只問「好不好玩」，而是拆成節奏感、期待感、中獎滿足感、視聽一致性等獨立維度；
            每個分數等級都附上具體的行為描述；規定相同的遊玩局數與起始條件；
            並完整記錄受測者實際遭遇的中獎序列，才能把評分對應回具體的遊玩歷程。
            重度與輕度玩家的評價差異很大，樣本背景也需分層。
        </p>

        <h3>中獎分佈體感</h3>
        <p>
            這是體感測試中最微妙的部分。同樣是 96.5% 的 RTP，
            不同的獎金分佈模式會帶來截然不同的主觀感受：
            若把大部分 RTP 集中在少數大獎上，數學上完全正確，
            普通玩家卻可能因長時間不中獎而感到挫敗。
            體感測試需要評估<strong>獎金分佈是否符合目標玩家群的期望</strong>。
        </p>

        <h3>動畫時序與滿足感</h3>
        <p>
            Spin 動畫的時長、中獎數字跳動的速度、慶祝畫面的持續時間，
            這些細微參數都會顯著影響滿足感。體感測試會特別關注轉輪停止的節奏感、
            大獎動畫的時長是否恰當（太短感覺不到重要性、太長讓人不耐煩），
            以及整體的視聽同步性。
        </p>

        <h3>從主觀回饋到可執行的調整</h3>
        <p>
            回饋若停留在「感覺不夠爽」，對開發團隊沒有實質幫助。
            關鍵是建立<strong>從感受回推到參數</strong>的轉譯流程：
            先把模糊的抱怨對應到量表維度，再連結到少數幾個可調整的參數。
            例如「大獎不夠興奮」可能對應到慶祝動畫時長、數字跳動的加速曲線或音效層次；
            而「乾旱期太長」屬於分佈問題，需回到數學模型檢視小額獎項的密度。
            每項調整都應記錄為<strong>可驗證的假設</strong>，並在下一輪用相同量表確認效果。
        </p>

        <h3>競品比較分析</h3>
        <p>
            體感測試通常會包含<strong>競品比較環節</strong>：
            讓測試玩家同時體驗同類型的競品遊戲，然後進行對比評估。
            這有助於發現自身產品在體驗層面的優勢和不足，
            確保遊戲在市場中具有競爭力。比較的維度包括視覺品質、音效質感、
            遊戲節奏、中獎體驗，以及整體的「想再玩一次」的意願強度。
        </p>
        <p>
            功能與體感構成了實作層面的完整驗證。
            至於支撐這一切的數學模型驗證方法，
            以及這些測試如何被大規模自動執行、如何通過第三方認證審計，
            則分別在本系列的另外兩篇中討論。
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
