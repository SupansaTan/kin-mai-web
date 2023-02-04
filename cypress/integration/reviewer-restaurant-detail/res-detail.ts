import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on Restaurant Detail page`, () => {
    cy.visit('reviewer/restaurant');
});

Then('I should see restaurant image', () => {
  cy.get('[data-cy="restaurantImage"]').should('be.visible');
});

And('I should see information', () => {
  cy.get('[data-cy="information"]').should('be.visible');
});

And('I should see rating', () => {
  cy.get('[data-cy="rating"]').should('be.visible');
});

And('I should see recommend menu', () => {
  cy.get('[data-cy="recommendMenu"]').should('be.visible');
});

When(`I click on "Review"`, () => {
  cy.get('[data-cy="ReviewBtn"]').click();
});

Then('I should see review popup page', () => {
  cy.get('[data-cy="review"]').should('be.visible');
});

And('I should see button', (dataTable) => {
  dataTable.hashes().forEach((item: { button: string }) => {
      cy.get(`[data-cy="${item.button}"]`).should('be.visible');
  });
});

And('I should see reviews', () => {
  cy.get('[data-cy="reviewForm"]').should('be.visible');
});

When('I search on comment', () => {
  cy.get(`[data-cy="comment"]`).type("อร่อย");
});

Then('I should see comment review ', () => {
  cy.get('[data-cy="comment"]').should('be.visible');
});

When(`I click on "Stars"`, () => {
  cy.get('[data-cy="stars"]').click();
});

Then('I should see stars review ', () => {
  cy.get('[data-cy="stars"]').should('be.visible');
});

