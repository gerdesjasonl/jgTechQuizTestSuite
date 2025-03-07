import { mount } from "cypress/react";
import Quiz from "../../client/src/components/Quiz";

const questions = [
  {
    question: "What is Cypress?",
    answers: [
      {
        text: "A version control system",
        isCorrect: false,
      },
      {
        text: "A database management tool",
        isCorrect: false,
      },
      {
        text: "A JavaScript testing framework",
        isCorrect: true,
      },
      {
        text: "A programming language",
        isCorrect: false,
      },
    ],
  },
  {
    question: "Which language is used to write Cypress tests?",
    answers: [
      {
        text: "Python",
        isCorrect: false,
      },
      {
        text: "Java",
        isCorrect: false,
      },
      {
        text: "JavaScript",
        isCorrect: true,
      },
      {
        text: "Ruby",
        isCorrect: false,
      },
    ],
  },
];
describe("Quiz Component", () => {
  it("should render the Quiz component", () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Quiz questions={questions} />);
    cy.get(".card").should("have.length", 0);
  });

  it("should render the Quiz component with the proper content", () => {
    cy.get("h2").should("contain", 'What is Cypress?');
    cy.get("button").should("have.length", 4);
    cy.get("button").eq(0).contains('A version control system');
    cy.get("button").eq(1).contains('A database management tool');
    cy.get("button").eq(2).contains('A JavaScript testing framework');
    cy.get("button").eq(3).contains('A programming language');
  });

  it("should move to the next question when button is clicked", () => {
    cy.mount(<Quiz questions={questions} />);

    cy.get("button").contains('A JavaScript testing framework').click();

    cy.get("h2").contains('Which language is used to write Cypress tests?');
  });

  it("should finish the quiz after the last question", () => {
    cy.mount(<Quiz questions={questions} />);

    cy.get("button").contains('A JavaScript testing framework').click();

    cy.get("h2").contains('Which language is used to write Cypress tests?');

    cy.get("button").contains('JavaScript').click();

    cy.contains("Quiz Completed").should("exist");
  });
});
