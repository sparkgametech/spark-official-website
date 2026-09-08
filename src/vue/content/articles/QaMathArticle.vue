<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-vial" aria-hidden="true"></i>老虎機測試的特殊性</h2>
        <p>
            老虎機遊戲的品質保證（QA）與一般軟體測試有著根本性的差異。
            一般軟體的測試重點在於「功能是否正確運作」，但老虎機測試還必須額外驗證三件事：
        </p>
        <ul>
            <li><strong>數學模型的正確性</strong></li>
            <li><strong>隨機性的公平性</strong></li>
            <li><strong>玩家體驗的合理性</strong></li>
        </ul>
        <p>
            這三個維度交織在一起，構成極具複雜度的挑戰。
        </p>
        <p>
            老虎機的核心是一個<strong>機率系統</strong>。每一次 Spin 的結果都是隨機的，
            但在大量樣本下必須收斂到預設的數學期望值。
            測試團隊因此不能僅憑少量結果下結論，
            而需透過百萬甚至上億次的模擬來驗證統計上的正確性。
        </p>

        <h3>為什麼功能測試不足以定義品質</h3>
        <p>
            一般軟體的驗收條件多半是<strong>確定性</strong>的：給定輸入，輸出必須等於預期值。
            老虎機並非如此。一款數學模型完全錯誤的遊戲，仍然可以毫無障礙地通過所有<a href="/blog/qa-functional-playtest">功能測試</a>：
            按鈕會回應、動畫會播放、結算不會崩潰，介面上看不出任何異常；
            錯誤只以「長期平均值偏離設計值」的形式存在，
            而這個偏離在數萬局的觀察尺度下仍可能被隨機波動完全掩蓋。
        </p>
        <p>
            換句話說，老虎機的正確性是一個<strong>統計性質的斷言</strong>，
            而不是一份可以逐項勾選的功能清單。
            驗證它需要的不是更多測試案例，而是<strong>足夠的樣本量與正確的統計判準</strong>。
        </p>
        <p>
            此外，任何計算上的偏差都會被大量局數持續放大：
            一個小數點的錯位、一個邊界條件的遺漏，都可能累積成顯著的數值偏移。
            因此老虎機的測試標準遠高於一般消費級軟體，
            必須符合<strong>國際認證機構（如 GLI、BMM）</strong>的嚴格審計要求。
        </p>

        <h2><i class="fa-solid fa-square-root-variable" aria-hidden="true"></i>數學驗證測試</h2>

        <h3>RTP 收斂性測試</h3>
        <p>
            <strong>RTP（Return to Player，玩家回報率）</strong>是老虎機最核心的數學指標。
            例如一款設定 RTP 為 96.5% 的遊戲，理論上每投入 100 單位，長期平均回報為 96.5 單位。驗證 RTP 的方式是進行<strong>大規模模擬測試</strong>：
            通常需要執行數百萬到數千萬次的模擬 Spin，然後計算實際 RTP 是否收斂到目標值。
        </p>
        <p>
            模擬測試不是跑完看一個數字而已，團隊需要觀察 RTP 的<strong>收斂曲線</strong>：
            在不同的取樣量（10 萬次、50 萬次、100 萬次、500 萬次）下，
            RTP 應該逐步收斂並穩定在目標值的統計可接受範圍內。
            若收斂速度異常緩慢或出現不正常的震盪，通常意味著數學模型存在問題。
        </p>

        <h3>需要多少樣本才有統計意義</h3>
        <p>
            「跑一百萬局夠不夠」是數學驗證中最常被問到的問題，
            正確的答案是：<strong>取決於這款遊戲的波動度</strong>。
            蒙地卡羅模擬的誤差大致與樣本數的平方根成反比。
            想把誤差縮小一半，樣本量必須增加為四倍。
        </p>
        <p>
            更關鍵的是，決定誤差的不只是樣本量，還有<strong>單局回報的標準差</strong>。
            低波動度遊戲的單局回報集中在小額區間，數十萬局就足以讓平均值穩定；
            高波動度遊戲的 RTP 貢獻大多集中在每數萬局才出現一次的高額結果上，
            因此需要數千萬甚至上億局才能讓稀有事件充分出現。
            用低波動度的樣本量標準去驗證高波動度遊戲，得到的「收斂」往往只是假象。
        </p>
        <p>
            實務上的做法是<strong>反推</strong>：先決定可接受的誤差範圍，
            再依理論標準差推算所需的最小樣本量。
        </p>

        <h3>統計信賴區間怎麼判讀</h3>
        <p>
            數學驗證都必須考慮<strong>統計信賴區間（Confidence Interval）</strong>。
            由於樣本量有限，結果永遠不會精確等於理論值，報告中必須標明取樣量與對應的信賴區間。
            例如在 95% 的信賴水準下，RTP 應落在 96.5% ± 0.1% 的範圍內。
        </p>
        <p>
            判讀時有兩個常見誤解。其一，<strong>結果落在區間內不代表模型被證明正確</strong>，
            只代表現有證據不足以推翻它；區間寬度本身就是品質指標：
            標示誤差範圍 ±1.5% 的報告，在統計上幾乎無法區分 95% 與 98% 的模型。
        </p>
        <p>
            其二，結果落在區間之外也不必然代表模型錯誤。正確的程序是<strong>逐層排除</strong>：
            先確認取樣量是否足以支撐該波動度下的判準，
            再檢查模擬是否覆蓋所有功能路徑，最後才回頭檢視機率表本身。
        </p>

        <h3>中獎頻率驗證</h3>
        <p>
            除了整體 RTP，每一種<strong>符號組合的中獎頻率（Hit Frequency）</strong>也需要獨立驗證。
            機率表（PAR Sheet）定義了每種中獎組合的理論機率，模擬結果必須與之吻合。
            測試時會對每種組合的出現次數進行<strong><a href="/blog/risk-control-algorithm">卡方檢定</a>（Chi-Square Test）</strong>，
            確認實際分佈與理論分佈之間沒有統計上顯著的差異。
            總 RTP 正確的模型，內部仍可能存在兩個彼此抵銷的錯誤。
        </p>
        <DiagramFigure caption="總 RTP 正確的模型，內部仍可能存在兩個彼此抵銷的錯誤。">
            <svg viewBox="0 0 640 250" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>總 RTP 正確，內部仍可能有錯</title>
            <desc>兩種組合的中獎頻率一高一低且幅度相抵，總回報率看起來完全正常。</desc>
            <rect x="92" y="132" width="26" height="58" rx="3" fill="var(--dg-2)" fill-opacity="0.45"/>
            <rect x="122" y="132" width="26" height="58" rx="3" fill="var(--dg-2)"/>
            <text x="120" y="208" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">組合 1</text>
            <rect x="178" y="116" width="26" height="74" rx="3" fill="var(--dg-2)" fill-opacity="0.45"/>
            <rect x="208" y="82" width="26" height="108" rx="3" fill="var(--dg-1)"/>
            <text x="206" y="208" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">組合 2</text>
            <text x="206" y="74" font-size="11" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">偏高</text>
            <rect x="264" y="128" width="26" height="62" rx="3" fill="var(--dg-2)" fill-opacity="0.45"/>
            <rect x="294" y="128" width="26" height="62" rx="3" fill="var(--dg-2)"/>
            <text x="292" y="208" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">組合 3</text>
            <rect x="350" y="102" width="26" height="88" rx="3" fill="var(--dg-2)" fill-opacity="0.45"/>
            <rect x="380" y="136" width="26" height="54" rx="3" fill="var(--dg-1)"/>
            <text x="378" y="208" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">組合 4</text>
            <text x="378" y="94" font-size="11" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">偏低</text>
            <rect x="436" y="120" width="26" height="70" rx="3" fill="var(--dg-2)" fill-opacity="0.45"/>
            <rect x="466" y="120" width="26" height="70" rx="3" fill="var(--dg-2)"/>
            <text x="464" y="208" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">組合 5</text>
            <line x1="78" y1="190" x2="600" y2="190" stroke="currentColor" stroke-opacity="0.3" stroke-width="1"/>
            <rect x="92" y="30" width="12" height="12" rx="2" fill="var(--dg-2)" fill-opacity="0.45"/>
            <text x="112" y="40" font-size="11.5" fill="currentColor" opacity="0.8">理論機率</text>
            <rect x="202" y="30" width="12" height="12" rx="2" fill="var(--dg-2)"/>
            <text x="222" y="40" font-size="11.5" fill="currentColor" opacity="0.8">實際模擬</text>
            <text x="320" y="236" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">這正是每種組合都要單獨做卡方檢定的理由</text>
            </svg>
        </DiagramFigure>

        <h3>波動度驗證</h3>
        <p>
            <strong>波動度（Volatility / Variance）</strong>描述的是獎金分佈的離散程度。
            高波動度的遊戲意味著中獎頻率較低但單次獎金可能很高；
            低波動度則是經常中小獎。測試需要驗證遊戲的實際波動度
            是否符合設計意圖，通常透過計算<strong>標準差</strong>和分析獎金分佈的直方圖來進行。
        </p>
        <p>
            單一的標準差並不足以描述完整的分佈特性。
            更完整的做法是檢視<strong>回報分佈的分位數</strong>：
            結果的中位數落在哪裡、連續未中獎的最長區段有多長。
            這些指標更能反映實際的遊玩過程。
        </p>

        <h3>極端值與獎項上限的驗證</h3>
        <p>
            分佈的尾端最容易被忽略，風險卻最高，需獨立驗證的項目包括：
        </p>
        <ul>
            <li><strong>理論最大贏獎</strong>：模型允許的最高倍數是否與設計一致，且能被實際達成</li>
            <li><strong>上限截斷的影響</strong>：若存在贏獎上限，被截斷的部分會使實際 RTP 低於理論值，差額必須量化並納入申報值</li>
            <li><strong>數值範圍安全性</strong>：最大注碼搭配最大倍數時，中間計算不得超出數值型別的表示範圍</li>
            <li><strong>尾端貢獻佔比</strong>：分佈尾端貢獻了多少比例的 RTP，這直接決定驗證所需的樣本量</li>
        </ul>

        <h3>特殊功能觸發率</h3>
        <p>
            免費遊戲、Bonus 回合等特殊功能的觸發率是玩家體驗的重要因子，測試需驗證：
        </p>
        <ul>
            <li>免費遊戲的觸發機率是否符合設計值（例如平均每 150 次 Spin 觸發一次）</li>
            <li>免費遊戲中的重新觸發（Retrigger）機率是否正確</li>
            <li>Bonus 功能的期望獎金貢獻是否在合理範圍內</li>
            <li>各觸發條件之間是否存在非預期的交互作用</li>
            <li>特殊功能的 RTP 貢獻佔比是否與設計相符</li>
        </ul>
        <p>
            重新觸發機制尤其需要留意：它讓期望值以無窮級數累加，
            偏差在總 RTP 中不易察覺，
            必須把特殊功能的貢獻<strong>拆分為獨立的統計項目</strong>驗證。
        </p>

        <h2><i class="fa-solid fa-chart-simple" aria-hidden="true"></i>從模擬數據到可信結論</h2>
        <p>
            一份有價值的驗證報告不會只給出「RTP 符合預期」，
            而應完整揭露樣本量、信賴區間、各功能模組的 RTP 貢獻拆解與統計檢定判準。
        </p>
        <p>
            數學驗證確認的是理論上的正確性，但正確的模型仍需正確的實作與良好的體驗來承載。
            關於狀態機覆蓋與玩家體感評估、以及自動化測試與第三方合規認證，
            將在本系列的另外兩篇文章中繼續討論。
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
