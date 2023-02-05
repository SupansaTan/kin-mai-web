import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on random game page`, () => {
  cy.visit('/reviewer/random');
});

Then('I should see gachapon game', () => {
  cy.get('[data-cy="gachapon game"]').should('be.visible');
});

// --------------------------

Given(`I visit on random game page`, () => {
  cy.visit('/reviewer/random');
});

Then('I should see gachapon game ', () => {
  cy.get('[data-cy="gachapon game"]').should('be.visible');
});

When('I click on gachapon game', () => {
  cy.get(`[data-cy="gachapon game"]`).click();
});

Then('I should see button', (dataTable) => {
  dataTable.hashes().forEach((item: { button: string }) => {
    cy.get(`[data-cy="${item.button}"]`).should('be.visible');
  });
});

// ---------------------------

Given(`I visit on random game page`, () => {
  cy.visit('/reviewer/random');
});

When('I click on gachapon game', () => {
  cy.get(`[data-cy="gachapon game"]`).click();
});

Then('I see button search restaurant', () => {
  cy.wait(6000);
  cy.get('[data-cy="SearchRestaurantBtn"]').should('be.visible');
});

When('I click on search restaurant', () => {
  cy.get(`[data-cy="SearchRestaurantBtn"]`).click();
});

Then('I should be on search restaurant page',() =>{
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/search');
});

// ---------------------------

Given(`I visit on random game page`, () => {
  cy.visit('/reviewer/random');
});

When('I click on gachapon game', () => {
  cy.get(`[data-cy="gachapon game"]`).click();
});

Then('I see button search restarant playlists', () => {
  cy.wait(6000);
  cy.get('[data-cy="RestarantPlaylistsBtn"]').should('be.visible');
});

When('I click on search restarant playlists', () => {
  cy.get(`[data-cy="RestarantPlaylistsBtn"]`).click();
});

Then('I should be on search restaurant playlists page',() =>{
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/playlist');
});