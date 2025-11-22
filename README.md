# Quiz Web App

A simple, mobile-first quiz application built with Angular 21.

## Features

- ✅ Define questions with multiple answers (single or multiple correct answers)
- ✅ One question displayed at a time
- ✅ Progress indicator showing current question
- ✅ Navigate forward and backward through questions
- ✅ Summary screen showing which questions were correct/incorrect (without revealing correct answers)
- ✅ Restart quiz functionality
- ✅ Mobile-first responsive design
- ✅ Standalone Angular components with signals

## Getting Started

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser.

> Note: All project files are now in the root directory.

### Running Tests

```bash
# Run all Playwright tests
npx playwright test

# Run specific test file
npx playwright test e2e/quiz.spec.ts
```

## How to Add Questions

Edit `src/app/services/quiz.service.ts` and add questions to the array:

```typescript
{
  id: 6,
  text: 'Your question here?',
  answers: [
    { id: 1, text: 'Answer 1', isCorrect: false },
    { id: 2, text: 'Answer 2', isCorrect: true },
    { id: 3, text: 'Answer 3', isCorrect: true }  // Multiple correct answers supported
  ]
}
```

## Test Results

All tests passing ✅

- 7 tests passed
- No console errors detected
- Mobile viewport tested
