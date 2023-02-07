import { Given,Then,When} from "cypress-cucumber-preprocessor/steps";

Given(`I visit on the playlist page`, () => {
  cy.visit('reviewer/playlist');
})

Then('I should see restaurant playlist', () => {
  cy.wait(2000);
  cy.get('[data-cy="RestaurantPlaylist"]').should('be.visible');
});

When ('I search "somtam" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchBox : string }) => {
    cy.get(`[data-cy="searchBox"]`).type(item.searchBox, {force: true});
  });
});

Then('I should see list of "somtam restaurant" playlist', () => {
  cy.get('[data-cy="RestaurantPlaylist"]').should('be.visible');
});

When('I click on title of detail', () => {
  cy.get('[data-cy="PlaylistDetail"]').first().click();
});

Then ('I should be on playlist-detail page',() =>{
  cy.wait(2000);
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/playlist-detail');
});