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

//-------- invalid--------

When('I fill in some field in the restaurant information form', (dataTable) => {
  dataTable.hashes().forEach((item: {fieldName: string, value: string}) => {
    if (item.fieldName === 'address') {
      cy.get('[data-cy="googleAddressAutocomplete"]').type(item.value, { delay: 100 });
      cy.get('.pac-item').eq(0).click({force: true});
      cy.get('[data-cy="setRestaurantAddress"]', { timeout: 1000 }).click();
    }
    // input type: ng-select
    else if (['restaurantType', 'foodCategory', 'deliveryType', 'paymentMethod', 'socialContactType', 'day'].indexOf(item.fieldName) > -1)
    {
      if (item.fieldName === 'socialContactType') {
        cy.get('[data-cy="addSocialContact"]').click();
      }

      if (item.value.includes(',')) {
        cy.selectMultipleOption(item.fieldName, item.value);
      } else {
        cy.selectOption(item.fieldName, item.value);
      }
    }
    else {
      // input type: text, time
      cy.get(`[data-cy="${item.fieldName}"]`).type(item.value, {force: true});
    }
  });
});

And('I click "Next" button', () => {
  cy.get('[data-cy="submitBtn"]').click();
});

Then('I should see red border field and message that field is required', (dataTable) => {
  dataTable.hashes().forEach((item: { fieldName: string, errorMessageType: string }) => {
    cy.get(`[data-cy="${item.fieldName}Error"]`).should('be.visible');
  });
})
