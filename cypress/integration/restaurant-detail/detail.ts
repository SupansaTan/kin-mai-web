import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on Restaurant Detail page`, () => {
    cy.visit('/restaurant/detail');
});

Then('I should see restaurant image', () => {
    cy.get('[data-cy="restaurantImage"]').should('be.visible');
});

And('I should see rating', () => {
    cy.get('[data-cy="rating"]').should('be.visible');
});

And('I should see information', () => {
    cy.get('[data-cy="information"]').should('be.visible');
});

And('I should see google map', () => {
    cy.get('[data-cy="googleMap"]').should('be.visible');
});

Then('I should see button', (dataTable) => {
    dataTable.hashes().forEach((item: { button: string }) => {
        cy.get(`[data-cy="${item.button}"]`).should('be.visible');
    });
});


// -------------------------------------------------


Given(`I visit on Restaurant Detail page`, () => {
    cy.visit('/restaurant/detail');
}); 

When(`I click on "Edit"`, () => {
    cy.get('[data-cy="editBtn"]').click();
});

Then('I should be on Edit Detail page', () => {
    cy.location('pathname', { timeout: 5000 }).should('eq', '/restaurant/edit');
});