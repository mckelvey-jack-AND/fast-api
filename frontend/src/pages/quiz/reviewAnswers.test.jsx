import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewAnswers from './ReviewAnswers';

describe('ReviewAnswers', () => {
  const questions = ['Question 1', 'Question 2', 'Question 3'];
  const answers = ['Answer 1', 'Answer 2', 'Answer 3'];
  const correctAnswers = ['Answer 1', 'Answer 2', 'Answer 3'];

  it('renders the "View Answers" button', () => {
    render(<ReviewAnswers questions={questions} answers={answers} correctAnswers={correctAnswers} />);

    const viewAnswersButton = screen.getByText('View Answers');
    expect(viewAnswersButton).toBeInTheDocument();
  });

  it('toggles the visibility of questions/answers when "View Answers" button is clicked', () => {
    render(<ReviewAnswers questions={questions} answers={answers} correctAnswers={correctAnswers} />);

    const viewAnswersButton = screen.getByText('View Answers');
    fireEvent.click(viewAnswersButton);

    expect(screen.getByText('Question 1')).toBeInTheDocument();

    fireEvent.click(viewAnswersButton);

    expect(screen.queryByText('Question 1')).not.toBeInTheDocument();
  });


});
