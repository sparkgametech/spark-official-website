<template>
    <div class="blog-article">
        <h2>Master Audio Specifications: Sample Rate, Bit Depth and Loudness</h2>
        <p>
            All audio assets should be produced and archived as <strong>high-specification masters</strong>, from which the compressed versions used in the game are exported.
            During production, a uniform lossless format at 48 kHz / 24 bit is recommended, preserving ample dynamic headroom;
            once a master is stored at low quality, no amount of later processing can recover the detail.
        </p>
        <p>
            <strong>Sample rate</strong> determines the highest reproducible frequency, and both 44.1 kHz and 48 kHz cover the range of human hearing;
            short interface sounds dropped as low as 22.05 kHz are hard for most players to distinguish on a phone speaker,
            which makes this the first place to look when compressing file size.
            <strong>Bit depth</strong> determines dynamic range, and reducing to 16 bit for the game export is entirely sufficient.
        </p>

        <h3>Loudness Standards and Dynamic Range</h3>
        <p>
            The most overlooked yet most trouble-prone part of audio delivery is <strong>loudness consistency</strong>.
            If assets are mixed by different people in different environments, the game ends up with
            "this sound is unusually loud, that piece of music is unusually quiet," and adjusting levels one by one after the fact is both time-consuming and hard to converge.
        </p>
        <p>
            The correct approach is to normalize everything against <strong>integrated loudness (LUFS)</strong> before delivery,
            rather than relying on peak level. Background music is recommended to land around -16 LUFS,
            while sound effects are tiered by category: interface sounds lowest, celebration sounds highest, with a fixed loudness gap held between tiers;
            at the same time, leave roughly 1 dB of <strong>true peak headroom</strong>
            to prevent digital clipping from amplitude summing when several sounds play at once.
        </p>
        <p>
            Dynamic range has to account for context as well. Most players are on a phone speaker in a noisy environment,
            and too much dynamic range makes quiet passages inaudible; but over-compressing glues the sound into a single mass, and the layering of the tiered sounds disappears with it.
        </p>

        <h2>Choosing a Compression Format, and Compatibility</h2>
        <p>
            In web-based slot development, the choice of compression format directly affects compatibility and file size:
        </p>
        <ul>
            <li><strong>OGG Vorbis</strong>: open source and royalty-free, with excellent compression ratios and native support in desktop browsers, but support on some mobile devices is unreliable</li>
            <li><strong>MP3</strong>: the broadest compatibility, with its patents now expired, but a slightly weaker compression ratio, and the format itself introduces silence at the head and tail, which works against seamless loops</li>
            <li><strong>AAC</strong>: high compression efficiency with the best performance on mobile, making it the first choice for covering the gaps in OGG support</li>
        </ul>
        <p>
            The best strategy is to <strong>prepare both formats</strong>,
            and at runtime use the browser's format-support query interface to select a playable version dynamically.
            If looping music has to use a format that introduces padded silence,
            then precise loop point parameters must specify the start and end positions in the audio manager, working around the format's own limitation.
        </p>

        <h3>Controlling File Size on Mobile Devices</h3>
        <p>
            Bandwidth and memory constraints on mobile demand strict control over the total volume of audio resources,
            and a general recommendation is to keep an entire game within <strong>3 to 5 MB</strong>.
            Workable strategies include assigning different sample rates by asset type;
            converting short sounds to mono (almost indistinguishable to the ear, and it halves the size outright);
            using variable bitrate encoding; and stripping the leftover excess silence at the head and tail of assets.
        </p>
        <p>
            Another cost that is easily underestimated is the <strong>memory footprint after decoding</strong>.
            A compressed file may be only a few hundred KB, but decoded into uncompressed sample data it can balloon more than tenfold.
            When assessing the budget, you have to look at both "download size" and "resident size after decoding."
        </p>

        <h3>Preloading and Streaming Strategy</h3>
        <p>
            The loading strategy needs to strike a balance between "time to first screen" and "playback immediacy":
        </p>
        <ul>
            <li><strong>Preloading critical sounds</strong>: core sounds such as spin, reels and base wins must be fully decoded into memory at startup to guarantee zero-latency playback</li>
            <li><strong>Streaming background music</strong>: music is large and does not need instant response, so it can play while downloading, shortening initial load time</li>
            <li><strong>Lazy loading</strong>: infrequent resources such as big win celebrations and special mode music can be downloaded later, but must be ready before that state occurs, so there is no silence at the critical moment</li>
        </ul>
        <p>
            In addition, most mobile browsers impose an <strong>autoplay restriction</strong>: audio output has to be unlocked by the player's first touch,
            so the loading flow needs an explicit entry interaction point, and the audio environment should be initialized within that interaction.
        </p>

        <h2>Audio Bus Architecture</h2>
        <p>
            A professional sound system uses <strong>several independent buses</strong>, letting players control the volume of each audio category separately:
        </p>
        <ul>
            <li><strong>Music bus</strong>: dedicated to background music, since some players prefer to turn music off and keep only the sound effects</li>
            <li><strong>SFX bus</strong>: handles every sound tied to game mechanics, such as reels, wins and buttons</li>
            <li><strong>Voice bus</strong>: used for spoken announcements or character voice, and not used by some games</li>
        </ul>
        <p>
            All buses ultimately feed a single master output, and the player's global volume control acts there.
            This architecture also greatly simplifies dynamic mixing:
            ducking only needs a gain adjustment on a single bus, rather than handling the playback state of individual sounds one at a time.
        </p>

        <h2>From Requirements Spec to Delivery</h2>

        <h3>The Sound Requirements Specification</h3>
        <p>
            Before production begins, the game designer needs to prepare a <strong>sound requirements specification</strong> that lists every sound required, item by item:
        </p>
        <ul>
            <li><strong>Identifier and trigger condition</strong>: a unique name, plus what event triggers this sound</li>
            <li><strong>Context description</strong>: the intended emotional feel and stylistic direction</li>
            <li><strong>Duration limit</strong>: the recommended length range</li>
            <li><strong>Whether it loops</strong>: one-shot or looping, and looping assets must have their loop points noted</li>
            <li><strong>Priority</strong>: the order of precedence when several sounds trigger at once</li>
            <li><strong>Number of variants</strong>: how many variants a high-frequency sound needs to avoid listening fatigue</li>
        </ul>

        <h3>Naming Conventions</h3>
        <p>
            A unified naming convention is essential for team collaboration.
            A structured naming scheme of <strong>"type prefix + scene + action + index"</strong> is recommended:
            begin with one of three prefixes for music, sound effect and voice, so developers can identify the type at a glance and batch-process by bus;
            then note the game mode it belongs to and the specific action; and end multiple variants of the same sound with a two-digit index,
            making them easy to enumerate programmatically for rotation. Use lowercase and underscores throughout, to avoid load failures caused by case sensitivity.
        </p>

        <h3>Event-Driven Integration</h3>
        <p>
            Sound integration should use an <strong>event-driven</strong> trigger architecture:
            the game logic layer does not call playback functions directly, but dispatches semantic event notifications,
            and the audio manager decides what to play, on which bus and at what priority.
            This decoupling lets the sound logic be adjusted independently without touching core logic, and lets the same mechanism be reused across different projects.
            The principle applies equally in Cocos Creator, Unity or a pure web environment.
        </p>
        <p>
            It is also worth pairing this with an <strong>event-to-asset mapping table</strong> maintained by the sound designer.
            Replacing a sound or adjusting a tier threshold then only requires editing the table rather than changing code,
            putting tuning back in the hands of the person who understands sound best, and shortening the iteration cycle of repeated listening passes.
        </p>

        <h3>Quality Gates</h3>
        <p>
            Once integration is complete, testing has to be carried out in a variety of environments:
        </p>
        <ul>
            <li><strong>Device testing</strong>: confirm correct playback across different phones, tablets and desktop browsers, paying particular attention to autoplay restrictions on mobile</li>
            <li><strong>Level balance</strong>: test separately on built-in speakers and headphones, confirming that relative levels are sensible</li>
            <li><strong>Timing accuracy</strong>: confirm that sounds are in sync with the visual animation, since any latency beyond 50 milliseconds may be perceived by players</li>
            <li><strong>Memory monitoring</strong>: confirm that no memory leak of audio resources exists after long play sessions</li>
            <li><strong>Interruption recovery</strong>: test recovery behavior in scenarios such as an incoming call interrupting playback, or returning after switching applications</li>
            <li><strong>Extended listening</strong>: play continuously for thirty minutes or more to examine loop seams and fatigue from high-frequency sounds</li>
        </ul>
        <p>
            A complete audio pipeline, from requirements definition through to final delivery, requires close collaboration between game designers, sound designers and frontend engineers;
            only through standardized conventions and quality gates can every game deliver a professional-grade listening experience.
        </p>
        <p>
            And what these specifications and processes ultimately serve is the emotional foundation established by the background music,
            along with the layers of feedback built by tiered sound effects and interactive audio systems.
            The other two articles in this series each go deeper into those two topics.
        </p>
    </div>
</template>

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
