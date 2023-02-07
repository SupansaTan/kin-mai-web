import { Given,Then,When,And} from "cypress-cucumber-preprocessor/steps";

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

And(`I visit on the playlist page`, () => {
  cy.visit('reviewer/playlist');
})

And('I should see restaurant playlist', () => {
  cy.wait(2000);
  cy.get('[data-cy="RestaurantPlaylist"]').should('be.visible');
});

//------search for somtam restaurant-------
When ('I search "somtam" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchBox : string }) => {
    cy.get(`[data-cy="searchBox"]`).type(item.searchBox, {force: true});
  });
});

Then('I should see list of "somtam restaurant" playlist', () => {
  cy.get('[data-cy="RestaurantPlaylist"]').should('be.visible');
});

//------click playlist title---------
When('I click on title of detail', () => {
  cy.get('[data-cy="PlaylistDetail"]').first().click();
});

Then ('I should be on playlist-detail page',() =>{
  cy.wait(2000);
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/playlist-detail');
});