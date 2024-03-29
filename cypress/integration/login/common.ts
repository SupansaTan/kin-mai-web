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

//------- Login successful-------
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
  cy.wait(2000)
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer');
});

Then('I should see restaurant homepage', () => {
  cy.wait(2000)
  cy.location('pathname', { timeout: 5000 }).should('eq', '/restaurant');
});

//-----------don't have an account-------
When(`I click on "Don't have an account ?"`, () => {
  cy.get(`[data-cy="doNotHaveAccountBtn"]`).click();
});

Then('I should be on Register page', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/auth/register');
});

//-------forget password------
When(`I click on "Forget your password"`, () => {
  cy.get('[data-cy="forgetPasswordBtn"]').click();
});

And('I should be on Reset password page', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/auth/forgot-password');
});

And('I fill email', (dataTable) => {
  dataTable.hashes().forEach((item: { email: string}) => {
    cy.get('[data-cy="email"]').type(item.email);
  });
});

And(`I click send button`, () => {
  cy.get('[data-cy="SendBtn"]').click();
});

Then('I should see email is sent', () => {
  cy.get('[data-cy="SentEmail"]').should('be.visible');
});