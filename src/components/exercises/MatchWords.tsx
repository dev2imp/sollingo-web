import { useMemo, useState } from "react";
import Word from "../Word";
import type { LevelItem } from "../../types/levelItems";
import Button from "../Button";

interface MatchWordsProps {
  items: LevelItem[]; // 2 to 4 items to match at once
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

function MatchWords({ items, onAnswered }: MatchWordsProps) {
  const shuffledWords = useMemo(() => shuffle(items), [items]);
  const shuffledTranslations = useMemo(() => shuffle(items), [items]);

  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [selectedTranslationId, setSelectedTranslationId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongPairIds, setWrongPairIds] = useState<{ word: string; translation: string } | null>(
    null
  );
  const [mistakeCount, setMistakeCount] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);

  const handleWordClick = (item: LevelItem) => {
    console.log("Word clicked:", item.word);
    //as the word is cliked we play the audio for the word
    const audio = new Audio(item.audioUrl);
    audio.play().catch(() => {
        // audio failed to load/play — fail silently
        });
        
  
    if (matchedIds.has(item.id) || hasFinished) return;
    setWrongPairIds(null);
    setSelectedWordId(item.id);


    if (selectedTranslationId) {
      checkMatch(item.id, selectedTranslationId);
    }
  };
  const handleTranslationClick = (item: LevelItem) => {
    if (matchedIds.has(item.id) || hasFinished) return;
    setWrongPairIds(null);
    setSelectedTranslationId(item.id);

    if (selectedWordId) {
      checkMatch(selectedWordId, item.id);
    }
  };

  const checkMatch = (wordId: string, translationId: string) => {
    if (wordId === translationId) {
      const newMatched = new Set(matchedIds);
      newMatched.add(wordId);
      setMatchedIds(newMatched);
      setSelectedWordId(null);
      setSelectedTranslationId(null);

      if (newMatched.size === items.length) {
        setHasFinished(true);
      }
    } else {
      setMistakeCount((prev) => prev + 1);
      setWrongPairIds({ word: wordId, translation: translationId });

      setTimeout(() => {
        setSelectedWordId(null);
        setSelectedTranslationId(null);
        setWrongPairIds(null);
      }, 600);
    }
  };
   const handleNext = () => {
   onAnswered(mistakeCount === 0);    
  }

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-8">
      <p className="text-sm text-gray-500 text-center">Tap a word, then tap its meaning</p>

      <div className="w-full flex justify-between gap-6">
        <div className="flex-1 flex flex-col items-center gap-3">
          {shuffledWords.map((item) => (
            <Word
              key={item.id}
              text={item.word}
              onClick={() => handleWordClick(item)}
              isSelected={selectedWordId === item.id && wrongPairIds?.word !== item.id}
              disabled={matchedIds.has(item.id)}
            />
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center gap-3">
          {shuffledTranslations.map((item) => (
            <Word
              key={item.id}
              text={item.translation}
              onClick={() => handleTranslationClick(item)}
              isSelected={
                selectedTranslationId === item.id && wrongPairIds?.translation !== item.id
              }
              disabled={matchedIds.has(item.id)}
            />
          ))}
        </div>
      </div>

      {hasFinished && (
        <p className={mistakeCount === 0 ? "text-emerald-700 font-semibold" : "text-amber-600 font-semibold"}>
          {mistakeCount === 0 ? "Perfect match!" : `Matched with ${mistakeCount} mistake${mistakeCount > 1 ? "s" : ""}`}
        </p>
      )}
       <Button text="Next" onClick={() => handleNext()} variant="primary" disabled={!hasFinished} />
    </div>
  );
}

export default MatchWords;