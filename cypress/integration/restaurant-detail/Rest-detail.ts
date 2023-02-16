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

And(`I should be on Restaurant homepage`, () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/restaurant');
});

//-------see all restaurant's information--------------

Given(`I visit on Restaurant Detail page`, () => {
    cy.visit('/restaurant/detail');
});

And('I should see restaurant image', () => {
    cy.get('[data-cy="restaurantImage"]').should('be.visible');
});

And('I should see rating', () => {
    cy.get('[data-cy="rating"]').should('be.visible');
});

And('I should see information', () => {
    cy.get('[data-cy="information"]').should('be.visible');
});

And('I should see google map', () => {
    cy.get('[data-cy="googleMap"]').should('be.visible');
});

And('I should see edit button', () => {
  cy.get('[data-cy="editBtn"]').should('be.visible');
});

// click edit button
Given(`I visit on Restaurant Detail page`, () => {
  cy.visit('/restaurant/detail');
});

When('I press edit button', () => {
  cy.get('[data-cy="editBtn"]').eq(1).click();
});

Then(`I should be on edit page`, () => {
  cy.visit('/restaurant/edit');
});

