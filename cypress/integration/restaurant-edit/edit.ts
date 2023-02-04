import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on Restaurant Detail page`, () => {
    cy.visit('/restaurant/detail');
});

Then('I should see edit button', () => {
    cy.get('[data-cy="editInfoBtn"]').should('be.visible');
});

When('I press "edit" button', () => {
    cy.get('[data-cy="editInfoBtn"]').click();
});

Then('I should see edit detail page', () => {
    cy.location('pathname', { timeout: 5000 }).should('eq', '/restaurant/edit');
});

And('I should see edit form', () => {
    cy.get('[data-cy="editInfoForm"]').should('be.visible');
});

// ---------- valid form -------------

When('I complete fill in edit form', (dataTable) => {
    dataTable.hashes().forEach((item: { name: string, maxRate: string, minRate:string }) => {
      cy.get('[data-cy="restaurantName"]').type(item.name);
      cy.get('[data-cy="maxRate"]').type(item.maxRate);
      cy.get('[data-cy="minRate"]').type(item.minRate);
    });
});

And('I click on submit button', () => {
    cy.get('[data-cy="submitBtn"]').click();
  });

Then('I should see restaurant detail homepage', () => {
    cy.location('pathname', { timeout: 5000 }).should('eq', '/restaurant/detail');
});

// --------- invalid form -------------

When('I fill in some form in edit form', (dataTable) => {
    dataTable.hashes().forEach((item: { name: string }) => {
        cy.get('[data-cy="restaurantName"]').type(item.name);
    });
});

Then('I should see error message and red border on invalid field', () => {
    cy.get('[data-cy="maxRate"]').should('have.class', 'border-danger');
    cy.get('[data-cy="minRate"]').should('have.class', 'border-danger');
});


