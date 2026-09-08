<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-ear-listen" aria-hidden="true"></i>音效是玩家與遊戲之間的聽覺語言</h2>
        <p>
            遊戲中每個互動操作都需要對應的音效回饋，這些音效構成了玩家與遊戲之間的聽覺語言。
            玩家不會刻意去聽，但少了其中一環，體驗就會立刻顯得空洞。
        </p>
        <ul>
            <li><strong>啟動音</strong>：按下旋轉按鈕的瞬間音效，有力且短促，給予清晰的操作確認感</li>
            <li><strong>轉輪滾動音</strong>：模擬轉輪高速轉動的持續循環音</li>
            <li><strong>轉輪停止音</strong>：每個轉輪依次停止的音效，應具備<strong>從左到右的序列感</strong>，每一聲略有不同，給予視聽同步的滿足感</li>
        </ul>
        <p>
            介面操作同樣需要回饋：注碼調整的點擊聲、選單開關的過渡音、自動旋轉的啟停提示音等。
            這些音效應保持<strong>簡潔、一致且不喧賓奪主</strong>，
            使用統一的音色家族，讓整體聽覺體驗協調。
        </p>

        <h2><i class="fa-solid fa-ranking-star" aria-hidden="true"></i>中獎等級與音效層次的對應</h2>
        <p>
            中獎音效是最能影響玩家情緒的音效類別，必須根據<strong>獎金大小進行分層設計</strong>：
        </p>
        <ul>
            <li><strong>小獎</strong>：短促清脆的金幣聲，約 1 至 2 秒，不打斷遊戲節奏</li>
            <li><strong>中獎</strong>：較華麗的組合，加入弦樂或銅管，持續 3 至 5 秒，搭配跳動的數字動畫</li>
            <li><strong>大獎</strong>：完整序列，含開場爆發音、持續慶祝音與收束音，總長可達 8 至 15 秒</li>
            <li><strong>頂級大獎</strong>：可能包含獨特旋律、人聲歡呼與特效音層疊加，配合全屏動畫持續 15 至 30 秒</li>
        </ul>
        <p>
            每一層級在<strong>能量感、複雜度與時長</strong>三個維度上都應有明顯遞進，
            讓玩家僅從聲音就能感知「這一次贏了多少」。
        </p>

        <h3>分級門檻的設計陷阱</h3>
        <p>
            音效分級的判斷依據不應是絕對金額，而是<strong>贏分相對於當前押注的倍數</strong>。
            以絕對金額為門檻，高押注玩家會頻繁聽到頂級慶祝序列而迅速麻痺，
            低押注玩家則整場都聽不到一次高階音效；改以倍數為門檻，
            不同押注級距的玩家才能獲得一致的情緒曲線。
        </p>
        <p>
            另一個常見問題是<strong>等級之間的落差不足</strong>。
            若相鄰兩級只是「稍微大聲一點」，玩家分不出差異，分級便形同虛設。
            建議每一級在時長上至少有一倍差距，並在配器上引入新的樂器家族：
            中獎加入弦樂、大獎疊上銅管與打擊、頂級大獎才動用人聲，用新音色標記等級的躍升。
        </p>

        <h3>連線音階的遞進</h3>
        <p>
            當一次旋轉命中多條連線時，得分會逐條結算，每一條線都需要一個短促的計分音。
            如果每條線都播放相同的音，聽起來會像機械式的計數器；
            正確的做法是讓計分音<strong>沿著音階逐級上行</strong>，形成往上攀升的旋律線。
        </p>
        <p>
            音階的選擇直接影響聽感。<strong>五聲音階</strong>是最安全的選擇。
            它不含半音，任意兩音疊加都不刺耳，即使計分音因結算過快而重疊仍然和諧。
            上行音級也需設定上限，通常在八到十二階後停止升高或折返重來，
            避免高連線數時攀升到尖銳頻段。
            這些具備音高的素材，都應與<a href="/blog/audio-bgm-design">背景音樂</a>的主調一致。
        </p>

        <h2><i class="fa-solid fa-star" aria-hidden="true"></i>特殊符號與聽牌期待</h2>
        <ul>
            <li><strong>Wild 符號出現</strong>：搭配閃亮的特效音，提醒玩家注意這個可替代其他符號的圖標</li>
            <li><strong>Scatter 符號落定</strong>：每一個出現都應有明確提示音，且隨數量增加<strong>逐步升級</strong>緊張度</li>
            <li><strong>特殊功能觸發</strong>：需要一段具「事件發生感」的過場音效，標誌遊戲狀態的重大轉變</li>
        </ul>
        <p>
            <strong>聽牌期待（Anticipation）</strong>是老虎機音效設計中最精妙的元素之一。
            當前面的轉輪已顯示出觸發潛力，最後一輪會刻意放慢，
            同時搭配<strong>逐漸升高的緊張音效</strong>：持續上升的弦樂或合成器音色，
            音高與音量隨時間攀升，將期待感推向頂點。
            這段音效必須設計成<strong>可循環且可隨時中斷</strong>的結構：
            前段是一小節可反覆播放的張力層，配合長度不固定的減速動畫；
            結尾準備兩個分支，命中時接上觸發音，落空時接一個下行的洩氣音。
            無論結果如何，這幾秒鐘的張力都為遊戲增添了極大的戲劇性。
        </p>

        <h2><i class="fa-solid fa-diagram-project" aria-hidden="true"></i>互動音頻系統：讓聲音跟著狀態走</h2>
        <p>
            現代老虎機的音效已經從簡單的「事件觸發播放」演進為<strong>動態互動音頻系統</strong>。
            音頻管理器會根據遊戲狀態即時調整播放行為：
        </p>
        <ul>
            <li><strong>連續中獎遞進</strong>：在消除連鎖機制中，每一次接續的中獎音效都比上一次更激昂。音高提升、節奏加快、層次增加，用聲音傳達「連續好運」</li>
            <li><strong>倍率音效映射</strong>：乘數的每一次提升都對應更高能量等級的音效回饋，讓數字的增長獲得聽覺強化</li>
        </ul>

        <h3>觸發優先權與同時發聲數限制</h3>
        <p>
            當多個事件在同一瞬間發生時，若毫無節制地全部播放，
            結果會是一團無法辨識的噪音，瞬間的振幅疊加還可能造成破音。
            因此音頻管理器必須設定<strong>同時發聲數上限（Voice Limit）</strong>，
            行動裝置上通常控制在十六到三十二個發聲位之內。
        </p>
        <p>
            發聲位用盡時，需要一套明確的<strong>搶佔規則</strong>：
            先淘汰優先權最低者；同優先權時淘汰播放最久、衰減最多的那一個；
            同一音效若在極短時間內重複觸發，則沿用既有發聲位重新起播。
            每個音效都應在需求規格中標註優先權。大獎慶祝與功能觸發音永不可被搶佔。
        </p>

        <h3>音量閃避與空間定位</h3>
        <p>
            <strong>音量閃避（Ducking）</strong>是維持聽覺層次清晰的關鍵技術。
            觸發大獎慶祝時，背景音樂所在的<a href="/blog/audio-specs-delivery">匯流排</a>應自動降低 60% 至 80% 音量，
            讓慶祝音效佔據主導，結束後再緩慢恢復。
            閃避的下降時間宜短（約 100 至 200 毫秒），恢復時間宜長（約 500 毫秒以上），
            讓路的動作才不會被察覺。以匯流排為單位進行閃避，能大幅簡化動態混音的邏輯。
        </p>
        <DiagramFigure caption="以匯流排為單位進行閃避，能大幅簡化動態混音的邏輯。">
            <svg viewBox="0 0 640 270" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>音量閃避（Ducking）的時間曲線</title>
            <desc>慶祝音效觸發時背景音樂快速降低音量，結束後緩慢恢復。</desc>
            <line x1="74" y1="190" x2="596" y2="190" stroke="currentColor" stroke-opacity="0.3" stroke-width="1"/>
            <line x1="74" y1="52" x2="596" y2="52" stroke="currentColor" stroke-opacity="0.18" stroke-width="1" stroke-dasharray="4 4"/>
            <polyline points="74,52 190,52 218,148 372,148 470,52 596,52" fill="none" stroke="var(--dg-2-ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <rect x="190" y="44" width="182" height="146" rx="0" fill="var(--dg-1)" fill-opacity="0.10"/>
            <polyline points="190,190 224,78 352,82 382,190" fill="none" stroke="var(--dg-1-ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <text x="66" y="56" font-size="11.5" fill="currentColor" text-anchor="end" opacity="0.75">原音量</text>
            <text x="66" y="152" font-size="11.5" fill="currentColor" text-anchor="end" opacity="0.75">降低後</text>
            <text x="204" y="210" font-size="11.5" fill="var(--dg-2-ink)" text-anchor="middle">下降 100 ~ 200 毫秒</text>
            <text x="421" y="210" font-size="11.5" fill="var(--dg-2-ink)" text-anchor="middle">恢復 500 毫秒以上</text>
            <text x="295" y="66" font-size="12" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">慶祝音效</text>
            <text x="74" y="234" font-size="12" fill="var(--dg-2-ink)" font-weight="700">背景音樂</text>
            <text x="320" y="256" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">下降要快、恢復要慢，讓路的動作才不會被察覺</text>
            </svg>
        </DiagramFigure>
        <p>
            在支援立體聲輸出的環境中，善用<strong>聲像定位（Panning）</strong>可以增強空間感。
            最典型的應用是轉輪停止音的左右分佈：第一個轉輪偏左、最後一個偏右，
            中間依序分佈，創造出與視覺一致的空間移動感。
            但聲像幅度不宜過寬，多數玩家使用手機外放喇叭，
            過度分離在單一發聲體上反而會造成音量不平衡。
        </p>

        <h2><i class="fa-solid fa-face-tired" aria-hidden="true"></i>避免聽覺疲勞的設計</h2>
        <p>
            老虎機是高重複性的遊戲，同一個音效一小時內可能被觸發上千次，聽覺疲勞必須被正面處理。
        </p>
        <ul>
            <li><strong>素材輪替</strong>：為高頻音效準備三到五個細微差異的變體輪流播放，避免連續兩次聽到完全相同的波形</li>
            <li><strong>參數隨機化</strong>：每次播放對音高施加正負 3% 至 5% 的偏移、音量正負 2 分貝的浮動，成本極低但效果顯著</li>
            <li><strong>頻譜留白</strong>：不同類別的音效各自佔據不同頻段，轉輪音偏中低頻、計分音偏中高頻、慶祝音才動用全頻譜，避免互相遮蔽</li>
            <li><strong>刻意的安靜</strong>：不是每個動作都需要聲音，適度留白能讓後續音效更有衝擊力</li>
        </ul>
        <p>
            這些音效的情緒基準線，來自背景音樂鋪陳的調性與節奏，
            相關設計可參考本系列談背景音樂與情緒節奏的那一篇；
            至於素材該以什麼規格製作與交付，則在技術規格與交付流程篇中有完整說明。
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
