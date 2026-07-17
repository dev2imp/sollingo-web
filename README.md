sollingo-app/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   ├── index.css
│   ├── views/
│   │   ├── Home.tsx
│   │   ├── SelectLanguage.tsx
│   │   └── Exercise.tsx
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── BackArrow.tsx
│   │   └── Word.tsx
│   ├── types/
│   │   ├── languagePair.ts
│   │   ├── levelItems.ts
│   │   └── user.ts
│   ├── api/
│   │   ├── client.ts        ← new: base fetch config
│   │   └── downloadLevel.ts
│   ├── utils/
│   │   └── userSession.ts
│   └── hooks/                ← new
│       └── useUserSession.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts