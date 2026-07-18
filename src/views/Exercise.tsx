import { useEffect, useState } from "react";
import BackArrow from "../components/BackArrow";
import FlipCard from "../components/exercises/FlipCard";
import ReorderWords from "../components/exercises/ReorderWords";
import TrueFalse from "../components/exercises/TrueFalse";
import MatchWords from "../components/exercises/MatchWords";
import { downloadLevel } from "../api/downloadLevel";
import { normalizeLevelItems } from "../services/normalizeLevelItems";
import type { ExerciseQuestion } from "../services/questionSelector";
import { buildExerciseQuestions } from "../services/questionSelector";
import type { LanguageCode } from "../types/levelItems";
import {saveUserSession } from "../utils/userSession";
import ProgressBar from "../components/ProgressBar";
import LevelComplete from "../components/LevelComplete";
import Loading from "../components/Loading";
import {addFavoritePhrases,removeItemFromFavoritePhrases,getFavoritePhrases} from "../utils/favoritePhrases";
import FavoriteStar from "../components/ButtonStar";


interface ExerciseProps {
  languagePairId: string; // e.g. "en-tr"
  level: number; //level from user session
  onBack: () => void;//back arrow to go back to home screen
}

function Exercise({ languagePairId, level, onBack }: ExerciseProps) {
  const [questions, setQuestions] = useState<ExerciseQuestion[] | null>(null);
  const [favoritePhraseKey, setFavoritePhraseKey] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [currentLevel, setcurrentLevel] = useState(level);

  useEffect(() => {
        const [sourceLang, targetLang] = languagePairId.split("-") as [LanguageCode, LanguageCode];

    setIsLoading(true);
    setError(null);
    setIsFinished(false);
    setCurrentIndex(0);
    setCorrectCount(0);
    const favorites= getFavoritePhrases();
    if(favorites && Object.keys(favorites).length>9){
      setFavoritePhraseKey(Object.keys(favorites));
      setQuestions(Object.values(favorites));
      setIsLoading(false);
      return;
    }
    downloadLevel(currentLevel)
      .then((rawItems) => {
        const normalizedItems = normalizeLevelItems(rawItems, sourceLang, targetLang);
        const builtQuestions = buildExerciseQuestions(normalizedItems);
        setQuestions(builtQuestions);
      })
      .catch(() => {
        setError("Couldn't load this level. Check your connection and try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [languagePairId, currentLevel]);

  const handleAnswered = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    if (questions && currentIndex === questions.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleNewLevel = () => {
    setcurrentLevel((prev) => prev + 1);
const [source, target] = languagePairId.split("-") as [LanguageCode, LanguageCode];
    const sourceLang = { code: source, name: source.toUpperCase() };
    const targetLang = { code: target, name: target.toUpperCase() };
     saveUserSession({
      selectedLanguagePair: { id: `${languagePairId}`, source: sourceLang, target: targetLang },
      selectedLevel: currentLevel + 1,
    });
  }

  const handleFavoritePhrase = () => {
    // Implement the logic to save the favorite phrase
    const currentQuestion = questions ? questions[currentIndex] : null;;
    addFavoritePhrases(currentQuestion as ExerciseQuestion);
  }
  const handleRemoveFavoritePhrase = () => {
      const keyToRemove = favoritePhraseKey[currentIndex];
      removeItemFromFavoritePhrases(keyToRemove);
  }


  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <BackArrow onClick={onBack} />
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <BackArrow onClick={onBack} />
        <p className="text-gray-500">No questions available for this level.</p>
      </div>
    );
  }
  if (isFinished) {
    return (
      <LevelComplete
        levelName={currentLevel}
        correctCount={correctCount}
        totalCount={questions.length}
        onNewLevel={handleNewLevel}
      />
    );
  }
  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <BackArrow onClick={onBack} />
        
        
        <ProgressBar progress={currentIndex} max={questions.length} />
        <FavoriteStar
          isFavorited={favoritePhraseKey.length > 0}
          onClick={() => {
            if (favoritePhraseKey.length > 0) {
              handleRemoveFavoritePhrase();
            } else {
              handleFavoritePhrase();
            }
          }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {currentQuestion.kind === "match" && (
          <MatchWords key={currentIndex} items={currentQuestion.items} onAnswered={handleAnswered} />
        )}
        {currentQuestion.kind === "single" && currentQuestion.questionType === "flipCard" && (
          <FlipCard key={currentIndex} question={currentQuestion} onAnswered={handleAnswered} />
        )}

        {currentQuestion.kind === "single" && currentQuestion.questionType === "reorder" && (
          <ReorderWords key={currentIndex} question={currentQuestion} onAnswered={handleAnswered} />
        )}

        {currentQuestion.kind === "single" && currentQuestion.questionType === "trueFalse" && (
          <TrueFalse key={currentIndex} question={currentQuestion} onAnswered={handleAnswered}   />
        )}
      </div>
    </div>
  );
}

export default Exercise;