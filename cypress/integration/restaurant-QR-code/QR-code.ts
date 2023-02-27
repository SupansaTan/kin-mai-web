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

//-----have QR Code-----
When('I click QR code button', () => {
  cy.get('[data-cy="QRBtn"]').first().click();
});

Then(`I should be on QR code page`, () => {
  cy.url().should('include', '/restaurant/qr-code');
});

And('I should see QR code', () => {
  cy.get('[data-cy="QRForm"]').should('be.visible');
});

When('I click save image', () => {
  cy.get('[data-cy="SaveImgBtn"]').first().click();
});

Then('I should see QR code image', () => {
  cy.get('[data-cy="SaveImgBtn"]').should('be.visible');
});