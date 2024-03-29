import {  And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

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

And('I should be on reviewer homepage', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer');
});

And('I click dropdown menu', () => {
  cy.get('.dropdown-toggle').click();
});

And('I click favorite restarant button', () => {
  cy.get('[data-cy="FavBtn"]').click();
});

Then(`I should be on favorite restarant page`, () => {
  cy.visit('/reviewer/favorite-restaurant');
});

// -----unlike restaurant-----

When('I unclick "Love" button', () => {
  cy.get('[data-cy="LoveBtn"]').first().click();
});

Then('I should see favorite restarant change', () => {
  cy.get('[data-cy="Favlist"]').should('be.visible');
});

//---- click restaurant title------

When('I click restaurant title', () => {
  cy.get('.restaurant-name').first().click();
});

Then('I should be on restarant detail page', () => {
  cy.url().should('include', 'reviewer/restaurant;restaurantId=');
});