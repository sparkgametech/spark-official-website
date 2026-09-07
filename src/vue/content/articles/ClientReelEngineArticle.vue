<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-arrows-spin" aria-hidden="true"></i>滾輪引擎：老虎機手感的來源</h2>
        <p>
            滾輪動畫是老虎機最具標誌性的視覺元素，也是玩家唯一會用「手感」來評價的部分。
            兩款規則相同的遊戲，可能因為停輪節奏差了幾十毫秒，觀感就從「乾脆俐落」變成「拖泥帶水」。
            好的滾輪引擎要提供<strong>絲滑流暢、物理真實</strong>的旋轉體驗，而且這份手感必須可調校、可重現，不是反覆試錯碰出來的。
        </p>
        <DiagramFigure caption="這六個階段中只有「等待結果」的長度由外部決定，其餘五段都由引擎自行控制。">
            <svg viewBox="0 0 640 158" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>滾輪動畫的六個階段</title>
            <desc>從預彈跳到定位共六段，其中只有等待結果的長度由外部決定。</desc>
            <defs><marker id="dgArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fill-opacity="0.55"/></marker></defs>
            <rect x="20" y="52" width="96" height="50" rx="7" fill="var(--dg-1)"/>
            <text x="68" y="82" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="700">預彈跳</text>
            <line x1="116.5" y1="77" x2="121.5" y2="77" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="122" y="52" width="96" height="50" rx="7" fill="var(--dg-3)"/>
            <text x="170" y="82" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="700">加速滾動</text>
            <line x1="218.5" y1="77" x2="223.5" y2="77" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="224" y="52" width="96" height="50" rx="7" fill="var(--dg-3)"/>
            <text x="272" y="82" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="700">等待結果</text>
            <line x1="320.5" y1="77" x2="325.5" y2="77" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="326" y="52" width="96" height="50" rx="7" fill="var(--dg-2)"/>
            <text x="374" y="82" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="700">減速</text>
            <line x1="422.5" y1="77" x2="427.5" y2="77" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="428" y="52" width="96" height="50" rx="7" fill="var(--dg-1)"/>
            <text x="476" y="82" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="700">過衝彈跳</text>
            <line x1="524.5" y1="77" x2="529.5" y2="77" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="530" y="52" width="96" height="50" rx="7" fill="var(--dg-2)"/>
            <text x="578" y="82" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="700">定位</text>
            <rect x="219" y="38" width="106" height="76" rx="8" fill="none" stroke="var(--dg-3-ink)" stroke-width="1.5" stroke-dasharray="5 4"/>
            <text x="272" y="30" font-size="11.5" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">長度由外部決定</text>
            <text x="320" y="144" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">其餘五段都由引擎自行控制，因此手感是可調校、可重現的</text>
            </svg>
        </DiagramFigure>
        <p>
            這六個階段中只有「等待結果」的長度由外部決定，其餘五段都由引擎自行控制。
        </p>

        <h2><i class="fa-solid fa-recycle" aria-hidden="true"></i>逐幀位移與符號循環</h2>
        <p>
            核心原理是每一幀計算滾輪的<strong>位移量</strong>，當位移超過一個格子的高度時，觸發符號循環：
        </p>
        <ul>
            <li><strong>回收與填充</strong>：頂部移出可視區域的符號回收到底部，並填入新的符號圖案</li>
            <li><strong>物件池</strong>：避免持續建立和銷毀顯示物件，確保記憶體佔用穩定</li>
            <li><strong>池的規模下限</strong>：可視列數加上上下各一格緩衝，讓符號在進入與離開畫面前就完成貼圖切換，避免在邊界上「突然變身」</li>
        </ul>
        <p>
            位移計算必須以<strong>經過時間</strong>而非幀數為基準，
            否則在 120Hz 螢幕上的轉速會是 60Hz 的兩倍，停輪時機也會整體提前。
        </p>
        <p>
            但應用程式從背景切回前景時，單幀經過時間可能高達數秒，直接套用會讓滾輪在一幀內跳過大量符號，
            因此還必須對單幀時間設上限。
        </p>

        <h2><i class="fa-solid fa-bezier-curve" aria-hidden="true"></i>緩動曲線的數學</h2>
        <p>
            緩動函數（Easing Function）把「進度比例」映射到「位移比例」：輸入從 0 走到 1，輸出也從 0 走到 1，
            但中間的走法決定了觀感是勻速、加速、減速還是彈跳。
        </p>
        <h3>三次貝茲曲線</h3>
        <p>
            我們最常使用<strong>三次貝茲曲線</strong>：起點與終點固定在 0 與 1，
            實際可調的只有兩個控制點共四個參數，足以表現豐富節奏，又少到可以直接交給美術微調。
        </p>
        <ul>
            <li><strong>加速段</strong>：第一個控制點靠近起點，曲線初期平緩後期陡峭，模擬滾輪從靜止被帶動</li>
            <li><strong>減速段</strong>：第二個控制點靠近終點，曲線初期陡峭後期平緩，模擬摩擦力把滾輪拉停</li>
            <li><strong>控制點溢出</strong>：控制點縱座標超出 0 到 1 的區間時曲線會在端點附近溢出，這正是預彈跳與過衝的數學來源</li>
        </ul>
        <p>
            實作上要注意貝茲曲線是參數式定義的，給定時間求位移需要求解而非直接代入；
            引擎在初始化時對曲線均勻取樣建立對照表，執行時以查表加內插取代逐幀求解。
        </p>
        <h3>彈性回彈的參數</h3>
        <p>
            真實的老虎機停止時會有微妙的「過衝」：滾輪略微越過目標位置，然後彈回定位。
            這段可以用<strong>阻尼振盪模型</strong>描述，彈簧把滾輪拉向目標，阻尼消耗能量，只有兩個直觀參數：
        </p>
        <ul>
            <li><strong>剛度</strong>：決定回彈速度，越高越短促</li>
            <li><strong>阻尼比</strong>：決定振盪次數，越接近臨界值越是一次到位</li>
        </ul>
        <p>
            整段停輪則拆成三個可獨立調整的區間：
        </p>
        <ul>
            <li><strong>減速階段</strong>：採用 ease-out 曲線，模擬摩擦力逐漸將滾輪減速</li>
            <li><strong>過衝階段</strong>：滾輪超過目標位置一小段距離，幅度通常在半個符號高度以內。超過這個幅度，玩家會開始懷疑結果變了</li>
            <li><strong>回彈階段</strong>：採用阻尼彈簧曲線回到精確的目標位置，可能伴隨一到兩次微小振盪</li>
        </ul>
        <DiagramFigure caption="過衝幅度通常控制在半個符號高度以內，超過這個幅度玩家會開始懷疑結果變了。">
            <svg viewBox="0 0 640 276" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>停輪的三個區間</title>
            <desc>滾輪先減速逼近目標，越過目標一小段後再由阻尼彈簧拉回定位。</desc>
            <rect x="64" y="40" width="94.9618" height="174" rx="0" fill="var(--dg-3)" fill-opacity="0.10"/>
            <rect x="158.962" y="40" width="189.924" height="174" rx="0" fill="var(--dg-1)" fill-opacity="0.10"/>
            <rect x="348.885" y="40" width="247.115" height="174" rx="0" fill="var(--dg-2)" fill-opacity="0.10"/>
            <line x1="64" y1="96" x2="596" y2="96" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.5" stroke-dasharray="5 4"/>
            <text x="596" y="87" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">目標位置</text>
            <line x1="64" y1="214" x2="596" y2="214" stroke="currentColor" stroke-opacity="0.3" stroke-width="1"/>
            <polyline points="64,214 68.4333,208.618 72.8667,203.077 77.3,197.436 81.7333,191.751 86.1667,186.072 90.6,180.443 95.0333,174.904 99.4667,169.489 103.9,164.229 108.333,159.15 112.767,154.272 117.2,149.614 121.633,145.19 126.067,141.01 130.5,137.083 134.933,133.413 139.367,130.003 143.8,126.853 148.233,123.96 152.667,121.322 157.1,118.931 161.533,116.783 165.967,114.868 170.4,113.177 174.833,111.7 179.267,110.428 183.7,109.348 188.133,108.45 192.567,107.721 197,107.15 201.433,106.724 205.867,106.433 210.3,106.264 214.733,106.206 219.167,106.247 223.6,106.378 228.033,106.588 232.467,106.866 236.9,107.204 241.333,107.593 245.767,108.024 250.2,108.489 254.633,108.981 259.067,109.494 263.5,110.022 267.933,110.557 272.367,111.096 276.8,111.634 281.233,112.166 285.667,112.69 290.1,113.201 294.533,113.697 298.967,114.175 303.4,114.634 307.833,115.072 312.267,115.488 316.7,115.88 321.133,116.249 325.567,116.593 330,116.912 334.433,117.206 338.867,117.477 343.3,117.723 347.733,117.946 352.167,118.146 356.6,118.324 361.033,118.481 365.467,118.618 369.9,118.735 374.333,118.835 378.767,118.917 383.2,118.984 387.633,119.036 392.067,119.074 396.5,119.1 400.933,119.114 405.367,119.118 409.8,119.112 414.233,119.099 418.667,119.078 423.1,119.051 427.533,119.018 431.967,118.98 436.4,118.939 440.833,118.894 445.267,118.847 449.7,118.798 454.133,118.748 458.567,118.697 463,118.646 467.433,118.595 471.867,118.545 476.3,118.495 480.733,118.447 485.167,118.4 489.6,118.355 494.033,118.312 498.467,118.271 502.9,118.232 507.333,118.195 511.767,118.161 516.2,118.128 520.633,118.099 525.067,118.071 529.5,118.046 533.933,118.023 538.367,118.002 542.8,117.983 547.233,117.967 551.667,117.952 556.1,117.94 560.533,117.929 564.967,117.92 569.4,117.912 573.833,117.906 578.267,117.901 582.7,117.898 587.133,117.895 591.567,117.894 596,117.894" fill="none" stroke="var(--dg-1-ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <text x="111.481" y="236" font-size="12.5" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">減速</text>
            <text x="253.924" y="236" font-size="12.5" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">過衝</text>
            <text x="472.443" y="236" font-size="12.5" fill="var(--dg-2-ink)" text-anchor="middle" font-weight="700">回彈</text>
            <text x="320" y="262" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">橫軸為時間，縱軸為滾輪位移；三段可獨立調整</text>
            </svg>
        </DiagramFigure>
        <p>
            節奏明快的遊戲用較小的過衝與快速回彈，經典風格則用較誇張的彈跳營造機械感。
        </p>
        <p>
            另一個常被忽略的參數是<strong>預彈跳</strong>：啟動前先微微反向位移再向下加速，
            只有幾十毫秒，卻能明顯提升力量感。
        </p>

        <h2><i class="fa-solid fa-stopwatch" aria-hidden="true"></i>停輪時序設計</h2>
        <p>
            單欄調得好看，不代表整組滾輪舒服。多欄一起動作時，真正決定觀感的是<strong>時序</strong>：
        </p>
        <ul>
            <li><strong>啟動間隔</strong>：各欄依序啟動，間隔通常小於停輪間隔。目的是製造整體感，間隔過大會讓滾輪看起來各自為政</li>
            <li><strong>停輪間隔</strong>：各欄依序停止，間隔明顯大於啟動間隔。這是節奏的主要來源，也是玩家判斷「還剩幾欄」的線索</li>
            <li><strong>最短旋轉時間</strong>：即使結果瞬間就回來，滾輪也必須轉滿這段時間，否則整局會顯得草率</li>
            <li><strong>最長等待時間</strong>：等待超時後切換到可無限延續的旋轉表現，避免玩家察覺遊戲卡住</li>
        </ul>
        <DiagramFigure caption="這四個數值必須被視為一組來調整，因此我們把它們封裝成可整體切換的節奏設定。">
            <svg viewBox="0 0 640 314" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>多欄的啟動與停輪時序</title>
            <desc>各欄依序啟動，間隔較小；依序停止時間隔明顯放大，節奏感由此而來。</desc>
            <text x="84" y="63" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">第 1 欄</text>
            <rect x="96" y="44" width="150" height="30" rx="5" fill="var(--dg-2)"/>
            <text x="106" y="63" font-size="11" fill="#ffffff">旋轉中</text>
            <text x="84" y="105" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">第 2 欄</text>
            <rect x="109" y="86" width="199" height="30" rx="5" fill="var(--dg-2)"/>
            <text x="119" y="105" font-size="11" fill="#ffffff">旋轉中</text>
            <text x="84" y="147" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">第 3 欄</text>
            <rect x="122" y="128" width="248" height="30" rx="5" fill="var(--dg-2)"/>
            <text x="132" y="147" font-size="11" fill="#ffffff">旋轉中</text>
            <text x="84" y="189" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">第 4 欄</text>
            <rect x="135" y="170" width="297" height="30" rx="5" fill="var(--dg-2)"/>
            <text x="145" y="189" font-size="11" fill="#ffffff">旋轉中</text>
            <text x="84" y="231" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">第 5 欄</text>
            <rect x="148" y="212" width="346" height="30" rx="5" fill="var(--dg-2)"/>
            <text x="158" y="231" font-size="11" fill="#ffffff">旋轉中</text>
            <line x1="96" y1="34" x2="96" y2="256" stroke="currentColor" stroke-opacity="0.35" stroke-width="1" stroke-dasharray="4 3"/>
            <line x1="148" y1="34" x2="148" y2="256" stroke="currentColor" stroke-opacity="0.35" stroke-width="1" stroke-dasharray="4 3"/>
            <text x="122" y="28" font-size="12" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">啟動間隔（較小）</text>
            <text x="370" y="276" font-size="12" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">停輪間隔（明顯較大）</text>
            <text x="320" y="300" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">啟動間隔製造整體感，停輪間隔則是玩家判斷「還剩幾欄」的線索</text>
            </svg>
        </DiagramFigure>
        <p>
            這四個數值必須被視為一組來調整，因此我們把它們封裝成可整體切換的節奏設定。
        </p>
        <h3>快速停止的處理</h3>
        <p>
            玩家在旋轉中再次點擊時，所有滾輪需要立即急停。
            難點在於：若把動畫時間壓縮成十分之一，過衝與回彈也等比縮短，看起來像被「快轉」而不是「煞停」。
        </p>
        <p>
            較好的做法是重新規劃減速曲線而非縮放原曲線：保留完整的回彈段長度，只壓縮前面的減速段，
            並依當下的實際速度重算剩餘距離。
        </p>

        <h2><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>預期感與特殊停輪效果</h2>
        <p>
            除了基本的旋轉與停止，滾輪引擎還需支援多種特殊效果，
            其中最重要的是<strong>預期感（Anticipation）</strong>的營造：
        </p>
        <ul>
            <li><strong>聽牌效果</strong>：當前面的滾輪已出現特殊符號組合時，後面的滾輪刻意延長旋轉並加入視覺特效（如邊框發光、背景變暗），製造懸念</li>
            <li><strong>速度變化</strong>：進入聽牌狀態的滾輪通常會先減速再維持。減速本身就是訊號，玩家會立刻意識到「這一欄不一樣」</li>
            <li><strong>逐欄延遲停止</strong>：每一欄按順序依次停止，營造由左至右的節奏感，每欄間隔可獨立設定</li>
            <li><strong>掉落消除機制（Cascade）</strong>：中獎符號消除後上方符號掉落填補空位，可能觸發連鎖中獎，需要引擎支援部分符號的獨立動畫與重新排列</li>
        </ul>
        <p>
            預期感有條必須守住的界線：所有懸念機制都是<strong>結果導向</strong>的表現層行為。
            引擎只是根據已確定的結果選擇演出方式，演出本身不會改變任何一個符號的落點。
            把這條界線寫進介面設計裡，引擎在收到結果之前就根本沒有能力決定要不要聽牌。
        </p>

        <h2><i class="fa-solid fa-gauge-high" aria-hidden="true"></i>幀率穩定與視覺殘影</h2>
        <p>
            滾輪引擎的效能問題大多不是出在計算量，而是出在<strong>每幀的物件變動</strong>。
            每幀建立與釋放顯示物件，會讓記憶體回收在不可預期的時機被觸發，表現出來就是每隔幾秒卡一下。
        </p>
        <p>
            物件池的意義不只是省下建立成本，更是讓記憶體佔用保持平坦。另外兩項也值得一併處理：
        </p>
        <ul>
            <li><strong>合併繪製呼叫</strong>：讓同一欄的符號共用一份材質圖集</li>
            <li><strong>降低裝飾更新頻率</strong>：邊框光暈、背景粒子這類效果不必每幀更新，把預算留給主體</li>
        </ul>
        <h3>高速下的殘影處理</h3>
        <p>
            滾輪高速旋轉時，符號每幀移動的距離可能超過符號本身的高度，
            此時人眼看到的是一連串離散位置而非連續運動，會產生明顯的頻閃感。處理方式有三種：
        </p>
        <ul>
            <li><strong>模糊素材替換</strong>：速度超過門檻時換成預先製作的縱向模糊貼圖。成本最低也最可靠，因為模糊程度是美術可控的</li>
            <li><strong>速度上限</strong>：限制最高轉速，讓每幀位移不超過符號高度的某個比例，犧牲一點速度感換取可讀性</li>
            <li><strong>符號簡化</strong>：高速階段改用細節較少的版本，減少眼睛試圖辨識細節時的疲勞感</li>
        </ul>
        <p>
            這三種手段通常一起使用，切換門檻還需要在低刷新率裝置上另外驗證。
            在 120Hz 螢幕上看不出問題的轉速，在 60Hz 上可能已經明顯頻閃。
        </p>

        <p>
            滾輪引擎談的是手感，但它並不孤立運作：它依賴分層架構提供的復用基礎與狀態機給出的啟停指令，
            而素材何時載入、停輪音效如何與畫面對齊則屬於支撐系統的範疇。
            這兩個主題我們在同系列的另外兩篇文章中分別討論。
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
