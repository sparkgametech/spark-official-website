<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-circle-question" aria-hidden="true"></i>What Is the Result Set Architecture?</h2>
        <p>
            In slot game development, the <strong>result set</strong> is a <strong>pre-generated seed record pool</strong> architecture.
            Its core idea is to pre-compute the game's random outcomes and package them into replayable records, used to distribute results in specific scenarios
            while keeping the mathematical expected value exactly consistent with natural probability.
        </p>
        <p>
            The result set does not replace real-time RNG. Rather, in scenarios that require <strong>precise control of the RTP distribution</strong>,
            it provides a mathematically verified collection of outcomes, ensuring that each group's long-term return rate converges strictly to the target value.
        </p>

        <h3>Why Pre-generate Instead of Computing in Real Time?</h3>
        <p>
            The real-time approach is: draw a random number on each Spin, determine the reel stop positions from the weight table, and then run a full line evaluation on the spot.
            There is nothing wrong with this flow in itself, but it has three limitations that are hard to avoid.
        </p>
        <ul>
            <li><strong>Computation cost is tied to peak load</strong>: line evaluation, Wild expansion and free-game recursion are cheap
                for a single round, but multiplied by the request volume at peak hours they become a noticeable overhead.
                Pre-generation shifts these costs once and for all into an offline stage, leaving only lookup and decoding online.</li>
            <li><strong>Short-term RTP cannot be controlled</strong>: the RTP of real-time sampling only converges over very large samples,
                and any finite sample window may deviate substantially. A pre-generated result pool, on the other hand, can have the whole pool's
                average payout multiple locked in at packaging time, greatly increasing the speed of convergence within a finite sample.</li>
            <li><strong>Results are not reproducible</strong>: with real-time computation, if the input random numbers are not fully recorded, the same round cannot be reproduced afterwards.
                Pre-generation naturally carries the property that "every result has an identity", and reproduction is merely decoding it again.</li>
        </ul>
        <p>
            Put another way, pre-generation splits a slot's randomness into two layers:
            <strong>the randomness of the outcome itself</strong> is already determined by the natural probability model in the offline stage,
            and the online stage retains only <strong>the randomness of "which record to draw"</strong>.
            The correctness of the mathematical model can therefore be fully verified and sealed in the offline stage, no longer subject to changes in online code.
        </p>

        <h2><i class="fa-solid fa-layer-group" aria-hidden="true"></i>The Layered Architecture of the Result Set</h2>
        <p>
            The result set uses a multi-level tree structure that filters down level by level from the top:
        </p>

        <h3>Record Pool Management Layer</h3>
        <p>
            The topmost level is a container indexed by identifier that manages multiple result set instances.
            Each result set represents a specific group of outcome records, corresponding to a target RTP band.
        </p>
        <p>
            The point of layering is to <strong>separate "which group to choose" from "which record to choose"</strong>.
            The top level decides the mathematical characteristics (how high an expected value, what shape of volatility),
            while the bottom level decides the concrete board. This split means RTP adjustment never has to touch any single-round data
            (swapping one index is enough), and it also lets the same batch of underlying records be shared by several different RTP versions.
        </p>
        <DiagramFigure caption="Separating which group from which record means tuning RTP only swaps an index, with no per-round data regenerated.">
            <svg viewBox="0 0 640 352" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Four-layer selection in the result set</title>
            <desc>Each layer from the top picks the pool, the result set and the payout group in turn; only the bottom layer draws a single record uniformly.</desc>
            <rect x="30" y="14" width="580" height="76" rx="8" fill="var(--dg-1)" fill-opacity="0.12"/>
            <rect x="30" y="14" width="6" height="76" rx="3" fill="var(--dg-1)"/>
            <text x="52" y="40" font-size="15" fill="currentColor" font-weight="700">Pool management</text>
            <text x="52" y="61" font-size="12" fill="currentColor" opacity="0.9">Indexed by identifier, holding several result sets</text>
            <text x="52" y="79" font-size="12" fill="currentColor" opacity="0.75">Decides: which set of mathematical characteristics</text>
            <rect x="30" y="98" width="580" height="76" rx="8" fill="var(--dg-2)" fill-opacity="0.12"/>
            <rect x="30" y="98" width="6" height="76" rx="3" fill="var(--dg-2)"/>
            <text x="52" y="124" font-size="15" fill="currentColor" font-weight="700">Result set</text>
            <text x="52" y="145" font-size="12" fill="currentColor" opacity="0.9">One result set per target RTP band</text>
            <text x="52" y="163" font-size="12" fill="currentColor" opacity="0.75">Decides: where this round expected value sits</text>
            <rect x="30" y="182" width="580" height="76" rx="8" fill="var(--dg-3)" fill-opacity="0.12"/>
            <rect x="30" y="182" width="6" height="76" rx="3" fill="var(--dg-3)"/>
            <text x="52" y="208" font-size="15" fill="currentColor" font-weight="700">Weighted payout groups</text>
            <text x="52" y="229" font-size="12" fill="currentColor" opacity="0.9">Split by payout band, usually into two groups</text>
            <text x="52" y="247" font-size="12" fill="currentColor" opacity="0.75">Decides: RTP is tuned by shifting weight between groups</text>
            <rect x="30" y="266" width="580" height="76" rx="8" fill="var(--dg-1)" fill-opacity="0.12"/>
            <rect x="30" y="266" width="6" height="76" rx="3" fill="var(--dg-1)"/>
            <text x="52" y="292" font-size="15" fill="currentColor" font-weight="700">Record</text>
            <text x="52" y="313" font-size="12" fill="currentColor" opacity="0.9">Drawn uniformly inside the chosen group</text>
            <text x="52" y="331" font-size="12" fill="currentColor" opacity="0.75">Decides: the board this round actually shows</text>
            </svg>
        </DiagramFigure>

        <h3>Result Set: A Single Result Set</h3>
        <p>
            Each result set contains the following core attributes:
        </p>
        <ul>
            <li><strong>Average payout multiple</strong>: the expected multiple of that result set, i.e. the RTP of this pool of records</li>
            <li><strong>Weighted payout groups</strong>: subsets split by payout band, usually divided into 2 groups</li>
        </ul>
        <p>
            The purpose of the grouping design is to manage high-payout and low-payout records separately, fine-tuning overall RTP through weight allocation between the groups.
        </p>
        <p>
            This design solves a very practical problem: if the whole pool of records were mixed together and drawn uniformly,
            the pool's RTP would be fixed, and changing it would mean regenerating the entire pool of data.
            But once records are split into two groups by payout, adjusting the weights between the groups allows the expected value to be
            <strong>continuously tuned</strong> within a certain range:
            raise the weight of the high-multiple group and overall RTP rises with it, without rerunning the underlying data at all.
            That amounts to buying an entire span of RTP coverage with a single one-dimensional parameter.
        </p>
        <p>
            The number of groups is itself a trade-off. The more groups, the finer the adjustable granularity and the more precise the control over volatility,
            but every group must retain a sufficient sample size, or sampling within the group loses its representativeness.
            In practice two or three groups are usually enough to cover common needs.
        </p>

        <h3>Single-Round Result Record</h3>
        <p>
            The bottom level is a complete Spin result record,
            containing the reel stop positions, winning combinations, multiples and everything else needed for replay.
            Each record is stored compressed in a custom <strong>TLV (Type-Length-Value)</strong> binary encoding format.
        </p>

        <h2><i class="fa-solid fa-file-code" aria-hidden="true"></i>TLV Encoding Format Design</h2>
        <p>
            To store large volumes of Spin result records efficiently, the result set adopts a compact TLV binary encoding format:
        </p>
        <div class="formula-block">
            <code>[numerator u32][denominator u32][segment count u8][types u8×N][lengths u32×N][data...]</code>
        </div>
        <p>
            The design focuses of this format are:
        </p>
        <ul>
            <li><strong>Payout up front</strong>: numerator / denominator encode the multiple directly, so the filtering stage need not decode the whole record</li>
            <li><strong>Segmented structure</strong>: each segment corresponds to one dimension of the game (such as per-reel stop positions or feature trigger results)</li>
            <li><strong>Game-specific field-width table</strong>: each game defines its own field-width mapping that maps segment types to byte widths, maximizing compression efficiency</li>
            <li><strong>Generic codec</strong>: through a unified encode/decode interface, each game implements its own extraction, encoding and decoding steps</li>
        </ul>
        <DiagramFigure caption="Putting the payout at a fixed offset at the front is the most consequential decision in this format.">
            <svg viewBox="0 0 640 172" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Byte layout of a TLV record</title>
            <desc>The numerator and denominator of the payout sit at a fixed offset at the start of the record, so filtering never has to decode the whole thing.</desc>
            <rect x="30" y="74" width="92" height="52" rx="5" fill="var(--dg-1)"/>
            <text x="76" y="98" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="700">Numerator</text>
            <text x="76" y="115" font-size="11" fill="#ffffff" text-anchor="middle">u32 - 4 bytes</text>
            <rect x="126" y="74" width="92" height="52" rx="5" fill="var(--dg-1)"/>
            <text x="172" y="98" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="700">Denominator</text>
            <text x="172" y="115" font-size="11" fill="#ffffff" text-anchor="middle">u32 - 4 bytes</text>
            <rect x="222" y="74" width="58" height="52" rx="5" fill="var(--dg-2)" fill-opacity="0.16"/>
            <text x="251" y="98" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700">Segments</text>
            <text x="251" y="115" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.85">u8</text>
            <rect x="284" y="74" width="104" height="52" rx="5" fill="var(--dg-3)" fill-opacity="0.16"/>
            <text x="336" y="98" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700">Type table</text>
            <text x="336" y="115" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.85">u8 x N</text>
            <rect x="392" y="74" width="104" height="52" rx="5" fill="var(--dg-3)" fill-opacity="0.16"/>
            <text x="444" y="98" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700">Length table</text>
            <text x="444" y="115" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.85">u32 x N</text>
            <rect x="500" y="74" width="106" height="52" rx="5" fill="var(--dg-3)" fill-opacity="0.16"/>
            <text x="553" y="98" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700">Data</text>
            <text x="553" y="115" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.85">...</text>
            <line x1="30" y1="60" x2="218" y2="60" stroke="var(--dg-1)" stroke-width="2"/>
            <text x="124" y="50" font-size="12" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">Payout in the first 8 bytes</text>
            <text x="124" y="30" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">fixed offset</text>
            <text x="320" y="154" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">Filtering reads only the leading payout, collapsing to one pointer operation; a fraction rather than a float keeps comparison and summation exact</text>
            </svg>
        </DiagramFigure>
        <h3>The Space-Versus-Speed Trade-off</h3>
        <p>
            Why not simply use a general-purpose serialization format? Mainly because of the order of magnitude of the result records.
            When one game needs millions of records and dozens of games are live at the same time,
            a difference of a few dozen bytes per record adds up to a considerable difference in total size,
            and directly affects whether the whole dataset can stay resident in memory.
        </p>
        <p>
            Putting the payout in a leading field is the single most critical decision in this format.
            The filtering stage only needs to know the multiple; if the entire record had to be decoded before the multiple could be judged,
            you would be paying the cost of a full decode for one number. Placing it at a fixed offset at the head
            reduces filtering to a single pointer offset read. Using a numerator and denominator rather than a floating-point number
            is there to guarantee that <strong>payout comparison and summation carry no precision error whatsoever</strong>.
            RTP is a number that goes to audit, and it cannot tolerate accumulated floating-point error.
        </p>
        <p>
            The field-width table embodies the idea of "allocating bytes on demand".
            A 5-reel game whose per-reel weight sequence is no longer than 255 needs only one byte for a stop position;
            a game with sequences of a thousand or more needs two bytes. If a single maximum width were used uniformly,
            most games would be paying for space they never use. Letting each game declare its own width table
            achieves near-optimal compression without altering the encoding framework.
        </p>
        <p>
            Of course this design has a price: the format is custom, so it cannot be inspected directly with general-purpose tools.
            You must therefore additionally provide human-readable output for debugging, and establish a version field for the format itself,
            so that adding segment types later does not break backward compatibility with existing data.
        </p>

        <h2><i class="fa-solid fa-filter" aria-hidden="true"></i>The Picking Pipeline</h2>
        <p>
            When the system needs to draw a result from the result set, it goes through the following multi-stage picking pipeline:
        </p>

        <h3>Step 1: RTP Anchor Selection</h3>
        <p>
            Based on the target RTP value, locate the nearest <strong>RTP anchor</strong>.
            The system supports up to 3 anchors, and when the target RTP falls between two anchors,
            a probabilistic choice is made using <strong>linear interpolation</strong>:
        </p>
        <div class="formula-block">
            <code>P(choose AnchorA) = (AnchorB.RTP - targetRTP) / (AnchorB.RTP - AnchorA.RTP)</code>
        </div>
        <p>
            This ensures that a target RTP of arbitrary precision can be produced between two discrete RTP tiers.
        </p>
        <p>
            What is worth explaining here is why a "probabilistic choice" is used instead of "blending results".
            If you tried to mix records from the two anchors proportionally and draw from the mixture, the resulting distribution shape would be a superposition of the two,
            and the volatility characteristics might land outside both. Deciding <strong>wholesale</strong>, on each round, which anchor group to use
            gives the same expected value as linear interpolation, but every round's result comes entirely from one verified distribution,
            so the mathematical properties are cleaner and easier to explain to outside parties.
        </p>

        <h3>Step 2: Weighted Selection of a Result Group</h3>
        <p>
            Under the selected anchor, one of several candidate result groups is chosen by weighted random draw.
            Each group carries a weight value that determines its probability of being chosen.
        </p>

        <h3>Step 3: Weighted Selection Among Subgroups</h3>
        <p>
            Within the selected result group, a further weighted selection is made between 2 subgroups.
            The split is usually made by payout range, for example a "low-multiple result group" and a "high-multiple result group".
        </p>

        <h3>Step 4: Uniform Record Draw</h3>
        <p>
            Within the selected subgroup, one result record is drawn at random with a uniform distribution,
            then decoded back into the game's seed structure for the game engine to replay.
        </p>
        <p>
            Keeping the bottom level a <strong>uniform draw</strong> is deliberate. All the mathematical tuning has already been done in the three layers above,
            and introducing weights again at the last layer would make the derivation of the overall expected value hard to verify.
            Another benefit of staying uniform is this: as long as the statistical properties of the record pool itself have been verified,
            the distribution of the sampled results is necessarily identical to that pool's distribution, and no extra proof is required.
        </p>
        <h3>Indexing Strategy</h3>
        <p>
            Index design is the key to keeping all four selection layers constant-time.
            The common approach is to pre-build a <strong>cumulative weight array</strong> for each layer and locate the draw with a binary search,
            making the cost of a single layer logarithmic; the bottom layer, being a uniform draw, can be addressed directly by offset.
            Because records are encoded with fixed length or with segment lengths up front, the position of the k-th record can be computed directly
            without scanning record by record, a concrete example of the encoding format and the indexing strategy working together.
        </p>

        <h2><i class="fa-solid fa-clock-rotate-left" aria-hidden="true"></i>The Deterministic Replay Mechanism</h2>
        <p>
            A seed taken from the result set can restore the full game outcome through deterministic replay.
            For a reel-based slot, an integer seed is broken down into the stop position of each reel through
            <strong>mixed-radix decomposition</strong>:
        </p>
        <div class="formula-block">
            <code>reel[i].stop = seed % len(reel[i]); seed = seed / len(reel[i])</code>
        </div>
        <p>
            This mechanism guarantees that the same seed value always produces the same game result, making result verification and auditing straightforward.
        </p>
        <h3>Why Determinism Matters So Much for Audit</h3>
        <p>
            The elegance of mixed-radix decomposition lies in the <strong>bijection</strong> it establishes between "integers" and "boards":
            every valid seed value corresponds to exactly one board, and every board corresponds to exactly one seed value, with no duplicates and no omissions.
            This means storing one integer is equivalent to storing a complete board,
            and it also guarantees that "drawing seeds uniformly" is equivalent to "drawing boards uniformly", so the probability derivation holds completely.
        </p>
        <p>
            For audit purposes, determinism brings three concrete benefits:
        </p>
        <ul>
            <li><strong>Traceability</strong>: any dispute about a round can be resolved by restoring the complete board and calculation process of that moment from the record,
                without having to retain bulky visual data.</li>
            <li><strong>Independent verifiability</strong>: given the weight table and the seed, a third party
                can recompute the identical result with their own program, without having to trust the original implementation.</li>
            <li><strong>Regression capability</strong>: after the game logic is revised, rerunning the same batch of seeds and
                comparing whether every round's payout is exactly identical makes any unexpected behavioral change surface immediately.</li>
        </ul>
        <p>
            Note that determinism only holds when <strong>the entire computation path carries no hidden state</strong>.
            Any logic that depends on the current time, uninitialized memory, or hash-table iteration order
            will make the same seed produce different results. Maintaining determinism is therefore an ongoing discipline,
            not a one-off architectural decision.
        </p>

        <h2><i class="fa-solid fa-lightbulb" aria-hidden="true"></i>Use Cases for the Result Set</h2>
        <ul>
            <li><strong>Precise RTP control</strong>: a pre-computed result pool ensures RTP converges tightly within a finite sample</li>
            <li><strong>Compliance audit</strong>: every result is traceable, replayable and verifiable</li>
            <li><strong>QA regression testing</strong>: replay with fixed seeds to ensure game logic changes do not affect result correctness</li>
            <li><strong>Demo presentation</strong>: prepare a representative sequence of results for demonstration scenarios</li>
        </ul>
        <h3>Supporting Multiple RTP Versions</h3>
        <p>
            The same game often needs to offer several RTP versions to meet the regulatory requirements of different markets.
            The traditional approach is to build a separate weight table for each version, at the cost of rerunning the full mathematical verification for every one,
            with the differences between versions scattered across multiple configuration files and maintenance cost rising linearly with the number of versions.
        </p>
        <p>
            The result set architecture offers another path: the underlying records are generated only once,
            and different RTP versions are simply <strong>different indexes and weight configurations over the same batch of records</strong>.
            Because each record's payout is already stored up front at encoding time,
            assembling a version with a target RTP is essentially a constrained weight-configuration problem:
            choosing, subject to the expected value equaling the target, a set of weights whose volatility characteristics come closest to the design intent.
        </p>
        <p>
            The direct benefit of doing it this way is that the <strong>game feel stays consistent across versions</strong>.
            Because every version draws from the same batch of boards, the board combinations, animation rhythm and special-feature trigger patterns the player sees are all identical;
            the only difference is the relative frequency of each kind of result. By comparison, rebuilding the weight table easily produces differences in feel between versions that are hard to explain.
        </p>

        <h2><i class="fa-solid fa-link" aria-hidden="true"></i>Relationship with Natural Probability</h2>
        <p>
            Every record in the result set comes from a genuine Spin result of the natural probability model, going through extract → encode → store.
            It does not change the game's mathematical model; it merely converts "real-time computation" into "pre-computed lookup".
            This means the result set's RTP, volatility, Hit Rate and other metrics are all strictly identical to those of the original natural probability model.
        </p>
        <p>
            This point deserves to be stated more precisely: <strong>the statistical properties of a single result pool are identical to those of the original model</strong>,
            and this is guaranteed by the generation process: records are sampled from the natural probability model according to its native distribution,
            so when the pool is large enough, the payout distribution inside the pool is a high-fidelity sample of the original model's distribution.
        </p>
        <p>
            And when multiple pools are combined by weight, the overall expected value is the weighted average of the pools' expected values,
            which is a tuning dimension deliberately retained by design. In other words, the result set architecture is not "changing the probability",
            it is <strong>choosing among verified distributions</strong>. Every board that gets drawn
            is a result the natural probability model would have produced anyway, with a probability entirely consistent with the model.
        </p>
        <p>
            To preserve this equivalence, two disciplines must be upheld at the generation stage:
        </p>
        <ul>
            <li><strong>The sampling must be unbiased</strong>: the records must faithfully reflect the original model's distribution, and extreme outcomes must not be filtered out to make the pool "look nicer", as that would directly destroy the tail characteristics</li>
            <li><strong>The sample size must be sufficient</strong>: the pool size should be derived backwards from the target precision, and for high-volatility games the required sample size is proportional to the square of the standard deviation, often far beyond intuitive estimates</li>
        </ul>
        <p>
            Uphold these two, and the result set genuinely remains nothing more than a <strong>storage and distribution form</strong> of natural probability,
            rather than a separate mathematical model of its own.
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
