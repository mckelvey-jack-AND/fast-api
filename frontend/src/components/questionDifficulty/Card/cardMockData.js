export const easyQuestionMockProp = {
  title: "Individuals easiest question this week",
  question: {
    question_text: "What is the capital of France?",
    answer_text: "Paris",
  },
  type: "easy",
};

export const hardQuestionMockProp = {
  ...easyQuestionMockProp,
  type: "hard",
  title: "Individuals hardest question this week",
};
