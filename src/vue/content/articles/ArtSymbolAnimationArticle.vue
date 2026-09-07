<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-shapes" aria-hidden="true"></i>符號設計規範</h2>
        <p>
            符號（Symbol）是老虎機遊戲的核心視覺元素，一套標準的符號通常包含十到十五個常規符號，
            外加兩到三個特殊符號。這些規範不是美學偏好，而是從辨識效率與效能限制反推出的工程約束。
        </p>

        <h3>符號階層設計</h3>
        <p>
            老虎機符號依賠率等級分為<strong>高賠符號（High-Value）</strong>與<strong>低賠符號（Low-Value）</strong>兩大類：
        </p>
        <ul>
            <li>
                <strong>高賠符號</strong>：通常是與主題高度相關的圖案，如角色、場景物件、神話生物等。
                要求精緻度高、辨識度強、色彩飽和度較高，賠率最高的那一顆視覺份量應最為突出
            </li>
            <li>
                <strong>低賠符號</strong>：傳統上使用撲克牌花色與數字字母，或以主題風格重新設計的字符。
                需要簡潔明快，不搶奪高賠符號的視覺焦點，但仍須保持主題一致性
            </li>
        </ul>
        <p>
            階層設計的重點在於<strong>視覺份量必須與賠率成正比</strong>：
            玩家不需打開賠付表，也應能從面積佔比、飽和度、材質豐富度與發光質感直覺判斷哪顆值錢。
            當高賠符號畫得比低賠符號還樸素，心理預期就會與實際賠付脫節。
        </p>
        <p>
            低賠符號份量雖輕，卻最考驗功力：數量多、出現頻率最高，
            若只是把字母套上材質貼圖，整個轉輪的質感會立刻掉一個檔次。
            成熟的做法是讓字母本身承載主題元素，在簡潔的前提下建立辨識度。
        </p>

        <h3>特殊符號設計</h3>
        <p>
            特殊符號是最具設計挑戰性的元素，每種都有獨特的功能定位與視覺要求：
        </p>
        <ul>
            <li>
                <strong>Wild 符號</strong>：百搭符號，可替代大部分其他符號形成中獎組合。
                需要極高辨識度，通常採用金色邊框、發光效果或醒目的文字標示。
                由於要與各種符號並列出現，配色上必須是整組中最獨立的一顆
            </li>
            <li>
                <strong>Scatter 符號</strong>：分散符號，不需出現在特定賠付線上即可觸發獎勵。
                通常是主題中最具代表性的元素，常見手法是給它專屬的外框或底座，讓它自成一格
            </li>
            <li>
                <strong>Bonus 符號</strong>：觸發特殊遊戲功能的符號，
                經常使用動態感強的構圖或特殊材質效果，暗示即將帶來額外獎勵
            </li>
        </ul>
        <p>
            特殊符號還有一個常被忽略的需求：<strong>必須在「即將湊齊」時具備張力</strong>，
            因此通常要額外設計一組預期狀態的素材，例如加強的外框光暈。
        </p>

        <h3>可辨識性設計原則</h3>
        <p>
            最容易被忽視的，是<strong>高速旋轉狀態下的辨識度</strong>。
            轉輪轉動時，玩家實際上只能看到模糊色塊與大致輪廓。因此符號設計必須遵循以下原則：
        </p>
        <ul>
            <li><strong>輪廓獨特性</strong>：每個符號的外輪廓應各不相同，即使縮到最小尺寸也能透過輪廓區分</li>
            <li><strong>色彩對比</strong>：相鄰賠率等級的符號應使用不同主色調，避免色彩混淆</li>
            <li><strong>主題一致性</strong>：所有符號在風格、光源方向、描繪精細度上須保持統一</li>
            <li><strong>留白處理</strong>：圖案不宜塞滿整個格子，適當留白能讓符號在複雜背景上更加突出</li>
        </ul>
        <p>
            驗證這些原則有三個成本極低的手法：
        </p>
        <ul>
            <li><strong>縮圖測試</strong>：縮到實際格子尺寸並排檢視，分不出來的就要重做</li>
            <li><strong>剪影測試</strong>：全部填成純黑，只看外輪廓能否區分，可直接暴露造型相似的問題</li>
            <li><strong>灰階測試</strong>：去掉顏色後若明度全擠在一起，代表色彩對比其實是假的</li>
        </ul>
        <p>
            三項都應在精修之前進行。
        </p>
        <DiagramFigure caption="去掉顏色後若明度全擠在一起，代表色彩對比其實是假的。">
            <svg viewBox="0 0 640 246" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>符號辨識度的三種檢測法</title>
            <desc>縮圖、剪影與灰階三種低成本檢查，用來確認符號在實際尺寸下仍然分得出來。</desc>
            <rect x="60" y="40" width="152" height="118" rx="8" fill="var(--dg-1)" fill-opacity="0.10"/>
            <polygon points="136,58 143.03,74.3242 160.727,75.9656 147.375,87.6958 151.282,105.034 136,95.96 120.718,105.034 124.625,87.6958 111.273,75.9656 128.97,74.3242" fill="var(--dg-1)"/>
            <polygon points="104,115 107.515,123.162 116.364,123.983 109.687,129.848 111.641,138.517 104,133.98 96.3588,138.517 98.3127,129.848 91.6363,123.983 100.485,123.162" fill="var(--dg-1)"/>
            <polygon points="136,115 139.515,123.162 148.364,123.983 141.687,129.848 143.641,138.517 136,133.98 128.359,138.517 130.313,129.848 123.636,123.983 132.485,123.162" fill="var(--dg-2)"/>
            <polygon points="168,115 171.515,123.162 180.364,123.983 173.687,129.848 175.641,138.517 168,133.98 160.359,138.517 162.313,129.848 155.636,123.983 164.485,123.162" fill="var(--dg-3)"/>
            <text x="136" y="182" font-size="13" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">縮圖測試</text>
            <text x="136" y="202" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.8">縮到實際格子尺寸並排比對</text>
            <rect x="240" y="40" width="152" height="118" rx="8" fill="var(--dg-2)" fill-opacity="0.10"/>
            <polygon points="284,78 289.948,91.8127 304.923,93.2016 293.625,103.127 296.931,117.798 284,110.12 271.069,117.798 274.375,103.127 263.077,93.2016 278.052,91.8127" fill="currentColor"/>
            <polygon points="348,78 353.948,91.8127 368.923,93.2016 357.625,103.127 360.931,117.798 348,110.12 335.069,117.798 338.375,103.127 327.077,93.2016 342.052,91.8127" fill="currentColor"/>
            <text x="316" y="182" font-size="13" fill="var(--dg-2-ink)" text-anchor="middle" font-weight="700">剪影測試</text>
            <text x="316" y="202" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.8">只看外輪廓能否區分</text>
            <rect x="420" y="40" width="152" height="118" rx="8" fill="var(--dg-3)" fill-opacity="0.10"/>
            <polygon points="464,78 469.948,91.8127 484.923,93.2016 473.625,103.127 476.931,117.798 464,110.12 451.069,117.798 454.375,103.127 443.077,93.2016 458.052,91.8127" fill="currentColor" fill-opacity="0.42"/>
            <polygon points="528,78 533.948,91.8127 548.923,93.2016 537.625,103.127 540.931,117.798 528,110.12 515.069,117.798 518.375,103.127 507.077,93.2016 522.052,91.8127" fill="currentColor" fill-opacity="0.5"/>
            <text x="496" y="182" font-size="13" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">灰階測試</text>
            <text x="496" y="202" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.8">去掉顏色後明度是否分得開</text>
            <text x="320" y="232" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">三項都應在精修之前進行，成本極低卻能擋掉最貴的返工</text>
            </svg>
        </DiagramFigure>

        <h2><i class="fa-solid fa-bone" aria-hidden="true"></i>Spine 骨骼動畫製作</h2>
        <p>
            動畫是老虎機美術中技術要求最高的環節。相較於傳統逐幀動畫，
            <strong>Spine 骨骼動畫</strong>已成為業界主流，原因有三：
            檔案體積顯著縮小、動畫調整靈活度高、與遊戲引擎的整合度優秀。
        </p>

        <h3>為什麼選擇骨骼動畫</h3>
        <p>
            逐幀動畫雖然表現力豐富，但一段兩秒的中獎動畫可能需要數十張連續圖片，
            在手機端的記憶體佔用與載入時間都是負擔。
            骨骼動畫將角色拆分為可獨立旋轉、縮放的部件，用數學插值計算中間幀，
            對於需要同時播放多個動畫的老虎機，效能優勢尤為關鍵。
            另一項優勢是<strong>可修改性</strong>：要縮短時長或加大動作幅度時只需調整關鍵影格。
        </p>
        <DiagramFigure caption="另一項優勢是可修改性：要縮短時長或加大動作幅度時只需調整關鍵影格。">
            <svg viewBox="0 0 640 246" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>逐幀動畫與骨骼動畫的資料量</title>
            <desc>逐幀動畫每一幀都是一張圖，骨骼動畫只存少數部件並以數學插值算出中間幀。</desc>
            <text x="30" y="50" font-size="13.5" fill="var(--dg-1-ink)" font-weight="700">逐幀動畫</text>
            <rect x="198" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="232" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="266" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="300" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="334" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="368" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="402" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="436" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="470" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="504" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="538" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="572" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <text x="198" y="90" font-size="11.5" fill="currentColor" opacity="0.8">一段兩秒的動畫可能就是數十張連續圖片</text>
            <text x="30" y="154" font-size="13.5" fill="var(--dg-3-ink)" font-weight="700">骨骼動畫</text>
            <rect x="198" y="134" width="44" height="40" rx="3" fill="var(--dg-3)"/>
            <rect x="250" y="134" width="30" height="40" rx="3" fill="var(--dg-3)"/>
            <rect x="302" y="134" width="30" height="40" rx="3" fill="var(--dg-3)"/>
            <rect x="354" y="134" width="22" height="40" rx="3" fill="var(--dg-3)"/>
            <rect x="406" y="134" width="22" height="40" rx="3" fill="var(--dg-3)"/>
            <text x="198" y="194" font-size="11.5" fill="currentColor" opacity="0.8">拆成可獨立旋轉縮放的部件，中間幀用插值算出</text>
            <text x="320" y="232" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">對需要同時播放多個動畫的老虎機，這個差距直接反映在記憶體與載入時間上</text>
            </svg>
        </DiagramFigure>

        <h3>老虎機的動畫需求類型</h3>
        <ul>
            <li>
                <strong>待機動畫（Idle）</strong>：符號停止後的微動效果，通常一到兩秒，骨骼數量最少。
                重點是<strong>無縫循環</strong>，首尾影格必須完全吻合，否則會出現明顯跳動
            </li>
            <li>
                <strong>中獎慶祝動畫（Win Celebration）</strong>：中獎時的主要表演，持續兩到三秒，
                是表現力的主要舞台。需處理與待機動畫的銜接，避免切換瞬間的姿態斷裂
            </li>
            <li>
                <strong>特殊觸發動畫（Special Trigger）</strong>：特殊符號觸發時的強調動畫，
                衝擊力最強，可能搭配全螢幕轉場效果
            </li>
        </ul>
        <p>
            動畫節奏是拉開品質差距的關鍵。中獎動畫幾乎都遵循
            <strong>「預備、爆發、餘韻」</strong>的三段結構。緩動曲線往往比動作設計本身更重要，
            線性插值會讓動作顯得機械廉價，適當的加減速才能做出份量感。
        </p>

        <h3>網格變形技術</h3>
        <p>
            <strong>網格變形（Mesh Deformation）</strong>能讓平面圖片實現類似立體的流體運動效果，
            大量應用於火焰飄動、布料飛揚與衣物的柔體效果，在檔案大小與效能上都遠勝於多張圖片模擬。
        </p>
        <p>
            使用時，權重分配比網格密度更重要。常見錯誤是把網格切得極細以求柔順，
            結果運算負擔暴增卻沒有明顯收益。正確做法是在需要彎折處局部加密、其餘維持稀疏。
        </p>

        <h3>效能預算管理</h3>
        <p>
            手機端效能是不可迴避的硬限制，每個動畫都應該有明確的效能預算：
        </p>
        <ul>
            <li><strong>繪製呼叫控制</strong>：單一符號動畫應盡量壓低繪製呼叫次數，避免過多圖層與材質切換</li>
            <li><strong>頂點數限制</strong>：網格頂點數直接影響計算負擔，應設定明確上限</li>
            <li><strong>圖集尺寸</strong>：需事先約定，避免個別素材撐爆整體記憶體配置</li>
            <li><strong>骨骼數量</strong>：簡單動畫使用少量骨骼即可，複雜動畫也應設上限</li>
        </ul>
        <p>
            效能預算應在製作前就與工程端談定。建議初期先做一顆最複雜情境的動畫作為壓力樣本，
            在目標裝置實測後再回推其餘符號的配額，避免整組做完才發現超標。
        </p>

        <h3>引擎整合與動畫事件</h3>
        <p>
            動畫完成後需匯出為引擎可讀的格式，通常包含骨骼與動畫資料、圖集描述與圖集貼圖。
            匯出時須確認<strong>動畫事件（Animation Event）</strong>已正確設置，如音效觸發點、特效生成點，
            這些事件由程式端綁定，實現動畫與遊戲邏輯的精準同步。
        </p>
        <p>
            事件的命名與時間點應由美術與工程共同維護一份對照清單，並在調整動畫長度時同步檢查。
            多數「音效對不上動作」的問題，源頭都是改了長度但事件沒跟著校正。
            另一個要點是<strong>動畫狀態的切換規則</strong>：待機、中獎、觸發之間該直接切換或漸變、
            混合時間設多長，都應在交付時說明。
        </p>
        <p>
            符號與動畫是老虎機視覺體驗的核心，但要被穩妥地放進介面並正確交付之後才真正成立；
            至於這組視覺風格最初如何從概念發想收斂而來，本系列另有專篇討論前期工作流與 AI 工具的定位。
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

    code {
        background: #f8f9fa;
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        font-size: 0.88rem;
        color: #d63384;
    }
}
</style>
