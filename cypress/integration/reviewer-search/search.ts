import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

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
//-------see search result-------

Given (`I visit on search restaurant page`, () => {
  cy.visit('/reviewer/search');
});

Then ('I should see search box', () => {
  cy.get('[data-cy="searchBox"]').should('be.visible');
});

And ('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});

And ('I should see total result', () => {
  cy.get('[data-cy="totalResult"]').should('be.visible');
});

And ('I should see list of restaurant', () => {
  cy.get('[data-cy="restaurant"]').should('be.visible');
});

// ------search for somtam restaurant---------

Given (`I visit on search restaurant page`, () => {
  cy.visit('/reviewer/search');
});

Then ('I should see search box', () => {
  cy.get('[data-cy="searchBox"]').should('be.visible');
});


When ('I search "somtam" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchBox : string }) => {
    cy.get(`[data-cy="searchBox"]`).type(item.searchBox, {force: true});
  });
});

And ('I click on search button', () => {
  cy.get(`[data-cy="searchBtn"]`).click({force: true});
});

Then('I should see list of "somtam restaurant" near me', () => {
  cy.get('[data-cy="restaurant"]').should('be.visible');
});

// -----------------------------------
