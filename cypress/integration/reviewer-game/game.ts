import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on random game page`, () => {
  cy.visit('/reviewer/random');
});

Then('I should see gachapon game ', () => {
  cy.get('[data-cy="gachapon game"]').should('be.visible');
});

And('I should see button', (dataTable) => {
  dataTable.hashes().forEach((item: { button: string }) => {
    cy.get(`[data-cy="${item.button}"]`).should('be.visible');
  });
});

When('I click on gachapon game', () => {
  cy.get(`[data-cy="gachapon game"]`).click();
});

Then('I should recieve "food categories"',() =>{
  cy.get('[data-cy="food categories"]');
});

When('I click on search restaurant', () => {
  cy.get(`[data-cy="SearchRestaurantBtn"]`).click();
});

Then('I should be on "search restaurant page"',() =>{
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/search');
});

When('I click on restarant playlists', () => {
  cy.get(`[data-cy="RestarantPlaylistsBtn"]`).click();
});

// Then('I should be on "restarant playlists page"',() =>{
//   cy.visit('/reviewer/search');
// });