# Stopzone Remotion Promo

A Remotion-based product-film project for Stopzone. The composition is designed for a 9:16 vertical master and a 16:9 landscape version, with all animation driven by the Remotion timeline.

## Current state

This is a motion-graphics prototype with animated route drawing, a moving location marker, kinetic typography, phone/UI motion, an alert climax, and a CTA end card. The latest pass increases the vertical phone framing from 320px to 500px and tightens some scene movement to reduce the tiny-product / excessive-negative-space problem. The phone screens are still **vector stand-ins**, not the actual Stopzone screenshots, so this remains a review build rather than a final ad.

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
- In the vertical version, the product should occupy a substantial share of the frame; avoid a small phone floating beneath a large empty headline area.
- Inspect all five vertical scenes in Remotion Studio after changing phone scale. Larger device framing is a layout improvement, not proof that the final render is correct.
- CTA must be readable and use the official App Store badge/link before publication.
- Do not make unverified claims about privacy, offline operation, battery use, or guaranteed alarms.
