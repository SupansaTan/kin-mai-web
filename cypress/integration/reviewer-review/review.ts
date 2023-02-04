import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on Restaurant Detail page`, () => {
    cy.visit('reviewer/restaurant');
});

And('I should see information', () => {
  cy.get('[data-cy="information"]').should('be.visible');
});

When(`I click on "Review"`, () => {
  cy.get('[data-cy="ReviewBtn"]').click();
});

Then('I should see review popup page', () => {
  cy.get('[data-cy="review"]').should('be.visible');
});

When(`I rate stars`, () => {
  cy.get('[data-cy="stars"]').click();
});

Then('I should see stars', () => {
  cy.get('[data-cy="stars"]').should('be.visible');
});

When(`I press words review`, () => {
  cy.get('[data-cy="words"]').click();
});

Then('I should  words review', () => {
  cy.get('[data-cy="words"]').should('be.visible');
});

When('I wrire review ', () => {
  cy.get(`[data-cy="review"]`).type("อร่อยมากๆค่ะ");
});

Then('I should see review', () => {
  cy.get('[data-cy="review"]').should('be.visible');
});

When(`I click add images`, () => {
  cy.get('[data-cy="images"]').click();
});

Then('I should see images', () => {
  cy.get('[data-cy="images"]').should('be.visible');
});

When(`I click add images`, () => {
  cy.get('[data-cy="images"]').click();
});

Then('I should see images', () => {
  cy.get('[data-cy="images"]').should('be.visible');
});

When(`I click add menus`, () => {
  cy.get('[data-cy="images"]').click();
});

Then('I should see images', () => {
  cy.get('[data-cy="menus"]').should('be.visible');
});

When(`I click send button`, () => {
  cy.get('[data-cy="SendBtn"]').click();
});

Then('I should Thank you for review', () => {
  cy.get('[data-cy="ThankYou"]').should('be.visible');
});

