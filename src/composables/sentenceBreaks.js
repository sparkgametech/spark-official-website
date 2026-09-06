/**
 * Puts each sentence of an article on its own line.
 *
 * Long technical paragraphs are much easier to scan when every sentence starts
 * at the left margin instead of running together. This works on the rendered
 * DOM rather than in the 34 article components, so the authored markup stays
 * clean and the rule lives in one place.
 *
 * Only <p> and <li> are touched; headings, code and formula blocks keep their
 * original wrapping.
 */

const TARGETS = 'p, li'

/**
 * Chinese sentence enders are unambiguous. A Latin full stop is not: it also
 * appears in decimals (96.5), abbreviations (e.g., vs.) and initials, so it
 * only counts when it is not preceded by a digit or capital and is followed
 * by whitespace plus a capital letter.
 */
const SENTENCE_END = /[。！？]|(?<![A-Z0-9])(?<!\be\.g)(?<!\bi\.e)(?<!\bvs)(?<!\betc)(?<!\bFig)(?<!\bNo)[.!?](?=\s+[A-Z])/g

const processed = new WeakSet()

/** Splits after each sentence end, keeping the punctuation with its sentence. */
function splitSentences(text) {
    const pieces = []
    let start = 0
    SENTENCE_END.lastIndex = 0
    let match
    while ((match = SENTENCE_END.exec(text)) !== null) {
        const end = match.index + match[0].length
        if (end >= text.length) break
        pieces.push(text.slice(start, end))
        start = end
    }
    pieces.push(text.slice(start))
    return pieces.filter(piece => piece !== '')
}

function breakUpElement(el) {
    if (processed.has(el)) return
    processed.add(el)

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    const nodes = []
    let node
    while ((node = walker.nextNode())) nodes.push(node)

    for (const textNode of nodes) {
        // Never split inside code samples or formula blocks.
        if (textNode.parentElement.closest('code, pre, .formula-block')) continue

        const pieces = splitSentences(textNode.textContent)
        if (pieces.length < 2) continue

        const frag = document.createDocumentFragment()
        pieces.forEach((piece, i) => {
            // Only trim after a break we inserted. The first piece may open
            // with a space that separates it from a preceding <strong>, and
            // dropping that glues the words together.
            const text = i === 0 ? piece : piece.replace(/^[ \t]+/, '')
            frag.appendChild(document.createTextNode(text))
            if (i < pieces.length - 1) frag.appendChild(document.createElement('br'))
        })
        textNode.parentNode.replaceChild(frag, textNode)
    }
}

export function applySentenceBreaks(root) {
    if (!root) return
    root.querySelectorAll(TARGETS).forEach(breakUpElement)
}
