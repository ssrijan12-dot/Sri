# Whispers Beneath the Wisteria
_A story written for Anushikha, by Srijan._

A single interactive website — a pocket watch that opens into a scrolling love story, chapter by chapter, ending beneath a glowing wisteria tree.

---

## 1. Try it locally

You can't just double-click `index.html` for everything to work perfectly (some browsers block local file requests for fonts/audio), so serve it with a tiny local server:

```bash
cd whispers-beneath-the-wisteria
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

---

## 2. Add your music (optional but recommended)

The pocket watch's "▶ Begin" button and the docked player look for two files:

```
assets/music/our-journey.mp3   ← plays through the whole story
assets/music/finale.mp3        ← swaps in once she taps the wisteria tree
```

Drop your own MP3s in there with those exact filenames and it'll just work — no code changes needed. If you'd rather pull from YouTube, the easiest route is to convert the audio to MP3 (any YouTube-to-MP3 tool you trust) and save it with those filenames. If no files are present, the site still works fine — the play button just won't produce sound.

---

## 3. Customize the story

Everything text-based lives directly in **`index.html`** — search for the section you want to change:

| What | Where |
|---|---|
| The relationship date | `js/timer.js` → `RELATIONSHIP_START` |
| Chapter text | Each `<section id="ch-...">` block in `index.html` |
| The envelope letter | `#ch-letter` → `.letter-paper` |
| The final letter (tap the tree) | `#final-letter-modal` |
| The hidden firefly sequence | `#surprise-overlay` → the seven `.seq-line` paragraphs |
| The 14 hidden notes | `#secret` → `.notes-grid` |
| Plaque names/date | `#finale` → `.plaque` |

## 4. Replace or add photos

All photos live in `assets/photos/`, already cropped to portrait. To swap one out:

1. Save your new photo (portrait orientation works best — aim for a 4:5 ratio).
2. Replace the file in `assets/photos/`, keeping the same filename, **or**
3. Update the `src="assets/photos/..."` path in `index.html` to point at your new filename.

To add more photos to the Gallery scrapbook, copy one of the `<div class="media-frame">` blocks inside `#ch-gallery` and point it at your new image.

---

## 5. Deploy it for free

### Option A — GitHub Pages
1. Create a new GitHub repository and push this whole folder to it.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment," set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

### Option B — Vercel
1. Go to [vercel.com](https://vercel.com) and sign in (GitHub login is easiest).
2. Click **Add New → Project**, import the repo (or drag-and-drop the folder if you skip GitHub).
3. Leave all settings as default (it's a static site, no build step needed) and click **Deploy**.
4. You'll get a link like `whispers-beneath-the-wisteria.vercel.app` — you can rename it in the project settings.

Either way, once it's live, just send Anushikha the link.

---

## 6. Project structure

```
whispers-beneath-the-wisteria/
├── index.html              ← all page content
├── css/
│   ├── style.css            ← layout, components, variables
│   ├── animations.css       ← all @keyframes
│   └── responsive.css       ← mobile/tablet overrides
├── js/
│   ├── app.js                ← wires everything up, scroll reveal, nav, sky
│   ├── timer.js               ← the relationship counter
│   ├── watch.js                ← the pocket watch intro + docked widget
│   ├── music.js                ← audio playback controls
│   ├── petals.js                ← falling petals, clouds, birds
│   ├── fireflies.js              ← ambient fireflies + the finale surprise
│   ├── gallery.js                 ← envelope, storm rain, confetti, Holi burst, tree tap
│   └── eastereggs.js               ← the hidden notes page (triple-click Ace)
├── assets/
│   ├── photos/               ← all 19 photos, cropped to portrait
│   ├── music/                 ← drop your MP3s here (see step 2)
│   └── icons/                  ← currently unused, reserved for future custom icons
└── README.md
```

---

## 7. The secret page

Triple-click Ace's photo on the very first screen. It unlocks a page called **"The Things I Never Say Enough"** with fourteen small notes — nothing tells her it's there.

Enjoy building on it. Happy Girlfriend's Day. 🌸
