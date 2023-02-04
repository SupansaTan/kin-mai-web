import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { ReviewerRegisterModel } from 'src/models/register.model';
import { RestaurantInfo } from './register.model';

When('I fill in some field in the reviewer form', (dataTable) => {
  dataTable.hashes().forEach((item: ReviewerRegisterModel) => {
    cy.get('[data-cy="firstName"]').type(item.firstName);
    cy.get('[data-cy="lastName"]').type(item.lastName);
    cy.get('[data-cy="username"]').type(item.username);
    cy.get('[data-cy="email"]').type(item.email);
    cy.get('[data-cy="password"]').type(item.password ?? '');
  });
});

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

Then('I should see red border field and message that field is required', (dataTable) => {
  dataTable.hashes().forEach((item: { fieldName: string, errorMessageType: string }) => {
    cy.get(`[data-cy="${item.fieldName}Error"]`).should('be.visible');
  });
})
