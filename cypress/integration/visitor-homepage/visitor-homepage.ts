import {  And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit reviewer homepage`, () => {
  cy.visit('/reviewer');
});

//------see list of restaurant near me-------
Given('I see restaurant near me',() =>{
  cy.get('[data-cy="RestaurantNearMe"]').should('be.visible');
});

//--------watch restaurant detail----------
When('I click title of Restaurant', () => {
  cy.get(`[data-cy="restaurantDetailBtn"]`).first().click({force: true});
});

Then ('I should be on Restaurant detail page',() =>{
  cy.location('pathname', { timeout: 5000 }).should('include', '/reviewer/restaurant');
});

//----- can't find restaurant------
When ('I search in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

Then('I should not see list of "restaurant" near me', () => {
  cy.get(`[data-cy="NoRestaurantFilter"]`).should('be.visible');
});

// ------can find restaurant ---------
When ('I search in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

And('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});

And('I click open button', () => {
  cy.get(`[data-cy="OpenBtn"]`).first().click({force: true});
});

And('I click food categories', () => {
  cy.get(`[data-cy="CatagoryBtn"]`).first().click({force: true});
});

Then('I should see list of "restaurant" near me', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});

//---can not like restaurant-----
Given('I should not see love button',() =>{
  cy.get('[data-cy="restaurantDetailBtn"]').should('be.visible');
});

//---can not review restaurant-----
Given('I should not see review button',() =>{
  cy.get('[data-cy="restaurantDetailBtn"]').should('be.visible');
});

//----click login button---

When('I click login button', () => {
  cy.get(`[data-cy="LoginBtn"]`).first().click({force: true});
});

Then ('I should be on login page',() =>{
  cy.location('pathname', { timeout: 5000 }).should('include', '/auth/login');
});