<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-circle-question" aria-hidden="true"></i>What Is Statistical Anomaly Detection?</h2>
        <p>
            A gaming system faces risk along several dimensions: <strong>mathematical risk</strong> (extreme statistical deviation),
            <strong>system risk</strong> (misconfiguration, program defects), and <strong>behavioral risk</strong> (abnormal betting patterns).
            Statistical anomaly detection applies rigorous statistical testing to monitor in real time whether a game's actual performance deviates from theoretical expectation,
            so that anomalies can be detected and escalated at an early stage.
        </p>
        <p>
            What makes this hard is that a gaming product is <strong>supposed to exhibit enormous variance</strong>.
            In a well-designed slot machine, several hundred consecutive losing spins in the short term, or a sudden payout of several thousand times the bet,
            fall entirely within the expectations of the mathematical model. This means "anomaly" cannot be judged by intuition or by a fixed threshold:
            firing an alert simply because RTP looks high on a given day yields nothing but a screen full of noise.
        </p>
        <p>
            Put differently, the core problem risk control has to solve is: <strong>how to separate signal from data that is full of noise</strong>.
            That is exactly the question statistical hypothesis testing was designed to answer, and it is why we built the entire detection logic on a hypothesis-testing framework.
        </p>

        <h2><i class="fa-solid fa-clipboard-check" aria-hidden="true"></i>The Basic Premises of Hypothesis Testing</h2>
        <p>
            All detection logic revolves around a single statistical framework, and understanding that framework is a prerequisite for understanding every design trade-off that follows.
        </p>
        <ul>
            <li><strong>Null hypothesis (H₀)</strong>: the default assumption that "the system is functioning normally and actual performance matches the theoretical model."
                We always start by assuming the system is healthy, not by assuming something is wrong. This directionality matters:
                the job of the test is to gather evidence strong enough to <strong>reject</strong> the normal hypothesis, not to prove the system is normal</li>
            <li><strong>Alternative hypothesis (H₁)</strong>: a genuine difference exists between actual performance and the theoretical value, rather than being caused by random fluctuation</li>
            <li><strong>Significance level (α)</strong>: the <strong>upper bound on the probability of misjudgment</strong> we are willing to accept.
                α = 0.05 means that even with a perfectly normal system, roughly one in every twenty tests is expected to be misjudged as anomalous</li>
            <li><strong>p-value</strong>: the probability, assuming the system is normal, of observing a result as extreme as (or more extreme than) the current one.
                A small p-value means the current observation is hard to explain as "normal fluctuation"</li>
        </ul>
        <p>
            From this follow two classes of error that necessarily exist, and the trade-off between them runs through the whole risk control design:
        </p>
        <ul>
            <li><strong>Type I error (false positive)</strong>: the system is in fact normal but is judged anomalous.
                The cost is a team repeatedly interrupted by meaningless alerts, which over time destroys trust in the alerting itself</li>
            <li><strong>Type II error (false negative)</strong>: the system really does have a problem but it goes undetected.
                The cost is that the problem keeps accumulating, and by the time it is obvious to the naked eye its blast radius is usually already large</li>
        </ul>
        <p>
            The crux is this: <strong>reducing false positives necessarily raises false negatives, and vice versa</strong>. This is a hard statistical trade-off that cannot be optimized away.
            The only way to improve both at once is to increase the sample size, that is, to raise the <strong>power</strong> of the test,
            meaning "the probability of successfully detecting a problem when the problem genuinely exists."
            This also explains why, when designing a monitoring mechanism, planning the sample size is more fundamental than tuning the thresholds.
        </p>

        <h2><i class="fa-solid fa-chart-column" aria-hidden="true"></i>Binomial Win Rate Test</h2>
        <p>
            For each bet type and probability table label, we continuously track whether the actual win rate deviates from the theoretical value in a statistically significant way.
            Using the confidence interval of the binomial distribution, we set a <strong>significance level of α = 1/10000</strong> (an extremely strict threshold),
            so that an alert fires only when something is genuinely anomalous:
        </p>
        <div class="formula-block">
            <code>H₀: actual win rate = theoretical win rate<br/>
H₁: actual win rate ≠ theoretical win rate<br/>
if p-value < α (0.0001), flag as anomalous</code>
        </div>
        <p>
            An extremely strict significance level keeps the false positive rate low: an alert fires only when the statistical evidence is overwhelming,
            avoiding interference from normal random fluctuation.
        </p>
        <p>
            We chose the binomial test as the first line of defense because "won or not" naturally satisfies the three premises of the binomial distribution:
        </p>
        <ul>
            <li>each round has only two outcomes, win or no win</li>
            <li>rounds are independent of one another</li>
            <li>the win probability per round is fixed</li>
        </ul>
        <p>
            All three premises hold in a normally functioning game. Conversely,
            <strong>when the test keeps failing, what gets refuted may be not only the probability value but independence itself</strong>:
            for instance, some state that was not correctly reset, causing the previous round's outcome to influence the next.
            Problems of this kind are completely invisible at the level of a single round, yet leave a clear trace at the level of the distribution.
        </p>
        <p>
            Sample size is what determines whether a binomial test can stand at all. The rule of thumb requires that
            <strong>both the expected number of successes and the expected number of failures reach a certain scale</strong> (a common threshold is no fewer than 10 each)
            for the normal approximation to be accurate enough. This has a direct corollary: <strong>low-probability events require an enormous sample size to test</strong>.
            An ordinary line with a 30% win rate may be assessable after a few thousand rounds,
            but a special feature with a trigger rate of one in ten thousand may need millions of rounds to accumulate a statistically meaningful sample.
            Our approach is therefore to set observation thresholds in tiers: items whose sample size has not met the requirement are not tested at all,
            rather than forcing a test on an insufficient sample and arriving at an unreliable conclusion.
            <strong>Silence is safer than a wrong conclusion</strong>.
        </p>

        <h2><i class="fa-solid fa-chart-area" aria-hidden="true"></i>RTP Z-Test</h2>
        <p>
            We run a Z-test on cumulative RTP to verify whether the actual RTP deviates significantly from the locked theoretical RTP:
        </p>
        <div class="formula-block">
            <code>Z = (actual RTP - theoretical RTP) / SE(RTP)<br/>
if |Z| > Z<sub>α/2</sub>, RTP deviates significantly</code>
        </div>
        <p>
            When the tuning configuration provides enough information (an explicit locked theoretical RTP value exists), we use the exact theoretical value as the baseline;
            when the configuration is insufficient, we use the <strong>theoretical maximum RTP</strong> as a conservative baseline to avoid false negatives.
        </p>
        <p>
            The division of labor between the Z-test and the binomial test is that the win rate test looks at <strong>frequency</strong>,
            while the RTP test looks at <strong>monetary scale</strong>. The two can disagree, and the disagreement itself is valuable diagnostic information:
        </p>
        <DiagramFigure caption="The significance level sets where the critical values sit: pushing them outward cuts false alarms but delays the detection of smaller real problems.">
            <svg viewBox="0 0 640 256" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Acceptance and rejection regions of the Z-test</title>
            <desc>A Z value beyond either critical value counts as a significant deviation; inside them it is treated as normal variation.</desc>
            <polygon points="60,195.95 63.315,195.938 66.63,195.925 69.945,195.908 73.26,195.889 76.575,195.865 79.89,195.837 83.205,195.803 86.52,195.763 89.835,195.716 93.15,195.66 96.465,195.595 99.78,195.517 103.095,195.427 106.41,195.322 109.725,195.199 113.04,195.057 116.355,194.892 119.67,194.701 122.985,194.482 126.3,194.231 129.615,193.943 132.93,193.615 136.245,193.242 139.56,192.818 142.875,192.339 146.19,191.798 149.505,191.191 152.82,190.509 156.135,189.748 159.45,188.899 162.765,187.957 166.08,186.912 169.395,185.759 172.71,184.49 176.025,183.096 179.34,181.572 182.655,179.909 185.97,178.102 189.285,176.143 192.6,174.027 192.6,196 60,196" fill="var(--dg-1)"/>
            <polygon points="447.4,174.027 450.715,176.143 454.03,178.102 457.345,179.909 460.66,181.572 463.975,183.096 467.29,184.49 470.605,185.759 473.92,186.912 477.235,187.957 480.55,188.899 483.865,189.748 487.18,190.509 490.495,191.191 493.81,191.798 497.125,192.339 500.44,192.818 503.755,193.242 507.07,193.615 510.385,193.943 513.7,194.231 517.015,194.482 520.33,194.701 523.645,194.892 526.96,195.057 530.275,195.199 533.59,195.322 536.905,195.427 540.22,195.517 543.535,195.595 546.85,195.66 550.165,195.716 553.48,195.763 556.795,195.803 560.11,195.837 563.425,195.865 566.74,195.889 570.055,195.908 573.37,195.925 576.685,195.938 580,195.95 580,196 447.4,196" fill="var(--dg-1)"/>
            <polygon points="192.6,174.027 198.97,169.501 205.34,164.348 211.71,158.556 218.08,152.126 224.45,145.084 230.82,137.476 237.19,129.374 243.56,120.875 249.93,112.103 256.3,103.201 262.67,94.336 269.04,85.6886 275.41,77.4497 281.78,69.8132 288.15,62.9686 294.52,57.0932 300.89,52.3446 307.26,48.8537 313.63,46.7186 320,46 326.37,46.7186 332.74,48.8537 339.11,52.3446 345.48,57.0932 351.85,62.9686 358.22,69.8132 364.59,77.4497 370.96,85.6886 377.33,94.336 383.7,103.201 390.07,112.103 396.44,120.875 402.81,129.374 409.18,137.476 415.55,145.084 421.92,152.126 428.29,158.556 434.66,164.348 441.03,169.501 447.4,174.027 447.4,196 192.6,196" fill="var(--dg-2)"/>
            <line x1="54" y1="196" x2="586" y2="196" stroke="currentColor" stroke-opacity="0.3"/>
            <line x1="192.6" y1="174.027" x2="192.6" y2="196" stroke="currentColor" stroke-opacity="0.45" stroke-dasharray="4 3"/>
            <text x="192.6" y="216" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.8">-Za/2</text>
            <line x1="447.4" y1="174.027" x2="447.4" y2="196" stroke="currentColor" stroke-opacity="0.45" stroke-dasharray="4 3"/>
            <text x="447.4" y="216" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.8">+Za/2</text>
            <text x="320" y="138" font-size="13" fill="#ffffff" text-anchor="middle" font-weight="700">Accept</text>
            <text x="141.25" y="162" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700">Reject</text>
            <text x="498.75" y="162" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700">Reject</text>
            <text x="320" y="242" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">Horizontal: the Z value. The curve is the distribution under the null hypothesis</text>
            </svg>
        </DiagramFigure>
        <ul>
            <li><strong>Win rate normal, RTP high</strong>: wins occur as often as expected, but the multiplier on each payout is too large.
                This usually points to a value setting issue in the pay table, or an error in the multiplier calculation step</li>
            <li><strong>Win rate high, RTP normal</strong>: wins become more frequent while each individual amount shrinks correspondingly.
                Volatility is below design expectation, and the player experience will have a different rhythm than the mathematical model intended</li>
            <li><strong>Both deviating at once</strong>: more likely a global problem such as the wrong probability table being selected or a version mismatch</li>
        </ul>
        <DiagramFigure caption="Reading the two tests separately is what gives them diagnostic value: the direction of the divergence says whether the problem is on the frequency side or the amount side.">
            <svg viewBox="0 0 640 256" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Diagnosing a divergence between win rate and RTP</title>
            <desc>The win rate test looks at frequency and the RTP test at magnitude; each combination of results points at a different source of the problem.</desc>
            <text x="364" y="26" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700" opacity="0.7">RTP test</text>
            <text x="248" y="48" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.7">Normal</text>
            <text x="480" y="48" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.7">Deviating</text>
            <text x="122" y="106" font-size="12" fill="currentColor" text-anchor="end" opacity="0.7">Win rate  normal</text>
            <text x="122" y="198" font-size="12" fill="currentColor" text-anchor="end" opacity="0.7">Win rate  deviating</text>
            <rect x="136" y="60" width="224" height="84" rx="7" fill="var(--dg-2)" fill-opacity="0.14"/>
            <text x="248" y="90" font-size="13" fill="var(--dg-2-ink)" text-anchor="middle" font-weight="700">Normal</text>
            <text x="248" y="112" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">Both within the expected range</text>
            <text x="248" y="129" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8"></text>
            <rect x="368" y="60" width="224" height="84" rx="7" fill="var(--dg-3)" fill-opacity="0.14"/>
            <text x="480" y="90" font-size="13" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">Payout multiple</text>
            <text x="480" y="112" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">Expected hit count, oversized payouts</text>
            <text x="480" y="129" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">Points at the paytable or multiplier maths</text>
            <rect x="136" y="152" width="224" height="84" rx="7" fill="var(--dg-3)" fill-opacity="0.14"/>
            <text x="248" y="182" font-size="13" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">Volatility too low</text>
            <text x="248" y="204" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">More frequent wins, smaller each</text>
            <text x="248" y="221" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">Pacing differs from the model</text>
            <rect x="368" y="152" width="224" height="84" rx="7" fill="var(--dg-1)" fill-opacity="0.14"/>
            <text x="480" y="182" font-size="13" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">Global problem</text>
            <text x="480" y="204" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">Both deviating at once</text>
            <text x="480" y="221" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">Usually a wrong table or version mismatch</text>
            </svg>
        </DiagramFigure>
        <p>
            The most common mistake when reading a Z value is overlooking that <strong>the standard error shrinks as the sample size grows</strong>.
            This means that with a very large sample, a practically negligible deviation (say, an RTP off by 0.05 percentage points)
            can still produce a large Z value and trigger an alert. <strong>Statistically significant does not mean materially important</strong>.
            The correct approach is therefore to watch two quantities at once: the Z value judges "whether this deviation is real,"
            while the <strong>effect size</strong> (how many percentage points it actually deviates by) judges "whether this deviation is worth acting on."
            Only when both hold does it constitute a signal that warrants action.
        </p>
        <p>
            Another premise to be careful about is that the standard error of RTP cannot simply borrow the standard error formula for win rate.
            The distribution of payout amounts is heavily right-skewed (a great many zeros and small payouts, plus a very small number of enormous ones),
            and its variance is contributed mainly by the large wins in the tail. The standard error of RTP must therefore be derived from the <strong>actual payout distribution</strong>
            rather than by assuming a normal distribution. Ignoring this systematically underestimates the standard error and, in turn, greatly overstates the severity of an alert.
        </p>

        <h2><i class="fa-solid fa-filter" aria-hidden="true"></i>Outlier Filtering</h2>
        <p>
            If the initial win rate test finds an anomaly, the system performs a second round of analysis,
            recomputing RTP after filtering out <strong>extreme payouts above PR95</strong>:
        </p>
        <ul>
            <li>If the filtered RTP <strong>returns to normal</strong>, the anomaly was caused by just a few extreme large wins (possibly a normal high-volatility characteristic), and it is downgraded to observation</li>
            <li>If the filtered RTP is <strong>still anomalous</strong>, a systematic misconfiguration or defect is more likely, and it is escalated to a high-priority alert</li>
        </ul>
        <p>
            This two-stage analysis effectively distinguishes "normal fluctuation with good luck" from "a genuine system problem,"
            substantially reducing alert fatigue for the technical team.
        </p>
        <p>
            The legitimate justification for filtering outliers is that <strong>a handful of extreme values can dominate the overall statistic</strong>.
            In a high-volatility mathematical model, a single payout of several thousand times the bet can account for a substantial share of the period's cumulative payout,
            causing the mean to swing violently without reflecting the overall health of the system.
            Recomputing after filtering amounts to asking a more precise question:
            "With those few extreme events excluded, does the overwhelming majority of remaining rounds still look normal?"
        </p>
        <p>
            But the technique carries clear risks of its own, and they must be clearly understood:
        </p>
        <ul>
            <li><strong>It can mask a real problem</strong>: if the defect itself manifests as "large wins occurring too frequently,"
                then filtering out all the large wins erases the only evidence there was.
                This is also why the filtered result may only be used to support a <strong>downgrade</strong> decision,
                and can never on its own be the basis for concluding that "the system is normal"</li>
            <li><strong>The threshold choice is subjective</strong>: using a percentile as the filtering line is an engineering trade-off.
                Set it too wide and the noise is not filtered out; set it too narrow and normal medium-to-high payouts get filtered along with it,
                which instead biases the filtered RTP systematically low and manufactures new false anomalies</li>
            <li><strong>Irreversible information loss</strong>: the filtered-out data must be preserved in full in the raw records,
                with filtering happening only at the analysis layer, never at the storage layer. Otherwise, once a re-investigation is needed after the fact,
                the few most critical data points no longer exist</li>
        </ul>
        <p>
            We therefore position filtering as an <strong>auxiliary diagnostic tool, not a basis for judgment</strong>.
            Both sets of results, before and after filtering, are recorded in full so that later analysis can see "what the filtering changed,"
            and that difference is often more diagnostically valuable than either set of numbers on its own.
        </p>

        <h2><i class="fa-solid fa-hourglass-half" aria-hidden="true"></i>Trade-offs in Time Windows</h2>
        <p>
            A statistical test has to be defined over some range of data, and <strong>the choice of time window directly determines what kinds of problems can be detected</strong>.
            This is one of the most underestimated decisions in risk control design.
        </p>
        <ul>
            <li><strong>Short window</strong>: reacts fast and catches sudden misconfigurations or version problems early,
                but the sample is small and statistical power is low, so only very large deviations are detectable, while the false positive rate is relatively high</li>
            <li><strong>Long window</strong>: ample sample and high power, able to detect small but persistent systematic deviations,
                but slow to react, and an already-fixed old problem lingers inside the window for a long time, so alerts do not clear</li>
            <li><strong>Cumulative statistics</strong>: covers all historical data and is best suited to verifying long-run convergence,
                but is extremely insensitive to recent changes: the historical sample dilutes a newly emerged deviation until it is invisible</li>
        </ul>
        <p>
            Since no single window can satisfy every need at once, the practical solution is to run <strong>multiple windows in parallel</strong>:
            the short window provides immediacy, the long window provides sensitivity, cumulative statistics provide long-run convergence verification, and the three conclusions are cross-checked.
            When the short window alerts and the long window is normal, this usually points to a change that just happened;
            when the long window alerts and the short window is normal, it is more likely an old problem that has already been corrected but has not yet slid out of the window.
        </p>
        <p>
            There is one more implementation detail worth noting about sliding windows: window boundaries create <strong>alert flapping</strong>.
            When an extreme data point sits right at the edge of the window, its entry and exit make the test result oscillate back and forth between normal and anomalous.
            The solution is to set asymmetric thresholds for raising and clearing an alert: raising requires stronger evidence,
            while clearing requires several consecutive periods of normality, thereby avoiding repeated notifications for the same problem.
        </p>

        <h2><i class="fa-solid fa-bell" aria-hidden="true"></i>Real-Time Monitoring and Alerting</h2>
        <p>
            Detection results need to reach the technical team in real time, and the alerting channel design includes:
        </p>
        <ul>
            <li><strong>Real-time push</strong>: when a statistical test finds an anomaly, an alert message is automatically pushed to the technical group</li>
            <li><strong>Tiered handling</strong>: depending on the severity of the anomaly, the decision is to record and observe, adjust parameters, or suspend the game</li>
            <li><strong>Root cause analysis</strong>: once an alert fires, the relevant data (bet records, RTP trend, win distribution) is automatically compiled
                to help locate the root cause quickly</li>
        </ul>
        <p>
            The real purpose of alert tiering is to avoid the <strong>"cry wolf" effect</strong>.
            A monitoring system that frequently produces false positives is more dangerous than no monitoring at all, because the team gradually learns to ignore it,
            and when a genuinely serious problem occurs, that alert drowns in identically formatted noise with nobody looking at it.
            Our tiering principle is therefore that <strong>each tier corresponds to a clearly defined expected action</strong>;
            if nobody knows what to do upon receiving an alert, that alert should not exist.
        </p>
        <ul>
            <li><strong>Observation tier</strong>: a statistical deviation exists, but its magnitude is within an acceptable range.
                It is written to the record for trend analysis only and does not actively interrupt anyone</li>
            <li><strong>Attention tier</strong>: the deviation persists and is consistent across multiple time windows.
                It is compiled and reported on a fixed review cadence; someone needs to interpret it, but not to drop what they are doing immediately</li>
            <li><strong>Urgent tier</strong>: the deviation is extremely large, or comes with clear systemic symptoms (for example, several bet types anomalous at once).
                It is pushed immediately and requires real-time handling</li>
        </ul>
        <p>
            Several suppression mechanisms accompany the tiering: <strong>deduplication</strong> ensures the same root cause is reported only once before it clears;
            <strong>aggregation</strong> merges multiple related alerts within the same period into a single summary,
            so that one common cause does not spawn dozens of separate messages;
            and <strong>escalation</strong> automatically raises the tier of a low-tier alert that has gone unhandled for a long time,
            preventing a problem from being shelved indefinitely just because its tier was low.
        </p>

        <h2><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i>Weighing False Positives Against False Negatives</h2>
        <p>
            Finally we return to that unavoidable fundamental trade-off. As noted earlier, an extremely strict significance level suppresses false positives,
            but the price of that choice has to be honestly acknowledged: <strong>it simultaneously raises the probability of false negatives</strong>,
            meaning that real problems of smaller magnitude need more accumulated samples before they are found.
        </p>
        <p>
            We accept that price, and the reason lies in the <strong>asymmetric cost structure</strong> of the two.
            The cost of a false positive is immediate and cumulative: every false positive consumes the team's attention
            and slowly erodes the credibility of the whole monitoring system, and once that erosion sets in it is very hard to reverse.
            The cost of a false negative, by contrast, is partly absorbed by other mechanisms:
            the multi-window design means a small deviation will eventually accumulate in the long window until it is detectable;
            a complete audit trail keeps retrospective investigation always feasible;
            and pre-launch mathematical validation together with deterministic testing intercepts most misconfigurations at the source.
        </p>
        <p>
            In other words, <strong>statistical detection is not the only line of defense, so it does not have to carry all of the false negative risk alone</strong>.
            Precisely because it sits within a multi-layer defensive system, we have the latitude to tune it toward the high-precision end,
            so that every alert it does emit deserves to be taken seriously.
            If it were the only line of defense, we would have to loosen the threshold and accept the noise that comes with it;
            a system like that is, in the end, usually one nobody looks at.
        </p>

        <h2><i class="fa-solid fa-compass-drafting" aria-hidden="true"></i>Design Principles</h2>
        <ul>
            <li><strong>Fairness is never altered</strong>: risk control only monitors and detects; it never manipulates the game's random outcomes</li>
            <li><strong>Grounded in statistics</strong>: all detection logic is based on rigorous hypothesis testing, avoiding false positives</li>
            <li><strong>Auditability</strong>: all detection results and alert records are preserved in full to support after-the-fact auditing</li>
            <li><strong>Explainability</strong>: every alert must be able to state which test, which time window, and how large a sample
                its determination was based on. An alert that cannot be explained cannot be verified, and therefore cannot be trusted</li>
            <li><strong>Conservatism first</strong>: when the data is insufficient to support a reliable conclusion, choose to draw no conclusion,
                rather than producing a seemingly precise judgment from an inadequate sample</li>
        </ul>
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

    strong {
        color: #222;
    }
}
</style>
