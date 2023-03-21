import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on login page`, () => {
  cy.visit('/auth/login');
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

And(`I should be on Restaurant homepage`, () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/restaurant');
});

And('I click dropdown menu', () => {
  cy.get('.dropdown-toggle').click();
});

And('I click edit profile button', () => {
  cy.get('[data-cy="EditProfileBtn"]').click();
});

And(`I should be on restaurant detail`, () => {
  cy.visit('/restaurant/detail');
});

And('I click edit button', () => {
  cy.get('[data-cy="editBtn"]').first().click();
});

Then(`I should be on restaurant edit page`, () => {
  cy.visit('/restaurant/edit');
});

//------valid-----------
When('I complete fill in the restaurant information form', (dataTable) => {
  dataTable.hashes().forEach((item: {fieldName: string, value: string}) => {
    if (item.fieldName === 'address') {
      cy.get('[data-cy="address"]').type(item.value);
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

And('I click google address', () => {
  cy.get('[data-cy="GoogleAddress"]').click();
});

And('I click "Next" button', () => {
  cy.get('[data-cy="SubmitBtn"]').first().click({force: true});
});

Then('I should see upload restaurant photo form', () => {
  cy.get('[data-cy="uploadPhotoForm"]').should('be.visible');
});

When('I complete fill in the upload restaurant photo form', (dataTable) => {
  dataTable.hashes().forEach((item: { filePath: string, restaurantStatus: string }) => {
    const imageFile = item.filePath.split(',');
    cy.get(`[data-cy="selectFile"]`).selectFile(imageFile, {force: true});
    cy.get(`[data-cy="restaurantStatus"]`).type(item.restaurantStatus);
  });
});

And('I click "Next" button', () => {
  cy.get('[data-cy="SubmitBtn"]').first().click({force: true});
});

Then('I should see confirmation register form as restaurant', () => {
  cy.get('[data-cy="restaurantInfoForm"]').should('be.visible');
  cy.get('[data-cy="uploadPhotoForm"]').should('be.visible');
});

And('I click "Submit" button', () => {
  cy.get('[data-cy="SubmitBtn"]').first().click({force: true});
});

Then('I should see successful modal', () => {
  cy.wait(3000);
  cy.get('[data-cy="successModal"]').should('be.visible');
});

//-------- invalid--------

When('I fill in some field in the restaurant information form', (dataTable) => {
  dataTable.hashes().forEach((item: { restaurantName : string}) => {
    cy.get('[ data-cy="restaurantName"]').type(item.restaurantName );
  });
});
And('I click "Next" button', () => {
  cy.get('[data-cy="SubmitBtn"]').first().click({force: true});
});