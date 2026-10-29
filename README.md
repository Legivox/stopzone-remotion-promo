# Stopzone Remotion Promo

A 30-second Remotion promo for Stopzone, with vertical (1080 × 1920) and landscape (1920 × 1080) compositions at 30 fps.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run studio
```

Select `StopzoneVertical` in Remotion Studio to inspect the portrait version. Render with:

```bash
npm run render:vertical
```

The output is `out/stopzone-vertical.mp4`.

## Assets

Product artwork is stored under `public/assets/`; audio files are stored under `public/audio/`. The portrait artwork files already contain their designed headline, supporting copy, route motif, and phone mockup. The vertical composition therefore displays the artwork as a complete scene rather than drawing a second copy of the headline over it.

## Review checklist

Before publishing, inspect the complete render for:
- One headline per scene and readable product artwork.
- Clean scene transitions and a dedicated final call-to-action.
- Narration/music timing and comfortable audio levels on phone speakers.
- Correct App Store destination and accurate product claims.

A source change is not considered visually verified until the rendered MP4 has been reviewed.
