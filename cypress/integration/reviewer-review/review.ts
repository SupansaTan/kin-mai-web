import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on Restaurant Detail page`, () => {
  cy.visit('reviewer/restaurant');
});

Then('I should see create review button', () => {
  cy.get('[data-cy="reviewBtn"]').should('be.visible');
});

When('I click create review button', () => {
  cy.get('[data-cy=reviewBtn]').click();
});

Then('I should see create review modal', () => {
  cy.get('[data-cy="reviewModal"]').should('be.visible');
});

When('I should see rates stars', () => {
  cy.get('[data-cy="star"]').should('be.visible');
});

And('I should see comment words button', () => {
  cy.get('[data-cy="commentWordBtn"]').click();
});

And('I should see comment box', () => {
  cy.get('[data-cy="commentBox"]').should('be.visible');
});

And('I should see upload photo', () => {
  cy.get('[data-cy="uploadPhoto"]').should('be.visible');
});

And('I should see add menu button', () => {
  cy.get('[data-cy="addMenuBtn"]').should('be.visible');
});

And('I should see submit button', () => {
  cy.get('[data-cy="submitBtn"]').should('be.visible');
});

// ----------------------------

Given(`I visit on Restaurant Detail page`, () => {
    cy.visit('reviewer/restaurant');
});

Then('I should see create review button', () => {
  cy.get('[data-cy="reviewBtn"]').should('be.visible');
});

When('I click create review button', () => {
  cy.get('[data-cy=reviewBtn]').click();
});

Then('I should see create review modal', () => {
  cy.get('[data-cy="reviewModal"]').should('be.visible');
});

When('I rates stars', () => {
  cy.get('[data-cy="star"]').click();
});

And('I click comment words button', () => {
  cy.get('[data-cy="commentWordBtn"]').click();
});

And('I write comment', (dataTable) => {
  dataTable.hashes().forEach((item: { commentBox: string}) => {
    cy.get('[data-cy="commentBox"]').type(item.commentBox);
  });
});

And('I upload photo', () => {
  cy.get('[data-cy="uploadPhoto"]').selectFile('src/assets/image/cafe.jpg');
});

And('I click add menu button', () => {
  cy.get('[data-cy="addMenuBtn"]').click();
});

And('I write menu name', () => {
  cy.get('[data-cy="menuName"]').type('Noodle');
});

When('I click submit button', () => {
  cy.get('[data-cy="submitBtn"]').click();
});

Then('I should not see review modal', () => {
  cy.get('[data-cy="reviewModal"]').should('not.be.visible');
});


// ------------------------