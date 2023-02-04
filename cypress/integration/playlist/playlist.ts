import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on the Playlist page`, () => {
  cy.visit('reviewer/playlist');
})

Then('I should see restaurant playlist', () => {
  cy.get('[data-cy="RestaurantPlaylist"]').should('be.visible');
});

When('I search on restaurant playlist', () => {
  cy.get(`[data-cy="RestaurantPlaylist"]`).type("ส้มตำ");
});

Then('I should see Somtam playlist ', () => {
  cy.get('[data-cy="SomtamPlaylist"]').should('be.visible');
});

When('I click on "playlist title"', () => {
  cy.get(`[data-cy="PlaylistTitle"]`).click();
});

Then(`I should be on search playlist-detail page`, () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/playlist-detail');
});
