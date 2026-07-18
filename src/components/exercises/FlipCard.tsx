import { useState } from "react";
import Button from "../Button";
import type { SingleItemQuestion } from "../../services/questionSelector";

interface FlipCardProps {
  question: SingleItemQuestion;
  onAnswered: (isCorrect: boolean) => void;
}

const SIMILARITY_THRESHOLD = 0.8;

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

function getSimilarity(input: string, target: string): number {
  const a = input.trim().toLowerCase();
  const b = target.trim().toLowerCase();
  if (a === b) return 1;
  const distance = levenshteinDistance(a, b);
  const maxLength = Math.max(a.length, b.length);
  if (maxLength === 0) return 1;
  return 1 - distance / maxLength;
}

function FlipCard({ question, onAnswered }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!question.item.audioUrl) return;
    const audio = new Audio(question.item.audioUrl);
    audio.play().catch(() => {
      // audio failed to load/play — fail silently
    });
  };

  const handleSubmit = () => {
    const similarity = getSimilarity(userInput, question.item.word);
    const correct = similarity >= SIMILARITY_THRESHOLD;
    setIsCorrect(correct);
    setHasSubmitted(true);
    //onAnswered(correct);
  };
  const handleNext = () => {
   onAnswered(question.isStatementTrue === isCorrect);    
  }
  

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-6">
      <div
        onClick={() => setIsFlipped((prev) => !prev)}
        className="w-full h-48 cursor-pointer"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front: language you know + audio button (plays target-language pronunciation) */}
          <div
            className="absolute inset-0 rounded-2xl bg-emerald-600 shadow-md flex flex-col items-center justify-center gap-4 px-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-2xl font-semibold text-white text-center break-words">
              {question.item.translation}
            </p>
            {question.item.audioUrl && (
              <button
                onClick={playAudio}
                aria-label="Listen"
                className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 active:scale-90 transition-all"
              >
                🔊
              </button>
            )}
            <p className="text-xs text-white/70">Tap card to reveal the word</p>
          </div>

          {/* Back: target-language text, no audio, silent visual reveal */}
          <div
            className="absolute inset-0 rounded-2xl bg-white border-2 border-emerald-600 shadow-md flex flex-col items-center justify-center px-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-2xl font-semibold text-emerald-700 text-center break-words">
              {question.item.word}
            </p>
            <p className="text-xs text-gray-400 mt-2">Tap card to go back</p>
          </div>
        </div>
      </div>

      {!hasSubmitted ? (
        <div className="w-full flex flex-col gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type what you heard..."
            className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-emerald-600"
          />
          <Button text="Check" onClick={handleSubmit} disabled={userInput.trim() === ""} />
        </div>
      ) : (
        <p className={isCorrect ? "text-emerald-700 font-semibold" : "text-red-600 font-semibold"}>
          {isCorrect ? "Correct!" : `correct answer: ${question.item.word}`}
        </p>
      )}
      <Button text="Next" onClick={() => handleNext()} variant="primary" disabled={!hasSubmitted} />
    </div>
  );
}

export default FlipCard;