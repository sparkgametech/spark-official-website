/**
 * Generates the 1200x630 social share card in public/images/og/.
 *
 * Run manually when the branding changes — this is not part of the build, so
 * the generated PNG is committed:
 *
 *     npm install --no-save sharp
 *     node scripts/make-og-image.mjs
 *
 * The card is deliberately just the logo and wordmark. Every platform already
 * renders the page title and description next to it, so repeating the tagline
 * inside the image only says the same thing a third time; the image's job is
 * to be recognisable at thumbnail size. Being text-free also means one card
 * serves both languages.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'images', 'og', 'og-image.png')
const LOGO = path.join(ROOT, 'public', 'images', 'logo', 'agency-logo.png')

const W = 1200
const H = 630
const ORANGE = '#e8590c'

const CAT = 300
const CAT_X = 300
const CAT_Y = (H - CAT) / 2 - 10

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c1f24"/>
      <stop offset="100%" stop-color="#2a2118"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="450" cy="315" r="290" fill="${ORANGE}" opacity="0.06"/>
  <text x="640" y="300" fill="#ffffff" font-size="82" font-weight="700"
        font-family="'Segoe UI', 'Microsoft JhengHei', sans-serif">Spark</text>
  <text x="640" y="382" fill="${ORANGE}" font-size="58" font-weight="700"
        letter-spacing="4"
        font-family="'Microsoft JhengHei', 'Noto Sans TC', sans-serif">星火創盛</text>
  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="${ORANGE}"/>
</svg>`

const logo = await sharp(LOGO)
    .resize(CAT, CAT, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()

fs.mkdirSync(path.dirname(OUT), { recursive: true })

await sharp(Buffer.from(svg))
    .composite([{ input: logo, top: Math.round(CAT_Y), left: CAT_X }])
    .png({ compressionLevel: 9 })
    .toFile(OUT)

const meta = await sharp(OUT).metadata()
console.log(`og-image.png  ${meta.width}x${meta.height}  ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`)
