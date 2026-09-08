<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-vial" aria-hidden="true"></i>What Makes Slot Testing Different</h2>
        <p>
            Quality assurance (QA) for slot games differs fundamentally from ordinary software testing.
            Ordinary software testing focuses on whether features behave correctly, but slot testing must additionally verify three things:
        </p>
        <ul>
            <li><strong>the correctness of the mathematical model</strong></li>
            <li><strong>the fairness of randomness</strong></li>
            <li><strong>the reasonableness of the player experience</strong></li>
        </ul>
        <p>
            These three dimensions are interwoven, and together they form an exceptionally complex challenge.
        </p>
        <p>
            At its core, a slot game is a <strong>probabilistic system</strong>. The outcome of every spin is random,
            yet across a large sample it must converge to the designed mathematical expectation.
            A test team therefore cannot draw conclusions from a handful of results;
            it needs millions or even hundreds of millions of simulated rounds to verify statistical correctness.
        </p>

        <h3>Why Functional Testing Alone Cannot Define Quality</h3>
        <p>
            Acceptance criteria for ordinary software are usually <strong>deterministic</strong>: given an input, the output must equal the expected value.
            Slots are not like that. A game whose mathematical model is entirely wrong can still sail through every <a href="/en/blog/qa-functional-playtest">functional test</a>:
            buttons respond, animations play, settlement does not crash, and nothing on screen looks out of place.
            The defect exists only as a deviation of the long-run average from the designed value,
            and at an observation scale of tens of thousands of rounds that deviation can be completely masked by random fluctuation.
        </p>
        <p>
            In other words, the correctness of a slot game is a <strong>statistical assertion</strong>,
            not a checklist of features to tick off one by one.
            Verifying it does not require more test cases; it requires <strong>a sufficient sample size and the right statistical criteria</strong>.
        </p>
        <p>
            Moreover, any computational deviation is continuously amplified by the sheer volume of rounds:
            a misplaced decimal point or a missed boundary condition can accumulate into a significant numerical drift.
            Slot testing standards are therefore far higher than those for ordinary consumer software,
            and must satisfy the strict audit requirements of <strong>international certification bodies such as GLI and BMM</strong>.
        </p>

        <h2><i class="fa-solid fa-square-root-variable" aria-hidden="true"></i>Mathematical Verification Testing</h2>

        <h3>RTP Convergence Testing</h3>
        <p>
            <strong>RTP (Return to Player)</strong> is the single most important mathematical metric of a slot game.
            For a game configured at 96.5% RTP, for example, every 100 units wagered should in theory return 96.5 units over the long run. RTP is verified through <strong>large-scale simulation testing</strong>:
            typically several million to several tens of millions of simulated spins, after which the measured RTP is checked for convergence to the target value.
        </p>
        <p>
            Simulation is not a matter of running the batch and reading off a single number; the team needs to observe the <strong>convergence curve</strong> of the RTP:
            across different sample sizes (100k, 500k, 1M, 5M spins),
            the RTP should progressively converge and settle within a statistically acceptable band around the target.
            Abnormally slow convergence or irregular oscillation usually signals a problem in the mathematical model.
        </p>

        <h3>How Many Samples Are Statistically Meaningful</h3>
        <p>
            "Is a million rounds enough?" is the question most often asked during mathematical verification,
            and the correct answer is: <strong>it depends on the volatility of the game</strong>.
            The error of a Monte Carlo simulation is roughly inversely proportional to the square root of the sample size:
            to halve the error, the sample size must be quadrupled.
        </p>
        <p>
            More critically, the error is determined not only by sample size but also by the <strong>standard deviation of the per-round return</strong>.
            In a low-volatility game the per-round return is concentrated in a narrow, small-value range, and a few hundred thousand rounds are enough to stabilize the mean;
            in a high-volatility game most of the RTP contribution sits in large outcomes that appear only once every tens of thousands of rounds,
            so tens of millions or even hundreds of millions of rounds are needed for rare events to occur often enough.
            Applying a low-volatility sample-size standard to a high-volatility game usually produces "convergence" that is nothing but an illusion.
        </p>
        <p>
            The practical approach is to <strong>work backwards</strong>: first decide the acceptable error band,
            then derive the minimum required sample size from the theoretical standard deviation.
        </p>

        <h3>How to Read a Statistical Confidence Interval</h3>
        <p>
            Every piece of mathematical verification must account for the <strong>statistical confidence interval</strong>.
            Because the sample is finite, the result will never exactly equal the theoretical value, and the report must state both the sample size and the corresponding confidence interval.
            At a 95% confidence level, for example, the RTP should fall within 96.5% ± 0.1%.
        </p>
        <p>
            Two misreadings are common. First, <strong>a result inside the interval does not prove the model correct</strong>;
            it only means the available evidence is insufficient to reject it. The width of the interval is itself a quality metric:
            a report quoting a margin of error of ±1.5% is statistically almost incapable of distinguishing a 95% model from a 98% one.
        </p>
        <p>
            Second, a result outside the interval does not necessarily mean the model is wrong. The correct procedure is <strong>elimination layer by layer</strong>:
            first confirm whether the sample size is large enough to support the criterion at that volatility,
            then check whether the simulation covered every functional path, and only then go back and examine the probability table itself.
        </p>

        <h3>Hit Frequency Verification</h3>
        <p>
            Beyond the overall RTP, the <strong>hit frequency of each symbol combination</strong> also needs to be verified independently.
            The probability table (PAR sheet) defines the theoretical probability of every winning combination, and the simulation results must match it.
            Testing applies a <strong><a href="/en/blog/risk-control-algorithm">chi-square</a>d test</strong> to the occurrence count of each combination,
            confirming there is no statistically significant difference between the observed and theoretical distributions.
            A model with a correct total RTP may still contain two internal errors that cancel each other out.
        </p>
        <DiagramFigure caption="A model with the right total RTP can still carry two errors that cancel each other out.">
            <svg viewBox="0 0 640 250" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>A correct total RTP can still hide errors</title>
            <desc>Two combinations deviate in opposite directions by matching amounts, so the overall return looks perfectly normal.</desc>
            <rect x="92" y="132" width="26" height="58" rx="3" fill="var(--dg-2)" fill-opacity="0.45"/>
            <rect x="122" y="132" width="26" height="58" rx="3" fill="var(--dg-2)"/>
            <text x="120" y="208" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">Combo 1</text>
            <rect x="178" y="116" width="26" height="74" rx="3" fill="var(--dg-2)" fill-opacity="0.45"/>
            <rect x="208" y="82" width="26" height="108" rx="3" fill="var(--dg-1)"/>
            <text x="206" y="208" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">Combo 2</text>
            <text x="206" y="74" font-size="11" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">high</text>
            <rect x="264" y="128" width="26" height="62" rx="3" fill="var(--dg-2)" fill-opacity="0.45"/>
            <rect x="294" y="128" width="26" height="62" rx="3" fill="var(--dg-2)"/>
            <text x="292" y="208" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">Combo 3</text>
            <rect x="350" y="102" width="26" height="88" rx="3" fill="var(--dg-2)" fill-opacity="0.45"/>
            <rect x="380" y="136" width="26" height="54" rx="3" fill="var(--dg-1)"/>
            <text x="378" y="208" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">Combo 4</text>
            <text x="378" y="94" font-size="11" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">low</text>
            <rect x="436" y="120" width="26" height="70" rx="3" fill="var(--dg-2)" fill-opacity="0.45"/>
            <rect x="466" y="120" width="26" height="70" rx="3" fill="var(--dg-2)"/>
            <text x="464" y="208" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">Combo 5</text>
            <line x1="78" y1="190" x2="600" y2="190" stroke="currentColor" stroke-opacity="0.3" stroke-width="1"/>
            <rect x="92" y="30" width="12" height="12" rx="2" fill="var(--dg-2)" fill-opacity="0.45"/>
            <text x="112" y="40" font-size="11.5" fill="currentColor" opacity="0.8">Theoretical</text>
            <rect x="202" y="30" width="12" height="12" rx="2" fill="var(--dg-2)"/>
            <text x="222" y="40" font-size="11.5" fill="currentColor" opacity="0.8">Simulated</text>
            <text x="320" y="236" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">This is exactly why every combination needs its own chi-square test</text>
            </svg>
        </DiagramFigure>

        <h3>Volatility Verification</h3>
        <p>
            <strong>Volatility (variance)</strong> describes how dispersed the prize distribution is.
            High volatility means a lower hit frequency but potentially very large individual wins;
            low volatility means frequent small wins. Testing must verify whether the game's actual volatility
            matches the design intent, usually by computing the <strong>standard deviation</strong> and analyzing a histogram of the prize distribution.
        </p>
        <p>
            A single standard deviation is not enough to characterize the full shape of the distribution.
            A more complete approach is to examine the <strong>quantiles of the return distribution</strong>
            (where the median outcome sits, and how long the longest run of consecutive non-winning rounds is),
            since these metrics better reflect the actual play session.
        </p>

        <h3>Verifying Extreme Values and Win Caps</h3>
        <p>
            The tail of the distribution is the easiest part to overlook and carries the highest risk. Items requiring independent verification include:
        </p>
        <ul>
            <li><strong>Theoretical maximum win</strong>: whether the highest multiplier the model permits matches the design, and whether it is actually attainable</li>
            <li><strong>Impact of cap truncation</strong>: if a win cap exists, the truncated portion pushes the actual RTP below the theoretical value, and the shortfall must be quantified and folded into the declared figure</li>
            <li><strong>Numeric range safety</strong>: with the maximum stake combined with the maximum multiplier, intermediate calculations must not exceed the representable range of the numeric type</li>
            <li><strong>Tail contribution share</strong>: what proportion of the RTP the tail of the distribution contributes, which directly determines the sample size verification requires</li>
        </ul>

        <h3>Special Feature Trigger Rates</h3>
        <p>
            The trigger rates of special features such as free games and bonus rounds are an important factor in player experience, and testing must verify:
        </p>
        <ul>
            <li>Whether the free-game trigger probability matches the designed value (for example, one trigger every 150 spins on average)</li>
            <li>Whether the retrigger probability inside the free game is correct</li>
            <li>Whether the expected prize contribution of the bonus feature falls within a reasonable range</li>
            <li>Whether any unintended interactions exist between the various trigger conditions</li>
            <li>Whether the RTP contribution share of the special features matches the design</li>
        </ul>
        <p>
            Retrigger mechanics deserve particular attention: they make the expected value accumulate as an infinite series,
            so a deviation is hard to spot within the total RTP,
            and the contribution of the special features must be <strong>broken out as an independent statistical item</strong> for verification.
        </p>

        <h2><i class="fa-solid fa-chart-simple" aria-hidden="true"></i>From Simulation Data to Trustworthy Conclusions</h2>
        <p>
            A verification report worth having does not simply state that "the RTP meets expectations";
            it should fully disclose the sample size, the confidence interval, the RTP contribution breakdown per feature module, and the statistical test criteria.
        </p>
        <p>
            Mathematical verification confirms theoretical correctness, but a correct model still needs a correct implementation and a good experience to carry it.
            State-machine coverage and player-feel evaluation, as well as automated testing and third-party compliance certification,
            are discussed in the other two articles of this series.
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
