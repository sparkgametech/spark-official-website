<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-list-check" aria-hidden="true"></i>Functional Testing</h2>
        <p>
            The job of functional testing is to confirm that the game logic matches the design across <strong>every possible execution path</strong>,
            and that state correctness is preserved even under abnormal conditions.
        </p>

        <h3>Game State Machine Coverage</h3>
        <p>
            The flow of a slot game can be modeled as a <strong>finite state machine</strong>,
            covering states such as the base game, free games, bonus rounds and big-win celebrations.
            Functional testing must cover <strong>every possible state transition path</strong>, including:
        </p>
        <ul>
            <li>Base game → free game → base game (the normal flow)</li>
            <li>Retriggering a free game from within a free game</li>
            <li>Base game → bonus round → base game</li>
            <li>Triggering a bonus round from within a free game (where the design allows it)</li>
            <li>Error-recovery paths from any state</li>
        </ul>
        <p>
            The value of drawing the state machine explicitly is that it turns <strong>coverage into a quantifiable metric</strong>.
            Coverage comes in levels: entering every state is only the minimum bar,
            traversing every legal transition edge is the basic threshold;
            and the place bugs hide most readily is in <strong>combinations of consecutive transitions</strong>:
            two features that each test correctly in isolation can still fail when triggered back to back because of residual state.
            Beyond that, you must actively attempt <strong>transitions that should not happen</strong>,
            confirming that the system explicitly rejects them rather than entering an undefined state.
        </p>

        <h3>Boundary Condition Testing</h3>
        <p>
            Boundary conditions are where bugs hide most easily. Key scenarios include:
        </p>
        <ul>
            <li><strong>Maximum stake + maximum win</strong>: verifying that the highest possible prize does not exceed the system's numeric range (integer overflow risk)</li>
            <li><strong>Zero balance</strong>: confirming correct behavior when the balance is insufficient: a spin cannot be started and the message is clear</li>
            <li><strong>Balance exactly equal to the stake</strong>: whether the deduction and prize settlement of the final spin are correct</li>
            <li><strong>Cross-time-zone operation</strong>: whether the timestamps in the game record are correct when server time and client time disagree</li>
        </ul>

        <h3>Boundary Scenarios for Interruption and Recovery</h3>
        <p>
            An interruption can occur at <strong>any point in the lifecycle of a round</strong>,
            and the correct behavior differs completely depending on when it happens, so testing should divide a round into clearly defined phases:
        </p>
        <ul>
            <li><strong>Request sent, server has not yet received it</strong>: the round should be treated as never having happened, and the stake must not be deducted</li>
            <li><strong>Server has settled, response has not yet arrived</strong>: the existing result must be retrieved, and a new round must not be generated</li>
            <li><strong>Response has arrived, animation is playing</strong>: the final result should be presented directly, or playback resumed from the point of interruption</li>
            <li><strong>Free game in progress</strong>: remaining spin count, accumulated prizes and cached state must all be fully restored</li>
        </ul>
        <p>
            Together these scenarios point to a single principle: <strong>the outcome of a round must be determined solely by the server and persisted there</strong>,
            and client-side recovery is merely the right to re-present an already existing result.
            You should also verify that the result stays consistent after several consecutive interruptions.
        </p>

        <h3>Special Feature Testing</h3>
        <p>
            As mechanics grow richer, the test coverage required for special features keeps widening:
        </p>
        <ul>
            <li><strong>Cascading wins</strong>: winning symbols are removed and new symbols drop in, so the settlement and animation correctness of every cascade level must be verified</li>
            <li><strong>Hold &amp; spin</strong>: a mechanic where specific symbols lock and the rest respin, so the persistence and restoration of the locked state must be tested</li>
            <li><strong>Megaways</strong>: the number of symbols on each reel varies randomly, so win-line calculation must be verified across every possible arrangement</li>
            <li><strong>Buy feature</strong>: an option to enter a special feature directly, so the consistency between the deduction and the feature trigger must be verified</li>
        </ul>

        <h3>Multi-Resolution and Multi-Device Verification</h3>
        <p>
            The same game runs on devices that differ enormously in aspect ratio, pixel density and performance,
            so a set of <strong>representative device matrices</strong> must be defined first, then verified point by point:
        </p>
        <ul>
            <li>Whether the layout reflows correctly after switching between landscape and portrait, without interrupting the game state in progress</li>
            <li>Whether the safe areas of notched screens are correctly avoided, leaving key controls unobstructed</li>
            <li>Whether the animation-degradation strategy takes effect on low-end devices without affecting settlement logic</li>
        </ul>

        <h3>Multi-Currency and Multi-Language Verification</h3>
        <p>
            A game aimed at international markets needs to support multiple currency units and languages. Testing focuses on:
            the precision of value conversion (especially between units with different decimal places),
            whether text overflows UI elements in different locales,
            and whether number formatting follows regional conventions (such as differences in thousands separators).
        </p>

        <h2><i class="fa-solid fa-hand-pointer" aria-hidden="true"></i>Player-Feel Testing</h2>

        <h3>Live Player Testing</h3>
        <p>
            Passing mathematical verification only means the game is theoretically correct,
            but <strong>"mathematically correct" is not the same as "feels good"</strong>.
            Player-feel testing (playtesting) invites real players to actually play and evaluate each aspect subjectively.
            Test players are asked to record the following observations:
        </p>
        <ul>
            <li>Does the distribution of wins "feel" reasonable? Are there long "drought" stretches with no wins at all?</li>
            <li>Is a big win exciting enough? Do the celebration animation and sound effects match the magnitude of the prize?</li>
            <li>Is the overall pacing of the game comfortable? Is the spin speed too fast or too slow?</li>
            <li>Does the trigger frequency of the free game create a sense of anticipation?</li>
        </ul>

        <h3>Designing the Rating Scale for Feel Evaluation</h3>
        <p>
            The biggest risk in player-feel testing is producing a pile of subjective descriptions that cannot be compared or tracked.
            The remedy is to <strong>structure the evaluation into a rating scale</strong>:
            do not just ask "was it fun", but break it into independent dimensions such as pacing, anticipation, win satisfaction and audiovisual coherence;
            attach a concrete behavioral description to every score level; mandate the same number of rounds played and the same starting conditions;
            and fully record the sequence of wins each participant actually encountered, so that scores can be mapped back to a concrete play history.
            Heavy and casual players rate things very differently, so the sample background needs to be stratified as well.
        </p>

        <h3>The Feel of the Win Distribution</h3>
        <p>
            This is the most subtle part of player-feel testing. At the same 96.5% RTP,
            different prize distribution patterns produce completely different subjective impressions:
            concentrating most of the RTP in a handful of large prizes is mathematically perfectly correct,
            yet an average player may feel frustrated by long stretches without a win.
            Player-feel testing must evaluate <strong>whether the prize distribution matches the expectations of the target player group</strong>.
        </p>

        <h3>Animation Timing and Satisfaction</h3>
        <p>
            The duration of the spin animation, the speed at which the win counter ticks up and the length of the celebration screen
            are fine-grained parameters that all significantly affect satisfaction. Player-feel testing pays particular attention to the rhythm of the reels stopping,
            whether the duration of the big-win animation is right (too short and it does not feel important, too long and it becomes tiresome),
            and overall audiovisual synchronization.
        </p>

        <h3>From Subjective Feedback to Actionable Adjustments</h3>
        <p>
            Feedback that stops at "it doesn't feel satisfying enough" is of no practical help to the development team.
            The key is to establish a translation process <strong>from feeling back to parameters</strong>:
            first map the vague complaint onto a scale dimension, then link it to a small number of adjustable parameters.
            "The big win isn't exciting enough", for example, may map to the duration of the celebration animation, the acceleration curve of the counter, or the layering of the sound effects;
            whereas "the droughts are too long" is a distribution problem and requires going back to the mathematical model to examine the density of small prizes.
            Every adjustment should be recorded as a <strong>testable hypothesis</strong> and confirmed in the next round using the same scale.
        </p>

        <h3>Competitive Comparison Analysis</h3>
        <p>
            Player-feel testing usually includes a <strong>competitive comparison segment</strong>:
            test players also play competing games of the same type, then evaluate them side by side.
            This helps reveal the strengths and weaknesses of your own product at the experience level,
            ensuring the game is competitive in the market. Comparison dimensions include visual quality, audio quality,
            game pacing, the win experience, and the overall strength of the urge to "play one more time".
        </p>
        <p>
            Function and feel together make up the complete verification of the implementation layer.
            As for the mathematical model verification methods that underpin all of it,
            and how these tests are executed automatically at scale and how they pass third-party certification audits,
            those are discussed in the other two articles of this series.
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
