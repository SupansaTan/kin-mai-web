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

Then('I should see reviewer homepage', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer');
});

When ('I should see search box',() =>{
  cy.get('[data-cy="searchbox"]').should('be.visible');
});

And ('I should see buttons', (dataTable) => {
  dataTable.hashes().forEach((item: { button: string }) => {
    cy.get(`[data-cy="${item.button}"]`).should('be.visible');
  });
});

And ('I should see list of Restaurant near me',() =>{
  cy.wait(2000);
  cy.get('[data-cy="Restaurant"]').should('be.visible');
});

And ('I should see some of Restaurant info',() =>{
  cy.get('[data-cy="restaurantInfo"]').should('be.visible');
});

// ------------------------------

When('I click title of Restaurant', () => {
  cy.get(`[data-cy="restaurantDetailBtn"]`).first().click();
});

Then ('I should be on Restaurant detail page',() =>{
  cy.wait(2000);
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/restaurant');
});

// ------------------------------


When('I click "Food" button', () => {
  cy.get(`[data-cy="FoodBtn"]`).click();
});

Then('I should see modal of food categories',() =>{
  cy.wait(2000);
  cy.get('[data-cy="FoodModal"]').should('be.visible');
});

When('I click "Drink & Dessert" button', () => {
  cy.get(`[data-cy="DrinkAndDessertBtn"]`).click();
});

Then('I should see modal of drink and dessert categories',() =>{
  cy.wait(2000);
  cy.get('[data-cy="DessertModal"]').should('be.visible');
});

When('I click "Love" button', () => {
  cy.get(`[data-cy="LoveBtn"]`).first().click();
});

Then('I should see love button change',() =>{
  cy.wait(2000);
  cy.get('[data-cy="LoveBtn"]').should('be.visible');
});

When('I unclick "Love" button', () => {
  cy.get(`[data-cy="LoveBtn"]`).first().click();
});

Then('I should see love button change',() =>{
  cy.wait(2000);
  cy.get('[data-cy="LoveBtn"]').should('be.visible');
});


