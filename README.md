# happy-birthday 💗

A little romantic birthday website for Ninette, built with plain HTML/CSS/JS
(no build step, no dependencies).

## What's here

- `index.html` — page structure (hero countdown, love letter, Mystery Moments gallery, reasons generator)
- `style.css` — the romantic/elegant styling and animations
- `script.js` — the countdown timer, floating hearts, Mystery Moments quiz, and reasons generator
- `images/` — put your own photos here

## Customize it

1. **The letter** — open `index.html`, find the `letter-card` section, and
   replace the placeholder text with your own words.
2. **Mystery Moments (the photo gallery)** — each photo is blurred behind a
   tiny quiz question; answering correctly reveals it. Add a photo by
   dropping the image into `images/`, then open `script.js` and add an
   entry to the `MOMENTS` array at the top of the "Mystery Moments" section:
   ```js
   {
     img: 'images/your-photo.jpg',
     alt: 'Describe the photo for accessibility',
     caption: 'The real caption, revealed after a correct answer',
     question: 'A tiny question about the memory',
     options: ['Wrong answer', 'Right answer', 'Another wrong answer'],
     answer: 1, // index of the correct option above
   },
   ```
   Photos without one yet stay listed in `UPCOMING_MOMENTS` as plain
   placeholders (no quiz) until you're ready to add them.
3. **Reasons I love you** — open `script.js` and edit the `REASONS` array
   with your own list. Add as many as you want.
4. **Birthday date** — the countdown targets September 22 by default
   (`BIRTHDAY_MONTH` / `BIRTHDAY_DAY` at the top of `script.js`). It's
   year-agnostic, so it'll keep counting down to the next occurrence every year.

## View it locally

Just open `index.html` in a browser — no server needed.

## Host it for free (GitHub Pages)

1. Push this repo to GitHub (already done if you're reading this from there).
2. Go to **Settings → Pages** in the repo.
3. Under "Build and deployment", set Source to **Deploy from a branch**,
   branch `main`, folder `/ (root)`.
4. Save — your site will be live at `https://<username>.github.io/happy-birthday/`
   within a minute or two.
