import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

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

