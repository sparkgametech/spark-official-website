<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-robot" aria-hidden="true"></i>自動化測試</h2>

        <h3>確定性重播測試</h3>
        <p>
            自動化測試在老虎機 QA 中佔據核心位置，
            而它要能成立，第一個必須解決的是<strong>隨機性</strong>：
            結果不可預測的系統無法寫出穩定的斷言。
            透過<strong>確定性重播（Deterministic Replay）</strong>技術，
            測試框架可以注入<strong>預定義的隨機數序列</strong>，
            使每一次 Spin 的結果完全可預測和可重現。
        </p>
        <p>
            這意味著測試案例可以精確指定「第一次 Spin 結果為三個 Wild 連線、
            第二次觸發免費遊戲」這樣的場景，再驗證遊戲在該條件下的行為是否正確。
            確定性重播是覆蓋所有邊界條件的唯一可行方式：依賴自然隨機等待特定組合
            可能需要數百萬次 Spin，注入序列則能直接到達任何想要的場景。
        </p>
        <p>
            要讓這個機制可靠，關鍵在於<strong>隨機來源必須收斂到單一入口</strong>：
            只要還有一處直接取用系統隨機數，重播就會出現無法解釋的偏差。
            因此隨機數的取得應在架構階段就抽象為可替換的介面，
            由執行環境決定注入真實來源或預定義序列，
            這是測試需求反向影響核心設計的典型例子。
        </p>

        <h3>持續整合與自動回歸</h3>
        <p>
            將測試整合到 <strong>CI/CD 流程</strong>中，確保每次程式碼變更都不會破壞現有功能：
        </p>
        <ul>
            <li><strong>數學回歸測試</strong>：每次建構（Build）都執行快速的 RTP 驗算（較小的取樣量），確認核心數學邏輯未被變更</li>
            <li><strong>功能回歸測試</strong>：自動執行所有預定義的確定性測試案例，覆蓋主要遊戲流程和邊界條件</li>
            <li><strong>合約測試</strong>：驗證前後端通訊協議（API Contract）的一致性，確保介面規格沒有被意外修改</li>
        </ul>
        <p>
            實務上會把測試依成本<strong>分層</strong>：每次提交的快速層須在數分鐘內完成，
            每日的中量層涵蓋完整功能案例，
            數千萬局以上的<a href="/blog/qa-math-verification">數學驗證</a>則安排在版本里程碑或送審前。
            另一個常被低估的重點是<strong>測試本身的穩定性</strong>：
            間歇性失敗會摧毀團隊對整套測試的信任，
            這類案例應視為缺陷處理，找出殘留的非確定性因素並消除。
        </p>
        <DiagramFigure caption="間歇性失敗會摧毀團隊對整套測試的信任，這類案例應視為缺陷處理。">
            <svg viewBox="0 0 640 272" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>測試依成本分層</title>
            <desc>快速層每次提交都跑，中量層每日執行，最重的數學驗證安排在里程碑。</desc>
            <rect x="220" y="40" width="200" height="50" rx="8" fill="var(--dg-3)"/>
            <text x="320" y="62" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="700">快速層</text>
            <text x="320" y="80" font-size="11.5" fill="#ffffff" text-anchor="middle">數分鐘內完成</text>
            <text x="206" y="70" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">每次提交</text>
            <rect x="155" y="102" width="330" height="50" rx="8" fill="var(--dg-2)"/>
            <text x="320" y="124" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="700">中量層</text>
            <text x="320" y="142" font-size="11.5" fill="#ffffff" text-anchor="middle">完整功能案例</text>
            <text x="141" y="132" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">每日執行</text>
            <rect x="90" y="164" width="460" height="50" rx="8" fill="var(--dg-1)"/>
            <text x="320" y="186" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="700">數學驗證</text>
            <text x="320" y="204" font-size="11.5" fill="#ffffff" text-anchor="middle">數千萬局以上</text>
            <text x="76" y="194" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">里程碑或送審前</text>
            <text x="320" y="258" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">愈往下樣本量愈大、耗時愈長，因此執行頻率愈低</text>
            </svg>
        </DiagramFigure>

        <h3>視覺回歸測試</h3>
        <p>
            <strong>截圖比對（Screenshot Comparison）</strong>是視覺回歸測試的核心方法。
            測試框架在特定遊戲狀態下擷取截圖，與基準圖進行像素級比對，
            差異超過容差閾值時標記為需要人工審查。
            這種方法特別適合偵測意外的 UI 偏移、字型變更、動畫異常等視覺退化。
        </p>
        <p>
            前提是畫面本身<strong>可被穩定重現</strong>：固定解析度、
            鎖定動畫時間軸並在指定影格擷取，否則結果會被誤報淹沒。
            容差閾值通常對關鍵區從嚴、對背景動態區放寬。
        </p>

        <h3>效能基準測試</h3>
        <p>
            效能測試確保遊戲在目標裝置上流暢運行：
        </p>
        <ul>
            <li><strong>幀率監控</strong>：在動畫密集的場景（如大獎慶祝、Cascading Wins 連鎖）中，幀率不應低於 30 FPS</li>
            <li><strong>記憶體使用</strong>：長時間遊戲後的記憶體用量應保持穩定，不應持續增長（記憶體洩漏）</li>
            <li><strong>載入時間</strong>：首次載入和場景切換需在可接受範圍內，行動端建議控制在 5 秒以內</li>
            <li><strong>CPU 使用率</strong>：閒置時的 CPU 佔用率應降到最低，避免耗電與發熱</li>
        </ul>
        <p>
            這些指標應以<strong>分位數</strong>而非平均值評估：
            平均幀率良好但尾端嚴重掉幀，感受上就是「偶爾會卡一下」，
            而這往往正好發生在大獎慶祝的關鍵時刻。
            基準也須綁定裝置層級並隨版本追蹤趨勢。
        </p>

        <h2><i class="fa-solid fa-certificate" aria-hidden="true"></i>合規測試與第三方認證</h2>

        <h3>GLI-19 / BMM 測試要求</h3>
        <p>
            在合規市場上線的老虎機遊戲必須通過<strong>國際認證機構</strong>的審計。
            <strong>GLI-19</strong>（Gaming Laboratories International 的互動式博弈技術標準）
            和 <strong>BMM Testlabs</strong> 是業界兩大主流認證機構，
            它們的測試涵蓋以下關鍵領域：
        </p>
        <ul>
            <li><a href="/blog/rng-security">RNG</a>（隨機數生成器）的統計學測試套件通過</li>
            <li>RTP 的實測值與申報值的一致性</li>
            <li>遊戲規則的正確實作與玩家資訊的完整揭露</li>
            <li>錯誤處理和中斷恢復的安全性</li>
            <li>客戶端與伺服器之間的通訊安全</li>
        </ul>
        <p>
            不同司法管轄區在共同標準之外往往還附加地區性要求，
            這些差異最好在設計階段就整理成可查核的清單並參數化支援。
        </p>

        <h3>RNG 審計追蹤</h3>
        <p>
            合規測試的一個核心要求是<strong>完整的審計追蹤（Audit Trail）</strong>。
            系統必須記錄每一次 RNG 呼叫產生的隨機數值，並能利用這些記錄<strong>精確重現任何一局遊戲的結果</strong>。
            認證審計人員會隨機抽取歷史記錄，注入相同的隨機數序列進行重播，
            驗證結果與原始記錄完全一致，任何不一致都會導致認證失敗。
        </p>
        <p>
            這與前述的確定性重播是同一套能力的兩種用途：
            開發階段用它構造測試場景，認證階段用它證明結果可還原。
            重播能力因此應從初期就當作正式功能維護，
            並在版本變更後驗證<strong>舊記錄仍能被正確重播</strong>。
        </p>

        <h3>前後端隔離驗證</h3>
        <p>
            認證機構會嚴格驗證<strong>客戶端無法影響遊戲結果</strong>的生成。
            測試內容包括：
        </p>
        <ul>
            <li>遊戲結果完全由伺服器端計算，客戶端僅負責呈現</li>
            <li>客戶端發送的任何參數（下注金額、選擇項等）不會影響 RNG 的輸出</li>
            <li>通訊協議不會洩漏未來的遊戲結果</li>
            <li>客戶端無法透過修改請求來改變已決定的結果</li>
            <li>跨遊戲的狀態隔離：一款遊戲的資料不會影響另一款遊戲的結果</li>
        </ul>
        <p>
            這類驗證需要以<strong>對抗性的角度</strong>設計：主動竄改請求、重送已完成的請求、
            在看似有選擇權的環節中嘗試改變已決定的結果。
            當遊戲存在讓玩家選擇的互動時，必須確認所有選擇在結果上等價。
        </p>

        <h3>認證文件準備</h3>
        <p>
            申請第三方認證不僅需通過技術測試，還需準備完整的<strong>認證提交文件</strong>：
        </p>
        <ul>
            <li><strong>數學文件（PAR Sheet）</strong>：完整的機率表、賠付表、RTP 計算過程、所有可能的中獎組合及其機率</li>
            <li><strong>遊戲規則文件</strong>：詳細的遊戲規則說明，包含所有特殊功能的觸發條件和結算邏輯</li>
            <li><strong>技術架構文件</strong>：RNG 實作細節、前後端通訊架構、資料儲存策略</li>
            <li><strong>測試報告</strong>：內部測試的完整結果，包含模擬測試數據、統計分析結果和品質指標</li>
        </ul>
        <p>
            這些文件必須與實際交付的版本<strong>嚴格對應</strong>：
            送審後的修改都可能要求重新提交，版本凍結因此是關鍵紀律；
            文件與實作不一致，是認證往返最常見的原因。
        </p>
        <p>
            認證過程通常需要數週到數月。認證機構可能在審查中提出問題或要求修正，
            開發團隊需及時回應並提供補充資料。通過認證後，遊戲將獲得正式的合規證書，
            成為進入目標市場的通行證。降低往返次數的最佳策略，
            是把合規要求視為<strong>設計階段的輸入</strong>，而非交付前的檢查項。
        </p>
        <p>
            老虎機的 QA 是一項涵蓋<strong>數學、工程、體驗和合規</strong>四大面向的系統工程。
            本篇聚焦自動化與合規認證，而數學模型的驗證方法、
            以及功能與玩家體感的測試實務，則分別在本系列的另外兩篇中展開。
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
