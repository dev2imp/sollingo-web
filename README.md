# Sol Lingo Web 🌍

A web-based language learning app built with **React**, **TypeScript**, and **Vite** — a browser version of the original Sol Lingo mobile app (Flutter, available on the Play Store).

> 🎓 Built as a hands-on project to learn React and TypeScript, moving from mobile (Flutter/Kotlin) development into modern web development. Initial scaffolding was AI-assisted; the architecture, exercise logic, and most components were reviewed, debugged, and rewritten independently.

## ✨ Features

- **Interactive exercises** to practice vocabulary and language skills:
  - 🔄 Flip Card — flashcard-style word recall
  - 🔗 Match Words — pairing exercise
  - 🔀 Reorder Words — sentence/word ordering
  - ✅ True / False — quick knowledge checks
- **Progress tracking** with a visual progress bar per level
- **Adjustable text size** for accessibility/readability
- **Level system** — levels and content fetched dynamically via API
- **Session handling** to track user progress across visits

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **Vite** for build tooling and dev server
- Custom hooks (`useTextSize`) for shared UI logic
- Modular architecture: `api`, `components`, `hooks`, `services`, `types`, `utils`, `views`

## 📁 Project Structure

```
src/
├── api/            # API client + level download logic
├── assets/         # Images and static assets
├── components/      # Reusable UI components
│   └── exercises/  # Exercise-specific components (FlipCard, MatchWords, etc.)
├── hooks/          # Custom React hooks
├── services/       # Data normalization and question selection logic
├── types/          # TypeScript type definitions
├── utils/          # Utility functions (e.g. session handling)
└── views/          # Page-level views (Home, Exercise)
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Build for production
npm run build
```

## 📸 Screenshots

<!-- Add your screenshots here, e.g.: -->
<!-- ![Home screen](./screenshots/home.png) -->
<!-- ![Exercise screen](./screenshots/exercise.png) -->

## 🔗 Live Demo

<!-- Add your Vercel / GitHub Pages link once deployed -->
Coming soon.

## 📝 Notes

This web version is a frontend-only client, with no backend or authentication — all logic runs in the browser, with level content fetched from an external API.

## 👤 Author

**Osman Inci**
- GitHub: [@dev2imp](https://github.com/dev2imp)
- LinkedIn: [Osman Inci](https://www.linkedin.com/in/osman-inci-868435221/)