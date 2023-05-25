export const resultMockPropForSquad = {
  type: "squad",
  isBestResult: true,
  date: "June 9th 2023",
  position: 1,
  occurrences: 2,
};

export const resultMockPropForIndividual = {
  ...resultMockPropForSquad,
  type: "individual",
};

export const resultMockPropForOneOccurrence = {
  ...resultMockPropForSquad,
  occurrences: 1,
};
