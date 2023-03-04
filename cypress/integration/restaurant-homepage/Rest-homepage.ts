import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

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

And(`I should be on Restaurant homepage`, () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/restaurant');
});

//-------- see restaurant's detail----------
Given('I should see today rating', () => {
    cy.get('[data-cy="todayRating"]').should('be.visible');
});

And('I should see total rating', () => {
    cy.get('[data-cy="totalRating"]').should('be.visible');
});

And('I should see customer satisfaction', () => {
    cy.get('[data-cy="customerSatisfaction"]').should('be.visible');
});

And('I should see recommend menu', () => {
    cy.get('[data-cy="recommendMenu"]').should('be.visible');
});

And('I should see reviews', () => {
    cy.get('[data-cy="reviewForm"]').should('be.visible');
});

// --------- Search review--------
When ('I search "อร่อย" in search review', (dataTable) => {
  dataTable.hashes().forEach((item: { SearchReview : string }) => {
    cy.get(`[data-cy="SearchReview"]`).type(item.SearchReview, {force: true});
  });
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviewForm"]').should('be.visible');
});

//----- select stars------
When('I select star', () => {
  cy.get('select').select('3').should('have.value', '3');
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviewForm"]').should('be.visible');
});

//-----filer all reviews-------
When('I click All button', () => {
  cy.get('[data-cy="AllBtn"]').click();
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviewForm"]').should('be.visible');
});

//------ filer picture reviews--------
When('I click Picture button', () => {
  cy.get('[data-cy="PicBtn"]').click();
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviewForm"]').should('be.visible');
});

// ----- filer comment reviews-----
When('I click Comment button', () => {
  cy.get('[data-cy="CommentBtn"]').click();
})

Then('I should see reviews', () => {
  cy.get('[data-cy="reviewForm"]').should('be.visible');
});

//----------filer menu reviews-------
When('I click Menu button', () => {
  cy.get('[data-cy="MenuBtn"]').click();
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviewForm"]').should('be.visible');
});

//--------search and filter reviews-----
When ('I search "อร่อย" in search review', (dataTable) => {
  dataTable.hashes().forEach((item: { SearchReview : string }) => {
    cy.get(`[data-cy="SearchReview"]`).type(item.SearchReview, {force: true});
  });
});

And('I select star', () => {
  cy.get('select').select('4').should('have.value', '4');
});

And('I click Picture button', () => {
  cy.get('[data-cy="PicBtn"]').click();
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviewForm"]').should('be.visible');
});

// -----reset review-------
When('I click Picture button', () => {
  cy.get('[data-cy="PicBtn"]').click();
});

And('I select star', () => {
  cy.get('select').select('4').should('have.value', '4');
});

And('I click reset button', () => {
  cy.get('[data-cy="ResetBtn"]').click();
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviewForm"]').should('be.visible');
});

//------ reply review -----
When('I click answer box', () => {
  cy.get('[data-cy="AnswerBox"]').first().click();
});

And ('I type answer box', (dataTable) => {
  dataTable.hashes().forEach((item: { AnswerBox : string }) => {
    cy.get(`[data-cy="AnswerBox"]`).eq(1).type(item.AnswerBox, {force: true});
  });
});

And('I click reply button', () => {
  cy.get('[data-cy="ReplyBtn"]').first().click();
});

Then('I should see successful modal', () => {
  cy.get('[data-cy="successModal"]').should('be.visible');
});

//----- edit review------
When('I click edit button', () => {
  cy.get('[data-cy="EditBtn"]').first().click();
});

And('I click answer box', () => {
  cy.get('[data-cy="AnswerBox"]').first().click();
});

And('I remove old reply', () => {
  cy.get('[data-cy="AnswerBox"]').clear();
});

And ('I type answer box', (dataTable) => {
  dataTable.hashes().forEach((item: { AnswerBox : string }) => {
    cy.get(`[data-cy="AnswerBox"]`).eq(1).type(item.AnswerBox, {force: true});
  });
});

And('I click reply button', () => {
  cy.get('[data-cy="ReplyBtn"]').first().click();
});

Then('I should see successful modal', () => {
  cy.get('[data-cy="successModal"]').should('be.visible');
});

//-----Owner remove reply----

When('I click edit button', () => {
  cy.get('[data-cy="EditBtn"]').first().click();
});

And('I click answer box', () => {
  cy.get('[data-cy="AnswerBox"]').first().click();
});

And('I remove old reply', () => {
  cy.get('[data-cy="AnswerBox"]').clear();
});

And('I click reply button', () => {
  cy.get('[data-cy="ReplyBtn"]').first().click();
});

Then('I should see successful modal', () => {
  cy.get('[data-cy="successModal"]').should('be.visible');
});