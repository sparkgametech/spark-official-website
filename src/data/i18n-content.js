export const postsEn = {
    'client-framework-architecture': {
        title: 'Layered Slot Client Architecture and State Machine Design',
        subtitle: 'Building a reusable client framework so every new game only ships what makes it different',
        tags: ['Client Development', 'Framework Design', 'State Machine'],
        description: 'A three-tier breakdown of a reusable slot client: generic engine, slot framework and game layer, plus the finite state machine driving one spin end to end.'
    },
    'client-reel-engine': {
        title: 'Reel Engine Design: Animation Curves and Stop Control',
        subtitle: 'Inside the most visible part of any slot game, and how to keep reel motion fluid at 60fps',
        tags: ['Client Development', 'Reel Animation', 'Animation Design'],
        description: 'Inside the reel engine: motion state transitions, easing curve math, stop timing and bounce-back, anticipation effects, and holding a steady 60fps frame rate.'
    },
    'client-network-resource': {
        title: 'Client Networking, Asset Management and UI Layering',
        subtitle: 'From reconnect recovery to memory release, the plumbing that keeps a slot game stable',
        tags: ['Client Development', 'Network Protocol', 'Asset Management'],
        description: 'Real-time client-server messaging, state restore after a dropped connection, staged asset loading and memory release, localization, and UI layer stacking.'
    },
    'art-challenges-ai-workflow': {
        title: 'Slot Game Art Challenges and AI-Assisted Workflows',
        subtitle: 'Finding the right place for AI image generation inside a traditional art pipeline',
        tags: ['Art Design', 'AI Tools', 'Workflow'],
        description: 'What makes slot art different, and where AI generation really belongs: concept ideation, prompt iteration, and feeding output back into hand-painted polish.'
    },
    'art-symbol-spine-animation': {
        title: 'Slot Symbol Design Rules and Spine Skeletal Animation',
        subtitle: 'From symbol readability to rig setup, the craft behind slot art execution',
        tags: ['Art Design', 'Spine Animation', 'Symbol Design'],
        description: 'Symbol readability, sizing and spacing rules, hierarchy between high and low pay symbols, plus Spine rigging, win animations and performance trade-offs.'
    },
    'art-ui-delivery-pipeline': {
        title: 'Slot Game UI/UX Design and Art Delivery Pipeline',
        subtitle: 'The standards that carry art assets from design file into the engine without surprises',
        tags: ['Art Design', 'UI/UX', 'Delivery Pipeline'],
        description: 'Slot interface layout, multi-resolution adaptation, readability and touch targets, plus the design-to-engine handoff with naming and slicing standards.'
    },
    'audio-bgm-design': {
        title: 'Slot Background Music: Pacing Emotion Through Sound',
        subtitle: 'Theme melodies, mode transitions and the craft of a truly seamless loop',
        tags: ['Music', 'Background Music', 'Emotional Design'],
        description: 'How theme melodies build recall, how music shifts between base game and free spins, seamless loop techniques, and matching key and instrumentation to theme.'
    },
    'audio-sfx-interactive': {
        title: 'Slot Sound Effect Tiers and Interactive Audio Systems',
        subtitle: 'Making every win sound like exactly the size of win it actually is',
        tags: ['Sound Effects', 'Interactive Audio', 'Game Audio'],
        description: 'Mapping win tiers to layered sound effects, rising payline scales, trigger priority and ducking, voice limits, and avoiding listener fatigue in long sessions.'
    },
    'audio-specs-delivery': {
        title: 'Game Audio Technical Specs and Delivery Pipeline',
        subtitle: 'The standards and checks that carry audio from composition into the engine',
        tags: ['Sound Effects', 'Technical Specs', 'Delivery Pipeline'],
        description: 'Choosing sample rate and bit depth, weighing compression formats, loudness and dynamic range, size versus load time, and the composing-to-engine handoff.'
    },
    'natural-probability-design': {
        title: 'Slot Probability Design: Math Models to Player Feel',
        subtitle: 'A close look at natural probability algorithms, symbol weighting and RTP calculation',
        tags: ['Math Design', 'Natural Probability', 'RTP'],
        description: 'The math behind slot probability: reel strip weighting, win combination probability calculation, precise RTP tuning, and balancing correctness with feel.'
    },
    'gamebox-architecture': {
        title: 'Result-Set Architecture: A Modular Slot Game Framework',
        subtitle: 'How a result-set model makes slot development faster and far easier to extend',
        tags: ['Architecture Design', 'Result Set', 'Game Engine'],
        description: 'How a result-set architecture splits a slot game into reusable components: state machine, spin flow, feature triggering and settlement for fast delivery.'
    },
    'gas-control-system': {
        title: 'Control System Design: Dynamic Slot Parameter Tuning',
        subtitle: 'From spin request to result, a full walkthrough of the two-stage control pipeline',
        tags: ['Control System', 'Pipeline Design', 'RTP'],
        description: 'A flowchart-led tour of the spin pipeline and its two-stage control model: RTP table selection and weighted result picking, with interpolation fallbacks.'
    },
    'rng-security': {
        title: 'RNG Security: Fairness and Compliance in Slot Games',
        subtitle: 'From cryptographic randomness to provable fairness in random number generation',
        tags: ['RNG', 'Security', 'Compliance'],
        description: 'Using a cryptographically secure PRNG, seed management and entropy source design, uniform distribution testing, and passing independent RNG audit standards.'
    },
    'risk-control-algorithm': {
        title: 'Risk Algorithms: Anomaly Detection and Live Alerting',
        subtitle: 'Using rigorous statistical tests to catch results drifting from theoretical expectation',
        tags: ['Risk Control', 'Statistical Testing', 'Anomaly Detection'],
        description: 'How binomial hit-rate tests, RTP Z-tests and outlier filtering combine into real-time anomaly detection with tiered alerts when results drift from theory.'
    },
    'qa-math-verification': {
        title: 'Why Slot QA Needs Statistical Math Verification',
        subtitle: 'Why functional testing alone can never prove a slot game is correct',
        tags: ['QA', 'Math Verification', 'Statistical Testing'],
        description: 'How many spins RTP convergence really needs, reading confidence intervals, volatility verification, extreme value and max win checks, and simulation error.'
    },
    'qa-functional-playtest': {
        title: 'Slot Functional Testing and Player Feel Playtesting',
        subtitle: 'Two-track verification, from state machine path coverage to human playtest feedback',
        tags: ['QA', 'Functional Testing', 'Playtesting'],
        description: 'State machine path coverage, reconnect edge cases, multi-resolution and device testing, and rating scales turning subjective player feel into actionable fixes.'
    },
    'qa-automation-compliance': {
        title: 'Slot Test Automation and Compliance Certification',
        subtitle: 'Automating million-spin verification and getting through third-party certification',
        tags: ['QA', 'Test Automation', 'Compliance Certification'],
        description: 'Test automation architecture for slot games, large-scale spin simulation and result comparison, regression suites, and independent certification submissions.'
    }
}

export const categoriesEn = {
    'client': {
        name: 'Client Development',
        subtitle: 'Client-side technology from game framework to reel engine',
        description: 'Slot client development articles: layered framework, game state machines, reel animation engines, network protocols, assets, localization and UI layering.'
    },
    'art': {
        name: 'Art & Design',
        subtitle: 'AI-assisted workflows and a high-output art pipeline',
        description: 'Slot art design articles: modern AI-assisted art workflows, symbol design standards, Spine skeletal animation, UI/UX layout and the art-to-engine pipeline.'
    },
    'audio': {
        name: 'Music & Audio',
        subtitle: 'Building an immersive listening experience',
        description: 'Slot music and sound design articles: emotional pacing in background music, tiered sound effect triggering, interactive audio, specs and delivery pipelines.'
    },
    'math': {
        name: 'Math Design',
        subtitle: 'Probability models, RTP tuning and result-set architecture',
        description: 'Slot math design articles: natural probability models, reel strip weighting, RTP calculation and tuning, volatility, result-set and control system design.'
    },
    'security': {
        name: 'System Security',
        subtitle: 'Random number security and statistical anomaly detection',
        description: 'Game system security articles: cryptographic random number generation, seed and entropy design, RNG audit trails, statistical testing and anomaly detection.'
    },
    'qa': {
        name: 'QA Testing',
        subtitle: 'Quality assurance from math verification to player feel',
        description: 'Slot QA testing articles: RTP convergence verification, state machine path coverage, functional and player feel testing, and third-party certification.'
    }
}
