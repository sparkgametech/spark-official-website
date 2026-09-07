<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-circle-question" aria-hidden="true"></i>什麼是統計異常偵測？</h2>
        <p>
            博弈遊戲系統面臨多維度的風險：<strong>數學風險</strong>（極端統計偏差）、
            <strong>系統風險</strong>（配置錯誤、程式漏洞）、以及<strong>行為風險</strong>（異常投注模式）。
            統計異常偵測透過嚴格的統計學檢定方法，即時監控遊戲的實際表現是否偏離理論預期，
            在異常發生的早期階段就能偵測並觸發預警。
        </p>
        <p>
            這件事之所以困難，在於博弈遊戲<strong>本來就應該有巨大的波動</strong>。
            一款設計良好的老虎機，短期內出現連續數百次不中獎，或是突然開出數千倍的賠付，
            都完全在數學模型的預期之內。這使得「異常」無法用直覺或固定門檻來判定。
            單看某一天 RTP 偏高就發警報，得到的只會是滿螢幕的雜訊。
        </p>
        <p>
            換句話說，風控要解決的核心問題是：<strong>如何在充滿雜訊的資料中，區分出訊號</strong>。
            這正是統計假設檢定被設計出來要回答的問題，也是我們把整套偵測邏輯建立在假設檢定框架上的原因。
        </p>

        <h2><i class="fa-solid fa-clipboard-check" aria-hidden="true"></i>假設檢定的基本前提</h2>
        <p>
            所有偵測邏輯都圍繞著同一套統計學框架，理解這個框架是理解後續所有設計取捨的前提。
        </p>
        <ul>
            <li><strong>虛無假設（H₀）</strong>：預設「系統一切正常，實際表現與理論模型一致」。
                我們永遠從假定系統健康出發，而不是假定系統有問題。這個方向性很重要，
                檢定的任務是蒐集足夠強的證據來<strong>推翻</strong>正常假設，而不是證明系統正常</li>
            <li><strong>對立假設（H₁）</strong>：實際表現與理論值存在真實的差異，而非隨機波動所致</li>
            <li><strong>顯著水準（α）</strong>：我們願意承受的<strong>誤判機率上限</strong>。
                α = 0.05 意味著即使系統完全正常，每二十次檢定也預期會有一次被誤判為異常</li>
            <li><strong>p 值</strong>：在假定系統正常的前提下，觀察到當前這麼極端（或更極端）結果的機率。
                p 值小，代表當前觀測用「正常波動」很難解釋</li>
        </ul>
        <p>
            由此延伸出兩類必然存在的錯誤，兩者的取捨貫穿整個風控設計：
        </p>
        <ul>
            <li><strong>型一錯誤（False Positive，誤報）</strong>：系統其實正常，卻被判定為異常。
                代價是團隊被無意義的告警反覆打斷，長期下來會導致對告警的信任崩壞</li>
            <li><strong>型二錯誤（False Negative，漏報）</strong>：系統確實有問題，卻沒有被偵測出來。
                代價是問題持續累積，等到明顯到肉眼可見時，影響範圍往往已經很大</li>
        </ul>
        <p>
            關鍵在於：<strong>降低誤報必然提高漏報，反之亦然</strong>，這是統計上的硬性權衡，無法同時最佳化。
            唯一能同時改善兩者的方法，是增加樣本量，也就是提高檢定的<strong>檢定力（Power）</strong>，
            也就是「當問題真實存在時，能夠成功偵測到它的機率」。
            這也解釋了為什麼設計監控機制時，樣本量的規劃比閾值的調整更加根本。
        </p>

        <h2><i class="fa-solid fa-chart-column" aria-hidden="true"></i>二項式中獎率檢定（Binomial Win Rate Test）</h2>
        <p>
            對每個投注類型和機率表標籤，持續追蹤實際中獎率是否在統計上顯著偏離理論值。
            使用二項分佈的信賴區間，設定<strong>顯著水準 α = 1/10000</strong>（極嚴格的閾值），
            只有在真正異常的情況下才觸發警報：
        </p>
        <div class="formula-block">
            <code>H₀: 實際中獎率 = 理論中獎率<br/>
H₁: 實際中獎率 ≠ 理論中獎率<br/>
若 p-value < α (0.0001)，則判定為異常</code>
        </div>
        <p>
            極嚴格的顯著水準確保了低誤報率：只有在統計上有壓倒性證據時才會觸發告警，
            避免因為正常的隨機波動而產生干擾。
        </p>
        <p>
            之所以選擇二項式檢定作為第一道防線，是因為「是否中獎」天然符合二項分佈的三個前提：
        </p>
        <ul>
            <li>每一局的結果只有中獎與不中獎兩種</li>
            <li>各局之間彼此獨立</li>
            <li>每局的中獎機率固定</li>
        </ul>
        <p>
            這三個前提在正常運作的遊戲中都成立；反過來說，
            <strong>當檢定持續失敗時，可能被推翻的不只是機率值，也可能是獨立性本身</strong>。
            例如某個狀態沒有正確重置，導致前一局的結果影響到下一局，
            這類問題在單局層面完全看不出來，卻會在分佈層面留下清楚的痕跡。
        </p>
        <p>
            樣本量是二項式檢定能否成立的關鍵。經驗法則要求
            <strong>期望成功次數與期望失敗次數都至少達到一定規模</strong>（常見的門檻是各自不低於 10 次），
            常態近似才足夠準確。這帶來一個直接的推論：<strong>低機率事件需要極大的樣本量才能檢定</strong>。
            中獎率 30% 的一般連線可能數千局就足以判斷，
            但觸發率萬分之一的特殊功能，要累積到具備統計意義的樣本可能需要數百萬局。
            因此我們的做法是分層設定觀測門檻：樣本量未達要求的項目不進行檢定，
            而不是用不足的樣本硬做檢定後得出不可靠的結論。
            <strong>沉默比錯誤的結論更安全</strong>。
        </p>

        <h2><i class="fa-solid fa-chart-area" aria-hidden="true"></i>RTP Z 檢定（RTP Z-Test）</h2>
        <p>
            對累計 RTP 進行 Z 檢定，驗證實際 RTP 是否顯著偏離鎖定的理論 RTP：
        </p>
        <div class="formula-block">
            <code>Z = (實際RTP - 理論RTP) / SE(RTP)<br/>
若 |Z| > Z<sub>α/2</sub>，則 RTP 顯著偏離</code>
        </div>
        <p>
            當調控配置資訊充足時（有明確的理論 RTP 鎖定值），使用精確的理論值作為基準；
            當配置不足時，則使用<strong>理論最大 RTP</strong> 作為保守基準，避免漏報。
        </p>
        <p>
            Z 檢定與二項式檢定的分工在於，中獎率檢定看的是<strong>頻率</strong>，
            RTP 檢定看的是<strong>金額規模</strong>。兩者可能出現分歧，而分歧本身就是重要的診斷資訊：
        </p>
        <DiagramFigure caption="顯著水準決定臨界值的位置：臨界值越往外推，誤報越少，但幅度較小的真實問題也越晚被發現。">
            <svg viewBox="0 0 640 256" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Z 檢定的接受區與拒絕區</title>
            <desc>Z 值落在雙尾臨界值之外時判定顯著偏離，落在中間則視為正常波動。</desc>
            <polygon points="60,195.95 63.315,195.938 66.63,195.925 69.945,195.908 73.26,195.889 76.575,195.865 79.89,195.837 83.205,195.803 86.52,195.763 89.835,195.716 93.15,195.66 96.465,195.595 99.78,195.517 103.095,195.427 106.41,195.322 109.725,195.199 113.04,195.057 116.355,194.892 119.67,194.701 122.985,194.482 126.3,194.231 129.615,193.943 132.93,193.615 136.245,193.242 139.56,192.818 142.875,192.339 146.19,191.798 149.505,191.191 152.82,190.509 156.135,189.748 159.45,188.899 162.765,187.957 166.08,186.912 169.395,185.759 172.71,184.49 176.025,183.096 179.34,181.572 182.655,179.909 185.97,178.102 189.285,176.143 192.6,174.027 192.6,196 60,196" fill="var(--dg-1)"/>
            <polygon points="447.4,174.027 450.715,176.143 454.03,178.102 457.345,179.909 460.66,181.572 463.975,183.096 467.29,184.49 470.605,185.759 473.92,186.912 477.235,187.957 480.55,188.899 483.865,189.748 487.18,190.509 490.495,191.191 493.81,191.798 497.125,192.339 500.44,192.818 503.755,193.242 507.07,193.615 510.385,193.943 513.7,194.231 517.015,194.482 520.33,194.701 523.645,194.892 526.96,195.057 530.275,195.199 533.59,195.322 536.905,195.427 540.22,195.517 543.535,195.595 546.85,195.66 550.165,195.716 553.48,195.763 556.795,195.803 560.11,195.837 563.425,195.865 566.74,195.889 570.055,195.908 573.37,195.925 576.685,195.938 580,195.95 580,196 447.4,196" fill="var(--dg-1)"/>
            <polygon points="192.6,174.027 198.97,169.501 205.34,164.348 211.71,158.556 218.08,152.126 224.45,145.084 230.82,137.476 237.19,129.374 243.56,120.875 249.93,112.103 256.3,103.201 262.67,94.336 269.04,85.6886 275.41,77.4497 281.78,69.8132 288.15,62.9686 294.52,57.0932 300.89,52.3446 307.26,48.8537 313.63,46.7186 320,46 326.37,46.7186 332.74,48.8537 339.11,52.3446 345.48,57.0932 351.85,62.9686 358.22,69.8132 364.59,77.4497 370.96,85.6886 377.33,94.336 383.7,103.201 390.07,112.103 396.44,120.875 402.81,129.374 409.18,137.476 415.55,145.084 421.92,152.126 428.29,158.556 434.66,164.348 441.03,169.501 447.4,174.027 447.4,196 192.6,196" fill="var(--dg-2)"/>
            <line x1="54" y1="196" x2="586" y2="196" stroke="currentColor" stroke-opacity="0.3"/>
            <line x1="192.6" y1="174.027" x2="192.6" y2="196" stroke="currentColor" stroke-opacity="0.45" stroke-dasharray="4 3"/>
            <text x="192.6" y="216" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.8">−Zα/2</text>
            <line x1="447.4" y1="174.027" x2="447.4" y2="196" stroke="currentColor" stroke-opacity="0.45" stroke-dasharray="4 3"/>
            <text x="447.4" y="216" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.8">+Zα/2</text>
            <text x="320" y="138" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="700">接受區</text>
            <text x="141.25" y="162" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700">拒絕區</text>
            <text x="498.75" y="162" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700">拒絕區</text>
            <text x="320" y="242" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">橫軸為 Z 值，曲線為虛無假設成立時的分佈</text>
            </svg>
        </DiagramFigure>
        <ul>
            <li><strong>中獎率正常、RTP 偏高</strong>：中獎的次數符合預期，但每次賠付的倍率偏大。
                通常指向賠付表的數值設定問題，或是倍率計算環節的錯誤</li>
            <li><strong>中獎率偏高、RTP 正常</strong>：中獎變得更頻繁，但單次金額相應變小。
                波動度低於設計預期，玩家體驗會與數學模型預想的節奏不同</li>
            <li><strong>兩者同時偏離</strong>：更可能是機率表選用錯誤或版本不一致這類全域性問題</li>
        </ul>
        <DiagramFigure caption="兩項檢定分開判讀才有診斷價值：分歧的方向本身就指出了問題出在頻率端還是金額端。">
            <svg viewBox="0 0 640 256" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>中獎率與 RTP 的分歧診斷</title>
            <desc>中獎率檢定看頻率、RTP 檢定看金額規模，兩者的分歧組合各自指向不同的問題來源。</desc>
            <text x="364" y="26" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700" opacity="0.7">RTP 檢定</text>
            <text x="248" y="48" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.7">正常</text>
            <text x="480" y="48" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.7">偏離</text>
            <text x="122" y="106" font-size="12" fill="currentColor" text-anchor="end" opacity="0.7">中獎率　正常</text>
            <text x="122" y="198" font-size="12" fill="currentColor" text-anchor="end" opacity="0.7">中獎率　偏離</text>
            <rect x="136" y="60" width="224" height="84" rx="7" fill="var(--dg-2)" fill-opacity="0.14"/>
            <text x="248" y="90" font-size="13" fill="var(--dg-2-ink)" text-anchor="middle" font-weight="700">正常</text>
            <text x="248" y="112" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">兩項皆在預期範圍內</text>
            <text x="248" y="129" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8"></text>
            <rect x="368" y="60" width="224" height="84" rx="7" fill="var(--dg-3)" fill-opacity="0.14"/>
            <text x="480" y="90" font-size="13" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">賠付倍率問題</text>
            <text x="480" y="112" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">次數符合預期但單次金額偏大</text>
            <text x="480" y="129" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">指向賠付表或倍率計算</text>
            <rect x="136" y="152" width="224" height="84" rx="7" fill="var(--dg-3)" fill-opacity="0.14"/>
            <text x="248" y="182" font-size="13" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">波動度偏低</text>
            <text x="248" y="204" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">中獎更頻繁但單次金額變小</text>
            <text x="248" y="221" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">體感節奏與模型不同</text>
            <rect x="368" y="152" width="224" height="84" rx="7" fill="var(--dg-1)" fill-opacity="0.14"/>
            <text x="480" y="182" font-size="13" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">全域性問題</text>
            <text x="480" y="204" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">兩者同時偏離</text>
            <text x="480" y="221" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">多為機率表選錯或版本不一致</text>
            </svg>
        </DiagramFigure>
        <p>
            判讀 Z 值時最容易犯的錯誤，是忽略了<strong>標準誤會隨樣本量增加而縮小</strong>。
            這意味著在極大的樣本下，一個實務上微不足道的偏差（例如 RTP 差了 0.05 個百分點）
            也可能產生很大的 Z 值而觸發告警。<strong>統計顯著不等於實質重要</strong>。
            因此正確的做法是同時觀察兩個量：Z 值判斷「這個偏差是不是真的」，
            而<strong>效果量</strong>（實際偏離了多少個百分點）判斷「這個偏差值不值得處理」。
            只有兩者同時成立，才構成需要行動的訊號。
        </p>
        <p>
            另一個必須留意的前提是，RTP 的標準誤不能直接套用中獎率的標準誤公式。
            賠付金額的分佈是高度右偏的：大量的零與小額賠付，加上極少數的巨額賠付。
            其變異數主要由尾端的大獎貢獻。因此 RTP 的標準誤必須從<strong>實際的賠付分佈</strong>推導，
            而不是假設一個常態分佈。忽略這一點，會系統性地低估標準誤，進而大幅高估告警的嚴重程度。
        </p>

        <h2><i class="fa-solid fa-filter" aria-hidden="true"></i>離群值過濾（Outlier Filtering）</h2>
        <p>
            如果初始的中獎率檢定發現異常，系統會進行第二輪分析，
            過濾掉 <strong>PR95 以上的極端賠付</strong>後重新計算 RTP：
        </p>
        <ul>
            <li>如果過濾後 RTP <strong>回歸正常</strong>，說明異常僅由少數極端大獎造成（可能是正常的高波動特性），降級為觀察</li>
            <li>如果過濾後 RTP <strong>仍然異常</strong>，則更可能是系統性的配置錯誤或漏洞，升級為高優先告警</li>
        </ul>
        <p>
            這個兩階段分析機制有效區分了「運氣好的正常波動」與「真正的系統問題」，
            大幅降低了技術團隊的告警疲勞。
        </p>
        <p>
            過濾離群值的正當理由在於：<strong>少數極端值會主導整體統計量</strong>。
            在高波動的數學模型中，單筆數千倍的賠付就可能佔據當期累計賠付的相當比例，
            使得平均值劇烈跳動，卻無法反映系統的整體健康狀況。
            過濾之後再算一次，等於是在問一個更精準的問題：
            「排除掉這幾筆極端事件之後，剩下的絕大多數局數看起來還正常嗎？」
        </p>
        <p>
            但這個手法本身帶有明確的風險，必須被清楚意識到：
        </p>
        <ul>
            <li><strong>可能掩蓋真實問題</strong>：如果缺陷本身就表現為「大獎出現得太頻繁」，
                那麼把大獎全部過濾掉，正好抹除了唯一的證據。
                這也是為什麼過濾後的結果只能用於<strong>降級</strong>判定，
                而不能單獨作為「系統正常」的結論依據</li>
            <li><strong>門檻選擇帶有主觀性</strong>：以百分位數作為過濾線是一個工程上的取捨。
                門檻設得太寬，過濾不掉雜訊；設得太窄，會連正常的中高額賠付一起濾掉，
                反而讓過濾後的 RTP 系統性偏低，製造出新的假異常</li>
            <li><strong>不可逆的資訊損失</strong>：被過濾掉的資料必須完整保留在原始記錄中，
                過濾只發生在分析層而非儲存層。否則一旦事後需要重新調查，
                最關鍵的那幾筆資料已經不存在了</li>
        </ul>
        <p>
            因此我們把過濾定位為<strong>輔助診斷工具，而非判定依據</strong>。
            過濾前後的兩組結果都會被完整記錄，讓後續分析能看到「過濾改變了什麼」，
            這個差異本身往往比任何一組數字都更有診斷價值。
        </p>

        <h2><i class="fa-solid fa-hourglass-half" aria-hidden="true"></i>時間窗的取捨</h2>
        <p>
            統計檢定必須定義在某個資料範圍上，而<strong>時間窗的選擇直接決定了能偵測到什麼樣的問題</strong>。
            這是風控設計中最容易被低估的一個決策。
        </p>
        <ul>
            <li><strong>短時間窗</strong>：反應快，能及早發現突發性的配置錯誤或版本問題，
                但樣本量小、統計檢定力低，只能偵測到極大幅度的偏離，同時誤報率相對較高</li>
            <li><strong>長時間窗</strong>：樣本充足、檢定力高，能偵測到微小但持續的系統性偏差，
                但反應遲鈍，且一個已修復的舊問題會在窗口內殘留很久，造成告警無法消退</li>
            <li><strong>累計統計</strong>：涵蓋全部歷史資料，最適合驗證長期收斂性，
                但對近期發生的變化極不敏感，歷史樣本會把新出現的偏差稀釋到看不見</li>
        </ul>
        <p>
            由於沒有任何單一窗口能同時滿足所有需求，實務上的解法是<strong>多窗口並行</strong>：
            短窗負責即時性，長窗負責靈敏度，累計統計負責長期收斂驗證，三者的結論交叉比對。
            當短窗告警而長窗正常時，通常指向剛發生的變更；
            當長窗告警而短窗正常時，則更可能是已經被修正、只是尚未從窗口中滑出的舊問題。
        </p>
        <p>
            滑動視窗的實作上還有一個細節值得注意：視窗邊界會製造<strong>告警閃爍</strong>。
            當某筆極端資料正好處在視窗邊緣時，它的進出會使檢定結果在正常與異常之間反覆跳動。
            解法是在告警的觸發與解除之間設置不對稱的門檻：觸發需要較強的證據，
            解除則需要連續數個週期都維持正常，藉此避免同一個問題被重複通報。
        </p>

        <h2><i class="fa-solid fa-bell" aria-hidden="true"></i>即時監控與告警</h2>
        <p>
            偵測結果需要即時通知技術團隊，告警管道設計包含：
        </p>
        <ul>
            <li><strong>即時推送</strong>：當統計檢定發現異常時，自動推送告警訊息到技術群組</li>
            <li><strong>分級處理</strong>：根據異常的嚴重程度，決定是記錄觀察、調整參數，還是暫停遊戲</li>
            <li><strong>根因分析</strong>：告警觸發後，自動彙整相關數據（投注記錄、RTP 趨勢、中獎分佈），
                協助快速定位問題根源</li>
        </ul>
        <p>
            告警分級的真正目的，是避免<strong>「狼來了」效應</strong>。
            一套會頻繁誤報的監控系統，比沒有監控更危險，因為團隊會逐漸學會忽略它，
            而當真正嚴重的問題發生時，那則告警會淹沒在同樣格式的雜訊裡沒有人看。
            因此我們的分級原則是：<strong>每一級都對應一個明確的預期動作</strong>，
            如果一則告警沒有人知道收到後該做什麼，它就不應該存在。
        </p>
        <ul>
            <li><strong>觀察級</strong>：統計上出現偏離，但幅度在可接受範圍內。
                只寫入記錄供趨勢分析，不主動打擾任何人</li>
            <li><strong>關注級</strong>：偏離持續存在且跨多個時間窗一致。
                在固定的檢視節奏中彙整通報，需要有人判讀但不需要立即中斷手邊工作</li>
            <li><strong>緊急級</strong>：偏離幅度極大，或伴隨明確的系統性徵兆（例如多個投注類型同時異常）。
                立即推送，需要即時處理</li>
        </ul>
        <p>
            配合分級的還有幾個抑制機制：<strong>去重</strong>確保同一個根因在解除之前只通報一次；
            <strong>聚合</strong>把同一時間段內的多筆相關告警合併成一則摘要，
            避免一個共同原因引發數十則獨立訊息；
            <strong>升級</strong>則讓長時間未被處理的低級別告警自動提高等級，
            防止問題因為分級太低而被無限期擱置。
        </p>

        <h2><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i>誤報與漏報的權衡</h2>
        <p>
            最後回到那個無法迴避的根本取捨。前面提到極嚴格的顯著水準能壓低誤報，
            但這個選擇的代價必須被誠實地承認：<strong>它同時提高了漏報的機率</strong>，
            意味著幅度較小的真實問題需要累積更多樣本才會被發現。
        </p>
        <p>
            我們接受這個代價，理由來自兩者的<strong>成本結構不對稱</strong>。
            誤報的成本是即時且會累積的：每一次誤報都消耗團隊的注意力，
            並且緩慢侵蝕整套監控系統的公信力，這種侵蝕一旦發生就很難逆轉。
            而漏報的成本則被其他機制部分吸收：
            多時間窗的設計讓小幅度偏差終究會在長窗中累積到足以被偵測；
            完整的審計軌跡讓事後回溯調查始終可行；
            上線前的數學驗證與確定性測試則從源頭攔截了大部分的配置錯誤。
        </p>
        <p>
            換句話說，<strong>統計偵測不是唯一的防線，因此它不需要獨自承擔所有的漏報風險</strong>。
            正因為它處在一個多層防禦體系之中，我們才有餘裕把它調整到高精確度的一端，
            讓每一則發出的告警都值得被認真對待。
            如果它是唯一的防線，我們就必須把閾值放寬並承受隨之而來的雜訊。
            而那樣的系統，最終往往誰也不會去看。
        </p>

        <h2><i class="fa-solid fa-compass-drafting" aria-hidden="true"></i>設計原則</h2>
        <ul>
            <li><strong>不改變公平性</strong>：風控只監控和偵測，不操縱遊戲的隨機結果</li>
            <li><strong>統計學基礎</strong>：所有偵測邏輯基於嚴格的假設檢定，避免誤報</li>
            <li><strong>可審計性</strong>：所有偵測結果與告警記錄完整保存，支持事後審計</li>
            <li><strong>可解釋性</strong>：每一則告警都必須能說明它是基於哪個檢定、哪個時間窗、
                多少樣本量做出的判定。無法解釋的告警無法被驗證，也就無法被信任</li>
            <li><strong>保守優先</strong>：當資料不足以支撐可靠結論時，選擇不下結論，
                而不是用不充分的樣本產生一個看似精確的判斷</li>
        </ul>
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
