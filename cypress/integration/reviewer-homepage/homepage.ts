import {  And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

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


//-------------Reviewer see homepage detail---------------------
And('I should be on reviewer homepage', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer');
});

Then('I see searchbox',() =>{
  cy.get('[data-cy="searchbox"]').should('be.visible');
});

Then('I see list of restarant near me',() =>{
  cy.get('[data-cy="RestaurantNearMe"]').should('be.visible');
});
// -------see restaurant detail--------

When('I click title of Restaurant', () => {
  cy.get(`[data-cy="restaurantDetailBtn"]`).first().click();
});

Then ('I should be on Restaurant detail page',() =>{
  cy.wait(2000);
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/restaurant');
});

//--------like restaurant---------
When('I unclick "Love" button', () => {
  cy.get(`[data-cy="LoveBtn"]`).first().click();
});

Then('I should see love button change',() =>{
  cy.wait(2000);
  cy.get('[data-cy="LoveBtn"]').should('be.visible');
});

//--------unlike restaurant---------
When('I click "Love" button', () => {
  cy.get(`[data-cy="LoveBtn"]`).first().click();
});

Then('I should see love button change',() =>{
  cy.wait(2000);
  cy.get('[data-cy="LoveBtn"]').should('be.visible');
});

//----- search & click catagory------
When ('I search "Jaidee" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

Then('I should see list of "restaurant" near me', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});

And('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});


When('I click catagory', () => {
  cy.get(`[data-cy="Catagory"]`).first().click();
});

Then('I should see restaurant', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});


//------filter ---------
When ('I search "Test" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

Then('I should see list of "restaurant" near me', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});

And('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});


When('I click open button', () => {
  cy.get(`[data-cy="OpenBtn"]`).first().click();
});

Then('I should see restaurant', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});


//------ see review---------

When ('I search "Jaidee" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

Then('I should see list of "restaurant" near me', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});

And('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});

When('I click MyReview button', () => {
  cy.get(`[data-cy="MyReviewBtn"]`).first().click();
});

Then('I should see review form', () => {
  cy.get(`[data-cy="reviewModal"]`).should('be.visible');
});


//------ edit review----------

When ('I search "Jaidee" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

Then('I should see list of "restaurant" near me', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});

And('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});

When('I click EditReview button', () => {
  cy.get(`[data-cy="EditReviewBtn"]`).first().click();
});

Then('I should see review form', () => {
  cy.get(`[data-cy="reviewModal"]`).should('be.visible');
});


//-------- add review --------------

When ('I search "Jaidee" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

Then('I should see list of "restaurant" near me', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});

And('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});

When('I click AddReview button', () => {
  cy.get(`[data-cy="EditReviewBtn"]`).first().click();
});

Then('I should see review form', () => {
  cy.get(`[data-cy="reviewModal"]`).should('be.visible');
});
