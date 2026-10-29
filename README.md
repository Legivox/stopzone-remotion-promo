# Stopzone Remotion Promo

A Remotion-based product-film project for Stopzone. The composition is designed for a 9:16 vertical master and a 16:9 landscape version, with all animation driven by the Remotion timeline.

## Current state

This is the first source-controlled foundation: animated route drawing, moving location marker, wake-zone pulse, kinetic typography, phone/UI motion, alert climax, and a CTA end card. The UI in this initial pass is a **vector stand-in**, not a screenshot of the actual app. Replace it with approved Stopzone screenshots/assets before calling the promo final.

## Requirements

- Node.js 20 or newer recommended
- npm

## Install once

```bash
npm install
```

## Preview

```bash
npm run studio
```

Choose `StopzoneVertical` in Remotion Studio.

## Render vertical

```bash
npm run render:vertical
```

## Render landscape

```bash
npm run render:landscape
```

## Audio

Place approved audio files here:

- `public/audio/music.mp3`
- `public/audio/voiceover.mp3`

The composition currently works without audio files. When assets are added, the tracks are mixed through Remotion's `Audio` component; use a final render to review levels and sync.

## Updating

```bash
git pull
npm run studio
```

## Creative rules

- Product first, not a generic template.
- Animate the route and location marker continuously; do not rely on screenshot transitions.
- Keep the hook readable in the first two seconds.
- CTA must be readable and use the official App Store badge/link before publication.
- Do not make unverified claims about privacy, offline operation, battery use, or guaranteed alarms.
