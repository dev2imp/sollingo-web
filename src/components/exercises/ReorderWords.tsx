import { useMemo, useState } from "react";
import Word from "../Word";
import type { SingleItemQuestion } from "../../services/questionSelector";
import Button from "../Button";

interface ReorderWordsProps {
  question: SingleItemQuestion;
  onAnswered: (isCorrect: boolean) => void;
}

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function ReorderWords({ question, onAnswered }: ReorderWordsProps) {
  const correctWords = useMemo(() => question.item.word.trim().split(/\s+/), [question]);

  const displayWords = useMemo(() => {
    return question.shouldShuffle ? shuffle(correctWords) : correctWords;
  }, [correctWords, question.shouldShuffle]);

  const [availableWords, setAvailableWords] = useState(displayWords);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleWordClick = (word: string, index: number) => {
    if (hasSubmitted) return;

    const newSelected = [...selectedWords, word];
    const newAvailable = [...availableWords];
    newAvailable.splice(index, 1);

    setSelectedWords(newSelected);
    setAvailableWords(newAvailable);

    if (newAvailable.length === 0) {
      const isAnswerCorrect = newSelected.join(" ") === correctWords.join(" ");
      setIsCorrect(isAnswerCorrect);
      setHasSubmitted(true);
      //onAnswered(isAnswerCorrect);
    }
  };
   const handleNext = () => {
   onAnswered(question.isStatementTrue === isCorrect);    
  }
    const playAudio = (e?: React.MouseEvent) => {
  e?.stopPropagation();
  if (!question.item.audioUrl) return;
  const audio = new Audio(question.item.audioUrl);
  audio.play().catch(() => {
    // audio failed to load/play — fail silently
  });
};

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-8">
      <div className="w-full text-center">
        
        <p className="text-lg font-semibold text-gray-800 break-words">
          {question.item.translation}
        </p>
      </div>

      <p className="text-sm text-gray-500 text-center">
        {question.shouldShuffle
          ? ""
          : ""}
      </p>
     

      <div className="min-h-[56px] w-full flex flex-wrap justify-center gap-2 px-2 py-3 border-b-2 border-gray-200">
        {selectedWords.length === 0 && (
          <p className="text-gray-300 text-sm"></p>

        )}
        {selectedWords.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium break-words"
          >
            {word}
          </span>
        ))}
        
      </div>
 
      <div className="flex flex-wrap justify-center gap-3">
         
        {availableWords.map((word, index) => (
          <Word key={`${word}-${index}`} text={word} onClick={() => handleWordClick(word, index)} />
        ))}
       
      </div>
      {hasSubmitted && (
        <p className={isCorrect ? "text-emerald-700 font-semibold" : "text-red-600 font-semibold"}>
          {isCorrect ? "Correct!" : `Not quite — correct answer: ${correctWords.join(" ")}`}
        </p>
      )}
      <div className="flex gap-4">
        <Button text="Next" onClick={() => handleNext()} variant="primary" disabled={!hasSubmitted} />
        <Button text="🔊" onClick={() => playAudio()}/>
      </div>      
    </div>
  );
}

export default ReorderWords;