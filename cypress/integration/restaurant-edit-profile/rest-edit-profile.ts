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
When('I remove name of restaurant', () => {
  cy.get('[data-cy="restaurantName"]').clear();
});

And('I change name of restaurant', (dataTable) => {
  dataTable.hashes().forEach((item: { Name : string}) => {
    cy.get('[data-cy="restaurantName"]').type(item.Name );
  });
});

And('I fill address', (dataTable) => {
  dataTable.hashes().forEach((item: { address : string}) => {
    cy.get('[data-cy="googleAddressAutocomplete"]').type(item.address, { delay: 100 });
    cy.get('.pac-item').eq(0).click({force: true});
    cy.get('[data-cy="setRestaurantAddress"]', { timeout: 1000 }).click();
  });
});

And('I remove old number', () => {
  cy.get('[data-cy="contactValue"]').clear();
});

And('I add new number', (dataTable) => {
  dataTable.hashes().forEach((item: { Number  : string}) => {
    cy.get('[data-cy="contactValue"]').type(item.Number  );
  });
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
  cy.get('[data-cy="successModal"]').should('be.visible');
});

//-------- invalid--------

When('I remove name of restaurant', () => {
  cy.get('[data-cy="restaurantName"]').clear();
});

And('I click "Next" button', () => {
  cy.get('[data-cy="SubmitBtn"]').first().click();
});

Then('I should see error message', () => {
  cy.get('.text-danger').should('be.visible');
});