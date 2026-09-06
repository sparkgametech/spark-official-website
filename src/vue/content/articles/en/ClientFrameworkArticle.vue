<template>
    <div class="blog-article">
        <h2>What Problems Does a Slot Game Client Have to Solve?</h2>
        <p>
            Building the client for a slot game is far more than "a few reels spinning on screen."
            From a technical standpoint, a mature slot client has to solve at least the following core challenges:
        </p>
        <ul>
            <li><strong>Smooth reel animation</strong>: the reels are the most immediate part of the player's experience, and they must hold a stable, natural spin at 60fps, covering acceleration, deceleration, bounce and other dynamic transitions</li>
            <li><strong>Real-time server communication</strong>: every bet requires an immediate data exchange with the server, and from sending the request to receiving the result to handling disconnect-and-reconnect, the communication layer has to be stable and fault-tolerant</li>
            <li><strong>Large-scale asset management</strong>: a single game may contain hundreds of images and dozens of animations and sound effects, so how they are loaded in stages, cached and released from memory directly affects load time and runtime performance</li>
            <li><strong>Localization and multiple languages</strong>: a game aimed at the global market needs to support dozens of languages, which is not only text translation but also layout direction, font substitution and asset swapping per locale</li>
            <li><strong>A high degree of reusability</strong>: the market demands a steady stream of new games, and if every title were built from scratch the cost would be impossible to control. The architecture has to support "build the core once, reuse it many times"</li>
        </ul>
        <p>
            These challenges are not independent of one another. This article first deals with the two most fundamental structural
            questions: how the code is layered, and how the flow of a single round is described in an orderly way.
        </p>

        <h2>A Layered Framework: Build Once, Reuse Many Times</h2>
        <p>
            To keep code quality and development efficiency high while continuously shipping new games,
            we organize the entire client system with a <strong>three-layer architecture</strong>:
        </p>
        <MermaidDiagram id="layer-arch" :chart="layerArchChart"/>
        <h3>General Engine Layer</h3>
        <p>
            The bottom layer holds capabilities that have nothing to do with the genre: the render pipeline, the asset loader, audio playback,
            protocol encapsulation, the event system, timers and animation tweening utilities, and so on.
            Code at this layer applies to any kind of game, not just slots.
        </p>
        <h3>Slot Framework Layer</h3>
        <p>
            The middle layer encapsulates the logic common to the slot genre: the reel engine, the state machine, win-presentation scheduling,
            payline rendering, the autoplay controller, the history panel, and so on.
            Every slot game shares the code in this layer, so when the framework fixes a problem or improves performance, all games benefit at once;
            the more games there are, the greater the return on each improvement.
        </p>
        <h3>Game Application Layer</h3>
        <p>
            Only the top layer contains what is unique to each game: themed art assets, special mechanics (expanding wilds,
            progressive jackpot trigger conditions, and the like), custom animation and audio.
            When building a new game, engineers only need to focus on this layer, which dramatically shortens the development cycle.
        </p>
        <h3>What Should Sink Downward?</h3>
        <p>
            The place a layered architecture most easily breaks down is deciding which layer a new piece of logic belongs to. We follow three criteria:
        </p>
        <ul>
            <li><strong>Number of repetitions</strong>: a piece of logic should only sink downward when it shows up again in a third game. Once is a coincidence, twice is a pattern, three times is a shared requirement</li>
            <li><strong>Whether it depends on the theme</strong>: as soon as the logic internally needs to know theme-specific information (symbol types, scene configuration, dedicated animation names), it does not belong in the framework layer. A lower layer must never query an upper one</li>
            <li><strong>Rate of change</strong>: a change in a lower layer affects every game, so logic that changes frequently should stay in the upper layer under observation even if it does repeat</li>
        </ul>
        <h3>How the Architecture Evolved</h3>
        <p>
            This layered architecture was not in its finished form from day one; it went through several stages of evolution:
        </p>
        <ul>
            <li><strong>Stage one, convention-based constraints</strong>: layers were distinguished by an agreed-upon way of organizing things, but with no enforced isolation, cross-layer coupling appeared easily</li>
            <li><strong>Stage two, module namespaces</strong>: introducing a modular namespace mechanism made the boundaries between layers explicit and constrained the dependency relationships. Cross-layer references went from "discouraged" to "impossible"</li>
            <li><strong>Stage three, a shared component library</strong>: common UI components (buttons, dialogs, progress bars, number rollers and so on) were extracted into a standalone shared component library that new games reference directly, ensuring consistent visuals and behavior</li>
        </ul>

        <h2>The Game State Machine: The Full Lifecycle of One Spin</h2>
        <p>
            Each round of a slot game looks simple (press the button, the reels spin, the result appears), but the state management behind it is genuinely complex.
            We use a <strong>finite state machine</strong> to manage the full lifecycle of a round:
        </p>
        <MermaidDiagram id="spin-lifecycle" :chart="spinLifecycleChart"/>
        <h3>Why Not Flags and Callbacks?</h3>
        <p>
            The most intuitive approach is to track the current situation with boolean flags: whether it is spinning, whether the result has arrived, whether the win animation is playing.
            But five independent flags already yield thirty-two combinations, the vast majority of which are illegal states that should not exist, and yet nothing in the code explicitly forbids them.
            A state machine narrows the legal states down to a finite, enumerable set and hard-codes the transition rules.
            A transition that should not happen is intercepted at that moment, rather than being discovered only after the player sees something wrong on screen.
        </p>
        <h3>Responsibilities of Each Stage</h3>
        <ul>
            <li><strong>Start a new round</strong>: lock the controls, send the bet request, update the bet-value display. The lock must be in place before the request goes out, or there is a risk of a duplicate bet</li>
            <li><strong>Start the reels</strong>: start the reel animation column by column according to the configured delay interval, so the spin sweeps across in a left-to-right wave</li>
            <li><strong>Keep spinning</strong>: the reels turn at a constant speed while waiting for the server result. Two situations have to be handled: "the result arrives early" and "the result is delayed." The former requires holding a minimum visual spin duration, the latter requires extending indefinitely without looking wrong</li>
            <li><strong>Stop the reels and write in the result</strong>: write the symbol matrix returned by the server into each reel's target position, triggering the column-by-column stop animation</li>
            <li><strong>Win presentation</strong>: play the corresponding animation and audio based on the win information, which may include line-by-line presentation, full-screen effects, big-win celebration animations, and so on</li>
            <li><strong>Settlement</strong>: update the value displays, record the outcome of this round, unlock the controls, and get ready for the next round</li>
        </ul>
        <h3>Extensibility of the State Machine</h3>
        <p>
            The design of the state machine allows <strong>custom logic to be inserted</strong> between any two stages.
            For example, if a particular game needs to trigger a "symbol transformation" animation after the reels stop, it only has to register an extra
            state handler between "stop the reels and write in the result" and "win presentation," with no changes to framework-layer code at all.
        </p>
        <p>
            This mechanism relies on the <strong>observer pattern</strong>: every stage emits events on entry and exit, and an upper layer that subscribes can insert its own node.
            The key is that an inserted node must be able to <strong>signal completion asynchronously</strong>. The state machine waits for it to report done before advancing,
            so a custom animation several seconds long can be embedded into the lifecycle naturally, without the framework layer needing to know in advance that it exists.
        </p>
        <h3>Multiple Flows and Exceptional Interruptions</h3>
        <p>
            Slots frequently involve <strong>switching between multiple flows</strong>: transitions between the main game and free games,
            entering and exiting special feature modes. We give each flow its own state machine instance,
            with the instances communicating through explicit enter/exit events to avoid state contamination between flows.
        </p>
        <p>
            The lifecycle does not always run to completion smoothly either: the player may hit quick stop partway through, and the network may drop while waiting for the result.
            So every stage has to mark whether it is <strong>interruptible</strong>: presentation stages can usually be skipped,
            while stages involving data consistency must run to completion. A skipped stage is not simply thrown away but told to "finish immediately,"
            which guarantees that the screen after the skip matches what the normal flow would have produced.
        </p>

        <p>
            Layering and the state machine form the skeleton of the client. On top of that skeleton there are two more topics worth going into: the reels' animation curves and stop control,
            and the supporting systems for communication, assets and interface layering. We cover each of them in the other two articles of this series.
        </p>

        <p style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #dee2e6; color: #666; font-style: italic;">
            Need technical support? Feel free to contact us for more information.
        </p>
    </div>
</template>

<script setup>
import MermaidDiagram from '/src/vue/components/generic/MermaidDiagram.vue'

const layerArchChart = `flowchart TD
    A[Game Application Layer<br/>Themed Assets / Special Mechanics / Custom Animation] --> B[Slot Framework Layer<br/>Reel Engine / State Machine / Win Presentation / Paylines]
    B --> C[General Engine Layer<br/>Render Pipeline / Asset Loading / Audio / Communication / Event System]`

const spinLifecycleChart = `flowchart TD
    A[Start a New Round] --> B[Start the Reels]
    B --> C[Keep Spinning]
    C --> D[Stop the Reels and Write In the Result]
    D --> E[Win Presentation]
    E --> F[Settlement]
    F --> A`
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
