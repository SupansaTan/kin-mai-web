import {  And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on the Homepage`, () => {
  cy.visit('reviewer/');
})

Then('I should see button', (dataTable) => {
  dataTable.hashes().forEach((item: { button: string }) => {
    cy.get(`[data-cy="${item.button}"]`).should('be.visible');
  });
});

And ('I should see restaurant near me ',() =>{
  cy.get('[data-cy="restaurant"]').should('be.visible');
})


When('I click on Food button', () => {
  cy.get(`[data-cy="FoodBtn"]`).click();
});

Then('I should see food categories',() =>{
  cy.get('[data-cy="food categories"]').should('be.visible');
});

When('I click on drink and dessert button', () => {
  cy.get(`[data-cy="DrinkAndDessertBtn"]`).click();
});

Then('I should see drink and dessert categories',() =>{
  cy.get('[data-cy="drink and dessert categories"]').should('be.visible');
});

When('I click on "What to eat?" ', () => {
  cy.get(`[data-cy="What to eat?"]`).click();
});

Then(`I should be on random game page`, () => {
  cy.visit('/reviewer/random');
});

When('I search on "restaurant" ', () => {
  cy.get(`[data-cy="restaurant"]`).type("ส้มตำ");
});

Then(`I should be on search result page`, () => {
  cy.visit('/reviewer/search');
});

