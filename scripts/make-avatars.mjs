/**
 * Generates the team avatars as static SVG files.
 *
 * They used to be fetched from api.dicebear.com on every page load, which meant
 * a third-party outage broke the team section for every visitor, every visitor's
 * IP reached that service, and the pinned 7.x endpoint could be retired without
 * warning. The same library runs offline, so the files are produced once here
 * and served from our own origin.
 *
 * Run it again after changing the roster or the avatar options:
 *   node scripts/make-avatars.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createAvatar } from '@dicebear/core'
import { avataaars } from '@dicebear/collection'
import { team, avatarOptions } from '../src/data/team.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'images', 'team')

fs.mkdirSync(OUT, { recursive: true })

let written = 0
for (const member of team) {
    const svg = createAvatar(avataaars, avatarOptions(member)).toString()
    fs.writeFileSync(path.join(OUT, `${member.avatarSeed}.svg`), svg, 'utf8')
    written++
}

console.log(`團隊頭像產生完成：${written} 個檔案 → public/images/team/`)
