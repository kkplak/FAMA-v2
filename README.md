# FAMA Film

Dwujęzyczna strona portfolio niezależnego studia produkcji filmowej FAMA z Gdańska.

## Stack

- React 18 + TypeScript
- Vite
- React Router
- i18next (PL / EN)
- Framer Motion
- Autorski, responsywny system stylów w `src/App.css`

## Uruchomienie

```bash
npm install
npm run dev
```

Sprawdzenie typów i wersja produkcyjna:

```bash
npm run build
```

Gotowy build trafia do katalogu `dist`.

## Najważniejsze miejsca

- `src/pages/Home.tsx` — hero, intro, portfolio, proces i oferta
- `src/pages/AboutUs.jsx` — zespół oraz galeria behind the scenes
- `src/locales/pl.json` i `src/locales/en.json` — wszystkie treści i dane realizacji
- `src/App.css` — layout, system odstępów, typografia i responsywność
- `public/media` — miniatury, zdjęcia oraz zoptymalizowany showreel

## Aktualizacja realizacji

Każda realizacja korzysta z zestawu kluczy `portN`, `portNSrc`, `portNImg` oraz `portNCredits` w obu plikach językowych. Pierwsze cztery projekty są wyświetlane jako wyróżnione, a pozostałe w rozwijanym archiwum.

## Design i wydajność

Interfejs opiera się na ciepłej czerni, kolorze kości słoniowej, lokalnie dołączonej typografii Cormorant Garamond + Manrope i płynnym systemie spacingu opartym o `clamp()`. Filmowe intro buforuje pierwsze sekundy doświadczenia, a hero korzysta z lekkiego pliku `hero-showreel.mp4`, statycznego postera i dostępnego przycisku play/pause. Delikatne animacje respektują ustawienie `prefers-reduced-motion`.
