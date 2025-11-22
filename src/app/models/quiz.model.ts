export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export interface UserAnswer {
  questionId: number;
  selectedAnswerIds: number[];
}

export interface QuizResult {
  questionId: number;
  isCorrect: boolean;
}
