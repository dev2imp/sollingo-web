import { useEffect, useState } from "react";

const MIN_SCALE = 0.8;
const MAX_SCALE = 1.4;
const STEP = 0.1;
const STORAGE_KEY = "sollingo_text_scale";

export function useTextSize() {
  const [scale, setScale] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseFloat(saved) : 1;
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${scale * 100}%`;
    localStorage.setItem(STORAGE_KEY, scale.toString());
  }, [scale]);

  const increase = () => setScale((prev) => Math.min(MAX_SCALE, +(prev + STEP).toFixed(1)));
  const decrease = () => setScale((prev) => Math.max(MIN_SCALE, +(prev - STEP).toFixed(1)));

  return {
    scale,
    increase,
    decrease,
    isAtMax: scale >= MAX_SCALE,
    isAtMin: scale <= MIN_SCALE,
  };
}