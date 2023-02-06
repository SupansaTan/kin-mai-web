import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on random game page`, () => {
  cy.visit('/reviewer/random');
});

Then('I should see gachapon game', () => {
  cy.get('[data-cy="gachapon game"]').should('be.visible');
});

// --------------------------

// When('I play music', () => {
//   cy.get(`[data-cy="PlayBtn"]`).click();
// });

// Then('I should listen music ', () => {
//   cy.get('[data-cy="music"]').should('be.visible');
// });

// When('I stop music', () => {
//   cy.get(`[data-cy="StopBtn"]`).click();
// });

// Then('I should not listen music ', () => {
//   cy.get('[data-cy="music"]').should('be.visible');
// });

// --------------------------
When('I click on gachapon game', () => {
  cy.get(`[data-cy="gachapon game"]`).click();
});

Then('I should see button', (dataTable) => {
  dataTable.hashes().forEach((item: { button: string }) => {
    cy.get(`[data-cy="${item.button}"]`).should('be.visible');
  });
});

Then('I see button search restaurant', () => {
  cy.wait(5000);
  cy.get('[data-cy="SearchRestaurantBtn"]').should('be.visible');
});

Then('I see button search restarant playlists', () => {
  cy.wait(5000);
  cy.get('[data-cy="RestarantPlaylistsBtn"]').should('be.visible');
});


When('I click on search restaurant', () => {
  cy.get(`[data-cy="SearchRestaurantBtn"]`).click();
});

Then('I should be on search restaurant page',() =>{
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/search');
});



When('I click on search restarant playlists', () => {
  cy.get(`[data-cy="RestarantPlaylistsBtn"]`).click();
});

Then('I should be on search restaurant playlists page',() =>{
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/playlist');
});