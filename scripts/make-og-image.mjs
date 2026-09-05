/**
 * Generates the 1200x630 social share images in public/images/og/.
 *
 * Run manually when the branding or tagline changes — this is not part of the
 * build, so the generated PNGs are committed:
 *
 *     npm install --no-save sharp
 *     node scripts/make-og-image.mjs
 *
 * The square logo alone was being used as og:image, which social platforms
 * crop or letterbox because they expect a 1.91:1 card.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'og')
const LOGO = path.join(ROOT, 'public', 'images', 'logo', 'agency-logo.png')

const W = 1200
const H = 630
const ORANGE = '#e8590c'
const DARK = '#1c1f24'

const cards = [
    {
        file: 'og-image.png',
        font: "'Microsoft JhengHei', 'Noto Sans TC', sans-serif",
        title: '老虎機遊戲開發外包團隊',
        titleSize: 66,
        sub: '客端 · 美術 · 數值 · 音效 · QA',
        subSize: 34,
        brand: 'Spark 星火創盛'
    },
    {
        file: 'og-image-en.png',
        font: "'Segoe UI', 'Helvetica Neue', sans-serif",
        title: 'Slot Game Development',
        title2: 'Outsourcing Team',
        titleSize: 68,
        sub: 'Client · Art · Math · Audio · QA',
        subSize: 32,
        brand: 'Spark'
    }
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const svgFor = (c) => {
    const titleLines = c.title2 ? [c.title, c.title2] : [c.title]
    // Anchor from the top so one- and two-line titles both sit on the same
    // optical centre rather than the single-line card floating high.
    const titleTop = c.title2 ? 288 : 330
    const lineGap = c.titleSize + 14

    const titleTspans = titleLines.map((line, i) =>
        `<text x="86" y="${titleTop + i * lineGap}" fill="#ffffff" font-size="${c.titleSize}"
               font-weight="700" font-family="${c.font}">${esc(line)}</text>`
    ).join('')

    const subY = titleTop + titleLines.length * lineGap + 12

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${DARK}"/>
      <stop offset="100%" stop-color="#2a2118"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1010" cy="300" r="250" fill="${ORANGE}" opacity="0.07"/>
  <rect x="86" y="172" width="64" height="6" rx="3" fill="${ORANGE}"/>
  <text x="86" y="218" fill="${ORANGE}" font-size="30" font-weight="700"
        letter-spacing="2" font-family="${c.font}">${esc(c.brand)}</text>
  ${titleTspans}
  <text x="86" y="${subY}" fill="#9aa0a6" font-size="${c.subSize}"
        font-family="${c.font}">${esc(c.sub)}</text>
  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="${ORANGE}"/>
  <text x="86" y="${H - 52}" fill="#6f767d" font-size="26"
        font-family="${c.font}">sparkgametech.com</text>
</svg>`
}

fs.mkdirSync(OUT_DIR, { recursive: true })

const logo = await sharp(LOGO).resize(280, 280, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer()

for (const c of cards) {
    const out = path.join(OUT_DIR, c.file)
    await sharp(Buffer.from(svgFor(c)))
        .composite([{ input: logo, top: 175, left: 895 }])
        .png({ compressionLevel: 9 })
        .toFile(out)

    const meta = await sharp(out).metadata()
    console.log(`${c.file}  ${meta.width}x${meta.height}  ${(fs.statSync(out).size / 1024).toFixed(0)} KB`)
}
