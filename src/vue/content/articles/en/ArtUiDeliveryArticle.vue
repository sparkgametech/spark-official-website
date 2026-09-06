<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-table-cells-large" aria-hidden="true"></i>UI/UX Design and Interface Layout</h2>
        <p>
            Interface design for slot games is a discipline of its own. Unlike the general trend in applications
            towards simplicity and white space, it has to carry game information, controls and an entertaining
            atmosphere within a limited space: as dependable as a tool, yet as dramatic as a stage.
        </p>

        <h3>Core Interface Elements</h3>
        <ul>
            <li><strong>Credit display (Balance)</strong>: the game credits currently available to the player, which must remain clearly visible at all times</li>
            <li><strong>Bet controls (Bet Controls)</strong>: the buttons or selector for adjusting the amount staked per spin</li>
            <li>
                <strong>Spin button (Spin Button)</strong>: the most important point of interaction, requiring the
                greatest visual weight and touch area. It must sit within the most natural range of thumb movement,
                and needs recognisable appearance changes for states such as "spinning", "stoppable" and "autoplay"
            </li>
            <li><strong>Win display (Win Display)</strong>: the area where the winning value is shown dynamically</li>
            <li><strong>Info panel (Info Panel)</strong>: the entry point for supporting features such as the paytable, rules and settings</li>
        </ul>

        <h3>Information Hierarchy Design</h3>
        <p>
            The design philosophy of a slot interface is <strong>"what the player needs to see is always in view; what they do not need is hidden but reachable"</strong>:
        </p>
        <ul>
            <li><strong>First tier</strong>: credits, bet amount and the spin button, always present</li>
            <li><strong>Second tier</strong>: the win display and autoplay controls, surfacing only when needed</li>
            <li><strong>Third tier</strong>: the paytable, rules and sound settings, tucked into a menu to be opened on demand</li>
        </ul>
        <p>
            The criterion for tiering is <strong>frequency of use multiplied by urgency</strong>, not the importance
            of the feature.
            A win amount only appears at specific moments, but when it does it must be seen immediately, so it needs
            to seize focus dynamically and then withdraw once it is over. This way of thinking about <strong>dynamic hierarchy</strong> is the biggest difference from an ordinary
            static interface.
        </p>

        <h3>Cross-Platform Responsive Layout</h3>
        <p>
            A slot needs to support both <strong>portrait</strong> and <strong>landscape</strong> screen orientations,
            plus a range of aspect ratios from phone to desktop, so the layout cannot be fixed:
        </p>
        <ul>
            <li><strong>Landscape layout</strong>: reels centred, control panel at the bottom or along the sides, suited to desktops and tablets held sideways</li>
            <li><strong>Portrait layout</strong>: reels in the upper half, control panel unfolded across the lower half, the most common arrangement on phones</li>
            <li><strong>Touch areas</strong>: buttons on mobile need to keep a sufficient minimum touch area to avoid mistaps during fast-paced use</li>
        </ul>
        <p>
            In practice it is not advisable to treat the two orientations as scaled versions of one layout; they
            should be regarded as <strong>two independent designs</strong>:
            sharing the same set of visual components, but each defining its own anchors and safe boundaries, and
            leaving room for notches, rounded corners and system gesture zones.
        </p>

        <h3>Balancing a Themed Interface Against the Reel Area</h3>
        <p>
            Slot interfaces usually adopt a dark palette or one matching the theme, so that the
            <strong>reel area becomes the visual focus</strong>.
            Interface elements should not compete with the symbols for attention, yet they cannot be so plain that
            the sense of entertainment is lost; common approaches are semi-transparent panels, gradient borders and
            restrained ornamentation.
            A practical check is to blur the design mockup: if the first thing that draws your eye is not the reels,
            the interface is stealing the show.
        </p>
        <p>
            Another detail is the <strong>legibility of numbers</strong>: credits and win amounts are what most need
            to be read accurately, so the typeface must have stable character widths and unambiguous letterforms, and
            it cannot be blended into the background for the sake of stylistic unity.
        </p>

        <h2><i class="fa-solid fa-truck-fast" aria-hidden="true"></i>From Mockup to Engine: The Art Delivery Process</h2>
        <p>
            Taking a set of art assets from design mockup to integration in the game engine requires a rigorous
            delivery process, and how well standardised it is directly affects collaboration efficiency and asset quality.
        </p>

        <h3>The Asset Specification Document</h3>
        <p>
            Before formal production, art must define an asset specification document together with the front-end engineers:
        </p>
        <ul>
            <li><strong>Dimension specifications</strong>: the design size, safe area and stretchable region defined for each asset category</li>
            <li><strong>File formats</strong>: agreed formats for assets that need an alpha channel, for background images, and for skeletal animation export bundles</li>
            <li>
                <strong>Naming conventions</strong>: use predictable multi-segment names that indicate, in order, the
                asset category, its semantic name and its state.
                This looks trivial, but it is the precondition for any automation: once names are predictable,
                atlas packing, batch scaling and asset checks can all be handed over to scripts
            </li>
            <li><strong>Resolution tiers</strong>: define the scale factor between tiers, so no dimension ends up non-divisible</li>
        </ul>

        <h3>Atlas Packing</h3>
        <p>
            To maximise rendering performance, loose asset images need to be packed into a <strong>texture atlas</strong>,
            merging many small images onto one large image, which greatly reduces the number of draw calls.
            Points to watch when packing:
        </p>
        <ul>
            <li>Assets that appear together in the same stage should be packed together, so a whole sheet is not loaded just for a few assets</li>
            <li>Atlas dimensions are best kept to powers of two, ensuring compatibility and compression efficiency across device types</li>
            <li>Leave a few pixels of padding around each asset to prevent edge bleeding when the render is scaled</li>
            <li>Pack assets that are rarely displayed at the same time separately, reducing the memory footprint of a single load</li>
            <li>Choose the compression method according to asset characteristics; a smooth background and a crisp interface component should not use the same settings</li>
        </ul>

        <h3>Multi-Resolution Strategy</h3>
        <p>
            To cover the device range from low-end phones to high-end desktops, assets usually need to be prepared in
            several resolution versions: authored at the highest resolution, then batch-scaled down by script.
            But <strong>uniform scaling is not always viable</strong>: fine lines and high-frequency textures easily
            disappear or produce moiré once reduced, and line weight and detail density often have to be adjusted separately.
        </p>

        <h3>Delivering to the Front-End Engineers</h3>
        <p>
            The final art deliverables usually comprise the following:
        </p>
        <ul>
            <li><strong>Packed atlases</strong>: the atlases for each resolution version and their corresponding coordinate description files</li>
            <li><strong>Skeletal animation export files</strong>: the complete bundle of animation data, atlas description and texture</li>
            <li><strong>Animation event definition table</strong>: annotating the key event points and the behaviour each one triggers</li>
            <li><strong>Interface annotation document</strong>: the position, size, alignment, stretchable regions and interaction states of every element</li>
            <li><strong>Typography and colour specifications</strong>: the type scale hierarchy, line height, and definitions of primary and accent colours</li>
        </ul>
        <p>
            Delivery should not be a one-way hand-off; it should include a <strong>joint walkthrough</strong>:
            art and engineering compare the implemented result against the design mockup on a real device together,
            deciding on the spot which differences are tolerances and which need adjusting.
        </p>

        <h3>Asset Version Control</h3>
        <p>
            Art assets need version control just as much. Teams typically use Git LFS to manage image and animation
            source files, paired with a clear branching strategy, so that historical versions all stay traceable.
            But art files have one difficulty that code does not: <strong>binary files cannot be merged</strong>,
            so conflicts have to be avoided by convention, for example by clearly dividing up areas of responsibility.
        </p>

        <h2><i class="fa-solid fa-layer-group" aria-hidden="true"></i>Overview of the Art Technology Stack</h2>
        <p>
            A complete slot art production pipeline involves the coordinated use of several specialised tools:
        </p>

        <h3>2D Static Art</h3>
        <ul>
            <li><strong>Photoshop</strong>: the core painting tool, the workhorse for symbol painting, background compositing and material work</li>
            <li><strong>Illustrator</strong>: vector graphics production, suited to interface elements, icons and assets that need lossless scaling</li>
            <li><strong>Interface prototyping tools</strong>: for planning interaction flows and quickly producing clickable prototypes for the team to review</li>
        </ul>

        <h3>Animation Production</h3>
        <ul>
            <li><strong>Spine</strong>: the tool of choice for skeletal animation, with extremely good integration into mainstream engines</li>
            <li><strong>After Effects</strong>: for complex effect animation, transitions and concept videos</li>
            <li><strong>Animate</strong>: still used on some projects for producing clean vector-style animation</li>
        </ul>

        <h3>3D Support</h3>
        <ul>
            <li><strong>3ds Max</strong>: used when a project needs 3D-rendered symbols or scenes, usually modelled and then rendered out to 2D images for further compositing</li>
        </ul>

        <h3>AI-Assisted Tools</h3>
        <ul>
            <li><strong>Midjourney</strong>: rapid concept exploration and mood board generation, shortening up-front ideation time</li>
            <li><strong>ChatGPT</strong>: efficiency gains on the paperwork side, such as writing specification documents and assembling checklists</li>
        </ul>

        <h3>Game Engines</h3>
        <ul>
            <li><strong>Unity</strong>: a full-featured cross-platform engine, suited to projects with complex effects or mixed 3D presentation</li>
            <li><strong>Cocos Creator</strong>: a lightweight engine, widely used on web and mobile, with fast start-up and small build size</li>
        </ul>

        <p>
            This toolchain is not fixed, but its unchanging core is <strong>an efficiency-oriented workflow design</strong>. Every tool is brought in so that artists can spend more time on creativity itself rather than on repetitive
            technical tasks.
            Slot art production is a composite discipline combining artistic creation, technical specification and
            engineering collaboration.
        </p>
        <p>
            If you want to look back at where these interfaces and assets came from, this series has separate articles
            covering the up-front concept exploration and AI-assisted workflow, and the specifications for symbol design
            and the details of skeletal animation production.
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

    code {
        background: #f8f9fa;
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        font-size: 0.88rem;
        color: #d63384;
    }
}
</style>
