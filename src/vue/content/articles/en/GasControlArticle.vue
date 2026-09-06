<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-sliders" aria-hidden="true"></i>Overview of the Regulation System</h2>
        <p>
            A slot's <strong>regulation system</strong> is a dynamic control layer sitting on top of the natural probability model,
            used to achieve flexible RTP management and player experience optimization while preserving the game's mathematical correctness.
            The regulation system never tampers with the game's core probability model; instead it adjusts the result selection strategy through <strong>compliant mechanisms</strong>.
        </p>
        <p>
            The distinction here is crucial. Regulation does not mean "modifying" an already computed result after the player presses Spin;
            it means deciding, before sampling, <strong>which fully mathematically verified distribution to sample from</strong>.
            The RTP, volatility and Hit Rate of every candidate distribution are computed and sealed in advance;
            all the regulation layer does is make a weighted choice among these distributions.
            Once this design boundary is held, the mathematical properties of the whole system remain forever derivable and auditable.
        </p>
        <p>
            The need for such a control layer stems from a practical gap: the mathematical model guarantees <strong>long-term convergence</strong>,
            but the player experience happens in a <strong>short-term sample</strong>. On a high-volatility machine with a theoretical RTP of 96%,
            the realized return over a few hundred rounds may fall anywhere within an extremely wide interval.
            The purpose of the regulation layer is to make the short-term distribution more predictable and closer to the design intent, without shaking the long-term expected value.
        </p>

        <h2><i class="fa-solid fa-diagram-project" aria-hidden="true"></i>The Main Spin Request Flow</h2>
        <p>
            From arrival to response, every Spin request goes through the following complete processing pipeline:
        </p>
        <MermaidDiagram id="spin-flow" :chart="spinFlowChart"/>
        <p>
            The design principle of the whole pipeline is to <strong>concentrate uncertainty in a single stage</strong>.
            Parameter parsing, mode determination, board lookup and result scaling are all deterministic pure functions;
            the only place randomness is introduced is the regulation stage.
            This makes the entire flow very easy to test: replace the random source with a fixed sequence,
            and the same set of inputs necessarily produces the same set of outputs, so regression tests can compare round by round without tolerating any error margin.
        </p>

        <h2><i class="fa-solid fa-gears" aria-hidden="true"></i>The Regulation Core: A Two-Stage Control Pipeline</h2>
        <p>
            The core of regulation is divided into two stages executed in sequence:
        </p>
        <MermaidDiagram id="adjust-pipeline" :chart="adjustPipelineChart"/>
        <h3>Why Split It Into Two Stages?</h3>
        <p>
            The two-stage split corresponds to two problems of completely different nature:
        </p>
        <ul>
            <li><strong>The first stage</strong> answers "what should the expected value of this round be". This is a purely numerical management problem whose answer is an RTP target</li>
            <li><strong>The second stage</strong> answers "given that expected value, what shape of result should be produced". This is an experiential problem whose answer is a concrete payout multiple</li>
        </ul>
        <p>
            Handling the two together produces a situation that is very hard to maintain:
            any adjustment to the feel may accidentally alter the expected value, and any numerical adjustment affects the feel,
            with the two requirements checking each other until neither can be moved.
            Once split, the first stage is responsible only for expected value, while the second stage promises <strong>to change only the shape of the distribution and never the expected value</strong>.
            Responsibility boundaries are clear, and their verification methods are completely different too:
            the former verifies convergence, the latter verifies variance and tail characteristics.
        </p>

        <h2><i class="fa-solid fa-table" aria-hidden="true"></i>Stage One: RTP Table Selection</h2>
        <p>
            The system pre-configures several probability tables with different RTPs (such as LOW / MIDDLE / HIGH),
            and stage one's job is to decide, according to an established strategy, which table this Spin uses.
            The selection logic falls into three kinds according to the <strong>regulation mode</strong> (set independently per configuration group):
        </p>
        <MermaidDiagram id="rtp-type-flow" :chart="rtpTypeFlowChart"/>

        <h3>The RTP Interpolation Mechanism</h3>
        <p>
            When the target RTP falls between two probability tables, a probabilistic choice is made through <strong>linear interpolation</strong>:
        </p>
        <div class="formula-block">
            <code>P(choose LowRTP table) = (HighRTP - targetRTP) / (HighRTP - LowRTP)</code>
        </div>
        <p>
            Over long-run statistics, the actual RTP converges precisely to the target value.
            Interpolation precision is usually scaled up to the ten-thousandths (×10000) for integer arithmetic, avoiding floating-point error.
        </p>
        <p>
            The correctness of the interpolation follows directly from the linearity of expected value:
            if a table with RTP R₁ is chosen with probability p and a table with RTP R₂ with probability 1−p,
            then the overall expected return is p·R₁ + (1−p)·R₂. Substituting p from the formula above yields exactly the target RTP.
            This shows that interpolation is not an approximation technique but a <strong>strictly holding identity</strong>.
            As long as each table's own RTP is accurate, the interpolated target value carries no systematic bias.
        </p>
        <p>
            What must be kept in mind is that interpolation only guarantees the expected value, <strong>not the variance</strong>.
            After mixing two distributions, the overall variance is larger than the weighted average of the two variances,
            and the excess is proportional to the square of the RTP gap between the two tables.
            This means adjacent tiers should not be spread too far apart: the wider the tier spacing, the more noticeably the volatility in the middle of the interpolation deviates from the design value.
            In practice you work backwards from "the variance increase after interpolation must not exceed an acceptable proportion" to decide how finely the tiers should be cut.
        </p>
        <p>
            Switching to integer arithmetic addresses reliability at another level.
            Floating-point numbers may show last-digit differences across hardware and compiler options,
            and once a regulation outcome depends on such a difference, deterministic replay no longer holds.
            Scaling all probabilities to the ten-thousandths and handling them as integers means the same set of inputs takes the same branch in any environment.
        </p>

        <h3>Dynamic Pool-Level Mode</h3>
        <p>
            Dynamically adjust RTP according to the aggregate statistical <strong>pool level</strong>:
        </p>
        <MermaidDiagram id="pool-flow" :chart="poolFlowChart"/>
        <ul>
            <li><strong>Pool-level health</strong>: computed from the actual RTP derived from cumulative wagered volume and cumulative paid-out volume</li>
            <li><strong>Safety threshold</strong>: <code>(cumulative wagered - cumulative paid out) > cumulative wagered × (1 - gameRtp)</code></li>
            <li>Below the threshold, RTP is lowered to a conservative value until the statistical pool level returns to the safe range</li>
        </ul>
        <p>
            The essence of this mechanism is a <strong>negative feedback controller</strong>:
            when the actual statistical RTP is above the theoretical value, it means the recent sample leans toward the player's side and the system lowers the target slightly;
            when it is below the theoretical value, the system raises it slightly. Over the long run the actual RTP is pulled back to oscillate around the theoretical value,
            instead of converging slowly at a rate of 1/√N as pure natural probability would.
        </p>
        <p>
            The difficulty in designing the controller lies in <strong>response speed</strong>. Respond too slowly and it becomes pointless;
            respond too quickly and the player feels a noticeable change of rhythm within a short period, which damages the experience instead.
            The common approach is to set upper and lower bounds on the adjustment magnitude, and to make the adjustment proportional to the degree of deviation rather than a step jump,
            so that RTP changes smoothly enough that an individual player can hardly perceive it.
        </p>

        <h3>Newcomer Support Mode</h3>
        <p>
            Providing an RTP boost during a trial period for new players:
        </p>
        <ul>
            <li><strong>Cycle-based</strong>: 300 rounds form one cycle</li>
            <li><strong>Trial period</strong>: the first N rounds (per configuration) use a higher trial RTP (≥ 100%)</li>
            <li><strong>Recovery period</strong>: after the trial period ends, RTP is moderately lowered (base - 0.015) to balance the overall expectation</li>
            <li><strong>Individual correction</strong>: if the player's current cumulative RTP has already reached the target, lower it by a further 0.05 to avoid over-paying</li>
        </ul>
        <p>
            The core design here is <strong>conservation of expected value within the cycle</strong>: whatever the trial period pays above the norm
            must be recouped by the recovery period paying below it within the same cycle, so that the weighted average RTP of the whole cycle equals the base value.
            In other words, support mode changes the <strong>ordering of the distribution</strong> of returns along the time axis, not the total amount.
        </p>
        <p>
            The reason individual correction is needed is that the cycle scheme only guarantees the average, not every player's actual trajectory.
            If a particular player happens to draw a high-multiple result during the trial period, their cumulative RTP may already be far above target,
            and applying the fixed recovery magnitude at that point would over-compensate.
            Making a real-time correction from the individual's cumulative statistics lets convergence happen at the <strong>individual scale</strong> rather than only at the aggregate scale.
        </p>

        <h2><i class="fa-solid fa-weight-hanging" aria-hidden="true"></i>Stage Two: Weighted Result Selection</h2>
        <p>
            Once the RTP table has been determined, stage two picks the concrete game result from that table's payout-weight distribution
            by weighted random draw. The selection strategy is determined by the <strong>weight mode</strong>:
        </p>
        <MermaidDiagram id="weight-flow" :chart="weightFlowChart"/>

        <h3>Standard Deviation Compression (SD Control)</h3>
        <p>
            The core logic of the SD1 / SD2 / SD3 modes:
        </p>
        <ol>
            <li>Convert the bet amount into equivalent units on a unified basis</li>
            <li>If the bet exceeds the threshold, set a <strong>maximum payout cap</strong> (such as 50x) and redistribute the RTP of the excess payouts into the mid-range band</li>
            <li>Compute the <strong>variance</strong> of the current weight distribution</li>
            <li>If the variance exceeds maxSD², trim from the high-multiple tail, redistributing the RTP into the [average payout, cap] band</li>
            <li>Finally perform the weighted random draw</li>
        </ol>
        <MermaidDiagram id="sd-compress" :chart="sdCompressChart"/>
        <p>
            What this flow aims to achieve is a constrained optimization:
            compress the distribution's standard deviation to within the target under the hard constraint that <strong>the expected value must remain unchanged</strong>.
            Since the expected value is the inner product of probabilities and payouts, the RTP trimmed from the tail must be added back to other bands intact,
            or the overall expected value shifts. This is the step most prone to implementation error, and the one that most requires automated verification to guard it.
        </p>
        <p>
            Why trim "starting from the high-multiple tail"? Because payout appears as a <strong>squared term</strong> in the variance computation,
            so high-multiple results contribute far more to variance than they do to expected value.
            To take an extreme example: a result with probability one in ten thousand and a payout of 1000x contributes only 0.1 to RTP
            but about 100 to variance. This means trimming the tail buys a large drop in variance for <strong>a very small shift of expected value</strong>,
            making it the most efficient direction to compress in.
        </p>
        <p>
            The place it is added back is deliberately chosen to be the mid-range band from "average payout to cap".
            Adding all the RTP back to the lowest payout would concentrate results too heavily on small returns that are barely felt at all,
            and the player would feel "constantly hitting, yet never hitting anything";
            adding it back in the middle maintains a certain sense of reward tiering, and is the compromise between mathematical correctness and player feel.
        </p>

        <h3>Why the Maximum Payout Cap Is Necessary</h3>
        <p>
            Setting a cap is not only about controlling variance; several practical considerations are involved.
        </p>
        <ul>
            <li><strong>Verification cost</strong>: the required simulation sample size is proportional to the square of the standard deviation.
                For an uncapped long-tail distribution, reaching the same RTP verification precision may require a sample size an order of magnitude larger or more.</li>
            <li><strong>Numeric range safety</strong>: if the payout multiple times the bet amount has no upper bound,
                extreme combinations may reach the limits of the integer type, a risk that must be excluded by design.</li>
            <li><strong>Consistency of feel</strong>: without a cap, the difference in feel between different bet amounts within the same game is amplified,
                and the distribution a high-stakes player encounters is no longer substantively the same as that of a low-stakes player.</li>
        </ul>
        <p>
            Tying the cap to the bet amount keeps the compression effect consistent across bet tiers.
            Because standard deviation is computed in units of multiples, the same multiple cap represents different absolute volatility at different bet amounts,
            so the threshold and the cap are usually set in segments by bet band rather than as a single fixed value.
        </p>

        <h3>The Final Result Draw Flow</h3>
        <MermaidDiagram id="final-draw" :chart="finalDrawChart"/>
        <p>
            The two-layer weighted draw design decouples the "payout tier" from the "concrete presentation".
            The upper layer decides how much this round pays, a numerical question; the lower layer decides which board presents that payout, a presentation question.
            Under the same payout tier there are often dozens of different board combinations:
            some may be line wins, some may come from free games, and some may be the result of a special feature.
            They are numerically equivalent but visually quite different. The weights at this layer can therefore be configured purely by presentation rhythm,
            with no need to worry about affecting RTP at all.
        </p>

        <h2><i class="fa-solid fa-expand" aria-hidden="true"></i>Result Mapping and Scaling</h2>
        <p>
            After weighted selection produces a presentation index:
        </p>
        <ol>
            <li>Look up the corresponding <strong>complete board result</strong> from the pre-computed template database</li>
            <li><strong>Scale the amounts in the template proportionally</strong> by the ratio <code>actual bet / template bet</code></li>
            <li>Generate the final game result returned to the client</li>
        </ol>
        <p>
            Proportional scaling holds because a slot's payout is essentially a <strong>linear function of the bet amount</strong>:
            the board determines the multiple, and the bet amount is merely a multiplier. This lets one template serve every bet tier,
            so the size of the template library is independent of the number of bet options.
        </p>
        <p>
            In implementation the one thing to be careful about is <strong>rounding error</strong>.
            When a board contains several payouts that are each scaled and then summed, the result of rounding item by item
            may differ from the result of scaling the total by the smallest unit.
            The correct approach is to scale on the basis of the total and then distribute the difference back to each line item according to an established rule,
            ensuring the invariant "the sum of the line items equals the total" always holds.
        </p>

        <h2><i class="fa-solid fa-shield-halved" aria-hidden="true"></i>Graceful Degradation Design</h2>
        <p>
            The core design principle of the regulation system is <strong>graceful degradation</strong>:
            in any situation of missing configuration, abnormal parameters or an unavailable external dependency, the system silently falls back to natural probability mode.
        </p>
        <ul>
            <li>Invalid RTP target → use the default probability table</li>
            <li>Weight computation anomaly → fall back to pure weighted random</li>
            <li>Statistical pool-level data unavailable → use the static RTP configuration</li>
        </ul>
        <MermaidDiagram id="fallback-flow" :chart="fallbackFlowChart"/>
        <p>
            The judgment behind this principle is that <strong>natural probability is always a safe answer</strong>.
            It has passed full mathematical verification, depends on no external state, and requires no configuration.
            So when the regulation layer cannot function properly, the best handling is not to abort the flow but to fall back to this known-correct baseline.
            By comparison, choosing to fail the request would make the game outright unplayable;
            choosing to reuse the previous computation result would introduce unpredictable statistical bias. Both are worse than degradation.
        </p>
        <p>
            The situations that trigger degradation fall broadly into three categories:
        </p>
        <ul>
            <li><strong>Configuration class</strong>: the target RTP is outside the valid range, the probability table version does not exist, the sum of weights is zero.
                Problems of this kind should be caught by validation at load time; degradation at runtime is only the last line of defense.</li>
            <li><strong>Computation class</strong>: variance compression cannot converge under the constraint of an unchanged expected value,
                or negative weights appear after redistribution. Such cases mostly arise from extreme parameter combinations,
                and the degradation should preserve enough context to reproduce the problem.</li>
            <li><strong>Dependency class</strong>: statistical data is temporarily unreadable, or the individual cumulative state has not yet been established.
                For a new player this is in fact a normal state, not an error.</li>
        </ul>
        <p>
            The last point is also the most easily overlooked: <strong>degradation must be observable</strong>.
            A silent fallback is imperceptible to the player, and that is precisely the design goal;
            but for the development team, if there is no way to distinguish "regulation working normally" from "degrading all the time",
            the system will drift away from its design intent for a long time with nobody noticing.
            Every degradation should therefore record its cause and context, and the degradation rate should be tracked statistically,
            so that this safety net is itself kept under inspection.
        </p>
    </div>
</template>

<script setup>
import MermaidDiagram from '/src/vue/components/generic/MermaidDiagram.vue'

const spinFlowChart = `flowchart TD
    A[Spin request arrives] --> B[Parse request & validate parameters]
    B --> C[Fetch player state & game settings]
    C --> D[Compute game mode & bet tier]
    D --> E{Parameters valid?}
    E -->|No| F[Return parameter error]
    E -->|Yes| G[Assemble regulation request]
    G --> H[Run two-stage regulation]
    H --> I[Look up template board & scale proportionally]
    I --> J[Update statistical metrics]
    J --> K[Return game result]`

const adjustPipelineChart = `flowchart LR
    A[Regulation request] --> B[Stage One<br/>RTP table selection]
    B -->|Target RTP tier| C[Stage Two<br/>Weighted result selection]
    C -->|Presentation index| D[Look up template board]`

const rtpTypeFlowChart = `flowchart TD
    A{Regulation mode} -->|1: Natural, no control| B[Use static configured RTP]
    A -->|2: Dynamic pool level| C[Compute target RTP from statistical pool level]
    A -->|3: Newcomer support| D[Compute trial RTP from player round count]
    B --> E[RTP interpolation → select probability table]
    C --> F[Statistical pool-level health check]
    F -->|Healthy| G[Use configured RTP or individual RTP]
    F -->|Deviating| H[Lower to conservative RTP]
    G --> I[Deduct quest RTP allowance]
    H --> I
    D --> I
    I --> E`

const poolFlowChart = `flowchart TD
    A[Read statistical pool level<br/>cumulative wagered / cumulative paid out] --> B{cumulative wagered - cumulative paid out<br/>> cumulative wagered × 1-gameRtp ?}
    B -->|Yes: pool level healthy| C{Config-level RTP override?}
    C -->|Yes| D[Use RTP specified by config]
    C -->|No| E{Player individual RTP enabled?}
    E -->|Yes| F[Use RTP specified for the player]
    E -->|No| G[Use base RTP - 0.005]
    B -->|No: pool level low| H[Lower to conservative RTP<br/>recovery mode]`

const weightFlowChart = `flowchart TD
    A{Weight mode} -->|1: None| B[Pure weighted random<br/>draw directly from payout-weight table]
    A -->|2: SD1| C[Max payout cap + SD compressed to 1.0]
    A -->|3: SD2| D[Max payout cap + SD compressed to 2.0]
    A -->|4: SD3| E[Max payout cap + SD compressed to 3.0]
    A -->|5: Demo mode| F[Force HIGH table<br/>scheduled feature trigger]
    A -->|6: Cycle mode| G[Deterministic feature cycle<br/>mapped by round index]`

const sdCompressChart = `flowchart TD
    A[Original payout-weight distribution] --> B{Bet above threshold?}
    B -->|Yes| C[Apply max payout cap<br/>excess RTP moved to mid-range]
    B -->|No| D[Keep original cap]
    C --> E[Compute variance Var]
    D --> E
    E --> F{Var > maxSD² ?}
    F -->|Yes| G[Trim weights from the high-multiple tail]
    G --> H[Trimmed RTP added back to<br/>average payout ~ cap band]
    H --> E
    F -->|No| I[Expected value check<br/>confirm RTP has not shifted]
    I --> J[Weighted random draw]`

const finalDrawChart = `flowchart TD
    A[Payout-weight distribution table] --> B[Weighted random: select payout tier]
    B --> C[Presentation-weight distribution table<br/>under that payout tier]
    C --> D[Weighted random: select concrete presentation]
    D --> E[Look up template board]
    E --> F[Scale proportionally to the actual bet amount]
    F --> G[Return final game result]`

const fallbackFlowChart = `flowchart TD
    A[Regulation request] --> B{Configuration complete and valid?}
    B -->|No| Z[Fall back: natural probability mode]
    B -->|Yes| C{Statistical data available?}
    C -->|No| Y[Fall back: static RTP configuration]
    C -->|Yes| D{Weight compression succeeded?}
    D -->|No| X[Fall back: pure weighted random]
    D -->|Yes| E[Normal regulation result]
    Z --> R[Record degradation cause]
    Y --> R
    X --> R`
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

    ul, ol {
        margin-bottom: 1rem;
        padding-left: 1.5rem;

        li {
            margin-bottom: 0.5rem;
        }
    }

    .formula-block {
        background: #f8f9fa;
        border-left: 4px solid var(--bs-primary, #0d6efd);
        padding: 1rem 1.25rem;
        margin: 1rem 0;
        border-radius: 0 8px 8px 0;
        overflow-x: auto;

        code {
            font-size: 0.9rem;
            color: #333;
        }
    }

    code {
        background: rgba(0, 0, 0, 0.05);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.9em;
    }

    strong {
        color: #222;
    }
}
</style>
