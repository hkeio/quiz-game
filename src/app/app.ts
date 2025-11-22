import { Component } from '@angular/core';
import { QuizComponent } from './quiz/quiz.component';

@Component({
  selector: 'app-root',
  imports: [QuizComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
