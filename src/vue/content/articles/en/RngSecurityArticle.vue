<template>
    <div class="blog-article">
        <h2>Why Does RNG Security Matter So Much?</h2>
        <p>
            The <strong>Random Number Generator (RNG)</strong> is the cornerstone of fairness in gaming.
            Every slot machine spin, every card dealt, every dice outcome depends on the random numbers the RNG produces.
            If the RNG is biased, predictable, or open to manipulation, the fairness of the entire game cannot be guaranteed.
        </p>
        <p>
            In regulated markets, the RNG must pass a rigorous audit by a third-party certification body (such as <strong>GLI</strong> or <strong>BMM</strong>)
            to confirm that it meets statistical standards of randomness. This is not merely a technical requirement; it is a regulatory threshold for launching a compliant game.
        </p>
        <p>
            To understand the design trade-offs behind an RNG, you first need the concept of a <strong>threat model</strong>.
            The adversary we assume is not a player guessing at random, but an opponent with full reverse-engineering capability, able to collect large samples of outcomes over long periods,
            and possibly in possession of part of the program logic. Under that assumption, any design that is "secure because nobody can guess it" simply does not hold;
            the security of randomness must come from the mathematical structure itself, not from information asymmetry.
            This is why every security decision should rest on the premise that the attacker knows the algorithm and lacks only the keys and the internal state.
        </p>

        <h2>Why Ordinary Pseudorandom Numbers Are Not Enough</h2>
        <p>
            The random functions built into most programming languages are designed for <strong>speed and statistical uniformity</strong>, not for security.
            Take the common linear congruential generator (LCG): its next state is obtained from the current state with a single multiplication and addition,
            so an attacker who observes only a handful of consecutive outputs can solve for the internal parameters and predict the entire future sequence.
            Even the Mersenne Twister, whose statistical quality is excellent, requires only a few hundred consecutive outputs to be collected
            before the full internal state can be recovered and the whole sequence reconstructed.
        </p>
        <p>
            The key point is this: <strong>passing statistical tests is not the same as being unpredictable</strong>.
            A sequence can perform flawlessly on the chi-square test and the runs test and still be entirely predictable.
            Statistical uniformity measures whether the output "looks random"; cryptographic security measures whether the future can be derived from past outputs.
            These are two independent properties. Gaming needs both, and neither can be omitted.
        </p>

        <h2>Cryptographically Secure Pseudorandom Number Generators (CSPRNG)</h2>
        <p>
            The RNG in a gaming product must use a <strong>cryptographically secure pseudorandom number generator (CSPRNG)</strong>,
            not the standard random function provided by a general-purpose language. The key differences are:
        </p>
        <ul>
            <li><strong>Unpredictability</strong>: even with knowledge of all previous outputs, the next value cannot be predicted</li>
            <li><strong>Backtracking resistance</strong>: even with knowledge of the current state, previous outputs cannot be derived</li>
            <li><strong>Entropy source quality</strong>: randomness is drawn from the entropy pool maintained by the operating system kernel, rather than from predictable seeds such as timestamps</li>
        </ul>
        <p>
            In practice, we use the cryptographic random source provided by the operating system (on Linux, a system call such as <code>getrandom()</code>;
            on other platforms, the corresponding kernel randomness interface) as the underlying source of random numbers, so that every random number carries cryptographic-grade security.
            Not implementing the algorithm ourselves, and pushing the trust boundary as far as possible toward the operating system and the hardware, is itself an important security design principle:
            the kernel's randomness subsystem has undergone extensive public review and long-term field validation, and is far more reliable than any homegrown alternative.
        </p>

        <h2>Obtaining Entropy and Assessing Its Quality</h2>
        <p>
            A CSPRNG merely "stretches" a small amount of true randomness into a large volume of unpredictable bits; it does not create randomness on its own.
            Real randomness comes from an <strong>entropy source</strong>: physically unpredictable events.
            Modern operating systems continuously gather entropy from several independent channels: hardware random instructions on the CPU, timing jitter in interrupts,
            completion times of disk and network I/O, and a variety of microscopic timing differences that are hard to observe externally.
            These raw samples first enter the entropy pool and are hashed and mixed before being made available.
        </p>
        <p>
            When assessing the quality of an entropy source, the metric that really matters is <strong>min-entropy</strong>
            (the entropy corresponding to the probability of the single most likely value), rather than Shannon entropy in the average sense.
            This is the conservative estimate, because an attacker guessing will always try the most likely value first. The relevant assessment methods are fully defined in
            <strong>NIST SP 800-90B</strong>, which covers IID testing and a family of min-entropy estimators.
        </p>
        <p>
            In practice there are several easily overlooked entropy-source risks that deserve consideration at design time:
        </p>
        <ul>
            <li><strong>Entropy starvation early in boot</strong>: right after startup, the entropy pool has not yet accumulated sufficient randomness,
                and random numbers obtained at that moment may be of inadequate quality. The correct approach is to use an interface that blocks until the pool is ready, rather than degrading in order to avoid latency</li>
            <li><strong>Entropy scarcity in virtualized environments</strong>: virtual machines lack direct hardware interrupt sources, and entropy accumulates far more slowly than on physical machines;
                where necessary, an entropy-passing mechanism from the virtualization layer must make up the shortfall</li>
            <li><strong>State duplication caused by image cloning</strong>: when multiple running instances are cloned from the same system image,
                if the entropy pool state is copied along with it, several instances may produce identical random sequences in the early stages of startup</li>
            <li><strong>The risk of trusting a single source</strong>: no single hardware random source should be relied upon exclusively;
                mixing multiple sources ensures that the unpredictability of the overall output still holds even if the quality of one channel degrades</li>
        </ul>

        <h2>Eliminating Modulo Bias: Rejection Sampling</h2>
        <p>
            When we need a random integer in the range <code>[0, max)</code>, the most intuitive approach is <code>rand() % max</code>.
            This, however, introduces <strong>modulo bias</strong>: when the upper bound of the random number is not divisible by max,
            some outcomes occur with slightly higher probability than others.
        </p>
        <p>
            The mathematical cause of the bias is quite intuitive. Suppose the underlying random number takes values from <code>0</code> to <code>N-1</code>, that is N equally probable values,
            and we want to map them onto <code>0</code> through <code>max-1</code>. If N is not divisible by max,
            then dividing N by max leaves a remainder of <code>r = N mod max</code> "extra" values,
            and those extra values are allocated to the first r outcomes. As a result, each of the first r outcomes corresponds to
            <code>⌊N/max⌋ + 1</code> raw values while the remaining outcomes correspond to only <code>⌊N/max⌋</code>,
            so the former occur with systematically higher probability.
        </p>
        <p>
            An extreme miniature example makes this easiest to see: if the raw random number has only ten possible values, <code>0~9</code>, and is mapped onto three outcomes,
            then 0, 1 and 2 each take a share, with the first two taking the larger one: outcomes 0 and 1 each have probability 4/10, while outcome 2 has only 2/10.
            This bias does not vanish as the number of samples grows; on the contrary, a large sample lets statistical tests pinpoint it precisely.
        </p>
        <p>
            Although the bias is minuscule when max is far smaller than the range of the random number, in gaming any statistical non-uniformity can become an audit risk.
            More importantly, this bias is <strong>structural rather than random</strong>: it has a definite direction, it accumulates, and it can be reverse-engineered and exploited.
            We therefore use <strong>rejection sampling</strong> to eliminate the bias entirely:
        </p>
        <div class="formula-block">
            <code>threshold = MaxUint64 - (MaxUint64 % max)<br/>
do {<br/>
&nbsp;&nbsp;value = crypto_rand_uint64()<br/>
} while (value >= threshold)<br/>
result = value % max</code>
        </div>
        <p>
            The principle of this algorithm is to discard exactly those random numbers that would cause bias (the values falling in the incomplete final max-sized interval),
            keeping only the ones that yield a perfectly uniform distribution. The rejection probability is extremely low (less than <code>max / 2^64</code>),
            so the performance impact is negligible, while a <strong>mathematically perfect uniform distribution</strong> is guaranteed.
        </p>

        <h2>Seed Management and Collision Prevention</h2>
        <p>
            On a highly concurrent game server, managing the RNG seed is another critical security point.
            If two players' RNGs use the same seed, they will produce the same sequence of game outcomes.
        </p>
        <p>
            To prevent seed collisions, we apply the following strategies:
        </p>
        <ul>
            <li><strong>Mixing multiple entropy sources</strong>: the seed is composed from several sources combined, including system time, an incrementing counter, and hardware random numbers</li>
            <li><strong>Atomic increment protection</strong>: an atomically incremented prime factor guarantees that seeds are never repeated even when many RNG instances are created within a very short interval</li>
            <li><strong>Independent instances</strong>: each game session uses its own RNG instance, so no state is shared across players</li>
        </ul>
        <p>
            A more complete way to think about it is to treat the seed as a sensitive asset with a <strong>lifecycle</strong>, rather than as a one-off initialization parameter.
            That lifecycle can be divided roughly into four stages, each with a principle that must be upheld:
        </p>
        <ul>
            <li><strong>Generation</strong>: the seed must carry sufficient entropy length. If the seed space is only 32 bits,
                then even with a flawless algorithm an attacker need only enumerate around four billion possibilities to recover the entire sequence;
                security strength is determined by the weakest link, and the seed is often that link</li>
            <li><strong>Use</strong>: the seed exists only in the memory of the execution environment that produced it; it is not passed across processes, not written into configuration,
                and never appears as an input or output parameter of any interface</li>
            <li><strong>Rotation</strong>: long-running instances should periodically draw fresh randomness from the entropy source and inject it into the internal state,
                so that a single state is not exposed to prolonged observation and analysis. This also provides <strong>forward secrecy</strong>:
                even if the current state were to leak, previously generated sequences still cannot be reconstructed</li>
            <li><strong>Destruction</strong>: once a session ends, the associated state should be cleared from memory as soon as possible,
                and it must never appear in any log, error stack trace, or debug output.
                Logs accidentally leaking internal state is one of the most common and most easily overlooked classes of vulnerability in practice</li>
        </ul>
        <p>
            There is one point here that is easily misunderstood: <strong>an unpredictable seed is not the same as a non-repeating seed</strong>.
            Under high concurrency, two instances can still collide with very small probability even when each seed comes from a good entropy source.
            So beyond quality assurance we also need a structural guarantee of uniqueness, which is precisely the purpose of folding an atomically incremented counter into the seed:
            it supplies no randomness, but it supplies a deterministic guarantee of non-repetition, complementing the unpredictability of the entropy source.
        </p>

        <h2>RNG Audit Trail</h2>
        <p>
            Compliance requires every RNG call to be traceable and replayable. In our system,
            every random number the RNG produces is written to the audit log:
        </p>
        <ul>
            <li><strong>Complete recording</strong>: the full sequence of random numbers used by each round is preserved</li>
            <li><strong>Deterministic replay</strong>: injecting the same sequence of random numbers reproduces the outcome of any round exactly</li>
            <li><strong>Independent verification</strong>: auditors can independently verify that each round's outcome is consistent with the recorded random numbers</li>
        </ul>
        <p>
            This mechanism not only satisfies compliance requirements but is also an important QA testing tool: by injecting a predefined sequence of random numbers,
            precise deterministic tests can be run that cover every boundary condition.
        </p>
        <p>
            The real value of an audit trail lies in <strong>traceability</strong>: when a dispute arises, can the complete causal chain of that moment be reconstructed?
            To achieve this, the recorded fields must be sufficient to reproduce the outcome independently after the fact, without depending on the execution environment of that moment.
            In practice, a record with full traceability must cover at least the following categories of information:
        </p>
        <ul>
            <li><strong>Sequencing markers</strong>: a monotonically increasing sequence number and a timestamp, used to establish the absolute order of events.
                In a distributed environment, wall-clock time alone can appear out of order because of clock skew; the sequence number is the reliable basis for ordering</li>
            <li><strong>The random number sequence itself</strong>: every raw random value consumed by the round, and the order in which they were drawn.
                The ordering information matters as much as the values; if the order is scrambled, the outcome cannot be reproduced</li>
            <li><strong>Consumption context</strong>: what each random number was used to decide (for example, whether it determined a symbol or a multiplier),
                along with the value range in effect at the time. Without this layer, replay cannot map values back to the correct decision points</li>
            <li><strong>Configuration version identification</strong>: the probability table version and mathematical model version in effect at the time.
                Once configuration is updated, replaying an old round under the new configuration necessarily yields the wrong result; version markers are a precondition for replay correctness</li>
            <li><strong>Outcome snapshot</strong>: the final computed outcome and payout determination, serving as the reference value for replay comparison</li>
            <li><strong>Integrity protection</strong>: a hash computed over the record content and chained together, so that any subsequent tampering breaks the consistency of all following records.
                An audit trail that can be modified without a trace loses its meaning as evidence</li>
        </ul>
        <p>
            The guiding design principle is to <strong>record only what is needed to reproduce the outcome, and never the internal state</strong>.
            The audit log must be detailed enough to verify fairness, yet not so detailed that it leaks the internal state of the RNG.
            The line between those two requirements is exactly where audit trail design demands the most careful judgment.
        </p>

        <h2>Preventing Client-Side Manipulation</h2>
        <p>
            Another critical dimension of RNG security is <strong>ensuring that the client cannot influence the random outcome</strong>.
            The design principle here is unambiguous: <strong>the client is an untrusted execution environment</strong>.
            All code running on a player's device can be decompiled, modified and replayed;
            all data arriving from the client should be treated as input an attacker can construct at will.
            The correct architecture is therefore not "verify that the client did not cheat" but "give the client no say whatsoever in the computation path of the outcome".
            The client is only responsible for presenting the outcome the server has already determined, and the playback order of animations and sound effects takes no part in any determination.
        </p>
        <p>
            On that premise, our security audit framework covers the following checkpoints:
        </p>
        <ul>
            <li><strong>N1 Parameter isolation</strong>: any parameter submitted by the client (such as bet amount or selected paylines)
                does not affect the generation of the random outcome. The spin result is computed independently on the server</li>
            <li><strong>N2 Probability table authority</strong>: switching the probability table is decided solely by server-side logic;
                the client cannot trigger a probability table change</li>
            <li><strong>N4 Cross-round state protection</strong>: the client cannot write cross-round state data,
                preventing manipulation of subsequent outcomes by modifying game state</li>
            <li><strong>N5 Seed origin verification</strong>: confirming that the RNG seed is not supplied by the client,
                so players cannot predict outcomes by controlling the seed</li>
            <li><strong>N6 Concurrency safety</strong>: verifying that when multiple players play simultaneously,
                there is no shared mutable state that could cause a race condition</li>
        </ul>

        <h2>GLI / BMM Certification Standards</h2>
        <p>
            To pass <strong>GLI-19</strong> (the technical standard for interactive gaming systems) or <strong>BMM</strong> certification,
            an RNG must satisfy the following statistical tests:
        </p>
        <ul>
            <li><strong>Chi-square test</strong>: verifies the uniformity of the output distribution</li>
            <li><strong>Serial correlation test</strong>: ensures that no correlation exists between consecutive outputs</li>
            <li><strong>Runs test</strong>: verifies that the pattern of consecutive identical values matches random expectation</li>
            <li><strong>Poker test</strong>: verifies the distribution of digit combinations</li>
            <li><strong>Diehard / NIST test suites</strong>: a series of more rigorous statistical randomness tests</li>
        </ul>
        <p>
            Understanding the <strong>role</strong> of these tests matters just as much. A statistical test is by nature a tool of <strong>refutation, not proof</strong>:
            it can tell you that a sequence clearly does not look random, but it can never prove that a sequence must be random.
            Passing the full suite only means "no evidence of deviation from the randomness hypothesis was found," not that the RNG is secure.
            The predictable generators mentioned earlier likewise sail through the vast majority of statistical tests.
        </p>
        <p>
            Another common misconception in practice is treating test results as a binary pass or fail.
            At a significance level of α, even a perfectly healthy RNG is expected to produce roughly an α fraction of "unexpected failures" per hundred test runs.
            The correct way to read the results is therefore to look at the distribution of the p-values themselves: when the null hypothesis holds,
            p-values should be uniformly distributed between 0 and 1. If the p-values of a particular test persistently cluster in the extremes,
            that is the genuine warning sign; conversely, an isolated one-off failure is an expected random phenomenon,
            and overreacting to it only leads to misjudging a healthy system.
        </p>
        <p>
            Our RNG implementation consistently passes all of the above tests in internal testing and regularly undergoes independent audits by third-party certification bodies,
            maintaining the highest standard of randomness throughout the product lifecycle.
        </p>

        <h2>Layered Security Architecture</h2>
        <p>
            In summary, our RNG security architecture is organized into three layers:
        </p>
        <ul>
            <li><strong>Lower layer (cryptographic security)</strong>: CSPRNG plus rejection sampling, guaranteeing the quality of every random number</li>
            <li><strong>Middle layer (system security)</strong>: seed management, instance isolation and audit trails, preventing vulnerabilities at the system level</li>
            <li><strong>Upper layer (protocol security)</strong>: client isolation, parameter validation and state protection, preventing external manipulation</li>
        </ul>
        <p>
            This multi-layer defensive design ensures that even if one layer fails, the others still provide protection,
            establishing a solid and reliable framework for guaranteeing fairness.
        </p>
        <p>
            Layered defense works because the <strong>failure modes of the layers are mutually independent</strong>.
            If all three layers of protection rest on the same assumption, then what appears to be three layers is in reality still one:
            the moment that shared assumption is broken, all three fall at once. When designing, therefore,
            we deliberately aimed each layer at a different class of threat: the lower layer guards against mathematical predictability and distributional bias,
            the middle layer against state contamination at the implementation and concurrency level, and the upper layer against active manipulation attempts from outside.
            Only because their underlying assumptions do not overlap do the three constitute genuine defense in depth.
        </p>
        <p>
            Finally, it is worth emphasizing that the quality of randomness is <strong>unobservable</strong>.
            A defective RNG shows nothing unusual in the outcome of any single round; it reveals itself only in the statistical distribution of a large sample.
            This means we cannot rely on after-the-fact manual inspection to catch problems, and must rely instead on the combination of three things: correctness at design time,
            automated and continuous statistical monitoring, and a complete audit trail.
            Fairness is not a property that holds forever after one pre-launch check; it is a commitment that must be verified continuously throughout the product lifecycle.
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
