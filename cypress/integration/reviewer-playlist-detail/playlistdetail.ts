import { When,Then,Given,And} from "cypress-cucumber-preprocessor/steps";

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

And('I should be on reviewer homepage', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer');
});

// see playlist detail
Given(`I visit on the playlist detail page`, () => {
  cy.visit('reviewer/playlist-detail');
});

And('I can see playlist detail',() =>{
   cy.get('[data-cy="playlistDetail"]').should('be.visible');
});

//-------click playlist detail----------------
Given(`I visit on the playlist detail page`, () => {
  cy.visit('reviewer/playlist-detail');
});

When('I click playlist title', () => {
  cy.get('[data-cy="PlaylistTitle"]').click();
});

Then(`I should be on restaurant detail`, () => {
  cy.visit('/reviewer/restaurant');
});
