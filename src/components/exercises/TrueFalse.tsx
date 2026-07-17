import { useState } from "react";
import Button from "../Button";
import type { SingleItemQuestion } from "../../services/questionSelector";

interface TrueFalseProps {
  question: SingleItemQuestion;
  onAnswered: (isCorrect: boolean) => void;

}

function TrueFalse({ question, onAnswered }: TrueFalseProps) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);

  const handleAnswer = (answer: boolean) => {
    if (hasSubmitted) return;

    setUserAnswer(answer);
    setHasSubmitted(true);

    //const isCorrect = answer === question.isStatementTrue;
    //onAnswered(isCorrect);
  };
  const handleNext = () => {
   onAnswered(question.isStatementTrue === userAnswer);    
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
      <div className="w-full rounded-3xl bg-blue-100 border-2 border-gray-200 shadow-sm flex flex-col items-center justify-center gap-3 px-6 py-8">
        <p className="text-xl font-semibold text-gray-800 text-center break-words">
          {question.item.word}
        </p>
        <p className="text-base text-green-900 font-semibold text-center break-words border-t border-gray-100 pt-4 w-full">
          {question.displayedTranslation}
        </p>
      
      </div>

      {!hasSubmitted ? (
        <div className="flex gap-4">
          <Button text="True" onClick={() => handleAnswer(true)}  variant="secondary"/>
          <Button text="False" onClick={() => handleAnswer(false)} variant="secondary" />
        </div>
      ) : (
        <p
          className={
            userAnswer === question.isStatementTrue
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {userAnswer === question.isStatementTrue
            ? "Correct!"
            : `Not quite — the correct answer was ${question.isStatementTrue ? "True" : "False"} (real translation: ${question.item.translation})`}
        </p>
      )}
      <div className="flex gap-4">
        <Button text="Next" onClick={() => handleNext()} variant="primary" disabled={!hasSubmitted} />
        <Button text="🔊" onClick={() => playAudio()}/>
      </div> 
    </div>
  );
}

export default TrueFalse;