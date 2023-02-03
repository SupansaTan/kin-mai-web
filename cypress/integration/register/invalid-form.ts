import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { ReviewerRegisterModel } from 'src/models/register.model';

When('I fill in some field in the reviewer form', (dataTable) => {
  dataTable.hashes().forEach((item: ReviewerRegisterModel) => {
    cy.get('[data-cy="firstName"]').type(item.firstName);
    cy.get('[data-cy="lastName"]').type(item.lastName);
    cy.get('[data-cy="username"]').type(item.username);
    cy.get('[data-cy="email"]').type(item.email);
    cy.get('[data-cy="password"]').type(item.password ?? '');
  });
});

When('I fill in some field in the restaurant form', (dataTable) => {
  dataTable.hashes().forEach((item: { fieldName: string, value: string }) => {
    cy.get(`[data-cy="${item.fieldName}"]`).type(item.value);
  });
});

Then('Then I should see red border field and message that field is required', (dataTable) => {
  dataTable.hashes().forEach((item: { fieldName: string, errorMessageType: string }) => {
    cy.get(`[data-cy="${item.fieldName}Error"]`).should('be.visible');
    cy.get(`[data-cy="${item.errorMessageType}"]`).should('be.visible');
  });
})
