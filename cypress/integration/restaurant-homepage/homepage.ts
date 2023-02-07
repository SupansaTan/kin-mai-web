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

//-------- see restaurant's detail----------

Given(`I visit on the Restaurant Homepage`, () => {
    cy.visit('/restaurant');
});

Then('I should see today rating', () => {
    cy.get('[data-cy="todayRating"]').should('be.visible');
});

And('I should see total rating', () => {
    cy.get('[data-cy="totalRating"]').should('be.visible');
});

And('I should see customer satisfaction', () => {
    cy.get('[data-cy="customerSatisfaction"]').should('be.visible');
});

And('I should see recommend menu', () => {
    cy.get('[data-cy="recommendMenu"]').should('be.visible');
});

And('I should see reviews', () => {
    cy.get('[data-cy="reviewForm"]').should('be.visible');
});

// ----------------------------------

