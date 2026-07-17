import { useState } from "react";
import Home from "./views/Home";
import "./App.css";
import Exercise from "./views/Exercise";
import TextSizeControl from "./components/TextSizeController";

type ViewName = "home"  | "exercise";

function App() {
  const [currentView, setCurrentView] = useState<ViewName>("home");
  const [spokenLanguageCode, setSpokenLanguageCode] = useState<string | null>(null);
  const [targetLanguageCode, setTargetLanguageCode] = useState<string | null>(null);
  const [level, setLevel] = useState<number>(1);

  return (
    <>
      {currentView === "home" && (
        <Home
          onStart={(spoken, target, level) => {
            setSpokenLanguageCode(spoken);
            setTargetLanguageCode(target);
            setLevel(level);
            setCurrentView("exercise");
          }}
        />
      )}
      {currentView === "exercise" && targetLanguageCode && (
        <Exercise
          languagePairId={`${spokenLanguageCode}-${targetLanguageCode}`}
          level={level}
          onBack={() => setCurrentView("home")}
        />
      )}
      <TextSizeControl />
    </>
  );
}

export default App;