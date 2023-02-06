import { Given, And} from "cypress-cucumber-preprocessor/steps";

Given(`I visit on the playlist detail page`, () => {
  cy.visit('reviewer/playlist-detail');
})

And('I should see playlist detail', () => {
  cy.get('[data-cy="PlaylistDetail"]').should('be.visible');
});

