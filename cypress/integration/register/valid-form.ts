import { When } from 'cypress-cucumber-preprocessor/steps';
import { ReviewerRegisterModel } from 'src/models/register.model';

When('I complete fill in the reviewer form', (dataTable) => {
  dataTable.hashes().forEach((item: ReviewerRegisterModel) => {
    cy.get('[data-cy="firstName"]').type(item.firstName);
    cy.get('[data-cy="lastName"]').type(item.lastName);
    cy.get('[data-cy="username"]').type(item.username);
    cy.get('[data-cy="email"]').type(item.email);
    cy.get('[data-cy="password"]').type(item.password ?? '');
    cy.get('[data-cy="confirmPassword"]').type(item.confirmPassword ?? '');
  });
});

When('I complete fill in the restaurant form', (dataTable) => {
  dataTable.hashes().forEach((item: { fieldName: string, value: string }) => {
    cy.get(`[data-cy="${item.fieldName}"]`).type(item.value);
  });
});
