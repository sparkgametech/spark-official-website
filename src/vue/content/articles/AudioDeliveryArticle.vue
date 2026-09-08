<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-wave-square" aria-hidden="true"></i>音頻母帶規格：取樣率、位元深度與響度</h2>
        <p>
            所有音頻素材都應以<strong>高規格母帶</strong>製作與保存，再轉出遊戲使用的壓縮版本。
            製作階段建議統一使用 48 kHz / 24 bit 的無損格式，保留足夠的動態餘裕；
            一旦母帶以低品質儲存，後期再怎麼處理都無法把細節找回來。
        </p>
        <p>
            <strong>取樣率</strong>決定可重現的最高頻率，44.1 kHz 與 48 kHz 都能覆蓋人耳可聽範圍；
            短促的介面音效即使降到 22.05 kHz，多數玩家在手機喇叭上也難以分辨，
            這是壓縮體積時最先可動用的空間。
            <strong>位元深度</strong>則決定動態範圍，輸出到遊戲時降為 16 bit 已完全足夠。
        </p>

        <h3>響度標準與動態範圍</h3>
        <p>
            音頻交付最常被忽略、卻最容易出問題的環節是<strong>響度一致性</strong>。
            若各素材由不同人在不同環境下混音，遊戲中就會出現
            「某個音效特別大聲、某段音樂特別小聲」的狀況，事後逐一調整音量既費時又難以收斂。
        </p>
        <p>
            正確的做法是在交付前統一以<strong>整合式響度（LUFS）</strong>為基準正規化，
            而非依賴峰值音量。<a href="/blog/audio-bgm-design">背景音樂</a>建議落在約 -16 LUFS，
            音效則依類別分層，介面音最低、慶祝音最高，各層保持固定的響度差；
            同時保留約 -1 分貝的<strong>真實峰值餘裕</strong>，
            避免多個音效同時播放時的振幅疊加造成數位破音。
        </p>
        <p>
            動態範圍也要考量情境。玩家多半在嘈雜環境中以手機喇叭遊玩，
            過大的動態會讓安靜段落聽不見；但壓縮過頭會讓聲音黏成一團，分級音效的層次感隨之消失。
        </p>

        <h2><i class="fa-solid fa-file-audio" aria-hidden="true"></i>壓縮格式選擇與相容性</h2>
        <p>
            在 Web 端老虎機開發中，壓縮格式的選擇直接影響相容性和檔案大小：
        </p>
        <ul>
            <li><strong>OGG Vorbis</strong>：開源免授權，壓縮率優異，桌面瀏覽器原生支援，但部分行動端支援不穩定</li>
            <li><strong>MP3</strong>：相容性最廣，專利授權已到期，但壓縮率略遜，且格式本身會在檔頭尾產生靜音，不利無縫循環</li>
            <li><strong>AAC</strong>：壓縮效率高，在行動端有最佳表現，是覆蓋 OGG 支援缺口的首選</li>
        </ul>
        <p>
            最佳策略是<strong>同時準備兩種格式</strong>，
            在執行時期透過瀏覽器提供的格式支援查詢介面，動態選擇可播放的版本。
            若循環音樂必須使用會產生靜音填充的格式，
            則需在音頻管理器中以精確的循環點參數指定起訖位置，繞過格式本身的限制。
        </p>

        <h3>行動裝置的檔案大小控制</h3>
        <p>
            行動端的頻寬與記憶體限制要求嚴格控制音頻資源總量，
            一般建議整款遊戲控制在 <strong>3 至 5 MB</strong> 以內。
            可行策略包括：依素材類型分配不同取樣率；
            將短促音效轉為單聲道（聽感幾乎無差異，體積直接減半）；
            採用可變位元率編碼；以及清除素材頭尾殘留的多餘靜音。
        </p>
        <p>
            另一個容易被低估的成本是<strong>解碼後的記憶體佔用</strong>。
            壓縮檔可能只有幾百 KB，解碼成未壓縮取樣資料後體積可能膨脹十倍以上。
            評估預算時，必須同時看「下載體積」與「解碼後常駐體積」。
        </p>

        <h3>預載入與串流策略</h3>
        <p>
            載入策略需要在「首屏速度」和「播放即時性」之間取得平衡：
        </p>
        <ul>
            <li><strong>關鍵音效預載入</strong>：旋轉、轉輪、基礎中獎等核心音效必須在啟動時完整解碼到記憶體，確保零延遲播放</li>
            <li><strong>背景音樂串流</strong>：音樂體積大且不需瞬間響應，可邊下載邊播放，縮短初始載入時間</li>
            <li><strong>延遲載入</strong>：大獎慶祝、特殊模式音樂等低頻資源可延後下載，但須在該狀態發生前備妥，避免關鍵時刻無聲</li>
        </ul>
        <p>
            此外，多數行動端瀏覽器有<strong>自動播放限制</strong>，必須由玩家的第一次觸控解鎖音頻輸出，
            因此載入流程需安排明確的進入互動點，並在該次互動中完成音頻環境初始化。
        </p>

        <h2><i class="fa-solid fa-sliders" aria-hidden="true"></i>音軌匯流排架構</h2>
        <p>
            專業的音效系統採用<strong>多組獨立匯流排</strong>，讓玩家分別控制各類音頻的音量：
        </p>
        <ul>
            <li><strong>音樂匯流排</strong>：背景音樂專用，部分玩家偏好關閉音樂只保留音效</li>
            <li><strong>音效匯流排</strong>：處理所有與遊戲機制相關的聲音，如轉輪、中獎與按鈕</li>
            <li><strong>語音匯流排</strong>：用於語音播報或角色語音，部分遊戲不使用</li>
        </ul>
        <p>
            所有匯流排最終匯入一個主輸出，玩家的總音量開關作用於此。
            這種架構也大幅簡化動態混音：
            <a href="/blog/audio-sfx-interactive">音量閃避</a>只需對單一匯流排調整增益，不必逐一處理個別音效的播放狀態。
        </p>
        <DiagramFigure caption="玩家可以分別控制各類音頻的音量，部分玩家偏好關閉音樂只保留音效。">
            <svg viewBox="0 0 640 252" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>音軌匯流排架構</title>
            <desc>音樂、音效與語音各走獨立匯流排，最後匯入單一主輸出。</desc>
            <rect x="32" y="44" width="156" height="66" rx="8" fill="var(--dg-1)" fill-opacity="0.12"/>
            <rect x="32" y="44" width="5" height="66" rx="3" fill="var(--dg-1)"/>
            <text x="110" y="71" font-size="13" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">音樂匯流排</text>
            <text x="110" y="91" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.8">背景音樂專用</text>
            <line x1="110" y1="110" x2="110" y2="146" stroke="currentColor" stroke-opacity="0.35" stroke-width="1"/>
            <line x1="110" y1="146" x2="320" y2="146" stroke="currentColor" stroke-opacity="0.35" stroke-width="1"/>
            <rect x="224" y="44" width="156" height="66" rx="8" fill="var(--dg-2)" fill-opacity="0.12"/>
            <rect x="224" y="44" width="5" height="66" rx="3" fill="var(--dg-2)"/>
            <text x="302" y="71" font-size="13" fill="var(--dg-2-ink)" text-anchor="middle" font-weight="700">音效匯流排</text>
            <text x="302" y="91" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.8">轉輪、中獎與按鈕</text>
            <line x1="302" y1="110" x2="302" y2="146" stroke="currentColor" stroke-opacity="0.35" stroke-width="1"/>
            <line x1="302" y1="146" x2="320" y2="146" stroke="currentColor" stroke-opacity="0.35" stroke-width="1"/>
            <rect x="416" y="44" width="156" height="66" rx="8" fill="var(--dg-3)" fill-opacity="0.12"/>
            <rect x="416" y="44" width="5" height="66" rx="3" fill="var(--dg-3)"/>
            <text x="494" y="71" font-size="13" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">語音匯流排</text>
            <text x="494" y="91" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.8">語音播報或角色語音</text>
            <line x1="494" y1="110" x2="494" y2="146" stroke="currentColor" stroke-opacity="0.35" stroke-width="1"/>
            <line x1="494" y1="146" x2="320" y2="146" stroke="currentColor" stroke-opacity="0.35" stroke-width="1"/>
            <line x1="320" y1="146" x2="320" y2="166" stroke="currentColor" stroke-opacity="0.35" stroke-width="1"/>
            <rect x="226" y="166" width="188" height="46" rx="8" fill="var(--dg-2)"/>
            <text x="320" y="194" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="700">主輸出（總音量）</text>
            <text x="320" y="238" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">音量閃避只需對單一匯流排調整增益，不必逐一處理個別音效的播放狀態</text>
            </svg>
        </DiagramFigure>

        <h2><i class="fa-solid fa-truck-fast" aria-hidden="true"></i>從需求規格到交付</h2>

        <h3>音效需求規格書</h3>
        <p>
            在製作開始前，遊戲企劃需準備一份<strong>音效需求規格書</strong>，逐項列出所需音效：
        </p>
        <ul>
            <li><strong>識別名稱與觸發條件</strong>：唯一名稱，以及什麼事件會觸發此音效</li>
            <li><strong>情境描述</strong>：期望的情緒感受與風格方向</li>
            <li><strong>時長限制</strong>：建議的長度範圍</li>
            <li><strong>是否循環</strong>：單次播放或需循環，循環者須標註循環點</li>
            <li><strong>優先權</strong>：多個音效同時觸發時的取捨順序</li>
            <li><strong>變體數量</strong>：高頻音效需要幾個變體以避免聽覺疲勞</li>
        </ul>

        <h3>命名規範</h3>
        <p>
            統一的命名規範對團隊協作至關重要。
            建議採用<strong>「類型前綴 + 場景 + 動作 + 序號」</strong>的結構化命名：
        </p>
        <ul>
            <li><strong>類型前綴</strong>：以音樂、音效、語音三類開頭，讓開發人員一眼辨識類型並依匯流排批次處理</li>
            <li><strong>場景與動作</strong>：標註所屬遊戲模式與具體動作</li>
            <li><strong>序號</strong>：同一組音效的多個變體以兩位數結尾，方便輪替播放時以程式化方式列舉</li>
        </ul>
        <p>
            全部使用小寫與底線，避免大小寫敏感度造成載入失敗。
        </p>

        <h3>事件驅動的整合方式</h3>
        <p>
            音效整合時採用<strong>事件驅動（Event-Driven）</strong>的觸發架構：
            遊戲邏輯層不直接呼叫播放函式，而是發送語意化的事件通知，
            由音頻管理器決定播放什麼、用哪個匯流排、以什麼優先權播放。
            這種解耦讓音效邏輯能獨立調整而不動到核心邏輯，也讓同一套機制在不同專案間重複使用。
            無論在 Cocos Creator、Unity 或純網頁環境中，這個原則都同樣適用。
        </p>
        <p>
            還建議搭配一份由音效設計師維護的<strong>事件與素材對照表</strong>。
            替換音效或調整分級門檻時只需修改對照表，不必變更程式碼，
            讓調音回到最懂聲音的人手上，也縮短反覆試聽的迭代週期。
        </p>

        <h3>品質把關</h3>
        <p>
            整合完成後，需要在多種環境下進行測試：
        </p>
        <ul>
            <li><strong>裝置測試</strong>：在不同手機、平板與桌面瀏覽器上確認播放正常，特別注意行動端的自動播放限制</li>
            <li><strong>音量平衡</strong>：在外放喇叭與耳機下分別測試，確認相對音量合理</li>
            <li><strong>時序精確度</strong>：確認音效與視覺動畫同步，超過 50 毫秒的延遲都可能被玩家感知</li>
            <li><strong>記憶體監控</strong>：長時間遊玩後確認不存在音頻資源的記憶體洩漏</li>
            <li><strong>中斷恢復</strong>：測試來電中斷、切換應用程式後返回等場景的恢復行為</li>
            <li><strong>長時間聆聽</strong>：連續遊玩三十分鐘以上，檢驗循環接縫與高頻音效的疲勞感</li>
        </ul>
        <p>
            完整的音頻流程從需求定義到最終交付，需要遊戲企劃、音效設計師與前端工程師的緊密協作，
            透過標準化的規範與品質把關，才能確保每款遊戲都呈現專業水準的聽覺體驗。
        </p>
        <p>
            而這些規格與流程服務的對象，是背景音樂建立的情緒基調，
            以及音效分級與互動音頻系統構築的回饋層次。
            本系列的另外兩篇分別針對這兩個主題有更深入的討論。
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
