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

And('I should be on reviewer homepage', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer');
});

And('I click dropdown menu', () => {
  cy.get('.dropdown-toggle').click();
});

And('I click edit profile button', () => {
  cy.get('[data-cy="EditProfileReviewerBtn"]').click();
});

Then(`I should be on edit profile page`, () => {
  cy.visit('/reviewer/profile');
});


// ---fill valid form--------
When('I remove old IDname', () => {
  cy.get('[data-cy="username"]').clear();
});

And('I change IDname in edit form', (dataTable) => {
  dataTable.hashes().forEach((item: { IDname: string }) => {
    cy.get('[data-cy="username"]').type(item.IDname);
  });
});

And('I click next button', () => {
  cy.get('[data-cy="submitBtn"]').click();
});

And('I click submit button', () => {
  cy.get('[data-cy="submitBtn"]').click();
});

Then('I should see successful modal', () => {
  cy.get('[data-cy="successModal"]').should('be.visible');
});

// ----fill invalid form-------
When('I click dropdown menu', () => {
  cy.get('.dropdown-toggle').click();
});

And('I click edit profile button', () => {
  cy.get('[data-cy="EditProfileBtn"]').click();
});


Then(`I should be on edit profile page`, () => {
  cy.visit('/reviewer/profile');
});

And('I should see edit form', () => {
  cy.get('[data-cy="personalInfoForm"]').should('be.visible');
});

When('I remove old IDname', () => {
  cy.get('[data-cy="username"]').clear();
});

And('I click next button', () => {
  cy.get('[data-cy="NextBtn"]').click();
});

Then(`I should be on edit profile page`, () => {
  cy.visit('/reviewer/profile');
});