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

//------------edit their detail------------------------

Given(`I visit on the Restaurant Detail`, () => {
    cy.visit('/restaurant/detail');
});

Then('I should see "edit" button', () => {
    cy.get('[data-cy="editInfoBtn"]').should('be.visible');
});

When('I press "edit" button', () => {
    cy.get('[data-cy="editInfoBtn"]').click();
});

Then('I should be on restaurant edit detail page', () => {
    cy.location('pathname', { timeout: 5000 }).should('eq', '/restaurant/edit');
});


// ---------- valid form -------------

When('I complete fill in the form', (dataTable) => {
    dataTable.hashes().forEach((item: { name: string, maxRate: string, minRate:string }) => {
      cy.get('[data-cy="restaurantName"]').type(item.name);
      cy.get('[data-cy="maxRate"]').type(item.maxRate);
      cy.get('[data-cy="minRate"]').type(item.minRate);
    });
});

And('I click "Submit" button', () => {
    cy.get('[data-cy="submitBtn"]').click();
  });

Then('I should see restaurant detail homepage', () => {
    cy.location('pathname', { timeout: 5000 }).should('eq', '/restaurant/detail');
});

// --------- invalid form -------------

When('I fill in some field in the form', (dataTable) => {
    dataTable.hashes().forEach((item: { name: string }) => {
        cy.get('[data-cy="restaurantName"]').type(item.name);
    });
});

Then('I should see red border field and message that field is required', () => {
    cy.get('[data-cy="maxRate"]').should('have.class', 'border-danger');
    cy.get('[data-cy="minRate"]').should('have.class', 'border-danger');
});


