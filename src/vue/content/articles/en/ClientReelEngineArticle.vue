<template>
    <div class="blog-article">
        <h2>The Reel Engine: Where a Slot's Feel Comes From</h2>
        <p>
            Reel animation is the most iconic visual element of a slot game, and the only part players judge by "feel."
            Two games with identical rules can go from feeling "crisp and decisive" to "sluggish and dragging" purely because their stop timing differs by a few dozen milliseconds.
            A good reel engine has to deliver a spin that is <strong>silky smooth and physically convincing</strong>,
            and that experience has to be tunable and reproducible rather than something stumbled upon by trial and error.
        </p>
        <MermaidDiagram id="reel-anim" :chart="reelAnimChart"/>
        <p>
            Of these six stages, only the length of "wait for result" is determined externally; the engine controls the other five itself.
        </p>

        <h2>Per-Frame Displacement and Symbol Recycling</h2>
        <p>
            At its core, the reel engine works like this: each frame it computes the reel's <strong>displacement</strong>,
            and when a symbol's displacement exceeds the height of one cell, symbol recycling is triggered — the symbol that moved out of the visible area at the top
            is recycled to the bottom and filled in with a new symbol image. This "object pool" style of recycling avoids constantly creating and destroying display objects,
            which keeps memory usage stable. The size of the object pool has a clear lower bound: the number of visible rows plus one cell of buffer above and below.
            Those two extra cells let a symbol finish swapping its texture before it enters or leaves the screen, so it never "suddenly transforms" right at the boundary.
        </p>
        <p>
            Displacement has to be computed against <strong>elapsed time</strong> rather than frame count,
            otherwise the spin speed on a 120Hz display would be double that on a 60Hz one, and the stop timing would come early across the board.
            But when the application comes back to the foreground from the background, a single frame's elapsed time can be several seconds, and applying it directly would make the reels skip a huge number of symbols in one frame,
            so a cap on single-frame time is also required.
        </p>

        <h2>The Mathematics of Easing Curves</h2>
        <p>
            An easing function maps "progress ratio" to "displacement ratio": the input runs from 0 to 1 and the output also runs from 0 to 1,
            but how it gets there determines whether the motion reads as constant speed, acceleration, deceleration or bounce.
        </p>
        <h3>Cubic Bezier Curves</h3>
        <p>
            What we use most often is the <strong>cubic Bezier curve</strong>: the start and end points are fixed at 0 and 1,
            and the only things actually adjustable are two control points, four parameters in total — enough to express rich rhythms, yet few enough to hand straight to an artist for fine-tuning.
        </p>
        <ul>
            <li><strong>Acceleration segment</strong>: the first control point sits near the start, so the curve is gentle early and steep later, simulating a reel being driven up from rest</li>
            <li><strong>Deceleration segment</strong>: the second control point sits near the end, so the curve is steep early and gentle later, simulating friction pulling the reel to a halt</li>
            <li><strong>Control point overshoot</strong>: when a control point's vertical coordinate goes outside the 0-to-1 range, the curve overshoots near the endpoints — and that is precisely the mathematical origin of the pre-bounce and the overshoot</li>
        </ul>
        <p>
            One implementation detail to watch is that a Bezier curve is defined parametrically, so getting displacement for a given time requires solving rather than direct substitution;
            the engine samples the curve uniformly at initialization to build a lookup table, and at runtime replaces per-frame solving with table lookup plus interpolation.
        </p>
        <h3>Parameters of the Elastic Rebound</h3>
        <p>
            A real slot machine has a subtle "overshoot" when it stops — the reel goes slightly past the target position, then springs back into place.
            This segment can also be described with a <strong>damped oscillation model</strong>: a spring pulls the reel toward the target while damping dissipates energy.
            The model has only two intuitive parameters: <strong>stiffness</strong> determines how fast it springs back — the higher, the snappier;
            <strong>damping ratio</strong> determines the number of oscillations — the closer to critical, the more it settles in one go.
            We break the whole stop into three independently adjustable intervals:
        </p>
        <ul>
            <li><strong>Deceleration phase</strong>: uses an ease-out curve to simulate friction gradually slowing the reel down</li>
            <li><strong>Overshoot phase</strong>: the reel passes the target position by a small distance, typically within half a symbol height. Beyond that, players start to suspect the result changed</li>
            <li><strong>Rebound phase</strong>: uses a damped spring curve to return to the exact target position, possibly with one or two tiny oscillations</li>
        </ul>
        <p>
            Fast-paced games use a smaller overshoot and a quick rebound, while classic-style ones use a more exaggerated bounce to create a mechanical feel.
            Another parameter that often gets overlooked is the <strong>pre-bounce</strong> — a slight backward displacement before the start, then acceleration downward.
            It lasts only a few dozen milliseconds, yet it noticeably increases the sense of force.
        </p>

        <h2>Designing the Stop Timing</h2>
        <p>
            A single column tuned to look good does not mean the whole reel set feels good. When multiple columns move together, what really determines the impression is <strong>timing</strong>:
        </p>
        <ul>
            <li><strong>Start interval</strong>: the columns start in sequence, usually with a smaller interval than the stop interval. The point is to create a sense of cohesion; too large an interval makes the reels look like they are each doing their own thing</li>
            <li><strong>Stop interval</strong>: the columns stop in sequence with an interval noticeably larger than the start interval. This is the main source of rhythm, and it is also the cue players use to judge "how many columns are left"</li>
            <li><strong>Minimum spin duration</strong>: even if the result comes back instantly, the reels must spin for at least this long, or the whole round feels rushed</li>
            <li><strong>Maximum wait duration</strong>: once the wait times out, switch to a spin presentation that can be extended indefinitely, so the player never notices the game stalling</li>
        </ul>
        <p>
            These four values have to be tuned as a set, which is why we package them into rhythm presets that can be switched as a whole.
        </p>
        <h3>Handling Quick Stop</h3>
        <p>
            When the player taps again mid-spin, all reels need to stop immediately.
            The tricky part is this: if you compress the animation time to one tenth, the overshoot and rebound shrink proportionally too, and it looks like a "fast-forward" rather than a "brake."
            The better approach is to re-plan the deceleration curve rather than scale the original one — keep the rebound segment at its full length, compress only the deceleration segment in front of it,
            and recompute the remaining distance from the actual current speed.
        </p>

        <h2>Anticipation and Special Stop Effects</h2>
        <p>
            Beyond the basic spin and stop, the reel engine also needs to support a variety of special effects,
            the most important of which is building a sense of <strong>anticipation</strong>:
        </p>
        <ul>
            <li><strong>Near-miss effect</strong>: when the leading reels have already landed a special symbol combination, the trailing reels deliberately extend their spin and add visual effects (a glowing frame, a darkened background), creating suspense</li>
            <li><strong>Speed change</strong>: a reel entering the anticipation state usually decelerates first and then holds. The deceleration is itself the signal — the player immediately realizes "this column is different"</li>
            <li><strong>Column-by-column delayed stop</strong>: each column stops in sequence, creating a left-to-right rhythm, with each interval independently configurable</li>
            <li><strong>Cascade mechanic</strong>: after winning symbols are cleared, the symbols above drop down to fill the gaps, potentially triggering chain wins, which requires the engine to support independent animation and rearrangement of a subset of symbols</li>
        </ul>
        <p>
            There is one line anticipation must never cross: every suspense mechanism is a <strong>result-driven</strong> presentation-layer behavior.
            The engine merely picks how to perform based on an already-determined result, and the performance itself never changes where any symbol lands —
            write that line into the interface design, and the engine simply has no ability to decide whether to play an anticipation before the result arrives.
        </p>

        <h2>Frame Rate Stability and Visual Strobing</h2>
        <p>
            Most of the reel engine's performance problems come not from the amount of computation but from <strong>per-frame object churn</strong>.
            Creating and releasing display objects every frame causes garbage collection to fire at unpredictable moments, which shows up as a hitch every few seconds;
            the point of the object pool is not just to save creation cost but to keep memory usage flat.
            On top of that, having the symbols in one column share a single texture atlas so draw calls can be batched,
            and dropping decorations like frame glows and background particles to a lower update rate, both preserve budget for the main subject.
        </p>
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
            These three measures are usually used together, and the switching thresholds also need to be verified separately on low-refresh-rate devices —
            a spin speed that shows no problem on a 120Hz display may already strobe visibly at 60Hz.
        </p>

        <p>
            The reel engine is about feel, but it does not operate in isolation: it relies on the reuse foundation provided by the layered architecture and on the start/stop commands issued by the state machine,
            while when assets get loaded and how the stop sound lines up with the visuals belong to the domain of the supporting systems.
            We discuss those two topics in the other two articles of this series.
        </p>

        <p style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #dee2e6; color: #666; font-style: italic;">
            Need technical support? Feel free to contact us for more information.
        </p>
    </div>
</template>

<script setup>
import MermaidDiagram from '/src/vue/components/generic/MermaidDiagram.vue'

const reelAnimChart = `flowchart TD
    A[Pre-Bounce] --> B[Accelerate Spin]
    B --> C[Wait for Result]
    C --> D[Decelerate]
    D --> E[Overshoot Bounce]
    E --> F[Settle Into Position]`
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
