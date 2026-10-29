# Stopzone Remotion Promo

The current review build uses cropped product-screen assets, animated device framing, an animated route motif, scene-aligned narration, background music, a short wake-up accent, and a final brand card.

## Important: add the bundled assets

The source expects files under `public/assets/` and `public/audio/`. Download the complete project archive provided in this conversation and copy its `public/` folder into the root of this repository, merging the folders. The archive contains the real screen crops, app icon, App Store badge, music, narration segments, and alarm accent.

## Run

Requires Node.js 20+ and npm.

```bash
npm install
npm run studio
```

Choose `StopzoneVertical` in Remotion Studio, then render:

```bash
npm run render:vertical
```

The output is `out/stopzone-vertical.mp4`, 1080 × 1920 at 30 fps for 30 seconds.

## Audio mix

- Music bed: 18% volume
- Scene narration: full volume
- Alarm accent: 24% volume at the wake-up reveal

These are starting levels, not final mastering. Check the mix on phone speakers and headphones. Verify product claims and the official App Store destination before publication.

## Review status

This is an improved review build, not a final approved advertisement. Inspect the render for scene timing, text readability, and sound sync before publishing.
