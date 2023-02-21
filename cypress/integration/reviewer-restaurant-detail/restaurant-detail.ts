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

//------see all restaurant detail---------
Given(`I visit on Restaurant Detail page`, () => {
    cy.visit('reviewer/restaurant');
});

Then('I should see restaurant image', () => {
  cy.get('[data-cy="restaurantImage"]').should('be.visible');
});

And('I should see restaurant information', () => {
  cy.get('[data-cy="information"]').should('be.visible');
});

And('I should see rating', () => {
  cy.get('[data-cy="rating"]').should('be.visible');
});

And('I should see recommended menu', () => {
  cy.get('[data-cy="recommendMenu"]').should('be.visible');
});

And('I should see create review button', () => {
  cy.get('[data-cy="reviewBtn"]').should('be.visible');
});

And('I should see review filter', () => {
  cy.get('[data-cy="reviewFilter"]').should('be.visible');
});

And('I should see reviews', () => {
  cy.get('[data-cy="reviews"]').should('be.visible');
});

// -----see all restaurant image------

Given(`I visit on Restaurant Detail`, () => {
  cy.visit('reviewer/restaurant');
});

Then('I should see restaurant image', () => {
  cy.get('[data-cy="restaurantImage"]').should('be.visible');
});

When('I click "image" of restaurant', () => {
  cy.get('[data-cy=restaurantImage]').click();
});

Then('I should see all "image" of restaurant', () => {
  cy.get('[data-cy="galleryModal"]').should('be.visible');
});

// ----- create review--------

// Given(`I visit on Restaurant Detail page`, () => {
//   cy.visit('reviewer/restaurant');
// });

// Then('I should see create review button', () => {
//   cy.get('[data-cy="reviewBtn"]').should('be.visible');
// });

// When('I click create review button', () => {
//   cy.get('[data-cy=reviewBtn]').click();
// });

// Then('I should see create review modal', () => {
//   cy.get('[data-cy="reviewModal"]').should('be.visible');
// });

