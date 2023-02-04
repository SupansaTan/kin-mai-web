import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on the Playlist-detail page`, () => {
  cy.visit('reviewer/playlist-detail');
})

Then('I should see playlist detail', () => {
  cy.get('[data-cy="PlaylistDetail"]').should('be.visible');
});

When('I click on "playlist title"', () => {
  cy.get(`[data-cy="PlaylistTitle"]`).click();
});

Then(`I should be on search restaurant detail page`, () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/restaurant');
});