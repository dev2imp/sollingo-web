import type { LevelItem } from "../types/levelItems";

export type SingleQuestionType = "reorder" | "flipCard" | "trueFalse";

export interface SingleItemQuestion {
  kind: "single";
  questionType: SingleQuestionType;
  item: LevelItem;
  shouldShuffle?: boolean;
  displayedTranslation?: string;
  isStatementTrue?: boolean;
}

export interface MatchGroupQuestion {
  kind: "match";
  items: LevelItem[];
}

export type ExerciseQuestion = SingleItemQuestion | MatchGroupQuestion;

const MAX_MATCH_GROUP_SIZE = 4;
const TARGET_QUESTION_COUNT = 15;

function getWordCount(phrase: string): number {
  return phrase.trim().split(/\s+/).length;
}

function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getEligibleSingleTypes(item: LevelItem): SingleQuestionType[] {
  const wordCount = getWordCount(item.word);
  const types: SingleQuestionType[] = [];
  if (wordCount >= 2) types.push("reorder");
  types.push("trueFalse");
  types.push("flipCard");
  return types;
}

function buildSingleQuestion(
  item: LevelItem,
  allItems: LevelItem[],
  chosenType: SingleQuestionType
): SingleItemQuestion {
  const wordCount = getWordCount(item.word);
  const question: SingleItemQuestion = {
    kind: "single",
    questionType: chosenType,
    item,
  };

  if (chosenType === "reorder") {
    question.shouldShuffle = wordCount <= 3;
  }

  if (chosenType === "trueFalse") {
    const isStatementTrue = Math.random() < 0.5;
    question.isStatementTrue = isStatementTrue;

    if (isStatementTrue) {
      question.displayedTranslation = item.translation;
    } else {
      const otherItems = allItems.filter((other) => other.id !== item.id);
      const randomOther = otherItems[Math.floor(Math.random() * otherItems.length)];
      question.displayedTranslation = randomOther ? randomOther.translation : item.translation;
    }
  }

  return question;
}

export function buildExerciseQuestions(bank: LevelItem[]): ExerciseQuestion[] {
  const questions: ExerciseQuestion[] = [];

  const typeUsageCount: Record<SingleQuestionType | "match", number> = {
    reorder: 0,
    flipCard: 0,
    trueFalse: 0,
    match: 0,
  };

  const itemUsedTypes = new Map<string, Set<SingleQuestionType>>();
  bank.forEach((item) => itemUsedTypes.set(item.id, new Set()));

  // Step 1: group short items (<=2 words) into match questions
  const matchEligible = bank.filter((item) => getWordCount(item.word) <= 2);
  const matchGroups = chunk(shuffle(matchEligible), MAX_MATCH_GROUP_SIZE).filter(
    (group) => group.length >= 2
  );

  matchGroups.forEach((group) => {
    questions.push({ kind: "match", items: group });
    typeUsageCount.match++;
  });

  // Step 2: guarantee every item appears at least once
  bank.forEach((item) => {
    const eligibleTypes = getEligibleSingleTypes(item);
    const chosenType = eligibleTypes.reduce((leastUsed, type) =>
      typeUsageCount[type] < typeUsageCount[leastUsed] ? type : leastUsed
    );
    typeUsageCount[chosenType]++;
    itemUsedTypes.get(item.id)!.add(chosenType);
    questions.push(buildSingleQuestion(item, bank, chosenType));
  });

  // Step 3: top up to TARGET_QUESTION_COUNT by reusing items fairly
  let cursor = 0;
  while (questions.length < TARGET_QUESTION_COUNT) {
    const candidates = [...bank].sort(
      (a, b) => itemUsedTypes.get(a.id)!.size - itemUsedTypes.get(b.id)!.size
    );
    const item = candidates[cursor % candidates.length];
    cursor++;

    const eligibleTypes = getEligibleSingleTypes(item);
    const usedTypes = itemUsedTypes.get(item.id)!;
    const unusedTypes = eligibleTypes.filter((type) => !usedTypes.has(type));
    const typesToChooseFrom = unusedTypes.length > 0 ? unusedTypes : eligibleTypes;

    const chosenType = typesToChooseFrom.reduce((leastUsed, type) =>
      typeUsageCount[type] < typeUsageCount[leastUsed] ? type : leastUsed
    );

    typeUsageCount[chosenType]++;
    usedTypes.add(chosenType);
    questions.push(buildSingleQuestion(item, bank, chosenType));
  }

  return shuffle(questions);
}