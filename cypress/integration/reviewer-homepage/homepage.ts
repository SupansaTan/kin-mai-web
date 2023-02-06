import {  And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on the Homepage`, () => {
  cy.visit('/reviewer');
});

Then ('I should see search box',() =>{
  cy.get('[data-cy="searchbox"]').should('be.visible');
});

And ('I should see buttons', (dataTable) => {
  dataTable.hashes().forEach((item: { button: string }) => {
    cy.get(`[data-cy="${item.button}"]`).should('be.visible');
  });
});

And ('I should see list of Restaurant near me',() =>{
  cy.wait(5000);
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
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/restaurant');
});

// ------------------------------


When('I click on Food button', () => {
  cy.get(`[data-cy="FoodBtn"]`).click();
});

Then('I should see food categories',() =>{
  cy.get('[data-cy="FoodModal"]').should('be.visible');
});

When('I click on drink and dessert button', () => {
  cy.get(`[data-cy="DrinkAndDessertBtn"]`).click();
});

Then('I should see drink and dessert categories',() =>{
  cy.get('[data-cy="DessertModal"]').should('be.visible');
});


// When('I click on "What to eat?" ', () => {
//   cy.get(`[data-cy="What to eat?"]`).click();
// });

// Then(`I should be on random game page`, () => {
//   cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/random');
// });

// When('I search on "restaurant" ', () => {
//   cy.get(`[data-cy="restaurant"]`).type("ส้มตำ");
// });

// Then(`I should be on search result page`, () => {
//   cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer/search');
// });

