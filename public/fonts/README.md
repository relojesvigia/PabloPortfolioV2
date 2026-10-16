# Fonts

**Bryndan Write** is a commercial font and is not available on Google Fonts.
It's used only for the small handwritten section labels.

Add your licensed files here with these exact names:

```
public/fonts/BryndanWrite.woff2   (required)
public/fonts/BryndanWrite.woff    (optional, older browsers)
```

The `@font-face` rule lives in `src/styles/tokens.css`. Until the files are
present, labels fall back to **Caveat** (Google Fonts, loaded in `index.html`).

To convert a `.ttf` / `.otf` to `.woff2`, use a converter such as
https://cloudconvert.com/ttf-to-woff2 or the `woff2_compress` CLI.
