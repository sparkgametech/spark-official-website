<template>
    <div class="blog-article">
        <h2><i class="fa-solid fa-shapes" aria-hidden="true"></i>Symbol Design Specifications</h2>
        <p>
            Symbols are the core visual element of a slot game. A standard set usually contains ten to fifteen
            regular symbols plus two or three special ones. These specifications are not aesthetic preferences
            but engineering constraints derived backwards from recognition efficiency and performance limits.
        </p>

        <h3>Symbol Hierarchy Design</h3>
        <p>
            Slot symbols are divided by pay tier into two broad categories: <strong>high-value symbols (High-Value)</strong> and <strong>low-value symbols (Low-Value)</strong>:
        </p>
        <ul>
            <li>
                <strong>High-value symbols</strong>: usually imagery tied closely to the theme, such as characters,
                scene objects or mythical creatures. They demand a high level of finish, strong legibility and
                relatively saturated colour, and the top-paying one should carry the greatest visual weight
            </li>
            <li>
                <strong>Low-value symbols</strong>: traditionally card suits and numbers or letters, or characters
                redesigned in the theme's style. They need to be clean and crisp, must not steal focus from the
                high-value symbols, yet still have to stay consistent with the theme
            </li>
        </ul>
        <p>
            The point of hierarchy design is that <strong>visual weight must be proportional to the pay tier</strong>:
            without opening the paytable, a player should be able to tell intuitively which symbol is worth more
            from its area share, saturation, richness of material and glow.
            When a high-value symbol is painted more plainly than a low-value one, psychological expectation
            comes unstuck from the actual payout.
        </p>
        <p>
            Low-value symbols carry less weight, but they test skill the most: there are many of them and they
            appear most frequently. If you merely slap a material texture onto a letter, the quality of the
            whole reel drops a notch immediately.
            The mature approach is to make the letterforms themselves carry theme elements, establishing
            legibility while staying simple.
        </p>

        <h3>Special Symbol Design</h3>
        <p>
            Special symbols are the most design-challenging elements, each with its own functional role and
            visual requirements:
        </p>
        <ul>
            <li>
                <strong>Wild symbol</strong>: a substitute symbol that can stand in for most other symbols to form
                a winning combination. It requires extremely high legibility, and typically uses a gold frame, a
                glow effect or a prominent text label. Because it has to appear alongside every other symbol, its
                colour scheme must be the most independent in the whole set
            </li>
            <li>
                <strong>Scatter symbol</strong>: a scattered symbol that triggers a reward without needing to land
                on a specific payline. It is usually the most representative element of the theme, and a common
                approach is to give it a dedicated frame or base so it stands apart on its own
            </li>
            <li>
                <strong>Bonus symbol</strong>: the symbol that triggers a special game feature. It frequently uses
                a dynamic composition or a distinctive material effect to hint at the extra reward it is about to bring
            </li>
        </ul>
        <p>
            Special symbols have one more requirement that often gets overlooked:
            <strong>they must carry tension when a set is "almost complete"</strong>, so an extra set of
            anticipation-state assets (an intensified frame glow, for example) usually has to be designed as well.
        </p>

        <h3>Principles of Legibility Design</h3>
        <p>
            The most easily neglected factor is <strong>legibility while spinning at high speed</strong>. When the reels are turning, all a player really sees are blurred blocks of colour and rough
            silhouettes. Symbol design therefore has to follow these principles:
        </p>
        <ul>
            <li><strong>Silhouette distinctiveness</strong>: every symbol should have a different outer contour, so they remain distinguishable by silhouette alone even at the smallest size</li>
            <li><strong>Colour contrast</strong>: symbols in adjacent pay tiers should use different dominant hues to avoid colour confusion</li>
            <li><strong>Theme consistency</strong>: all symbols must stay unified in style, lighting direction and level of rendering detail</li>
            <li><strong>Use of negative space</strong>: the artwork should not fill the entire cell; appropriate breathing room makes a symbol stand out more against a busy background</li>
        </ul>
        <p>
            There are three very cheap ways to verify these principles:
        </p>
        <ul>
            <li><strong>Thumbnail test</strong>: scale down to the real cell size and view them side by side; anything you cannot tell apart has to be redone</li>
            <li><strong>Silhouette test</strong>: fill everything solid black and see whether the outer contours alone are distinguishable, which exposes shapes that are too similar right away</li>
            <li><strong>Greyscale test</strong>: strip the colour out, and if all the values bunch together, the colour contrast was fake all along</li>
        </ul>
        <p>
            All three should be run before final refinement.
        </p>
        <DiagramFigure caption="If the values bunch together once colour is removed, the colour contrast was fake all along.">
            <svg viewBox="0 0 640 246" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Three checks on symbol legibility</title>
            <desc>Thumbnail, silhouette and greyscale checks, all cheap, confirming symbols stay distinguishable at their real size.</desc>
            <rect x="60" y="40" width="152" height="118" rx="8" fill="var(--dg-1)" fill-opacity="0.10"/>
            <polygon points="136,58 143.03,74.3242 160.727,75.9656 147.375,87.6958 151.282,105.034 136,95.96 120.718,105.034 124.625,87.6958 111.273,75.9656 128.97,74.3242" fill="var(--dg-1)"/>
            <polygon points="104,115 107.515,123.162 116.364,123.983 109.687,129.848 111.641,138.517 104,133.98 96.3588,138.517 98.3127,129.848 91.6363,123.983 100.485,123.162" fill="var(--dg-1)"/>
            <polygon points="136,115 139.515,123.162 148.364,123.983 141.687,129.848 143.641,138.517 136,133.98 128.359,138.517 130.313,129.848 123.636,123.983 132.485,123.162" fill="var(--dg-2)"/>
            <polygon points="168,115 171.515,123.162 180.364,123.983 173.687,129.848 175.641,138.517 168,133.98 160.359,138.517 162.313,129.848 155.636,123.983 164.485,123.162" fill="var(--dg-3)"/>
            <text x="136" y="182" font-size="13" fill="var(--dg-1-ink)" text-anchor="middle" font-weight="700">Thumbnail</text>
            <text x="136" y="202" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.8">compared side by side at real cell size</text>
            <rect x="240" y="40" width="152" height="118" rx="8" fill="var(--dg-2)" fill-opacity="0.10"/>
            <polygon points="284,78 289.948,91.8127 304.923,93.2016 293.625,103.127 296.931,117.798 284,110.12 271.069,117.798 274.375,103.127 263.077,93.2016 278.052,91.8127" fill="currentColor"/>
            <polygon points="348,78 353.948,91.8127 368.923,93.2016 357.625,103.127 360.931,117.798 348,110.12 335.069,117.798 338.375,103.127 327.077,93.2016 342.052,91.8127" fill="currentColor"/>
            <text x="316" y="182" font-size="13" fill="var(--dg-2-ink)" text-anchor="middle" font-weight="700">Silhouette</text>
            <text x="316" y="202" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.8">are the outlines alone distinguishable</text>
            <rect x="420" y="40" width="152" height="118" rx="8" fill="var(--dg-3)" fill-opacity="0.10"/>
            <polygon points="464,78 469.948,91.8127 484.923,93.2016 473.625,103.127 476.931,117.798 464,110.12 451.069,117.798 454.375,103.127 443.077,93.2016 458.052,91.8127" fill="currentColor" fill-opacity="0.42"/>
            <polygon points="528,78 533.948,91.8127 548.923,93.2016 537.625,103.127 540.931,117.798 528,110.12 515.069,117.798 518.375,103.127 507.077,93.2016 522.052,91.8127" fill="currentColor" fill-opacity="0.5"/>
            <text x="496" y="182" font-size="13" fill="var(--dg-3-ink)" text-anchor="middle" font-weight="700">Greyscale</text>
            <text x="496" y="202" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.8">do the values separate without colour</text>
            <text x="320" y="232" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">All three belong before final refinement: nearly free, and they head off the most expensive rework</text>
            </svg>
        </DiagramFigure>

        <h2><i class="fa-solid fa-bone" aria-hidden="true"></i>Spine Skeletal Animation Production</h2>
        <p>
            Animation is the most technically demanding part of slot art. Compared with traditional frame-by-frame
            animation, <strong>Spine skeletal animation</strong> has become the industry mainstream for three reasons:
            significantly smaller file size, greater flexibility in adjusting animation, and excellent integration
            with game engines.
        </p>

        <h3>Why Skeletal Animation</h3>
        <p>
            Frame-by-frame animation is expressive, but a two-second win animation may require dozens of
            consecutive images, and both the memory footprint and the load time are a burden on mobile.
            Skeletal animation breaks a character into parts that can rotate and scale independently, and
            computes the in-between frames through mathematical interpolation.
            For a slot that needs to play several animations at once, the performance advantage is especially critical.
            Another advantage is <strong>modifiability</strong>: shortening the duration or exaggerating the motion
            only requires adjusting the keyframes.
        </p>
        <DiagramFigure caption="The other advantage is editability: shortening a clip or widening a motion only means moving keyframes.">
            <svg viewBox="0 0 640 246" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Data footprint of frame-by-frame versus skeletal animation</title>
            <desc>Frame animation stores every frame as an image, while skeletal animation stores a few parts and interpolates the frames between them.</desc>
            <text x="30" y="50" font-size="13.5" fill="var(--dg-1-ink)" font-weight="700">Frame-by-frame</text>
            <rect x="198" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="232" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="266" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="300" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="334" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="368" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="402" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="436" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="470" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="504" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="538" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <rect x="572" y="30" width="28" height="40" rx="3" fill="var(--dg-1)" fill-opacity="0.85"/>
            <text x="198" y="90" font-size="11.5" fill="currentColor" opacity="0.8">A two second clip can be dozens of consecutive images</text>
            <text x="30" y="154" font-size="13.5" fill="var(--dg-3-ink)" font-weight="700">Skeletal</text>
            <rect x="198" y="134" width="44" height="40" rx="3" fill="var(--dg-3)"/>
            <rect x="250" y="134" width="30" height="40" rx="3" fill="var(--dg-3)"/>
            <rect x="302" y="134" width="30" height="40" rx="3" fill="var(--dg-3)"/>
            <rect x="354" y="134" width="22" height="40" rx="3" fill="var(--dg-3)"/>
            <rect x="406" y="134" width="22" height="40" rx="3" fill="var(--dg-3)"/>
            <text x="198" y="194" font-size="11.5" fill="currentColor" opacity="0.8">Split into parts that rotate and scale, with frames interpolated</text>
            <text x="320" y="232" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">For a slot playing several animations at once, that gap lands directly on memory and load time</text>
            </svg>
        </DiagramFigure>

        <h3>Types of Animation a Slot Needs</h3>
        <ul>
            <li>
                <strong>Idle animation (Idle)</strong>: the subtle motion after a symbol stops, usually one to two
                seconds, with the fewest bones. The key is a <strong>seamless loop</strong>: the first and last frames must match exactly, or there will be a visible jump
            </li>
            <li>
                <strong>Win celebration animation (Win Celebration)</strong>: the main performance when a win lands,
                lasting two to three seconds, and the main stage for expressiveness. The transition from the idle
                animation has to be handled so the pose does not break at the moment of the switch
            </li>
            <li>
                <strong>Special trigger animation (Special Trigger)</strong>: the emphasis animation when a special
                symbol triggers, with the strongest impact, possibly paired with a full-screen transition effect
            </li>
        </ul>
        <p>
            Animation timing is what separates quality tiers. Win animations almost always follow a three-part
            structure of <strong>"anticipation, burst, follow-through"</strong>. <a href="/en/blog/client-reel-engine">Easing curves</a> often matter more
            than the motion design itself; linear interpolation makes movement look mechanical and cheap, and only
            proper acceleration and deceleration produce a sense of weight.
        </p>

        <h3>Mesh Deformation Techniques</h3>
        <p>
            <strong>Mesh deformation</strong> lets a flat image achieve fluid, quasi-three-dimensional motion.
            It is used extensively for drifting flames, flowing fabric and soft-body cloth effects, and it beats
            simulating the same thing with multiple images on both file size and performance.
        </p>
        <p>
            In use, weight assignment matters more than mesh density. A common mistake is to subdivide the mesh
            extremely finely in pursuit of smoothness, only for the computation cost to explode with no visible
            gain. The correct approach is to add density locally where bending is needed and keep the rest sparse.
        </p>

        <h3>Performance Budget Management</h3>
        <p>
            Mobile performance is a hard limit you cannot avoid, and every animation should have an explicit
            performance budget:
        </p>
        <ul>
            <li><strong>Draw call control</strong>: a single symbol animation should keep its draw call count as low as possible, avoiding excessive layers and material switches</li>
            <li><strong>Vertex count limits</strong>: mesh vertex count directly affects computation load, so an explicit ceiling should be set</li>
            <li><strong>Atlas dimensions</strong>: these need to be agreed in advance, so no individual asset blows out the overall memory allocation</li>
            <li><strong>Bone count</strong>: simple animations only need a small number of bones, and even complex ones should have a ceiling</li>
        </ul>
        <p>
            The performance budget should be agreed with engineering before production starts. It is advisable to
            build one animation for the most complex case first as a stress sample, measure it on the target device,
            and then work backwards to the quota for the remaining symbols, so you do not find out you are over
            budget only after the whole set is done.
        </p>

        <h3>Engine Integration and Animation Events</h3>
        <p>
            Once the animation is finished it has to be exported into an engine-readable format, usually comprising
            skeleton and animation data, an atlas description and the atlas texture.
            On export, you must confirm that <strong>animation events (Animation Event)</strong> are set correctly: sound trigger points, effect spawn points and so on. These events are bound on the programming side to
            achieve precise synchronisation between the animation and the game logic.
        </p>
        <p>
            Event names and timings should be maintained in a shared reference list by art and engineering together,
            and checked again whenever animation length changes. Most "the sound doesn't match the motion" problems
            come from a length change without a corresponding event correction.
            Another key point is the <strong>switching rules between animation states</strong>: whether idle, win and
            trigger should cut directly or blend, and how long the blend time should be, all need to be documented at delivery.
        </p>
        <p>
            Symbols and animation are the core of the slot visual experience, but they only truly hold up once they
            are placed reliably into the interface and delivered correctly; as for how this visual style first
            converged out of <a href="/en/blog/art-challenges-ai-workflow">concept exploration</a>, this series has a separate article on the up-front workflow and
            where AI tools fit into it.
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

    code {
        background: #f8f9fa;
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        font-size: 0.88rem;
        color: #d63384;
    }
}
</style>
