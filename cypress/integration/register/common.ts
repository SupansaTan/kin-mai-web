import { And, Given, Then } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on register page`, () => {
  cy.visit('/auth/register');
});

Then('I should see register form', () => {
  cy.get('[data-cy="selectUserTypeForm"]').should('be.visible');
});

// select user type
And('I click register as reviewer', () => {
  cy.get('[data-cy="reviewerOption"]').click();
});

And('I click register as restaurant owner', () => {
  cy.get('[data-cy="restaurantOption"]').click();
});

// click submit & next button
And('I click "Submit" button', () => {
  cy.get('[data-cy="submitBtn"]').click();
});

And('I click "Next" button', () => {
  cy.get('[data-cy="submitBtn"]').click();
});

// modal
Then('I should see modal "Create account successful"', () => {
  cy.get('[data-cy="successModal"]').should('be.visible');
});
