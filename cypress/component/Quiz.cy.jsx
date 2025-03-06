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
describe("<Quiz />", () => {
  it("should render the Quiz component", () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Quiz questions={questions} />);
    cy.get(".card").should("have.length", 1);
  });

  it("should render the Quiz component with the proper content", () => {
    cy.mount(<Quiz questions={questions} />);

    cy.get(".card h2").should("have.text", "What is Cypress?");
    cy.get(".alert").should("have.length", 4);
    cy.get(".alert").eq(0).should("have.text", "A version control system");
    cy.get(".alert").eq(1).should("have.text", "A database management tool");
    cy.get(".alert").eq(2).should("have.text", "A JavaScript testing framework");
    cy.get(".alert").eq(3).should("have.text", "A programming language");
  });

  it("should move to the next question when answer is clicked", () => {
    cy.mount(<Quiz questions={questions} />);

    cy.get(".btn").first().click();

    cy.get(".card h2").should("have.text", "Which language is used to write Cypress tests?");
  });

  it("should finish the quiz after the last question", () => {
    cy.mount(<Quiz questions={questions} />);

    cy.get(".btn").first().click();

    cy.get(".btn").first().click();

    cy.contains("Quiz Completed").should("exist");
  });
});
