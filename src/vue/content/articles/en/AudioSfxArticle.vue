<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-ear-listen" aria-hidden="true"></i>Sound Effects Are the Auditory Language Between Player and Game</h2>
        <p>
            Every interaction in a game needs a matching sound effect as feedback, and together these sounds form the auditory language between player and game.
            Players do not listen to them deliberately, but remove any one link and the experience immediately feels hollow.
        </p>
        <ul>
            <li><strong>Start sound</strong>: a forceful, brief sound at the instant the spin button is pressed, giving clear confirmation of the input</li>
            <li><strong>Reel spin sound</strong>: a continuous loop simulating the reels turning at high speed</li>
            <li><strong>Reel stop sound</strong>: the sound of each reel coming to rest in turn, which should carry a <strong>left-to-right sense of sequence</strong>, each hit slightly different, delivering the satisfaction of audio-visual sync</li>
        </ul>
        <p>
            Interface actions need feedback too: the click of a bet adjustment, the transition sound of a menu opening or closing, the start and stop cues of autoplay, and so on.
            These sounds should stay <strong>concise, consistent and never steal the show</strong>,
            drawn from a unified timbre family so the overall listening experience stays coherent.
        </p>

        <h2><i class="fa-solid fa-ranking-star" aria-hidden="true"></i>Mapping Win Tiers to Layers of Sound</h2>
        <p>
            Win sounds are the category with the greatest influence on player emotion, and they must be <strong>designed in tiers according to win size</strong>:
        </p>
        <ul>
            <li><strong>Small win</strong>: a short, crisp coin sound, roughly 1 to 2 seconds, that does not interrupt the rhythm of play</li>
            <li><strong>Medium win</strong>: a richer combination adding strings or brass, lasting 3 to 5 seconds, paired with a counting-up number animation</li>
            <li><strong>Big win</strong>: a complete sequence with an opening burst, a sustained celebration and a resolution, running as long as 8 to 15 seconds</li>
            <li><strong>Top-tier win</strong>: may include a distinctive melody, vocal cheers and layered effect sounds, running 15 to 30 seconds alongside a full-screen animation</li>
        </ul>
        <p>
            Each tier should escalate clearly along three dimensions (<strong>energy, complexity and duration</strong>)
            so that players can sense "how much I just won" from the sound alone.
        </p>

        <h3>Design Traps in Tier Thresholds</h3>
        <p>
            The basis for tiering sound should not be an absolute amount, but <strong>the win as a multiple of the current bet</strong>.
            With an absolute amount as the threshold, high-bet players hear the top-tier celebration sequence constantly and go numb fast,
            while low-bet players never hear a high tier at all in a whole session; with a multiple as the threshold,
            players across different bet levels get a consistent emotional curve.
        </p>
        <p>
            Another common problem is <strong>insufficient contrast between tiers</strong>.
            If two adjacent tiers are merely "a bit louder," players cannot tell them apart and the tiering is effectively meaningless.
            The recommendation is at least a two-fold difference in duration per tier, plus a new instrument family introduced in the arrangement:
            strings at medium win, brass and percussion stacked on for big win, vocals held back until the top tier, using new timbres to mark each step up.
        </p>

        <h3>Ascending Scales for Payline Scoring</h3>
        <p>
            When a single spin hits multiple paylines, the score is settled line by line, and each line needs a short scoring note.
            If every line plays the same note, it sounds like a mechanical counter;
            the correct approach is to have the scoring notes <strong>ascend step by step along a scale</strong>, forming a rising melodic line.
        </p>
        <p>
            The choice of scale directly affects how it sounds. The <strong>pentatonic scale</strong> is the safest choice:
            it contains no semitones, so any two notes stacked together are inoffensive, and even when scoring notes overlap because settlement runs too fast, they still sound consonant.
            The ascending steps also need a ceiling: typically the pitch stops rising or wraps back to the start after eight to twelve steps,
            avoiding a climb into a shrill frequency band on high payline counts.
            All of this pitched material should share the key of the <a href="/en/blog/audio-bgm-design">background music</a>.
        </p>

        <h2><i class="fa-solid fa-star" aria-hidden="true"></i>Special Symbols and Anticipation</h2>
        <ul>
            <li><strong>Wild symbol appearing</strong>: paired with a sparkling effect sound to draw the player's attention to the icon that substitutes for others</li>
            <li><strong>Scatter symbol landing</strong>: every appearance should have a clear cue, with tension <strong>stepping up progressively</strong> as the count grows</li>
            <li><strong>Special feature trigger</strong>: needs a transition sound with a real "an event is happening" quality, marking a major shift in game state</li>
        </ul>
        <p>
            <strong>Anticipation</strong> is one of the most refined elements in slot sound design.
            When the earlier reels already show trigger potential, the last reel deliberately slows down,
            accompanied by <strong>progressively rising tension sound</strong>, a continuously ascending string or synth timbre
            whose pitch and level climb over time, pushing anticipation to its peak.
            This cue must be built as a structure that is <strong>loopable and interruptible at any moment</strong>:
            the first section is a one-bar tension layer that can repeat, matching a deceleration animation of variable length;
            the ending prepares two branches, leading into the trigger sound on a hit and a descending deflation sound on a miss.
            Whatever the outcome, those few seconds of tension add enormous drama to the game.
        </p>

        <h2><i class="fa-solid fa-diagram-project" aria-hidden="true"></i>Interactive Audio Systems: Letting Sound Follow State</h2>
        <p>
            Modern slot sound has evolved from simple "event triggers playback" into a <strong>dynamic interactive audio system</strong>.
            The audio manager adjusts playback behavior in real time based on game state:
        </p>
        <ul>
            <li><strong>Consecutive win escalation</strong>: in cascade mechanics, each successive win sound is more rousing than the last: higher in pitch, faster in rhythm, richer in layers, conveying "a run of good luck" through sound</li>
            <li><strong>Multiplier sound mapping</strong>: every step up in the multiplier maps to sound feedback at a higher energy tier, so the growing number is reinforced by what the player hears</li>
        </ul>

        <h3>Trigger Priority and Voice Limits</h3>
        <p>
            When several events happen in the same instant, playing them all without restraint
            results in an unintelligible mass of noise, and the momentary amplitude summing can even cause clipping.
            The audio manager therefore has to set a <strong>voice limit</strong>,
            usually held to between sixteen and thirty-two voices on mobile devices.
        </p>
        <p>
            When voices run out, a clear set of <strong>stealing rules</strong> is needed:
            drop the lowest priority first; at equal priority, drop whichever has played longest and decayed most;
            if the same sound is re-triggered within a very short window, reuse its existing voice and restart playback.
            Every sound should have its priority noted in the requirements spec. Big win celebrations and feature trigger sounds may never be stolen.
        </p>

        <h3>Ducking and Spatial Positioning</h3>
        <p>
            <strong>Ducking</strong> is the key technique for keeping the auditory layers distinct.
            When a big win celebration fires, the <a href="/en/blog/audio-specs-delivery">bus</a> carrying the background music should automatically drop 60% to 80% in level,
            letting the celebration sound take the lead, then recover slowly once it ends.
            The duck's attack should be short (around 100 to 200 milliseconds) and its release long (around 500 milliseconds or more),
            so the act of stepping aside goes unnoticed. Ducking at the bus level greatly simplifies the logic of dynamic mixing.
        </p>
        <DiagramFigure caption="Ducking at the bus level rather than per sound greatly simplifies the dynamic mixing logic.">
            <svg viewBox="0 0 640 270" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Volume ducking over time</title>
            <desc>Background music drops quickly when a celebration effect fires, then recovers slowly once it ends.</desc>
            <line x1="74" y1="190" x2="596" y2="190" stroke="currentColor" stroke-opacity="0.3" stroke-width="1"/>
            <line x1="74" y1="52" x2="596" y2="52" stroke="currentColor" stroke-opacity="0.18" stroke-width="1" stroke-dasharray="4 4"/>
            <polyline points="74,52 190,52 218,148 372,148 470,52 596,52" fill="none" stroke="var(--dg-2-ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <rect x="190" y="44" width="182" height="146" rx="0" fill="var(--dg-1)" fill-opacity="0.10"/>
            <polyline points="190,190 224,78 352,82 382,190" fill="none" stroke="var(--dg-1-ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <text x="66" y="56" font-size="11.5" fill="currentColor" text-anchor="end" opacity="0.75">Full level</text>
            <text x="66" y="152" font-size="11.5" fill="currentColor" text-anchor="end" opacity="0.75">Ducked</text>
            <text x="204" y="210" font-size="11.5" fill="var(--dg-2-ink)" text-anchor="middle">Fall 100 - 200 ms</text>
            <text x="421" y="210" font-size="11.5" fill="var(--dg-2-ink)" text-anchor="middle">Recover 500 ms or more</text>
            <text x="295" y="66" font-size="12" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">Celebration effect</text>
            <text x="74" y="234" font-size="12" fill="var(--dg-2-ink)" font-weight="700">Background music</text>
            <text x="320" y="256" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">Fall fast, recover slowly, so the act of making room goes unnoticed</text>
            </svg>
        </DiagramFigure>
        <p>
            In environments that support stereo output, good use of <strong>panning</strong> can strengthen the sense of space.
            The classic application is spreading the reel stop sounds left to right: the first reel toward the left, the last toward the right,
            the rest distributed in order, creating a sense of spatial movement that matches the visuals.
            But the pan width should not be too wide: most players use a phone's built-in speaker,
            and excessive separation on a single sound source actually causes an imbalance in level.
        </p>

        <h2><i class="fa-solid fa-face-tired" aria-hidden="true"></i>Designing Against Listening Fatigue</h2>
        <p>
            Slots are highly repetitive games; the same sound may fire thousands of times within an hour, so listening fatigue has to be tackled head-on.
        </p>
        <ul>
            <li><strong>Asset rotation</strong>: prepare three to five subtly different variants of high-frequency sounds and rotate through them, avoiding the exact same waveform twice in a row</li>
            <li><strong>Parameter randomization</strong>: apply a plus or minus 3% to 5% pitch offset and a plus or minus 2 dB level variation on each playback, which is extremely cheap and remarkably effective</li>
            <li><strong>Spectral space</strong>: have each sound category occupy its own frequency band, with reel sounds toward the low-mids, scoring notes toward the high-mids, and only celebration sounds using the full spectrum, so they do not mask one another</li>
            <li><strong>Deliberate silence</strong>: not every action needs a sound; measured restraint makes the sounds that follow hit harder</li>
        </ul>
        <p>
            The emotional baseline for these sounds comes from the tonality and rhythm laid down by the background music,
            and the related design is covered in the article in this series on background music and emotional pacing;
            as for the specifications these assets should be produced and delivered to, the article on technical specifications and the delivery pipeline covers it in full.
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
