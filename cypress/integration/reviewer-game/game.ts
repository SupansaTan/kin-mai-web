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

And('I should be on reviewer homepage', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer');
});

// play and pause music
Given(`I visit on random game page`, () => {
  cy.visit('/reviewer/random');
});

And('I should see music button', () => {
  cy.get('[data-cy="MusicBtn"]').should('be.visible');
});

When('I click play music button', () => {
  cy.get(`[data-cy="MusicBtn"]`).click();
});

Then('I should listen music', () => {
  cy.wait(5000)
  cy.get('[data-cy="MusicBtn"]').should('be.visible');
  
});

When('I click pause music button', () => {
  cy.get(`[data-cy="MusicBtn"]`).click();
});

Then('I should not listen music', () => {
  cy.get('[data-cy="MusicBtn"]').should('be.visible');
});




// --------click gachapon random game----------
Given(`I visit on random game page`, () => {
  cy.visit('/reviewer/random');
});

And('I should see gachapon game', () => {
  cy.get('[data-cy="gachapongame"]').should('be.visible');
});

When('I click on gachapon game', () => {
  cy.get(`[data-cy="gachapongame"]`).click();
});

Then('I should see food category', () => {
   cy.get('[data-cy="FoodCategory"]').should('be.visible');
});

And('I should see button', (dataTable) => {
  dataTable.hashes().forEach((item: { button: string }) => {
    cy.get(`[data-cy="${item.button}"]`).should('be.visible');
  });
});

When('I click search button', () => {
  cy.get(`[data-cy="SearchRestaurantBtn"]`).first().click();
});

Then(`I should be on homepage`, () => {
  cy.url().should('include', '/reviewer;categoryType=');
});


