<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-arrows-spin" aria-hidden="true"></i>The Reel Engine: Where a Slot's Feel Comes From</h2>
        <p>
            Reel animation is the most iconic visual element of a slot game, and the only part players judge by "feel."
            Two games with identical rules can go from feeling "crisp and decisive" to "sluggish and dragging" purely because their stop timing differs by a few dozen milliseconds.
            A good reel engine has to deliver a spin that is <strong>silky smooth and physically convincing</strong>, and that feel has to be tunable and reproducible rather than something stumbled upon by trial and error.
        </p>
        <DiagramFigure caption="Of these six stages only the wait for the result is set externally; the engine controls the other five itself.">
            <svg viewBox="0 0 640 158" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Six stages of the reel animation</title>
            <desc>Six stages from pre-bounce to settle, of which only the wait for the result is determined externally.</desc>
            <defs><marker id="dgArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fill-opacity="0.55"/></marker></defs>
            <rect x="20" y="52" width="96" height="50" rx="7" fill="var(--dg-1)"/>
            <text x="68" y="82" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="700">Pre-bounce</text>
            <line x1="116.5" y1="77" x2="121.5" y2="77" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="122" y="52" width="96" height="50" rx="7" fill="var(--dg-3)"/>
            <text x="170" y="82" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="700">Accelerate</text>
            <line x1="218.5" y1="77" x2="223.5" y2="77" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="224" y="52" width="96" height="50" rx="7" fill="var(--dg-3)"/>
            <text x="272" y="82" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="700">Await result</text>
            <line x1="320.5" y1="77" x2="325.5" y2="77" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="326" y="52" width="96" height="50" rx="7" fill="var(--dg-2)"/>
            <text x="374" y="82" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="700">Decelerate</text>
            <line x1="422.5" y1="77" x2="427.5" y2="77" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="428" y="52" width="96" height="50" rx="7" fill="var(--dg-1)"/>
            <text x="476" y="82" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="700">Overshoot</text>
            <line x1="524.5" y1="77" x2="529.5" y2="77" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#dgArrow)"/>
            <rect x="530" y="52" width="96" height="50" rx="7" fill="var(--dg-2)"/>
            <text x="578" y="82" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="700">Settle</text>
            <rect x="219" y="38" width="106" height="76" rx="8" fill="none" stroke="var(--dg-3-ink)" stroke-width="1.5" stroke-dasharray="5 4"/>
            <text x="272" y="30" font-size="11.5" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">length set externally</text>
            <text x="320" y="144" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">The engine owns the other five, which is what makes the feel tunable and reproducible</text>
            </svg>
        </DiagramFigure>
        <p>
            Of these six stages, only the length of "wait for result" is determined externally; the engine controls the other five itself.
        </p>

        <h2><i class="fa-solid fa-recycle" aria-hidden="true"></i>Per-Frame Displacement and Symbol Recycling</h2>
        <p>
            At its core, each frame the engine computes the reel's <strong>displacement</strong>, and when it exceeds the height of one cell, symbol recycling is triggered:
        </p>
        <ul>
            <li><strong>Recycle and refill</strong>: the symbol that moved out of the visible area at the top is recycled to the bottom and filled in with a new symbol image</li>
            <li><strong>Object pool</strong>: avoids constantly creating and destroying display objects, which keeps memory usage stable</li>
            <li><strong>Lower bound on pool size</strong>: the number of visible rows plus one cell of buffer above and below, letting a symbol finish swapping its texture before it enters or leaves the screen so it never "suddenly transforms" right at the boundary</li>
        </ul>
        <p>
            Displacement has to be computed against <strong>elapsed time</strong> rather than frame count,
            otherwise the spin speed on a 120Hz display would be double that on a 60Hz one, and the stop timing would come early across the board.
        </p>
        <p>
            But when the application comes back to the foreground from the background, a single frame's elapsed time can be several seconds, and applying it directly would make the reels skip a huge number of symbols in one frame,
            so a cap on single-frame time is also required.
        </p>

        <h2><i class="fa-solid fa-bezier-curve" aria-hidden="true"></i>The Mathematics of Easing Curves</h2>
        <p>
            An easing function maps "progress ratio" to "displacement ratio": the input runs from 0 to 1 and the output also runs from 0 to 1,
            but how it gets there determines whether the motion reads as constant speed, acceleration, deceleration or bounce.
        </p>
        <h3>Cubic Bezier Curves</h3>
        <p>
            What we use most often is the <strong>cubic Bezier curve</strong>: the start and end points are fixed at 0 and 1,
            and the only things actually adjustable are two control points, four parameters in total, enough to express rich rhythms yet few enough to hand straight to an artist for fine-tuning.
        </p>
        <ul>
            <li><strong>Acceleration segment</strong>: the first control point sits near the start, so the curve is gentle early and steep later, simulating a reel being driven up from rest</li>
            <li><strong>Deceleration segment</strong>: the second control point sits near the end, so the curve is steep early and gentle later, simulating friction pulling the reel to a halt</li>
            <li><strong>Control point overshoot</strong>: when a control point's vertical coordinate goes outside the 0-to-1 range, the curve overshoots near the endpoints, and that is precisely the mathematical origin of the pre-bounce and the overshoot</li>
        </ul>
        <p>
            One implementation detail to watch is that a Bezier curve is defined parametrically, so getting displacement for a given time requires solving rather than direct substitution;
            the engine samples the curve uniformly at initialization to build a lookup table, and at runtime replaces per-frame solving with table lookup plus interpolation.
        </p>
        <h3>Parameters of the Elastic Rebound</h3>
        <p>
            A real slot machine has a subtle "overshoot" when it stops. The reel goes slightly past the target position, then springs back into place.
            This segment can be described with a <strong>damped oscillation model</strong>, where a spring pulls the reel toward the target while damping dissipates energy, and it has only two intuitive parameters:
        </p>
        <ul>
            <li><strong>Stiffness</strong>: determines how fast it springs back, and the higher it is the snappier the return</li>
            <li><strong>Damping ratio</strong>: determines the number of oscillations, and the closer to critical it is the more it settles in one go</li>
        </ul>
        <p>
            The stop as a whole then breaks into three independently adjustable intervals:
        </p>
        <ul>
            <li><strong>Deceleration phase</strong>: uses an ease-out curve to simulate friction gradually slowing the reel down</li>
            <li><strong>Overshoot phase</strong>: the reel passes the target position by a small distance, typically within half a symbol height. Beyond that, players start to suspect the result changed</li>
            <li><strong>Rebound phase</strong>: uses a damped spring curve to return to the exact target position, possibly with one or two tiny oscillations</li>
        </ul>
        <DiagramFigure caption="The overshoot is usually held to within half a symbol height; beyond that, players start to suspect the result changed.">
            <svg viewBox="0 0 640 276" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>The three intervals of a reel stop</title>
            <desc>The reel decelerates toward the target, passes it by a small margin, then a damped spring pulls it back into place.</desc>
            <rect x="64" y="40" width="94.9618" height="174" rx="0" fill="var(--dg-3)" fill-opacity="0.10"/>
            <rect x="158.962" y="40" width="189.924" height="174" rx="0" fill="var(--dg-1)" fill-opacity="0.10"/>
            <rect x="348.885" y="40" width="247.115" height="174" rx="0" fill="var(--dg-2)" fill-opacity="0.10"/>
            <line x1="64" y1="96" x2="596" y2="96" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.5" stroke-dasharray="5 4"/>
            <text x="596" y="87" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">Target position</text>
            <line x1="64" y1="214" x2="596" y2="214" stroke="currentColor" stroke-opacity="0.3" stroke-width="1"/>
            <polyline points="64,214 68.4333,208.618 72.8667,203.077 77.3,197.436 81.7333,191.751 86.1667,186.072 90.6,180.443 95.0333,174.904 99.4667,169.489 103.9,164.229 108.333,159.15 112.767,154.272 117.2,149.614 121.633,145.19 126.067,141.01 130.5,137.083 134.933,133.413 139.367,130.003 143.8,126.853 148.233,123.96 152.667,121.322 157.1,118.931 161.533,116.783 165.967,114.868 170.4,113.177 174.833,111.7 179.267,110.428 183.7,109.348 188.133,108.45 192.567,107.721 197,107.15 201.433,106.724 205.867,106.433 210.3,106.264 214.733,106.206 219.167,106.247 223.6,106.378 228.033,106.588 232.467,106.866 236.9,107.204 241.333,107.593 245.767,108.024 250.2,108.489 254.633,108.981 259.067,109.494 263.5,110.022 267.933,110.557 272.367,111.096 276.8,111.634 281.233,112.166 285.667,112.69 290.1,113.201 294.533,113.697 298.967,114.175 303.4,114.634 307.833,115.072 312.267,115.488 316.7,115.88 321.133,116.249 325.567,116.593 330,116.912 334.433,117.206 338.867,117.477 343.3,117.723 347.733,117.946 352.167,118.146 356.6,118.324 361.033,118.481 365.467,118.618 369.9,118.735 374.333,118.835 378.767,118.917 383.2,118.984 387.633,119.036 392.067,119.074 396.5,119.1 400.933,119.114 405.367,119.118 409.8,119.112 414.233,119.099 418.667,119.078 423.1,119.051 427.533,119.018 431.967,118.98 436.4,118.939 440.833,118.894 445.267,118.847 449.7,118.798 454.133,118.748 458.567,118.697 463,118.646 467.433,118.595 471.867,118.545 476.3,118.495 480.733,118.447 485.167,118.4 489.6,118.355 494.033,118.312 498.467,118.271 502.9,118.232 507.333,118.195 511.767,118.161 516.2,118.128 520.633,118.099 525.067,118.071 529.5,118.046 533.933,118.023 538.367,118.002 542.8,117.983 547.233,117.967 551.667,117.952 556.1,117.94 560.533,117.929 564.967,117.92 569.4,117.912 573.833,117.906 578.267,117.901 582.7,117.898 587.133,117.895 591.567,117.894 596,117.894" fill="none" stroke="var(--dg-1-ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <text x="111.481" y="236" font-size="12.5" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">Deceleration</text>
            <text x="253.924" y="236" font-size="12.5" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">Overshoot</text>
            <text x="472.443" y="236" font-size="12.5" fill="var(--dg-2-ink)" text-anchor="middle" font-weight="700">Rebound</text>
            <text x="320" y="262" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">Horizontal: time. Vertical: reel displacement. Each interval tunes separately</text>
            </svg>
        </DiagramFigure>
        <p>
            Fast-paced games use a smaller overshoot and a quick rebound, while classic-style ones use a more exaggerated bounce to create a mechanical feel.
        </p>
        <p>
            Another parameter that often gets overlooked is the <strong>pre-bounce</strong>: a slight backward displacement before the start, then acceleration downward.
            It lasts only a few dozen milliseconds, yet it noticeably increases the sense of force.
        </p>

        <h2><i class="fa-solid fa-stopwatch" aria-hidden="true"></i>Designing the Stop Timing</h2>
        <p>
            A single column tuned to look good does not mean the whole reel set feels good. When multiple columns move together, what really determines the impression is <strong>timing</strong>:
        </p>
        <ul>
            <li><strong>Start interval</strong>: the columns start in sequence, usually with a smaller interval than the stop interval. The point is to create a sense of cohesion; too large an interval makes the reels look like they are each doing their own thing</li>
            <li><strong>Stop interval</strong>: the columns stop in sequence with an interval noticeably larger than the start interval. This is the main source of rhythm, and it is also the cue players use to judge "how many columns are left"</li>
            <li><strong>Minimum spin duration</strong>: even if the result comes back instantly, the reels must spin for at least this long, or the whole round feels rushed</li>
            <li><strong>Maximum wait duration</strong>: once the wait times out, switch to a spin presentation that can be extended indefinitely, so the player never notices the game stalling</li>
        </ul>
        <DiagramFigure caption="These values have to be tuned as a set, which is why they are packaged into rhythm presets that switch as a whole.">
            <svg viewBox="0 0 640 314" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Start and stop timing across columns</title>
            <desc>Columns start in sequence with a small interval, then stop in sequence with a noticeably larger one, which is where the rhythm comes from.</desc>
            <text x="84" y="63" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">Column 1</text>
            <rect x="96" y="44" width="150" height="30" rx="5" fill="var(--dg-2)"/>
            <text x="106" y="63" font-size="11" fill="#ffffff">spinning</text>
            <text x="84" y="105" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">Column 2</text>
            <rect x="109" y="86" width="199" height="30" rx="5" fill="var(--dg-2)"/>
            <text x="119" y="105" font-size="11" fill="#ffffff">spinning</text>
            <text x="84" y="147" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">Column 3</text>
            <rect x="122" y="128" width="248" height="30" rx="5" fill="var(--dg-2)"/>
            <text x="132" y="147" font-size="11" fill="#ffffff">spinning</text>
            <text x="84" y="189" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">Column 4</text>
            <rect x="135" y="170" width="297" height="30" rx="5" fill="var(--dg-2)"/>
            <text x="145" y="189" font-size="11" fill="#ffffff">spinning</text>
            <text x="84" y="231" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">Column 5</text>
            <rect x="148" y="212" width="346" height="30" rx="5" fill="var(--dg-2)"/>
            <text x="158" y="231" font-size="11" fill="#ffffff">spinning</text>
            <line x1="96" y1="34" x2="96" y2="256" stroke="currentColor" stroke-opacity="0.35" stroke-width="1" stroke-dasharray="4 3"/>
            <line x1="148" y1="34" x2="148" y2="256" stroke="currentColor" stroke-opacity="0.35" stroke-width="1" stroke-dasharray="4 3"/>
            <text x="122" y="28" font-size="12" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">Start interval (smaller)</text>
            <text x="370" y="276" font-size="12" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">Stop interval (clearly larger)</text>
            <text x="320" y="300" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">The start interval creates cohesion; the stop interval is how players judge how many columns are left</text>
            </svg>
        </DiagramFigure>
        <p>
            These four values have to be tuned as a set, which is why we package them into rhythm presets that can be switched as a whole.
        </p>
        <h3>Handling Quick Stop</h3>
        <p>
            When the player taps again mid-spin, all reels need to stop immediately.
            The tricky part is this: if you compress the animation time to one tenth, the overshoot and rebound shrink proportionally too, and it looks like a "fast-forward" rather than a "brake."
        </p>
        <p>
            The better approach is to re-plan the deceleration curve rather than scale the original one: keep the rebound segment at its full length, compress only the deceleration segment in front of it,
            and recompute the remaining distance from the actual current speed.
        </p>

        <h2><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>Anticipation and Special Stop Effects</h2>
        <p>
            Beyond the basic spin and stop, the reel engine also needs to support a variety of special effects,
            the most important of which is building a sense of <strong>anticipation</strong>:
        </p>
        <ul>
            <li><strong>Near-miss effect</strong>: when the leading reels have already landed a special symbol combination, the trailing reels deliberately extend their spin and add visual effects (a glowing frame, a darkened background), creating suspense</li>
            <li><strong>Speed change</strong>: a reel entering the anticipation state usually decelerates first and then holds. The deceleration is itself the signal, and the player immediately realizes "this column is different"</li>
            <li><strong>Column-by-column delayed stop</strong>: each column stops in sequence, creating a left-to-right rhythm, with each interval independently configurable</li>
            <li><strong>Cascade mechanic</strong>: after winning symbols are cleared, the symbols above drop down to fill the gaps, potentially triggering chain wins, which requires the engine to support independent animation and rearrangement of a subset of symbols</li>
        </ul>
        <p>
            There is one line anticipation must never cross: every suspense mechanism is a <strong>result-driven</strong> presentation-layer behavior.
            The engine merely picks how to perform based on an already-determined result, and the performance itself never changes where any symbol lands. Write that line into the interface design, and the engine simply has no ability to decide whether to play an anticipation before the result arrives.
        </p>

        <h2><i class="fa-solid fa-gauge-high" aria-hidden="true"></i>Frame Rate Stability and Visual Strobing</h2>
        <p>
            Most of the reel engine's performance problems come not from the amount of computation but from <strong>per-frame object churn</strong>.
            Creating and releasing display objects every frame causes garbage collection to fire at unpredictable moments, which shows up as a hitch every few seconds.
        </p>
        <p>
            The point of the object pool is not just to save creation cost but to keep memory usage flat. Two more measures are worth handling alongside it:
        </p>
        <ul>
            <li><strong>Batch the draw calls</strong>: have the symbols in one column share a single texture atlas</li>
            <li><strong>Lower the update rate of decorations</strong>: frame glows and background particles do not need a refresh every frame, which preserves budget for the main subject</li>
        </ul>
        <h3>Handling Strobing at High Speed</h3>
        <p>
            When the reels spin at high speed, a symbol may move farther per frame than its own height,
            and at that point the eye sees a series of discrete positions rather than continuous motion, producing an obvious strobing sensation. There are three ways to handle it:
        </p>
        <ul>
            <li><strong>Blurred asset swap</strong>: swap in a pre-made vertically blurred texture once speed exceeds a threshold. This is the cheapest and most reliable option, because the degree of blur is under the artist's control</li>
            <li><strong>Speed cap</strong>: limit the maximum spin speed so per-frame displacement stays under some fraction of the symbol height, trading a little sense of speed for readability</li>
            <li><strong>Symbol simplification</strong>: switch to a less detailed version during the high-speed phase, reducing the fatigue of the eye trying to make out details</li>
        </ul>
        <p>
            These three measures are usually used together, and the switching thresholds also need to be verified separately on low-refresh-rate devices: a spin speed that shows no problem on a 120Hz display may already strobe visibly at 60Hz.
        </p>

        <p>
            The reel engine is about feel, but it does not operate in isolation: it relies on the reuse foundation provided by the <a href="/en/blog/client-framework-architecture">layered architecture</a> and on the start/stop commands issued by the state machine,
            while when assets get loaded and how the stop sound lines up with the visuals belong to the domain of the <a href="/en/blog/client-network-resource">supporting systems</a>.
            We discuss those two topics in the other two articles of this series.
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
