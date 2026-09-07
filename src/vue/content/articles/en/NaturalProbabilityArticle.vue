<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-circle-question" aria-hidden="true"></i>What Is Natural Probability?</h2>
        <p>
            In slot games, <strong>Natural Probability</strong> refers to the winning probability derived purely from
            the mathematical model, unaffected by any external adjustment factor. The outcome of every Spin is
            determined by a pre-designed <strong>symbol weight table (Reel Strip)</strong>, which guarantees fairness
            and a predictable long-term return rate.
        </p>
        <p>
            Natural probability design is the cornerstone of a slot's math system. A good natural probability model
            has to satisfy three core goals at the same time:
            <strong>a mathematically precise RTP</strong>, <strong>a sensible distribution of win frequency</strong>, and <strong>a good player feel</strong>.
        </p>
        <p>
            These three goals pull against each other: the easiest way to raise RTP is to increase the weight of
            high-paying symbols, but this simultaneously changes both the win frequency and the dispersion of the prizes.
            Conversely, raising the proportion of low-paying symbols to chase the feel of "winning something small all the time"
            squeezes out the RTP budget the big wins need.
            The essence of natural probability design is therefore to decide, under a <strong>fixed total expected-value budget</strong>,
            "what shape" these returns are paid out in.
            What a math designer is really doing is not deciding how much the player gets back, but deciding "how" the player gets it back.
        </p>
        <p>
            Another premise that is often overlooked is that natural probability must be <strong>fully derivable</strong>.
            That is, before the game goes live, the occurrence probability and corresponding payout of every possible board combination
            should in theory be enumerable or computable in closed form,
            rather than only being "found out" by running simulations. Derivability determines whether precise parameter fine-tuning
            is possible later on, and it also determines whether a complete mathematical proof document can be produced for third-party audit.
        </p>

        <h2><i class="fa-solid fa-table-list" aria-hidden="true"></i>Reel Strip Design</h2>
        <p>
            On each reel of a slot machine, the symbols are not uniformly distributed; they are configured according to a
            carefully calculated <strong>weight</strong>. The higher a symbol's weight, the more frequently it appears, and vice versa.
        </p>
        <h3>Basic Structure of the Weight Table</h3>
        <p>
            In a typical 5-reel slot, each reel has its own independent symbol weight configuration. For example:
        </p>
        <ul>
            <li><strong>Low-pay symbols</strong> (such as 10, J, Q, K, A): 8-12 per reel, high appearance frequency</li>
            <li><strong>Mid-pay symbols</strong> (such as themed icons): 4-6 per reel, medium appearance frequency</li>
            <li><strong>High-pay symbols</strong> (such as character icons): 2-3 per reel, low appearance frequency</li>
            <li><strong>Wild symbol</strong>: 1-2 per reel, substitutes for other symbols</li>
            <li><strong>Scatter / Bonus symbol</strong>: 1-2 per reel, triggers special features</li>
        </ul>
        <p>
            The total weight of each reel is the sum of all its symbol weights. When the RNG produces a random number,
            it is mapped onto this total weight range to determine which symbol the reel stops on.
        </p>
        <h3>Physical Reels and Virtual Reels</h3>
        <p>
            In early mechanical slots the number of symbols was limited by the number of physical stops on the reel. Modern electronic slots
            generally adopt the concept of the <strong>virtual reel</strong>:
            what the player sees on screen is a handful of symbol positions, but behind it sits a weight sequence that may be hundreds of positions long.
            The virtual reel lets the same symbol appear multiple times within the sequence,
            so the designer can tune a single symbol's appearance frequency at an extremely fine granularity without being limited by the on-screen row count.
        </p>
        <p>
            In practice there are two equivalent representations:
        </p>
        <ul>
            <li><strong>Expanded sequence</strong>: write the weight table as an "expanded" symbol sequence whose length equals the total weight. Lookup is fast, at the cost of memory</li>
            <li><strong>Cumulative distribution</strong>: record only each symbol's weight value and locate the result with a binary search. This saves space but adds one search per sample</li>
        </ul>
        <p>
            During a verification phase that requires billions of simulation runs, this seemingly minor difference shows up directly in total computation time.
        </p>
        <h3>The Real Trade-offs in Weight Configuration</h3>
        <p>
            When designing a weight table, the three most common trade-offs are as follows:
        </p>
        <ul>
            <li><strong>Distribution of high-pay symbols across reels</strong>: concentrating high-pay symbols in the first three reels makes it easier for the player
                to see a "one away from the big win" board. Anticipation is strong but the near-miss rate is high; an even distribution feels smoother
                but has less dramatic tension.</li>
            <li><strong>Wild placement</strong>: Wilds are usually placed only on the middle reels. A Wild's marginal contribution to RTP is non-linear;
                adding one more Wild may raise the probability of dozens of combinations at once, so when fine-tuning you must recompute each one rather than extrapolate linearly.</li>
            <li><strong>Independence of the Scatter</strong>: the Scatter trigger frequency directly determines the Free Game's share of RTP,
                so it is usually separated out from the main win logic and tuned on its own, to avoid interfering with line payouts.</li>
        </ul>
        <p>
            Another easily overlooked detail is the <strong>adjacency constraint</strong>: without restrictions, certain high-pay symbols may appear consecutively on the same reel,
            producing boards that are extremely improbable yet visually jarring. Most designs add a minimum-spacing rule into the weight sequence
            to preserve the visual rhythm of the board, and rules of this kind must likewise be folded into the probability calculation.
        </p>

        <h2><i class="fa-solid fa-calculator" aria-hidden="true"></i>Calculating Winning Combination Probability</h2>
        <p>
            Take a 5-reel slot as an example. Suppose the total weights of the reels are W1, W2, W3, W4, W5.
            To compute the probability of a specific winning combination, you multiply the weights of the corresponding symbol on each reel and divide by the total number of combinations:
        </p>
        <div class="formula-block">
            <code>P(combination) = (symbol weight on R1 × symbol weight on R2 × ... × symbol weight on R5) ÷ (W1 × W2 × W3 × W4 × W5)</code>
        </div>
        <p>
            For a Payline-based slot, a win is usually judged by requiring <strong>the same symbol to appear consecutively starting from the leftmost reel</strong>,
            with at least 3 in a row counting as a win. You therefore need to compute the probabilities of 3-, 4- and 5-of-a-kind separately and multiply each by its own paytable value.
        </p>
        <h3>Inclusion-Exclusion Handling for Line Probability</h3>
        <p>
            When computing the probability of 3-of-a-kind, a common mistake is to simply multiply the symbol probabilities of the first three reels.
            The correct approach must exclude the case where "the fourth reel also hits", otherwise the same board is double-counted as both a 3-of-a-kind and a 4-of-a-kind:
        </p>
        <div class="formula-block">
            <code>P(exactly 3 in a row) = P(R1) × P(R2) × P(R3) × (1 − P(R4))</code>
        </div>
        <p>
            Once Wilds are introduced the situation becomes more complex: the probability of "hitting that symbol" on each reel is in fact
            <strong>that symbol's weight plus the Wild's weight</strong>,
            and if the Wild has a paytable of its own, you must additionally handle the case of "an all-Wild line taking the higher payout".
            In practice this part is split out into a dedicated evaluation function and cross-validated against a small-scale exhaustive board enumeration, to make sure nothing is double-counted or missed.
        </p>

        <h3>Calculation Differences in Ways-Type Slots</h3>
        <p>
            In multi-way slots such as 243 Ways or 1024 Ways, fixed paylines are not used;
            instead the <strong>occurrence count</strong> of the target symbol on each reel is counted. The number of winning Ways equals the product of the symbol counts across reels:
        </p>
        <div class="formula-block">
            <code>Ways = Count(R1) × Count(R2) × Count(R3) × ...</code>
        </div>
        <p>
            The biggest difference between the two lies in the <strong>shape of the payout distribution</strong>. On a fixed-Payline machine the amount of a single win is relatively discrete,
            because each line either hits or does not; in a Ways-type game, because the same symbol can appear 2 or 3 times on a single reel,
            single-win amounts exhibit a pronounced "multiplication effect" and the distribution becomes more long-tailed.
        </p>
        <p>
            Take a 3-row, 5-reel layout: if a symbol appears twice on every reel, a single win means 2×2×2 = 8 paths paying at once.
            This means that at the same RTP, a Ways-type game usually needs to <strong>lower the overall symbol weights</strong> to offset the expected-value inflation the multiplication brings.
            The result is fewer hits and larger single amounts; in other words, volatility is naturally higher.
            This also explains why most Ways-type machines pair with a higher free-game share:
            the base reels feel emptier to the player, so a clear goal is needed to maintain the rhythm.
        </p>

        <h2><i class="fa-solid fa-percent" aria-hidden="true"></i>RTP (Return to Player) Calculation</h2>
        <p>
            <strong>RTP</strong> is the single most important math metric of a slot. It represents the proportion of every 1 unit wagered that a player can expect to get back over the long run.
            For example, an RTP of 96.5% means that over the long run, for every 100 units wagered, the player can expect to receive 96.5 back.
        </p>
        <p>
            RTP is computed by summing the <strong>expected value</strong> of all possible winning combinations:
        </p>
        <div class="formula-block">
            <code>RTP = Σ (probability of each winning combination × that combination's payout multiplier)</code>
        </div>
        <h3>A Concrete Expected-Value Derivation</h3>
        <p>
            Suppose a high-pay symbol has weights of 2, 2, 2, 3, 3 across the five reels, and every reel has a total weight of 60.
            Then the probability of a 5-of-a-kind is (2×2×2×3×3) ÷ 60⁵ ≈ 9.26×10⁻⁷.
            If the 5-of-a-kind pays 500x, that combination's contribution to RTP is 9.26×10⁻⁷ × 500 ≈ 0.046%.
        </p>
        <p>
            This figure reveals an important fact: <strong>the contribution of a single big-win combination to total RTP is usually small enough to ignore</strong>.
            What really carries RTP are the mid-to-low tier combinations whose probability sits between one in a thousand and one in a hundred and whose payouts are only a few times to a few dozen times the bet.
            This is also why adjusting the big-win payout has almost no effect on RTP yet significantly changes volatility:
            it moves the tail of the distribution, not its center of mass.
        </p>
        <p>
            In practice, the composition of RTP can usually be broken down as follows:
        </p>
        <ul>
            <li><strong>Base Game RTP</strong>: the return contribution of the base reels, usually 50-70%</li>
            <li><strong>Free Game RTP</strong>: the return contribution of free spins, usually 20-35%</li>
            <li><strong>Bonus Feature RTP</strong>: the return contribution of special features, usually 5-15%</li>
        </ul>
        <p>
            The Free Game's RTP contribution requires particular care, because it is the product of <strong>trigger probability × expected return per trigger</strong>,
            and the expected return per trigger may itself form an infinite series because of a "retrigger".
            If each free game has probability r of retriggering, the expected number of rounds converges to n ÷ (1 − r).
            This amplification factor becomes quite substantial once r approaches 0.3 or above, and it is the most common reason for free-game RTP running out of control.
        </p>

        <h2><i class="fa-solid fa-chart-line" aria-hidden="true"></i>Volatility Design</h2>
        <p>
            Besides RTP, <strong>volatility</strong> is the key metric shaping how the game feels to a player. Volatility determines the "dispersion" of wins:
        </p>
        <ul>
            <li><strong>Low volatility</strong>: frequent small wins, suited to casual players, slow bankroll depletion</li>
            <li><strong>Medium volatility</strong>: balanced, weighing win frequency against prize size</li>
            <li><strong>High volatility</strong>: rare big wins, suited to players seeking excitement, dramatic bankroll swings</li>
        </ul>
        <DiagramFigure caption="Both can have exactly the same RTP while feeling completely different to play: what changes is how the payout is spread, not how much of it there is.">
            <svg viewBox="0 0 640 272" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Payout spread at medium and high volatility</title>
            <desc>A medium volatility game concentrates payouts in small and mid wins, while a high volatility game is dominated by no-wins with only a rare big win.</desc>
            <text x="165" y="24" font-size="14" fill="currentColor" text-anchor="middle" font-weight="700">Medium volatility</text>
            <text x="165" y="44" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">SD roughly 5 - 8</text>
            <rect x="52" y="131.2" width="46" height="82.8" rx="4" fill="var(--dg-3)"/>
            <text x="75" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">No win</text>
            <rect x="112" y="111.88" width="46" height="102.12" rx="4" fill="var(--dg-3)"/>
            <text x="135" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">Small</text>
            <rect x="172" y="167.08" width="46" height="46.92" rx="4" fill="var(--dg-3)"/>
            <text x="195" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">Mid</text>
            <rect x="232" y="207.1" width="46" height="6.9" rx="4" fill="var(--dg-3)"/>
            <text x="255" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">Big</text>
            <line x1="40" y1="214" x2="290" y2="214" stroke="currentColor" stroke-opacity="0.25" stroke-width="1"/>
            <text x="475" y="24" font-size="14" fill="currentColor" text-anchor="middle" font-weight="700">High volatility</text>
            <text x="475" y="44" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">SD above 15</text>
            <rect x="362" y="82.9" width="46" height="131.1" rx="4" fill="var(--dg-1)"/>
            <text x="385" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">No win</text>
            <rect x="422" y="178.12" width="46" height="35.88" rx="4" fill="var(--dg-1)"/>
            <text x="445" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">Small</text>
            <rect x="482" y="197.44" width="46" height="16.56" rx="4" fill="var(--dg-1)"/>
            <text x="505" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">Mid</text>
            <rect x="542" y="204.34" width="46" height="9.66" rx="4" fill="var(--dg-1)"/>
            <text x="565" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">Big</text>
            <line x1="350" y1="214" x2="600" y2="214" stroke="currentColor" stroke-opacity="0.25" stroke-width="1"/>
            <text x="320" y="258" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">Horizontal: payout band of a single spin. Vertical: how often it occurs</text>
            </svg>
        </DiagramFigure>
        <p>
            Volatility can be controlled by adjusting the ratio of high-pay to low-pay symbols in the weight table. Increasing the weight of high-pay symbols lowers volatility,
            while decreasing the weight of high-pay symbols raises volatility.
        </p>
        <h3>How to Quantify Volatility</h3>
        <p>
            The industry often describes volatility with verbal tiers, but the design stage needs concrete numbers. The most universal quantification is to compute the
            <strong>standard deviation</strong> of the single-Spin payout multiple X:
        </p>
        <div class="formula-block">
            <code>Var(X) = Σ p·x² − (Σ p·x)² ; SD = √Var(X)</code>
        </div>
        <p>
            Here Σ p·x is RTP itself. Because the distribution is extremely right-skewed, the standard deviation is often far larger than the mean:
            a medium-volatility machine with 96% RTP may have a standard deviation between 5 and 8; high-volatility machines commonly exceed 15,
            and extreme "big-win oriented" designs can even go above 40.
        </p>
        <p>
            Another practical metric is the <strong>volatility index</strong>, obtained by multiplying the single-payout standard deviation by a confidence coefficient,
            used to estimate the interval within which a player's realized RTP will fall after N rounds. By the central limit theorem, the standard deviation of the mean over N rounds is SD ÷ √N,
            from which it follows that: the higher the volatility, the more rounds are required before a player can "feel" the theoretical RTP.
            This inference directly explains a characteristic of high-volatility machines: short-term feel can diverge enormously from the theoretical value, and that is part of the design intent.
        </p>
        <DiagramFigure caption="Higher volatility needs far more spins before actual RTP settles near the theoretical value, which is why short-term feel and long-term maths so often disagree.">
            <svg viewBox="0 0 640 280" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Actual RTP converging with spin count</title>
            <desc>More spins bring the actual RTP closer to the theoretical value, and higher volatility needs far more spins to get there.</desc>
            <polygon points="78,24 90.95,60.175 103.9,72.8755 116.85,79.8779 129.8,84.4688 142.75,87.7754 155.7,90.303 168.65,92.316 181.6,93.9683 194.55,95.3562 207.5,96.5435 220.45,97.5741 233.4,98.4799 246.35,99.2841 259.3,100.004 272.25,100.654 285.2,101.245 298.15,101.784 311.1,102.28 324.05,102.737 337,103.16 349.95,103.554 362.9,103.922 375.85,104.265 388.8,104.588 401.75,104.892 414.7,105.178 427.65,105.449 440.6,105.705 453.55,105.948 466.5,106.18 479.45,106.4 492.4,106.61 505.35,106.81 518.3,107.002 531.25,107.186 544.2,107.362 557.15,107.531 570.1,107.693 583.05,107.85 596,108 596,132 583.05,132.15 570.1,132.307 557.15,132.469 544.2,132.638 531.25,132.814 518.3,132.998 505.35,133.19 492.4,133.39 479.45,133.6 466.5,133.82 453.55,134.052 440.6,134.295 427.65,134.551 414.7,134.822 401.75,135.108 388.8,135.412 375.85,135.735 362.9,136.078 349.95,136.446 337,136.84 324.05,137.263 311.1,137.72 298.15,138.216 285.2,138.755 272.25,139.346 259.3,139.996 246.35,140.716 233.4,141.52 220.45,142.426 207.5,143.457 194.55,144.644 181.6,146.032 168.65,147.684 155.7,149.697 142.75,152.225 129.8,155.531 116.85,160.122 103.9,167.125 90.95,179.825 78,216" fill="var(--dg-1)" fill-opacity="0.20"/>
            <polygon points="78,80 90.95,95.0729 103.9,100.365 116.85,103.282 129.8,105.195 142.75,106.573 155.7,107.626 168.65,108.465 181.6,109.153 194.55,109.732 207.5,110.226 220.45,110.656 233.4,111.033 246.35,111.368 259.3,111.668 272.25,111.939 285.2,112.185 298.15,112.41 311.1,112.617 324.05,112.807 337,112.984 349.95,113.148 362.9,113.301 375.85,113.444 388.8,113.578 401.75,113.705 414.7,113.824 427.65,113.937 440.6,114.044 453.55,114.145 466.5,114.241 479.45,114.333 492.4,114.421 505.35,114.504 518.3,114.584 531.25,114.661 544.2,114.734 557.15,114.805 570.1,114.872 583.05,114.937 596,115 596,125 583.05,125.063 570.1,125.128 557.15,125.195 544.2,125.266 531.25,125.339 518.3,125.416 505.35,125.496 492.4,125.579 479.45,125.667 466.5,125.759 453.55,125.855 440.6,125.956 427.65,126.063 414.7,126.176 401.75,126.295 388.8,126.422 375.85,126.556 362.9,126.699 349.95,126.852 337,127.016 324.05,127.193 311.1,127.383 298.15,127.59 285.2,127.815 272.25,128.061 259.3,128.332 246.35,128.632 233.4,128.967 220.45,129.344 207.5,129.774 194.55,130.268 181.6,130.847 168.65,131.535 155.7,132.374 142.75,133.427 129.8,134.805 116.85,136.718 103.9,139.635 90.95,144.927 78,160" fill="var(--dg-3)" fill-opacity="0.30"/>
            <line x1="78" y1="120" x2="596" y2="120" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" stroke-opacity="0.75"/>
            <text x="596" y="110" font-size="12" fill="currentColor" text-anchor="end" opacity="0.8">Theoretical RTP</text>
            <text x="78" y="246" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">1K spins</text>
            <text x="250.667" y="246" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">10K spins</text>
            <text x="423.333" y="246" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">100K spins</text>
            <text x="596" y="246" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">1M spins</text>
            <text x="78" y="30" font-size="12" fill="var(--dg-1-ink)" font-weight="700">High volatility</text>
            <text x="78" y="48" font-size="12" fill="var(--dg-3-ink)" font-weight="700">Medium volatility</text>
            <text x="320" y="266" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">The band is the likely range of actual RTP, its width scaling as SD over the square root of spins</text>
            </svg>
        </DiagramFigure>

        <h2><i class="fa-solid fa-bullseye" aria-hidden="true"></i>Hit Rate and Win Frequency</h2>
        <p>
            <strong>Hit Rate</strong> is the probability that any given Spin produces some kind of win.
            A typical slot has a Hit Rate between 20% and 35%, meaning roughly one win every 3-5 Spins.
        </p>
        <p>
            Hit Rate is closely related to volatility: a high Hit Rate usually corresponds to low volatility, and a low Hit Rate to high volatility.
            When designing, you must reach the target Hit Rate by adjusting the distribution across payout tiers while holding RTP fixed.
        </p>
        <h3>Nominal Wins Versus Real Wins</h3>
        <p>
            Looking at Hit Rate alone actually leads to misjudging the player's feel. On a multi-line machine a single bet covers many lines,
            so it is common to "hit one line but be paid less than the total bet". The screen shows a win animation and sound effect,
            yet the settlement is still a net loss. The industry calls this a <strong>loss disguised as a win</strong>.
        </p>
        <p>
            A metric closer to the actual feel is therefore the <strong>net-win rate</strong>: the probability that a single Spin pays more than the total bet.
            Many machines with a Hit Rate as high as 35% have a net-win rate of only around 12%.
            If you fixate on Hit Rate alone during design, it is easy to produce the dissonant experience of "constantly winning yet constantly losing".
            The mature approach is to track three numbers at once: the any-win rate, the net-win rate, and the expected length of the longest losing streak.
        </p>
        <h3>Distribution of Dead-Spin Streak Length</h3>
        <p>
            Player frustration usually stems not from the average but from <strong>the worst stretch of the experience</strong>.
            If the probability of a win on a single spin is p, the probability of k consecutive misses is (1−p)ᵏ,
            and over N rounds of play the expected longest dead-spin streak is approximately log(N) ÷ −log(1−p).
            With p = 0.25 and N = 1000, a player will almost certainly encounter a stretch of roughly 24 rounds with no win at all.
            Computing this number during design and confirming it falls within an acceptable range is far more effective than correcting it afterwards based on player feedback.
        </p>

        <h2><i class="fa-solid fa-flask" aria-hidden="true"></i>Mathematical Verification and Simulation</h2>
        <p>
            Once the design is complete, its numerical correctness must be verified through <strong>large-scale simulation</strong>.
            This usually requires simulating at least 100 million to 1 billion Spins, confirming that:
        </p>
        <ul>
            <li>The actual RTP converges to the target value (error under 0.1%)</li>
            <li>The empirical probability of each winning combination matches the theoretical value</li>
            <li>The trigger frequency of Free Games and Bonuses matches expectations</li>
            <li>The maximum multiplier (Max Win) is within an acceptable range</li>
            <li>The volatility metrics match the design targets</li>
        </ul>
        <h3>How Many Samples Should You Take?</h3>
        <p>
            "A hundred million" should not be a number picked off the top of one's head; it should be derived backwards from the target precision.
            If you want the simulated RTP to be within ±ε with a confidence-level coefficient z, the required sample size is:
        </p>
        <div class="formula-block">
            <code>N ≥ (z × SD ÷ ε)²</code>
        </div>
        <p>
            Plugging in SD = 10, a required error of ±0.1% (ε = 0.001) and a 95% confidence level (z ≈ 1.96),
            you get N ≈ 380 million. For a high-volatility machine with SD = 25, the sample size required for the same precision balloons to about 2.4 billion.
            This is exactly why verifying a high-volatility machine costs far more than verifying a low-volatility one:
            <strong>the required sample size is proportional to the square of the standard deviation</strong>.
        </p>
        <h3>Not Just the Mean, but the Distribution</h3>
        <p>
            RTP convergence is only the minimum bar. A complete verification should also include:
        </p>
        <ul>
            <li><strong>Chi-squared goodness-of-fit test</strong>: compare the simulated frequency in each payout bucket against the theoretical frequency.
                If the test statistic is significantly large, it means the weight table or the evaluation logic contains an implementation error, not random noise.</li>
            <li><strong>Batched convergence observation</strong>: split the total sample into several hundred batches, observe whether the distribution of per-batch RTP is approximately normal,
                and check whether its standard deviation matches the theoretical prediction of SD ÷ √n.</li>
            <li><strong>Tail event inspection</strong>: measure the largest single payout and the frequency of reaching Max Win,
                confirming that the ceiling has genuinely been hit, so as to avoid an invalid big win that "exists in theory but can never actually be drawn".</li>
            <li><strong>Monte Carlo bankroll curves</strong>: simulate many player histories from a fixed starting bankroll,
                observing the proportion that go bust within N rounds, to check whether a high-volatility design exceeds an acceptable range.</li>
        </ul>
        <p>
            The two verification paths must be cross-checked: one is <strong>analytical computation</strong> (exhaustive enumeration or closed-form formulas),
            the other is <strong>random simulation</strong>. Only when the two agree within the margin of error can verification be considered genuinely passed.
            If they do not agree, the probability math is usually not what is wrong; more often the simulation program and the theoretical model interpret the rules differently.
            Such gaps tend to hide in boundary rules like Wild substitution, retriggers, and line-value selection, which are precisely the most error-prone spots.
        </p>
        <p>
            Simulation verification is the last line of defense for the correctness of a natural probability design; any adjustment to the mathematical model must go through a full simulation test.
            A mature process automates the entire verification suite: every weight table change reruns the full battery of tests,
            and the results are placed side by side with the previous version so that the impact of a numerical change is immediately visible.
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
