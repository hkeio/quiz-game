import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  private quizService = inject(QuizService);

  selectedAnswers = signal<Set<number>>(new Set());
  showSummary = signal(false);

  readonly currentQuestion = this.quizService.currentQuestion;
  readonly currentIndex = this.quizService.currentIndex;
  readonly totalQuestions = this.quizService.totalQuestions;
  readonly isLastQuestion = this.quizService.isLastQuestion;
  readonly isFirstQuestion = this.quizService.isFirstQuestion;

  readonly results = computed(() => {
    if (!this.showSummary()) return [];

    const results = this.quizService.getResults();
    const questions = this.quizService.allQuestions();

    return results.map((result) => {
      const question = questions.find((q) => q.id === result.questionId);
      return {
        questionText: question?.text || '',
        isCorrect: result.isCorrect,
      };
    });
  });

  readonly correctCount = computed(() => this.results().filter((r) => r.isCorrect).length);

  readonly incorrectCount = computed(() => this.results().filter((r) => !r.isCorrect).length);

  toggleAnswer(answerId: number): void {
    const selected = new Set(this.selectedAnswers());
    if (selected.has(answerId)) {
      selected.delete(answerId);
    } else {
      selected.add(answerId);
    }
    this.selectedAnswers.set(selected);
  }

  isSelected(answerId: number): boolean {
    return this.selectedAnswers().has(answerId);
  }

  submitAndNext(): void {
    const questionId = this.currentQuestion().id;
    const selectedIds = Array.from(this.selectedAnswers());

    if (selectedIds.length === 0) {
      return;
    }

    this.quizService.submitAnswer(questionId, selectedIds);

    if (this.isLastQuestion()) {
      this.showSummary.set(true);
    } else {
      this.quizService.nextQuestion();
      this.loadCurrentAnswers();
    }
  }

  previous(): void {
    this.quizService.previousQuestion();
    this.loadCurrentAnswers();
  }

  private loadCurrentAnswers(): void {
    const questionId = this.currentQuestion().id;
    const savedAnswers = this.quizService.getUserAnswer(questionId);
    this.selectedAnswers.set(new Set(savedAnswers));
  }

  getResults(): { questionText: string; isCorrect: boolean }[] {
    const results = this.quizService.getResults();
    const questions = this.quizService.allQuestions();

    return results.map((result) => {
      const question = questions.find((q) => q.id === result.questionId);
      return {
        questionText: question?.text || '',
        isCorrect: result.isCorrect,
      };
    });
  }

  restartQuiz(): void {
    this.quizService.resetQuiz();
    this.selectedAnswers.set(new Set());
    this.showSummary.set(false);
  }
}
