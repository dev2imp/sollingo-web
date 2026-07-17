> Create all necessary file and sub files at once :

New-Item -ItemType File -Force -Path `
"src/views/Home.tsx", `
"src/views/SelectLanguage.tsx", `
"src/views/Exercise.tsx", `
"src/components/Button.tsx", `
"src/components/BackArrow.tsx", `
"src/components/Word.tsx", `
"src/components/exercises/ReorderWords.tsx", `
"src/components/exercises/FlipCard.tsx", `
"src/components/exercises/MatchWords.tsx", `
"src/components/exercises/TrueFalse.tsx", `
"src/types/languagePair.ts", `
"src/types/levelItems.ts", `
"src/types/user.ts", `
"src/api/client.ts", `
"src/api/downloadLevel.ts", `
"src/utils/userSession.ts", `
"src/hooks/useUserSession.ts", `
"src/services/questionSelector.ts"

>Verify by checking file tree:
 tree src /F