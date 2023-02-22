import {  And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on login page`, () => {
  cy.visit('/auth/login');
});

Then('I should see login form', () => {
  cy.get('[data-cy="loginForm"]').should('be.visible');
});

Then('I should see button', (dataTable) => {
  dataTable.hashes().forEach((item: { button: string }) => {
    cy.get(`[data-cy="${item.button}"]`).should('be.visible');
  });
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


//-------------Reviewer see homepage detail---------------------
And('I should be on reviewer homepage', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer');
});

Then('I see searchbox',() =>{
  cy.get('[data-cy="searchbox"]').should('be.visible');
});

Then('I see list of restarant near me',() =>{
  cy.get('[data-cy="RestaurantNearMe"]').should('be.visible');
});


// -------see restaurant detail--------

When('I click title of Restaurant', () => {
  cy.get(`[data-cy="restaurantDetailBtn"]`).first().click({force: true});
});

Then ('I should be on Restaurant detail page',() =>{
  cy.location('pathname', { timeout: 5000 }).should('include', '/reviewer/restaurant');
});

//--------like restaurant---------
When('I unclick "Love" button', () => {
  cy.get(`[data-cy="LoveBtn"]`).first().click({force: true});
});

Then('I should see love button change',() =>{
  cy.get('[data-cy="LoveBtn"]').should('be.visible');
});

//--------unlike restaurant---------
When('I click "Love" button', () => {
  cy.get(`[data-cy="LoveBtn"]`).first().click({force: true});
});

Then('I should see love button change',() =>{
  cy.get('[data-cy="LoveBtn"]').should('be.visible');
});

//----- search restaurant------
When ('I search "Jaidee" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

Then('I should see list of "restaurant" near me', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});

And('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});

And('I should see restaurant', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});


// ------filter ---------
When ('I search "test" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

Then('I should see list of "restaurant" near me', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});

And('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});


When('I click open button', () => {
  cy.get(`[data-cy="OpenBtn"]`).click();
});

Then('I should see restaurants which open', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});


// ------ see review---------

When ('I search "Jaidee" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

Then('I should see list of "restaurant" near me', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});

And('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});

When('I click MyReview button', () => {
  cy.wait(2000)
  cy.get(`[data-cy="MyReviewBtn"]`).click();
});

Then('I should see review form', () => {
  cy.get(`[data-cy="reviewModal"]`).should('be.visible');
});


//------ edit review----------

When ('I search "Jaidee" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

Then('I should see list of "restaurant" near me', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});

And('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});

When('I click MyReview button', () => {
  cy.wait(2000)
  cy.get(`[data-cy="MyReviewBtn"]`).click();
});

And('I click EditReview button', () => {
  cy.wait(2000)
  cy.get(`[data-cy="EditReviewBtn"]`).click();
});

Then('I should see review form', () => {
  cy.get(`[data-cy="reviewModal"]`).should('be.visible');
});

When('I rates stars', () => {
  cy.get('[data-cy="star"]').click();
});

And('I click comment words button', () => {
  cy.get('[data-cy="commentWordBtn"]').first().click();
});

And('I write comment', (dataTable) => {
  dataTable.hashes().forEach((item: { commentBox: string}) => {
    cy.get('[data-cy="commentBox"]').type(item.commentBox);
  });
});

And('I click add menu button', () => {
  cy.get('[data-cy="addMenuBtn"]').click();
});

And('I write menu name', (dataTable) => {
  dataTable.hashes().forEach((item: { MenuName: string}) => {
    cy.get('[data-cy="MenuName"]').type(item.MenuName);
  });
});

And('I upload photo', () => {
  cy.get('[data-cy="uploadPhoto"]').selectFile('src/assets/image/cafe.jpg');
});


When('I click submit button', () => {
  cy.get('[data-cy="submitBtn"]').click();
});

Then('I should see review successful', () => {
  cy.get('[data-cy="successModal"]').should('be.visible');
});


// remove  review

When ('I search "Jaidee" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

Then('I should see list of "restaurant" near me', () => {
  cy.get(`[data-cy="RestaurantFilter"]`).should('be.visible');
});

And('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});

When('I click MyReview button', () => {
  cy.wait(2000)
  cy.get(`[data-cy="MyReviewBtn"]`).click();
});

And('I click EditReview button', () => {
  cy.wait(2000)
  cy.get(`[data-cy="EditReviewBtn"]`).click();
});

Then('I should see review form', () => {
  cy.get(`[data-cy="reviewModal"]`).should('be.visible');
});

And('I remove comment', () => {
  cy.get('[data-cy="commentBox"]').clear();
});

And('I remove photo', () => {
  cy.get('[data-cy="DelPicBtn"]').first().click();
});

And('I remove menu', () => {
  cy.get('[data-cy="DelMenuBtn"]').first().click();
});

When('I click submit button', () => {
  cy.get('[data-cy="submitBtn"]').click();
});

Then('I should see review successful', () => {
  cy.get('[data-cy="successModal"]').should('be.visible');
});
