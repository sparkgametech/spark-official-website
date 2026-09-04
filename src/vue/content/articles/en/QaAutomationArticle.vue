<template>
    <div class="blog-article">
        <h2>Automated Testing</h2>

        <h3>Deterministic Replay Testing</h3>
        <p>
            Automated testing occupies a central place in slot QA,
            and the first thing that must be solved for it to work at all is <strong>randomness</strong>:
            you cannot write stable assertions against a system whose outcomes are unpredictable.
            With <strong>deterministic replay</strong>,
            the test framework can inject a <strong>predefined sequence of random numbers</strong>,
            making the outcome of every spin fully predictable and reproducible.
        </p>
        <p>
            This means a test case can specify precisely a scenario such as "the first spin produces a three-Wild line,
            the second spin triggers the free game", and then verify that the game behaves correctly under those conditions.
            Deterministic replay is the only viable way to cover every boundary condition: waiting for natural randomness to produce a specific combination
            might take millions of spins, whereas an injected sequence reaches any desired scenario directly.
        </p>
        <p>
            For this mechanism to be reliable, the key is that <strong>every source of randomness must converge on a single entry point</strong>:
            as long as one place still draws directly from the system random number generator, replay will show deviations that cannot be explained.
            Random number acquisition should therefore be abstracted into a replaceable interface at the architecture stage,
            with the execution environment deciding whether to inject a real source or a predefined sequence.
            This is a textbook case of testing requirements feeding back into core design.
        </p>

        <h3>Continuous Integration and Automated Regression</h3>
        <p>
            Integrating tests into the <strong>CI/CD pipeline</strong> ensures that no code change breaks existing functionality:
        </p>
        <ul>
            <li><strong>Mathematical regression testing</strong>: every build runs a fast RTP recalculation (with a smaller sample size) to confirm the core mathematical logic has not changed</li>
            <li><strong>Functional regression testing</strong>: automatically executes all predefined deterministic test cases, covering the main game flows and boundary conditions</li>
            <li><strong>Contract testing</strong>: verifies the consistency of the client-server API contract, ensuring the interface specification has not been changed by accident</li>
        </ul>
        <p>
            In practice tests are <strong>tiered by cost</strong>: the fast tier on every commit must finish within a few minutes,
            the daily mid-weight tier covers the full set of functional cases,
            and mathematical verification of tens of millions of rounds or more is scheduled at release milestones or before submission for certification.
            Another frequently underrated point is <strong>the stability of the tests themselves</strong> —
            intermittent failures destroy the team's trust in the entire suite,
            and such cases should be handled as defects, tracking down and eliminating the residual sources of non-determinism.
        </p>

        <h3>Visual Regression Testing</h3>
        <p>
            <strong>Screenshot comparison</strong> is the core method of visual regression testing.
            The test framework captures a screenshot in a specific game state and compares it pixel by pixel against a baseline image,
            flagging it for manual review when the difference exceeds the tolerance threshold.
            This approach is especially good at detecting unintended UI shifts, font changes, animation glitches and other visual regressions.
        </p>
        <p>
            The prerequisite is that the frame itself is <strong>stably reproducible</strong>: fixed resolution,
            a locked animation timeline and capture at a designated frame — otherwise the results will be drowned in false positives.
            The tolerance threshold is usually tightened for critical regions and loosened for dynamic background areas.
        </p>

        <h3>Performance Benchmark Testing</h3>
        <p>
            Performance testing ensures the game runs smoothly on target devices:
        </p>
        <ul>
            <li><strong>Frame rate monitoring</strong>: in animation-heavy scenes (big-win celebrations, cascading wins), the frame rate should not drop below 30 FPS</li>
            <li><strong>Memory usage</strong>: memory consumption should stay stable after long play sessions and must not keep growing (memory leaks)</li>
            <li><strong>Load time</strong>: initial load and scene transitions must stay within an acceptable range — on mobile, ideally under 5 seconds</li>
            <li><strong>CPU utilization</strong>: CPU usage while idle should be minimized to avoid battery drain and heat</li>
        </ul>
        <p>
            These metrics should be evaluated by <strong>percentile</strong> rather than by average:
            a good average frame rate with severe drops in the tail feels like "it stutters now and then",
            and that tends to happen at exactly the critical moment of a big-win celebration.
            Benchmarks must also be tied to device tiers and tracked as trends across versions.
        </p>

        <h2>Compliance Testing and Third-Party Certification</h2>

        <h3>GLI-19 / BMM Testing Requirements</h3>
        <p>
            A slot game launching in a regulated market must pass an audit by an <strong>international certification body</strong>.
            <strong>GLI-19</strong> (Gaming Laboratories International's standard for interactive gaming technology)
            and <strong>BMM Testlabs</strong> are the industry's two mainstream certification bodies,
            and their testing covers the following key areas:
        </p>
        <ul>
            <li>Passing the statistical test suites for the RNG (random number generator)</li>
            <li>Consistency between the measured RTP and the declared RTP</li>
            <li>Correct implementation of the game rules and complete disclosure of player information</li>
            <li>Safety of error handling and interruption recovery</li>
            <li>Security of communication between client and server</li>
        </ul>
        <p>
            Beyond the common standards, different jurisdictions often add regional requirements,
            and these differences are best organized into an auditable checklist and supported through parameterization at the design stage.
        </p>

        <h3>RNG Audit Trail</h3>
        <p>
            A core requirement of compliance testing is a <strong>complete audit trail</strong>.
            The system must log every random value produced by an RNG call, and be able to use those logs to <strong>reproduce the outcome of any round exactly</strong>.
            Certification auditors will sample historical records at random, inject the same random number sequence and replay it,
            verifying that the result matches the original record exactly; any discrepancy causes certification to fail.
        </p>
        <p>
            This is the same capability as the deterministic replay described earlier, applied in two ways:
            during development it is used to construct test scenarios, during certification it is used to prove that results can be reconstructed.
            Replay capability should therefore be maintained as a first-class feature from the outset,
            and after every version change it must be verified that <strong>older records can still be replayed correctly</strong>.
        </p>

        <h3>Client-Server Isolation Verification</h3>
        <p>
            Certification bodies rigorously verify that <strong>the client cannot influence the generation of the game outcome</strong>.
            Testing covers:
        </p>
        <ul>
            <li>Game outcomes are computed entirely on the server, with the client responsible only for presentation</li>
            <li>No parameter sent by the client (stake amount, selections, etc.) can affect the RNG output</li>
            <li>The communication protocol does not leak future game outcomes</li>
            <li>The client cannot alter an already determined outcome by modifying a request</li>
            <li>Cross-game state isolation — data from one game cannot affect the outcome of another</li>
        </ul>
        <p>
            This kind of verification must be designed from an <strong>adversarial perspective</strong>: actively tampering with requests, replaying already completed requests,
            and attempting to change an already determined outcome at points that appear to offer a choice.
            When a game includes an interaction that lets the player choose, it must be confirmed that all choices are equivalent in outcome.
        </p>

        <h3>Certification Document Preparation</h3>
        <p>
            Applying for third-party certification requires not only passing the technical tests but also preparing a complete <strong>certification submission package</strong>:
        </p>
        <ul>
            <li><strong>Mathematics document (PAR sheet)</strong>: the complete probability table, paytable, RTP derivation, and every possible winning combination with its probability</li>
            <li><strong>Game rules document</strong>: a detailed description of the game rules, including the trigger conditions and settlement logic of every special feature</li>
            <li><strong>Technical architecture document</strong>: RNG implementation details, client-server communication architecture, data storage strategy</li>
            <li><strong>Test report</strong>: the complete results of internal testing, including simulation data, statistical analysis results and quality metrics</li>
        </ul>
        <p>
            These documents must <strong>correspond strictly</strong> to the version actually delivered:
            any modification after submission may require resubmission, which makes version freeze a critical discipline;
            a mismatch between documentation and implementation is the most common cause of certification round trips.
        </p>
        <p>
            The certification process typically takes several weeks to several months. The certification body may raise questions or request corrections during review,
            and the development team must respond promptly and supply supplementary material. Once certified, the game receives a formal compliance certificate,
            which serves as its passport into the target market. The best strategy for reducing the number of round trips
            is to treat compliance requirements as <strong>an input to the design stage</strong> rather than a checklist item before delivery.
        </p>
        <p>
            Slot QA is a piece of systems engineering spanning four dimensions: <strong>mathematics, engineering, experience and compliance</strong>.
            This article focuses on automation and compliance certification, while the methods for verifying the mathematical model,
            and the practice of functional and player-feel testing, are covered in the other two articles of this series.
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
