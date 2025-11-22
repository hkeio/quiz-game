import { computed, Injectable, signal } from '@angular/core';
import { Question, QuizResult, UserAnswer } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private questions = signal<Question[]>([
    {
      id: 1,
      text: 'What is the capital of France?',
      answers: [
        { id: 1, text: 'London', isCorrect: false },
        { id: 2, text: 'Paris', isCorrect: true },
        { id: 3, text: 'Berlin', isCorrect: false },
        { id: 4, text: 'Madrid', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'Which of these are programming languages? (Multiple answers)',
      answers: [
        { id: 1, text: 'Python', isCorrect: true },
        { id: 2, text: 'HTML', isCorrect: false },
        { id: 3, text: 'JavaScript', isCorrect: true },
        { id: 4, text: 'CSS', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'What is 2 + 2?',
      answers: [
        { id: 1, text: '3', isCorrect: false },
        { id: 2, text: '4', isCorrect: true },
        { id: 3, text: '5', isCorrect: false },
        { id: 4, text: '22', isCorrect: false },
      ],
    },
    {
      id: 4,
      text: 'Which planets are gas giants? (Multiple answers)',
      answers: [
        { id: 1, text: 'Jupiter', isCorrect: true },
        { id: 2, text: 'Mars', isCorrect: false },
        { id: 3, text: 'Saturn', isCorrect: true },
        { id: 4, text: 'Earth', isCorrect: false },
      ],
    },
    {
      id: 5,
      text: 'Is TypeScript a superset of JavaScript?',
      answers: [
        { id: 1, text: 'Yes', isCorrect: true },
        { id: 2, text: 'No', isCorrect: false },
      ],
    },
  ]);

  private userAnswers = signal<UserAnswer[]>([]);
  private currentQuestionIndex = signal(0);

  readonly allQuestions = this.questions.asReadonly();
  readonly currentQuestion = computed(() => {
    const index = this.currentQuestionIndex();
    return this.questions()[index];
  });

  readonly currentIndex = this.currentQuestionIndex.asReadonly();
  readonly totalQuestions = computed(() => this.questions().length);
  readonly isLastQuestion = computed(
    () => this.currentQuestionIndex() === this.questions().length - 1
  );
  readonly isFirstQuestion = computed(() => this.currentQuestionIndex() === 0);
  readonly isQuizComplete = computed(() => this.userAnswers().length === this.questions().length);

  submitAnswer(questionId: number, selectedAnswerIds: number[]): void {
    const answers = this.userAnswers();
    const existingIndex = answers.findIndex((a) => a.questionId === questionId);

    if (existingIndex >= 0) {
      answers[existingIndex] = { questionId, selectedAnswerIds };
      this.userAnswers.set([...answers]);
    } else {
      this.userAnswers.set([...answers, { questionId, selectedAnswerIds }]);
    }
  }

  nextQuestion(): void {
    if (!this.isLastQuestion()) {
      this.currentQuestionIndex.update((i) => i + 1);
    }
  }

  previousQuestion(): void {
    if (!this.isFirstQuestion()) {
      this.currentQuestionIndex.update((i) => i - 1);
    }
  }

  getResults(): QuizResult[] {
    return this.questions().map((question) => {
      const userAnswer = this.userAnswers().find((a) => a.questionId === question.id);
      const correctAnswerIds = question.answers
        .filter((a) => a.isCorrect)
        .map((a) => a.id)
        .sort();

      const selectedIds = (userAnswer?.selectedAnswerIds || []).sort();
      const isCorrect =
        correctAnswerIds.length === selectedIds.length &&
        correctAnswerIds.every((id, index) => id === selectedIds[index]);

      return {
        questionId: question.id,
        isCorrect,
      };
    });
  }

  getUserAnswer(questionId: number): number[] {
    const answer = this.userAnswers().find((a) => a.questionId === questionId);
    return answer?.selectedAnswerIds || [];
  }

  resetQuiz(): void {
    this.userAnswers.set([]);
    this.currentQuestionIndex.set(0);
  }
}
