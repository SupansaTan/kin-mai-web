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

//------------------------------------------------

And(`I visit on random game page`, () => {
  cy.visit('/reviewer/random');
});

And('I should see gachapon game', () => {
  cy.get('[data-cy="gachapon game"]').should('be.visible');
});


// --------click gachapon random game----------
When('I click on gachapon game', () => {
  cy.get(`[data-cy="gachapon game"]`).click();
});

Then('I should see button', (dataTable) => {
  dataTable.hashes().forEach((item: { button: string }) => {
    cy.get(`[data-cy="${item.button}"]`).should('be.visible');
  });
});

Then('I see button search restaurant', () => {
  cy.wait(3000);
  cy.get('[data-cy="SearchRestaurantBtn"]').should('be.visible');
});

Then('I see button search restarant playlists', () => {
  cy.wait(2000);
  cy.get('[data-cy="RestarantPlaylistsBtn"]').should('be.visible');
});

//------click search restaurant---------
When('I click on search restaurant', () => {
  cy.get(`[data-cy="SearchRestaurantBtn"]`).click();
});

Then('I should be on search restaurant page',() =>{
  cy.wait(2000);
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/search');
});

//-------click search restarant's playlists--------
When('I click on search restarant playlists', () => {
  cy.get(`[data-cy="RestarantPlaylistsBtn"]`).click();
});

Then('I should be on search restaurant playlists page',() =>{
  cy.wait(2000);
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/playlist');
});