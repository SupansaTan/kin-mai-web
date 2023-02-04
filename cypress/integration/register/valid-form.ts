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

When('I complete fill in the restaurant information form', (dataTable) => {
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

When('I complete fill in the upload restaurant photo form', (dataTable) => {
  dataTable.hashes().forEach((item: { filePath: string, restaurantStatus: string }) => {
    const imageFile = item.filePath.split(',');
    cy.get(`[data-cy="selectFile"]`).selectFile(imageFile, {force: true});
    cy.get(`[data-cy="restaurantStatus"]`).type(item.restaurantStatus);
  });
});
