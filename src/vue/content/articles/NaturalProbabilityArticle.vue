<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-circle-question" aria-hidden="true"></i>什麼是自然機率？</h2>
        <p>
            在老虎機遊戲中，<strong>自然機率（Natural Probability）</strong>是指完全基於數學模型計算出的中獎機率，
            不受任何外部<a href="/blog/gas-control-system">調控</a>因素影響。每一次 Spin 的結果都由預先設計的<strong>符號權重表（Reel Strip）</strong>決定，
            確保遊戲的公平性與可預測的長期回報率。
        </p>
        <p>
            自然機率設計是老虎機數值系統的基石。一個優秀的自然機率模型，需要同時滿足三個核心目標：
            <strong>數學上精準的 RTP</strong>、<strong>合理的中獎頻率分佈</strong>、以及<strong>良好的玩家體感</strong>。
        </p>
        <p>
            這三個目標彼此拉扯：把 RTP 拉高最簡單的做法是提高高賠符號的權重，但這會同時改變中獎頻率與獎金的分散程度；
            反過來，為了追求「常常中一點小獎」的手感而提高低賠符號的比重，又會壓縮掉大獎所需的 RTP 額度。
            因此自然機率設計的本質，是在一個<strong>總量固定的期望值預算</strong>之下，決定這些回報要「以什麼形狀」發放給玩家。
            數值設計師真正在做的事情，不是決定玩家能拿回多少，而是決定玩家「怎麼拿回」。
        </p>
        <p>
            另一個常被忽略的前提是：自然機率必須是<strong>完全可推導的</strong>。
            也就是說，遊戲上線前，理論上每一種盤面組合的出現機率與對應賠付都應該能夠被列舉或以封閉形式計算出來，
            而不是只能靠跑模擬「試出來」。可推導性決定了後續能不能做精確的參數微調，
            也決定了第三方稽核時能不能提出完整的數學證明文件。
        </p>

        <h2><i class="fa-solid fa-table-list" aria-hidden="true"></i>符號權重表（Reel Strip）設計</h2>
        <p>
            老虎機的每一條轉輪（Reel）上，各個符號並非均勻分佈，而是根據精心計算的<strong>權重（Weight）</strong>進行配置。
            權重越高的符號出現頻率越高，反之則越稀有。
        </p>
        <h3>權重表的基本結構</h3>
        <p>
            一個典型的 5 軸老虎機，每條 Reel 都有獨立的符號權重配置。例如：
        </p>
        <ul>
            <li><strong>低賠符號</strong>（如 10、J、Q、K、A）：每條 Reel 配置 8-12 個，出現頻率高</li>
            <li><strong>中賠符號</strong>（如主題圖案）：每條 Reel 配置 4-6 個，出現頻率中等</li>
            <li><strong>高賠符號</strong>（如角色圖案）：每條 Reel 配置 2-3 個，出現頻率低</li>
            <li><strong>Wild 符號</strong>：每條 Reel 配置 1-2 個，可替代其他符號</li>
            <li><strong>Scatter / Bonus 符號</strong>：每條 Reel 配置 1-2 個，觸發特殊功能</li>
        </ul>
        <p>
            每條 Reel 的總權重（Total Weight）即為所有符號權重的加總。當 <a href="/blog/rng-security">RNG</a> 產生一個隨機數時，
            會根據這個總權重範圍進行映射，決定停在哪個符號上。
        </p>
        <h3>實體轉輪與虛擬轉輪</h3>
        <p>
            早期機械式老虎機的符號數量受限於實體轉輪的格數，現代電子老虎機則普遍採用<strong>虛擬轉輪（Virtual Reel）</strong>的概念：
            玩家在畫面上看到的是有限的幾格符號，但背後對應的是一條長度可能上百格的權重序列。
            虛擬轉輪讓同一個符號可以在序列中重複出現多次，
            設計師因此能以極細的粒度調整單一符號的出現頻率，而不必受畫面格數限制。
        </p>
        <p>
            實務上有兩種等價的表達方式：
        </p>
        <ul>
            <li><strong>展開序列</strong>：把權重表寫成一條「展開後」的符號序列，長度即為總權重。查表快，但記憶體佔用大</li>
            <li><strong>累積分佈</strong>：只記錄每個符號的權重值，再以二分搜尋定位。省空間，但每次抽樣多一次搜尋成本</li>
        </ul>
        <p>
            在需要跑數十億次模擬的驗證階段，這個看似微小的差異會直接反映在總計算時間上。
        </p>
        <h3>權重配置的實際取捨</h3>
        <p>
            設計權重表時，最常遇到的三個取捨如下：
        </p>
        <ul>
            <li><strong>高賠符號的軸間分佈</strong>：把高賠符號集中在前三軸，玩家更容易看到「差一個就中大獎」的畫面，
                期待感強但落空率高；平均分佈則手感平順，卻少了戲劇張力。</li>
            <li><strong>Wild 的擺放位置</strong>：Wild 通常只放在中間幾軸。Wild 對 RTP 的邊際貢獻是非線性的，
                多放一個 Wild 可能同時拉高數十種組合的機率，微調時務必逐一重算而非線性外推。</li>
            <li><strong>Scatter 的獨立性</strong>：Scatter 觸發頻率直接決定 Free Game 的 RTP 佔比，
                通常會把它從主要中獎邏輯中獨立出來單獨調校，避免與連線賠付互相干擾。</li>
        </ul>
        <p>
            另一個容易被忽略的細節是<strong>鄰接限制</strong>：若不加約束，某些高賠符號可能在同一軸上連續出現，
            導致畫面上出現機率極低卻視覺突兀的盤面。多數設計會在權重序列中加入最小間隔規則，
            以維持畫面的視覺節奏，這類規則同樣必須納入機率計算。
        </p>

        <h2><i class="fa-solid fa-calculator" aria-hidden="true"></i>中獎組合機率計算</h2>
        <p>
            以 5 軸老虎機為例，假設每條 Reel 的總權重分別為 W1、W2、W3、W4、W5，
            要計算某個特定中獎組合的機率，需要將各軸上相應符號的權重相乘，再除以總組合數：
        </p>
        <div class="formula-block">
            <code>P(組合) = (符號在R1的權重 × 符號在R2的權重 × ... × 符號在R5的權重) ÷ (W1 × W2 × W3 × W4 × W5)</code>
        </div>
        <p>
            以 Payline-based 的老虎機為例，中獎判定通常要求<strong>從最左邊開始連續出現相同符號</strong>，
            至少 3 個以上才算中獎。因此需要分別計算 3 連、4 連、5 連的機率，並乘以各自的賠率。
        </p>
        <h3>連線機率的排容處理</h3>
        <p>
            計算 3 連的機率時，一個常見錯誤是直接把前三軸的符號機率相乘。
            正確的做法必須排除「第四軸也中」的情況，否則同一個盤面會被重複計入 3 連與 4 連兩次：
        </p>
        <div class="formula-block">
            <code>P(恰好3連) = P(R1) × P(R2) × P(R3) × (1 − P(R4))</code>
        </div>
        <p>
            當 Wild 加入之後，情況會更複雜：每一軸上「命中該符號」的機率其實是<strong>該符號權重加上 Wild 權重</strong>，
            而 Wild 本身若也有自己的賠率表，還必須額外處理「全 Wild 連線取較高賠付」的情況。
            實務上會將這一段拆成獨立的判定函式，並用小規模的窮舉盤面做交叉驗證，確保沒有重複計算或遺漏。
        </p>

        <h3>Ways 型老虎機的計算差異</h3>
        <p>
            在 243 Ways 或 1024 Ways 等多路型老虎機中，不使用固定的 Payline，
            而是計算每條 Reel 上目標符號的<strong>出現次數</strong>。中獎的 Ways 數量等於各軸符號出現次數的乘積：
        </p>
        <div class="formula-block">
            <code>Ways = Count(R1) × Count(R2) × Count(R3) × ...</code>
        </div>
        <p>
            兩者最大的差異在於<strong>賠付的分佈形狀</strong>。固定 Payline 的機台，單次中獎的金額分佈相對離散，
            因為每條線要嘛中、要嘛不中；Ways 型則因為同一符號在單軸上可以出現 2 到 3 次，
            單次中獎金額會出現明顯的「倍增效應」，分佈變得更長尾。
        </p>
        <p>
            以 3 列 5 軸為例，若某符號在每一軸上都出現兩次，一次中獎就是 2×2×2 = 8 條路徑同時賠付。
            這代表 Ways 型在相同 RTP 下，通常需要<strong>降低符號的整體權重</strong>來平衡倍增帶來的期望值膨脹，
            結果就是命中次數變少、單次金額變大，也就是波動率自然偏高。
            這也解釋了為什麼多數 Ways 型機台會搭配較高的免費遊戲佔比：
            玩家在一般轉輪的空轉感較重，需要一個明確的目標來維持節奏。
        </p>

        <h2><i class="fa-solid fa-percent" aria-hidden="true"></i>RTP（Return to Player）計算</h2>
        <p>
            <strong>RTP</strong> 是老虎機最重要的數值指標，代表長期而言玩家每投入 1 元可預期收回的金額比例。
            例如 RTP 96.5% 表示長期平均每投注 100 元，玩家可期望收回 96.5 元。
        </p>
        <p>
            RTP 的計算方式是將所有可能的中獎組合的<strong>期望值</strong>加總：
        </p>
        <div class="formula-block">
            <code>RTP = Σ (每個中獎組合的機率 × 該組合的賠率)</code>
        </div>
        <h3>一個具體的期望值推導</h3>
        <p>
            假設某個高賠符號在五條軸上的權重分別是 2、2、2、3、3，各軸總權重皆為 60，
            則五連的機率為 (2×2×2×3×3) ÷ 60⁵ ≈ 9.26×10⁻⁷。
            若五連賠率為 500 倍，該組合對 RTP 的貢獻即為 9.26×10⁻⁷ × 500 ≈ 0.046%。
        </p>
        <p>
            從這個數字可以看出一個重要事實：<strong>單一大獎組合對總 RTP 的貢獻通常小到可以忽略</strong>。
            真正撐起 RTP 的是那些機率在千分之一到百分之一之間、賠率只有數倍到數十倍的中低階組合。
            這也是為什麼調整大獎賠率對 RTP 幾乎沒有影響，卻會顯著改變波動率。
            它動到的是分佈的尾端，而不是分佈的重心。
        </p>
        <p>
            實務上，RTP 的組成通常可拆解為：
        </p>
        <ul>
            <li><strong>Base Game RTP</strong>：一般轉輪的回報貢獻，通常佔 50-70%</li>
            <li><strong>Free Game RTP</strong>：免費旋轉的回報貢獻，通常佔 20-35%</li>
            <li><strong>Bonus Feature RTP</strong>：特殊功能的回報貢獻，通常佔 5-15%</li>
        </ul>
        <p>
            Free Game 的 RTP 貢獻需要特別小心，因為它是<strong>觸發機率 × 單次期望回報</strong>的乘積，
            而單次期望回報本身又可能因為「再觸發（Retrigger）」而形成無窮級數。
            若每次免費遊戲有機率 r 再觸發，期望局數會收斂為 n ÷ (1 − r)，
            這個放大係數在 r 接近 0.3 以上時會相當可觀，是免費遊戲 RTP 失控的最常見原因。
        </p>

        <h2><i class="fa-solid fa-chart-line" aria-hidden="true"></i>波動率（Volatility）設計</h2>
        <p>
            除了 RTP 之外，<strong>波動率</strong>是影響玩家體感的關鍵指標。波動率決定了中獎的「分散程度」：
        </p>
        <ul>
            <li><strong>低波動率</strong>：頻繁小獎，適合休閒玩家，資金消耗緩慢</li>
            <li><strong>中波動率</strong>：平衡型，兼顧中獎頻率與獎金大小</li>
            <li><strong>高波動率</strong>：稀少大獎，適合追求刺激的玩家，資金波動劇烈</li>
        </ul>
        <DiagramFigure caption="兩者的 RTP 可以完全相同，玩家感受到的節奏卻天差地遠：差別在賠付如何分佈，而不是總量。">
            <svg viewBox="0 0 640 272" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>中波動與高波動的賠付分佈</title>
            <desc>中波動機台的賠付集中在小獎與中獎，高波動機台則以未中獎為主、僅有稀少的大獎。</desc>
            <text x="165" y="24" font-size="14" fill="currentColor" text-anchor="middle" font-weight="700">中波動</text>
            <text x="165" y="44" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">標準差約 5 ~ 8</text>
            <rect x="52" y="131.2" width="46" height="82.8" rx="4" fill="var(--dg-3)"/>
            <text x="75" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">未中獎</text>
            <rect x="112" y="111.88" width="46" height="102.12" rx="4" fill="var(--dg-3)"/>
            <text x="135" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">小獎</text>
            <rect x="172" y="167.08" width="46" height="46.92" rx="4" fill="var(--dg-3)"/>
            <text x="195" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">中獎</text>
            <rect x="232" y="207.1" width="46" height="6.9" rx="4" fill="var(--dg-3)"/>
            <text x="255" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">大獎</text>
            <line x1="40" y1="214" x2="290" y2="214" stroke="currentColor" stroke-opacity="0.25" stroke-width="1"/>
            <text x="475" y="24" font-size="14" fill="currentColor" text-anchor="middle" font-weight="700">高波動</text>
            <text x="475" y="44" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">標準差 15 以上</text>
            <rect x="362" y="82.9" width="46" height="131.1" rx="4" fill="var(--dg-1)"/>
            <text x="385" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">未中獎</text>
            <rect x="422" y="178.12" width="46" height="35.88" rx="4" fill="var(--dg-1)"/>
            <text x="445" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">小獎</text>
            <rect x="482" y="197.44" width="46" height="16.56" rx="4" fill="var(--dg-1)"/>
            <text x="505" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">中獎</text>
            <rect x="542" y="204.34" width="46" height="9.66" rx="4" fill="var(--dg-1)"/>
            <text x="565" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">大獎</text>
            <line x1="350" y1="214" x2="600" y2="214" stroke="currentColor" stroke-opacity="0.25" stroke-width="1"/>
            <text x="320" y="258" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">橫軸為單次 Spin 的賠付級距，縱軸為出現頻率</text>
            </svg>
        </DiagramFigure>
        <p>
            波動率可透過調整符號權重表中高賠符號與低賠符號的比例來控制。增加高賠符號的權重會降低波動率，
            減少高賠符號的權重則會提高波動率。
        </p>
        <h3>如何量化波動率</h3>
        <p>
            波動率在業界常以文字分級描述，但設計階段必須有明確數字。最通用的量化方式是計算單次 Spin
            賠付倍數 X 的<strong>標準差</strong>：
        </p>
        <div class="formula-block">
            <code>Var(X) = Σ p·x² − (Σ p·x)² ； SD = √Var(X)</code>
        </div>
        <p>
            其中 Σ p·x 就是 RTP 本身。由於分佈極度右偏，標準差往往遠大於平均值：
            一台 RTP 96% 的中波動機台，標準差可能落在 5 到 8 之間；高波動機台則常見 15 以上，
            極端的「大獎導向」設計甚至可以超過 40。
        </p>
        <p>
            另一個實用指標是<strong>波動率指數</strong>，取單次賠付的標準差乘上信賴係數，
            用來估計玩家在 N 局之後實際 RTP 落在什麼區間。由中央極限定理，N 局平均值的標準差為 SD ÷ √N，
            因此可以推得：波動率越高，要讓玩家「感受到」理論 RTP 所需的局數就越多。
            這個推論直接解釋了高波動機台的一個特性：短期體感與理論值可以差距極大，而這正是設計意圖的一部分。
        </p>
        <DiagramFigure caption="波動率越高，實際 RTP 貼近理論值所需的局數越多，這也是短期體感與長期數學經常對不上的原因。">
            <svg viewBox="0 0 640 280" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>實際 RTP 隨局數收斂</title>
            <desc>局數越多，實際 RTP 越貼近理論值；波動率越高，收斂所需的局數越多。</desc>
            <polygon points="78,24 90.95,60.175 103.9,72.8755 116.85,79.8779 129.8,84.4688 142.75,87.7754 155.7,90.303 168.65,92.316 181.6,93.9683 194.55,95.3562 207.5,96.5435 220.45,97.5741 233.4,98.4799 246.35,99.2841 259.3,100.004 272.25,100.654 285.2,101.245 298.15,101.784 311.1,102.28 324.05,102.737 337,103.16 349.95,103.554 362.9,103.922 375.85,104.265 388.8,104.588 401.75,104.892 414.7,105.178 427.65,105.449 440.6,105.705 453.55,105.948 466.5,106.18 479.45,106.4 492.4,106.61 505.35,106.81 518.3,107.002 531.25,107.186 544.2,107.362 557.15,107.531 570.1,107.693 583.05,107.85 596,108 596,132 583.05,132.15 570.1,132.307 557.15,132.469 544.2,132.638 531.25,132.814 518.3,132.998 505.35,133.19 492.4,133.39 479.45,133.6 466.5,133.82 453.55,134.052 440.6,134.295 427.65,134.551 414.7,134.822 401.75,135.108 388.8,135.412 375.85,135.735 362.9,136.078 349.95,136.446 337,136.84 324.05,137.263 311.1,137.72 298.15,138.216 285.2,138.755 272.25,139.346 259.3,139.996 246.35,140.716 233.4,141.52 220.45,142.426 207.5,143.457 194.55,144.644 181.6,146.032 168.65,147.684 155.7,149.697 142.75,152.225 129.8,155.531 116.85,160.122 103.9,167.125 90.95,179.825 78,216" fill="var(--dg-1)" fill-opacity="0.20"/>
            <polygon points="78,80 90.95,95.0729 103.9,100.365 116.85,103.282 129.8,105.195 142.75,106.573 155.7,107.626 168.65,108.465 181.6,109.153 194.55,109.732 207.5,110.226 220.45,110.656 233.4,111.033 246.35,111.368 259.3,111.668 272.25,111.939 285.2,112.185 298.15,112.41 311.1,112.617 324.05,112.807 337,112.984 349.95,113.148 362.9,113.301 375.85,113.444 388.8,113.578 401.75,113.705 414.7,113.824 427.65,113.937 440.6,114.044 453.55,114.145 466.5,114.241 479.45,114.333 492.4,114.421 505.35,114.504 518.3,114.584 531.25,114.661 544.2,114.734 557.15,114.805 570.1,114.872 583.05,114.937 596,115 596,125 583.05,125.063 570.1,125.128 557.15,125.195 544.2,125.266 531.25,125.339 518.3,125.416 505.35,125.496 492.4,125.579 479.45,125.667 466.5,125.759 453.55,125.855 440.6,125.956 427.65,126.063 414.7,126.176 401.75,126.295 388.8,126.422 375.85,126.556 362.9,126.699 349.95,126.852 337,127.016 324.05,127.193 311.1,127.383 298.15,127.59 285.2,127.815 272.25,128.061 259.3,128.332 246.35,128.632 233.4,128.967 220.45,129.344 207.5,129.774 194.55,130.268 181.6,130.847 168.65,131.535 155.7,132.374 142.75,133.427 129.8,134.805 116.85,136.718 103.9,139.635 90.95,144.927 78,160" fill="var(--dg-3)" fill-opacity="0.30"/>
            <line x1="78" y1="120" x2="596" y2="120" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" stroke-opacity="0.75"/>
            <text x="596" y="110" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">理論 RTP</text>
            <text x="78" y="246" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">1 千局</text>
            <text x="250.667" y="246" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">1 萬局</text>
            <text x="423.333" y="246" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">10 萬局</text>
            <text x="596" y="246" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">100 萬局</text>
            <text x="78" y="30" font-size="12" fill="var(--dg-1-ink)" font-weight="700">高波動</text>
            <text x="78" y="48" font-size="12" fill="var(--dg-3-ink)" font-weight="700">中波動</text>
            <text x="320" y="266" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">陰影為實際 RTP 的可能範圍，寬度正比於標準差除以局數的平方根</text>
            </svg>
        </DiagramFigure>

        <h2><i class="fa-solid fa-bullseye" aria-hidden="true"></i>Hit Rate 與中獎頻率</h2>
        <p>
            <strong>Hit Rate（中獎率）</strong>是指每次 Spin 產生任意中獎的機率。
            一般老虎機的 Hit Rate 在 20%-35% 之間，意味著大約每 3-5 次 Spin 會有一次中獎。
        </p>
        <p>
            Hit Rate 與波動率密切相關：高 Hit Rate 通常對應低波動率，低 Hit Rate 則對應高波動率。
            設計時需要在 RTP 固定的前提下，透過調整各級賠率的分佈來達到目標 Hit Rate。
        </p>
        <h3>名目中獎與實質中獎</h3>
        <p>
            單看 Hit Rate 其實會誤判體感。在多線機台上，玩家一次下注涵蓋多條線，
            經常出現「中了一條線但賠付低於總下注」的情況：畫面上有中獎動畫與音效，
            結算下來卻仍是淨損失。這種情形業界稱為<strong>偽裝成中獎的損失</strong>。
        </p>
        <p>
            因此更貼近體感的指標是<strong>淨賺率</strong>：單次 Spin 賠付大於總下注的機率。
            許多 Hit Rate 高達 35% 的機台，淨賺率其實只有 12% 上下。
            設計時若只盯著 Hit Rate，很容易做出「一直在中獎、卻一直在輸」的違和體驗。
            成熟的做法是同時追蹤三個數字：任意中獎率、淨賺率，以及連續未中獎的最長期望長度。
        </p>
        <h3>空轉長度的分佈</h3>
        <p>
            玩家的挫折感往往不來自平均值，而來自<strong>最壞的那段體驗</strong>。
            若單次中獎機率為 p，連續 k 次不中的機率是 (1−p)ᵏ，
            在 N 局的遊戲過程中，最長空轉長度的期望值約為 log(N) ÷ −log(1−p)。
            以 p = 0.25、N = 1000 為例，玩家幾乎必然會遇到一段 24 局左右完全不中的過程。
            設計時把這個數字算出來，並確認它落在可接受範圍內，比事後靠玩家回饋修正要有效得多。
        </p>

        <h2><i class="fa-solid fa-flask" aria-hidden="true"></i>數學驗證與模擬</h2>
        <p>
            設計完成後，必須透過<strong>大量模擬（Simulation）</strong>來驗證數值的正確性。
            通常需要模擬至少 1 億到 10 億次 Spin，確認：
        </p>
        <ul>
            <li>實際 RTP 收斂至目標值（誤差小於 0.1%）</li>
            <li>各中獎組合的實際機率與理論值吻合</li>
            <li>Free Game 和 Bonus 的觸發頻率符合預期</li>
            <li>最大倍數（Max Win）在可接受範圍內</li>
            <li>波動率指標符合設計目標</li>
        </ul>
        <h3>樣本數該取多少？</h3>
        <p>
            「一億次」不該是拍腦袋決定的數字，而應由目標精度反推。
            若希望模擬 RTP 的誤差在 ±ε 之內、信賴水準對應係數為 z，所需樣本數為：
        </p>
        <div class="formula-block">
            <code>N ≥ (z × SD ÷ ε)²</code>
        </div>
        <p>
            以 SD = 10、要求誤差 ±0.1%（ε = 0.001）、95% 信賴水準（z ≈ 1.96）代入，
            可得 N ≈ 3.8 億。若是 SD = 25 的高波動機台，同樣精度所需樣本數會膨脹到約 24 億。
            這正是為什麼高波動機台的驗證成本遠高於低波動機台：
            <strong>所需樣本數與標準差的平方成正比</strong>。
        </p>
        <h3>不只看平均，還要看分佈</h3>
        <p>
            RTP 收斂只是最低標準。完整的驗證還應包含：
        </p>
        <ul>
            <li><strong>卡方適合度檢定</strong>：將模擬得到的各賠率區間次數與理論次數比對，
                檢定統計量若顯著偏大，代表權重表或判定邏輯存在實作錯誤，而非隨機誤差。</li>
            <li><strong>分批收斂觀察</strong>：把總樣本切成數百個批次，觀察各批 RTP 的分佈是否近似常態，
                並比對其標準差是否符合理論預測的 SD ÷ √n。</li>
            <li><strong>尾端事件檢查</strong>：統計最大單次賠付、達到 Max Win 的頻率，
                確認上限確實被觸及過，避免出現「理論上存在、實際上永遠抽不到」的無效大獎。</li>
            <li><strong>蒙地卡羅資金曲線</strong>：以固定初始資金模擬多組玩家歷程，
                觀察在 N 局內破產的比例，用來檢視高波動設計是否超出可接受範圍。</li>
        </ul>
        <p>
            兩條驗證路徑必須交叉比對：一條是<strong>解析計算</strong>（窮舉或封閉公式），
            另一條是<strong>隨機模擬</strong>。兩者若在誤差範圍內吻合，才算真正驗證通過；
            若不吻合，多半不是機率算錯，而是模擬程式與理論模型對規則的理解有落差。
            這種落差往往藏在 Wild 替代、再觸發、連線取值等邊界規則上，正是最容易出錯的地方。
        </p>
        <p>
            模擬驗證是確保自然機率設計正確性的最終防線，任何數學模型的調整都必須經過完整的模擬測試。
            一個成熟的流程會把整套驗證自動化：每次權重表變更就重跑一次完整檢定，
            並將結果與上一版本並列比較，讓數值變動帶來的影響一目了然。
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

    .formula-block {
        background: #f8f9fa;
        border-left: 4px solid var(--bs-primary, #0d6efd);
        padding: 1rem 1.25rem;
        margin: 1rem 0;
        border-radius: 0 8px 8px 0;
        overflow-x: auto;

        code {
            font-size: 0.9rem;
            color: #333;
        }
    }

    strong {
        color: #222;
    }
}
</style>
