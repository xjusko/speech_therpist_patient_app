import { useNavigate } from "react-router-dom";
import { Paths } from "../App";

export function shuffle(array: any[]) {
  const result = [...array].sort(() => Math.random() - 0.5);
  return result;
}

export function navigateToSummaryScreen(
  questionsCount: number,
  countCorrect: number
) {
  const navigate = useNavigate();
  navigate(Paths.ExerciseSummary, {
    state: {
      totalQuestions: questionsCount,
      correctQuestions: countCorrect,
    },
  });
}
