import { Given,Then } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on the playlist page`, () => {
  cy.visit('reviewer/playlist');
})

Then('I should see restaurant playlist', () => {
  cy.get('[data-cy="RestaurantPlaylist"]').should('be.visible');
});

