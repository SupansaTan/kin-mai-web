/// <reference types="cypress" />

Cypress.Commands.add('selectOption', (fieldName: string, optionValue: string) => {
  return cy.get(`[data-cy="${fieldName}"]`).then((selects) => {
    let select = selects[0];
      cy.wrap(select).click().get("ng-dropdown-panel").get(".ng-option")
      .contains(optionValue)
      .then((item) => {
        cy.wrap(item).click();
      });
  });
});

Cypress.Commands.add('selectMultipleOption', (fieldName: string, optionValue: string) => {
  const v = optionValue.split(',');
  return cy.get(`[data-cy="${fieldName}"]`).then((selects) => {
    let select = selects[0];
    v.forEach((val: string, i: number) => {
      if (i === 0) {
        cy.wrap(select).click().get("ng-dropdown-panel").get(".ng-option")
        .contains(val)
        .then((item) => {
          cy.wrap(item).click();
        });
      } else {
        cy.wrap(select).get("ng-dropdown-panel").get(".ng-option")
        .contains(val)
        .then((item) => {
          cy.wrap(item).click();
        });
      }
    });
  });
});


declare namespace Cypress {
  interface Chainable {
    selectOption(fieldName: string, optionValue: string): Chainable<any>
    selectMultipleOption(fieldName: string, optionValue: string): Chainable<any>
  }
}
