import { useState, useEffect } from "react";
import Button from "../components/Button";
import { SUPPORTED_LANGUAGES } from "../types/languagePair";
import { getUserSession, saveUserSession } from "../utils/userSession";

interface HomeProps {
  onStart: (spokenLanguageCode: string, targetLanguageCode: string, level: number) => void;
}
function Home({ onStart }: HomeProps) {
  const [spokenLanguage, setSpokenLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [level, setLevel] = useState(1);
  useEffect(() => {
    const session = getUserSession();
    if (session) {
      setSpokenLanguage(session.selectedLanguagePair.source.code);
      setTargetLanguage(session.selectedLanguagePair.target.code);
      setLevel(session.selectedLevel);
    }
  }, []);
  const canStart = spokenLanguage !== "" && targetLanguage !== "";
  const handleStart = () => {
    const sourceLang = SUPPORTED_LANGUAGES.find((l) => l.code === spokenLanguage)!;
    const targetLang = SUPPORTED_LANGUAGES.find((l) => l.code === targetLanguage)!;
    saveUserSession({
      selectedLanguagePair: { id: `${sourceLang.code}-${targetLang.code}`, source: sourceLang, target: targetLang },
      selectedLevel: level,
    });
    onStart(spokenLanguage, targetLanguage, level);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Sollingo</h1>

      <div className="w-full max-w-xs flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">I speak</label>
          <select
            value={spokenLanguage}
            onChange={(e) => setSpokenLanguage(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 focus:outline-none focus:border-emerald-600"
          >
            <option value="" disabled>Select your language</option>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">I want to learn</label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 focus:outline-none focus:border-emerald-600"
          >
            <option value="" disabled>Select a language</option>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>

      <Button text="Start" onClick={handleStart} disabled={!canStart} />
    </div>
  );
}

export default Home;