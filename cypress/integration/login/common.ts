import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on login page`, () => {
  cy.visit('/auth/login');
});

Then('I should see login form', () => {
  cy.get('[data-cy="loginForm"]').should('be.visible');
});

Then('I should see button', (dataTable) => {
  dataTable.hashes().forEach((item: { button: string }) => {
    cy.get(`[data-cy="${item.button}"]`).should('be.visible');
  });
});

When('I complete fill in login form', (dataTable) => {
  dataTable.hashes().forEach((item: { email: string, password: string }) => {
    cy.get('[data-cy="email"]').type(item.email);
    cy.get('[data-cy="password"]').type(item.password);
  });
});

And('I click on Login button', () => {
  cy.get('[data-cy="loginBtn"]').click();
});


Then('I should see reviewer homepage', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/');
});

Then('I should see restaurant homepage', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/restaurant/');
});

When(`I click on "Don't have an account ?"`, () => {
  cy.get(`[data-cy="doNotHaveAccountBtn"]`).click();
});

Then('I should be on Register page', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/auth/register');
});

// When(`I click on "Forget your password"`, () => {
//   cy.get('[data-cy="forgetPasswordBtn"]').click();
// });

// Then('I should be on Reset password page', () => {
//   cy.location('pathname', { timeout: 5000 }).should('eq', '/auth/reset-password');
// });