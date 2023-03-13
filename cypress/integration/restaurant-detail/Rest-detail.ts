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

And(`I should be on Restaurant homepage`, () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/restaurant');
});

And('I click dropdown menu', () => {
  cy.get('.dropdown-toggle').click();
});

And('I click edit profile button', () => {
  cy.get('[data-cy="EditProfileBtn"]').click();
});

Then(`I should be on restaurant detail`, () => {
  cy.visit('/restaurant/detail');
});

//-------see all restaurant's information--------------
Given('I should see restaurant image', () => {
    cy.get('[data-cy="restaurantImage"]').should('be.visible');
});

And('I should see rating', () => {
    cy.get('[data-cy="rating"]').should('be.visible');
});

And('I should see information', () => {
    cy.get('[data-cy="information"]').should('be.visible');
});


And('I should see edit button', () => {
  cy.get('[data-cy="editBtn"]').should('be.visible');
});

//---- click image------
When('I click image', () => {
  cy.get('[data-cy="restaurantImage"]').click();
});

Then(`I should see restaurant image`, () => {
  cy.get('[data-cy="restaurantImage"]').should('be.visible');
});

//-------- click edit button-----------------
When('I click edit button', () => {
  cy.get('[data-cy="editBtn"]').first().click();
});

Then(`I should be on edit page`, () => {
  cy.visit('/restaurant/edit');
});

