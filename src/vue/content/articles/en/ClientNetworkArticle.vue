<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-network-wired" aria-hidden="true"></i>Protocol and Reconnection</h2>
        <p>
            Whether a game holds up under real-world conditions comes down to three systems players almost never notice:
            the <strong>communication layer, the asset layer, and interface layer management</strong>. When they are done well they are entirely invisible; when they are done badly every flaw gets amplified.
        </p>
        <p>
            Among them, communication is the critical infrastructure of the whole game experience. Unlike the request-response pattern of a typical web application,
            a slot game needs a <strong>persistent connection</strong> to guarantee immediacy and state consistency.
        </p>
        <h3>Persistent Connections and Heartbeats</h3>
        <p>
            The client and the server establish a persistent connection over WebSocket and periodically exchange <strong>heartbeat packets</strong> to detect whether the connection is healthy;
            if no response arrives within the timeout window, the connection is judged to be down and the reconnection procedure starts.
            Choosing the interval is a trade-off: too long and it takes several seconds to notice a disconnect, too short and it burns unnecessary battery on mobile networks.
            We make the heartbeat mutually exclusive with actual traffic. If normal packets have already gone back and forth within the interval, that heartbeat is skipped.
        </p>
        <h3>The Communication Flow of One Spin</h3>
        <DiagramFigure caption="The client performs an already-determined result; the animation never changes where a symbol lands.">
            <svg viewBox="0 0 640 326" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Request and response for one spin</title>
            <desc>The client sends a bet request, the server validates and computes the result, and the client confirms settlement once the presentation finishes.</desc>
            <defs><marker id="dgArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fill-opacity="0.55"/></marker></defs>
            <rect x="84" y="18" width="132" height="32" rx="7" fill="var(--dg-2)"/>
            <text x="150" y="39" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="700">Client</text>
            <rect x="424" y="18" width="132" height="32" rx="7" fill="var(--dg-3)"/>
            <text x="490" y="39" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="700">Server</text>
            <line x1="158" y1="68" x2="482" y2="68" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <text x="320" y="59" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.85">send bet request</text>
            <rect x="75" y="85" width="150" height="26" rx="6" fill="var(--dg-3)" fill-opacity="0.16"/>
            
            <rect x="415" y="85" width="150" height="26" rx="6" fill="var(--dg-3)" fill-opacity="0.16"/>
            <text x="490" y="102" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.9">validate and compute</text>
            <line x1="482" y1="136" x2="158" y2="136" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <text x="320" y="127" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.85">return result</text>
            <rect x="75" y="153" width="150" height="26" rx="6" fill="var(--dg-2)" fill-opacity="0.16"/>
            <text x="150" y="170" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.9">play reel animation</text>
            <rect x="75" y="187" width="150" height="26" rx="6" fill="var(--dg-2)" fill-opacity="0.16"/>
            <text x="150" y="204" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.9">finish win presentation</text>
            <line x1="158" y1="238" x2="482" y2="238" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <text x="320" y="229" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.85">send settlement ack</text>
            <rect x="75" y="255" width="150" height="26" rx="6" fill="var(--dg-3)" fill-opacity="0.16"/>
            
            <rect x="415" y="255" width="150" height="26" rx="6" fill="var(--dg-3)" fill-opacity="0.16"/>
            <text x="490" y="272" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.9">update balances</text>
            <line x1="150" y1="50" x2="150" y2="286" stroke="currentColor" stroke-opacity="0.22" stroke-dasharray="4 4"/>
            <line x1="490" y1="50" x2="490" y2="286" stroke="currentColor" stroke-opacity="0.22" stroke-dasharray="4 4"/>
            <text x="320" y="312" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">The result is already fixed on the server; the client only performs it</text>
            </svg>
        </DiagramFigure>
        <p>
            The flow looks simple, but several edge cases hide in the details:
        </p>
        <ul>
            <li><strong>Request timeout</strong>: when the server does not respond within the configured time, the client has to decide whether to resend or surface an error. A resend must carry the identifier of the original request so the server can recognize it as a retry rather than a new round</li>
            <li><strong>Duplicate responses</strong>: network jitter can cause the same request to receive multiple responses, and the client must deduplicate them by round number</li>
            <li><strong>Out-of-order arrival</strong>: in extreme cases a packet sent later may arrive first, so a sequence-number mechanism is needed to guarantee processing order</li>
        </ul>
        <p>
            These three situations share one design principle: <strong>make every critical operation idempotent</strong>.
            No matter how many times the same request is sent or how many times a response is received, the result finally presented to the player must be identical.
            Designing idempotency into the protocol layer is far more reliable than defending against it separately at every call site.
        </p>
        <h3>Reconnection Strategy</h3>
        <p>
            Disconnects are extremely common on mobile networks: switching cell towers, stepping into an elevator, a momentary network drop.
            A good reconnection strategy has to restore game state <strong>imperceptibly</strong>. The core mechanisms are:
        </p>
        <ul>
            <li><strong>Round number comparison</strong>: the client records the last completed round number and sends it on reconnect. The server compares and returns the delta; if there is a result that was settled but never received by the client, it is pushed along with it</li>
            <li><strong>State snapshot recovery</strong>: the server returns a complete state snapshot of the current game (including remaining free game rounds not yet settled, progressive jackpot progress and so on), from which the client restores the scene to how it was before the disconnect</li>
            <li><strong>Exponential backoff on reconnect</strong>: reconnection attempts use an exponential backoff strategy (1s, 2s, 4s, 8s...) to avoid a load spike from a large number of clients reconnecting at the same time</li>
        </ul>
        <p>
            The hard part of recovery is actually not the data but the <strong>presentation</strong>: pasting the final screen straight up is jarring,
            while replaying the whole thing feels long-winded to a player who already knows the result. We decide the strategy based on which stage the disconnect happened in: a disconnect before the presentation stage gets a full replay, a disconnect after it fast-forwards to the final state.
        </p>
        <h3>Numeric Precision</h3>
        <p>
            All values on the client use <strong>integer arithmetic</strong>, taking the smallest unit as the base tick to avoid accumulated floating-point error,
            and converting to a decimal-point format only at display time. This principle has to be carried through every intermediate step, including the interpolation of number-rolling animations.
        </p>

        <h2><i class="fa-solid fa-language" aria-hidden="true"></i>Asset Management and Localization</h2>
        <p>
            The asset volume of a slot game can be quite large: hundreds of image sprites (including versions at different resolutions),
            skeletal animation data, audio files, font files and so on, and how efficiently they are managed directly affects load time and memory usage.
            Asset loading uses a <strong>staged, progressive</strong> strategy:
        </p>
        <ul>
            <li><strong>Loading screen stage</strong>: load only the minimal set (the progress bar UI, the brand logo) so something appears on screen as soon as possible</li>
            <li><strong>Main game stage</strong>: load the assets the main scene requires (reel symbols, backgrounds, basic audio, UI elements). Once this stage completes the player can start playing</li>
            <li><strong>Deferred loading stage</strong>: silently load the assets of special features in the background (big-win animations, free game scenes, special audio), which only need to be ready before the first time they are triggered</li>
        </ul>
        <p>
            Deferred loading needs a safety net: if a special feature is triggered while its assets are not yet ready, the flow must not break;
            instead an extendable transition sequence is inserted to buy time, which is also why scene transition animations are usually designed to loop seamlessly.
        </p>
        <h3>Flow Switching and Asset Switching</h3>
        <p>
            A slot's asset requirements are not a single set but change as the game switches between flows:
        </p>
        <DiagramFigure caption="Writing switches as state transitions is what guarantees every path has a matching way back.">
            <svg viewBox="0 0 640 286" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Switching between base game and special modes</title>
            <desc>The base game can enter free games or a special feature, both of which return to it, and free games can retrigger themselves.</desc>
            <defs><marker id="dgArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fill-opacity="0.55"/></marker></defs>
            <rect x="242" y="36" width="156" height="52" rx="8" fill="var(--dg-2)"/>
            <text x="320" y="67" font-size="13.5" fill="#ffffff" text-anchor="middle" font-weight="700">Base game</text>
            <rect x="66" y="180" width="168" height="52" rx="8" fill="var(--dg-1)" fill-opacity="0.16"/>
            <rect x="66" y="180" width="4" height="52" rx="2" fill="var(--dg-1)"/>
            <text x="150" y="211" font-size="13" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">Free games</text>
            <line x1="290" y1="90" x2="180" y2="176" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <line x1="204" y1="176" x2="314" y2="90" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <text x="201" y="126" font-size="11" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">trigger</text>
            <text x="275" y="148" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">returns when done</text>
            <rect x="406" y="180" width="168" height="52" rx="8" fill="var(--dg-3)" fill-opacity="0.16"/>
            <rect x="406" y="180" width="4" height="52" rx="2" fill="var(--dg-3)"/>
            <text x="490" y="211" font-size="13" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">Special feature</text>
            <line x1="350" y1="90" x2="460" y2="176" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <line x1="436" y1="176" x2="326" y2="90" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <text x="439" y="126" font-size="11" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">trigger</text>
            <text x="365" y="148" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">returns when done</text>
            <path d="M 64 196 C 18 186, 18 236, 64 222" fill="none" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <text x="38" y="252" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">retrigger</text>
            <text x="320" y="272" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">Mode changes belong in explicit state transitions, not flags scattered through the code</text>
            </svg>
        </DiagramFigure>
        <p>
            Every flow switch is simultaneously an asset switch: entering free games means loading dedicated backgrounds and symbol variants,
            and exiting means deciding what to release and what to keep in cache. The criterion is trigger frequency: assets of high-frequency flows stay in memory, while assets of low-frequency special features are released on exit.
        </p>
        <h3>Three-Layer Asset Override</h3>
        <p>
            To match the three-layer architecture, the asset system also supports <strong>three-layer overriding</strong>:
        </p>
        <ul>
            <li><strong>Engine layer</strong>: provides generic default assets</li>
            <li><strong>Framework layer</strong>: overrides them with standard assets suited to the slot genre</li>
            <li><strong>Game layer</strong>: an individual game overrides those again with custom versions</li>
        </ul>
        <p>
            When the loader looks something up it starts at the game layer and falls back downward layer by layer, so developers only need to replace the parts they want to customize and everything else automatically inherits the upper layer's defaults.
        </p>
        <h3>Multi-Language Support</h3>
        <p>
            Multi-language support is far more than "swapping the text"; it spans several dimensions:
        </p>
        <ul>
            <li><strong>Translation tables</strong>: all displayed text is managed through key-value tables with support for parameter interpolation, and the matching translation file is loaded per locale at initialization</li>
            <li><strong>Locale-specific assets</strong>: some visual elements cannot be handled by text substitution alone (images containing text, decorations in a culture-specific style), so separate versions have to be prepared for particular locales</li>
            <li><strong>Right-to-left layout (RTL)</strong>: locales such as Arabic and Hebrew require mirroring the entire interface layout, not just text direction but potentially button positions and progress bar direction as well</li>
            <li><strong>Fallback mechanism</strong>: when a translation key does not exist in the target locale, it falls back in order to the regional default language and then to English, ensuring the raw key value is never displayed</li>
            <li><strong>Layout flexibility</strong>: the same sentence can differ in length by more than a factor of two across languages, so buttons and labels have to be able to scale font size or wrap automatically</li>
        </ul>

        <h2><i class="fa-solid fa-volume-high" aria-hidden="true"></i>Audio System Design</h2>
        <p>
            The impact of audio on the slot game experience is frequently underestimated; a carefully designed audio system can substantially improve immersion and the sense of feedback.
            Our audio architecture manages all sound across <strong>three independent channels</strong>:
        </p>
        <ul>
            <li><strong>Background music</strong>: loops continuously, with only one track playing at a time</li>
            <li><strong>Short sound effects</strong>: triggered by events, and able to play several at once</li>
            <li><strong>Voice</strong>: assets have to change with the locale</li>
        </ul>
        <p>
            The three channels have independent volume controls that the player can adjust separately.
        </p>
        <h3>Syncing Audio With Game State</h3>
        <p>
            The audio system is deeply integrated with the game state machine, ensuring precise synchronization between sound and picture:
        </p>
        <ul>
            <li><strong>Reel sounds</strong>: the sustained low-frequency sound during the spin, the impact sound as each column stops, the suspense sound during anticipation, all triggered by the state machine's stage transition events</li>
            <li><strong>Win feedback</strong>: a small win plays a short coin sound, and the larger the value the grander the audio, escalating from a cheerful chime to a full celebratory piece</li>
            <li><strong>Scene transition score</strong>: when going from the main game into free games, the background music needs to transition naturally rather than cut abruptly</li>
        </ul>
        <p>
            There is a practical detail in aligning the reel stop sound: the sound should align with <strong>the instant the reel makes contact with the target position</strong>,
            not with the end of the whole animation. The overshoot and rebound happen after contact, so playing it late puts it half a beat behind.
        </p>
        <h3>Crossfading and Preventing Stacking</h3>
        <p>
            On a scene transition, the audio system performs a <strong>crossfade</strong>: the current scene's background music fades down over a configured duration
            while the new scene's music fades up, with the crossfade curves independently configurable to keep the transition natural.
        </p>
        <p>
            Another common problem is stacking: in a fast-paced sequence the same sound may be triggered several times within a very short window (consecutive win-line presentations, for example),
            and multiple stacked instances produce a harsh volume spike. The audio system prevents this with three mechanisms:
        </p>
        <ul>
            <li><strong>Minimum interval limit</strong>: the same sound will not be re-triggered within a configured time interval</li>
            <li><strong>Instance count cap</strong>: the maximum number of simultaneous instances of the same sound is limited, and beyond that the earliest instance is replaced</li>
            <li><strong>Priority mechanism</strong>: a higher-priority sound can interrupt a lower-priority one, ensuring important feedback is not drowned out</li>
        </ul>

        <h2><i class="fa-solid fa-layer-group" aria-hidden="true"></i>Interface Layer Design</h2>
        <p>
            Managing interface layers in a slot game is more complex than in a typical application: all sorts of elements appear and disappear at different moments,
            and strict <strong>layering relationships and mutual-exclusion rules</strong> hold between them. We use a four-layer architecture:
        </p>
        <ul>
            <li><strong>Game interface layer</strong>: the bottommost persistent interface, containing the reel area, the bet panel, value displays, function buttons and so on, visible at all times during play</li>
            <li><strong>Feature panel layer</strong>: the paytable, rules, history and settings panels that overlay it. Opening one covers the screen but does not interrupt game logic</li>
            <li><strong>Celebration effect layer</strong>: big-win celebration animations, full-screen effects triggered by special features and the like, which occupy the whole screen and cover everything beneath</li>
            <li><strong>System message layer</strong>: the topmost layer, showing system-level notifications such as network errors. These messages must always be visible and never covered by any game content</li>
        </ul>
        <h3>The Mutual-Exclusion Lock Mechanism</h3>
        <p>
            Strict <strong>mutual-exclusion locking rules</strong> hold between the layers, preventing the confusion of several overlays appearing at once:
        </p>
        <ul>
            <li><strong>Same-layer exclusion</strong>: only one panel can be shown at a time within a layer. If the player taps settings while the paytable is open, the paytable must close first</li>
            <li><strong>Cross-layer blocking</strong>: while a higher-priority layer is active, interaction with lower-priority layers is temporarily disabled. Feature panels cannot be opened while a celebration animation is playing</li>
            <li><strong>Queueing mechanism</strong>: when a system message appears on the topmost layer, open requests from other layers are held in a queue and processed in order once the message closes</li>
            <li><strong>Forced pass-through</strong>: certain system-level messages (a critical error, for example) can pass through any mutual-exclusion lock, displaying immediately and freezing all interaction in the layers below</li>
        </ul>
        <p>
            This mechanism keeps the interface orderly and predictable in every situation.
            Even in the extreme case of a disconnect while the big-win celebration animation is playing, the communication layer's error message passes through to the topmost layer,
            while the celebration animation is frozen rather than aborted, resuming from the frozen point once the player acknowledges. The cooperation of the three supporting systems at that moment
            is exactly where the whole architecture really gets validated.
        </p>

        <p>
            The reason these supporting systems can cooperate without becoming tangled is that a clear layered architecture and state machine definition exist underneath them;
            and the visual subject they serve, the reels' animation curves and stop rhythm, has its own independent design methodology.
            We cover those two topics in the other two articles of this series.
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
