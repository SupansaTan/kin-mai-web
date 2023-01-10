import { Then, When } from "cypress-cucumber-preprocessor/steps";

/* Scenario: User fill in form invalid */
When('I fill in some form in login form', (dataTable) => {
  dataTable.hashes().forEach((item: { email: string }) => {
    cy.get('[data-cy="email"]').type(item.email);
  });
});

Then('I should see error message and red border on invalid field', () => {
  cy.get('[data-cy="password"]').should('have.class', 'border-danger');
  cy.get('[data-cy="password-invalid"]').should('be.visible');
});
