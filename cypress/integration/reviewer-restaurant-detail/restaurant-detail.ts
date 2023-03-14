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

And('I should be on reviewer homepage', () => {
  cy.location('pathname', { timeout: 5000 }).should('eq', '/reviewer');
});


And('I click name of restaurant', () => {
  cy.get('.restaurant-name').first().click({force: true});
});

Then(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});

// -----see all restaurant image------
When('I click "image" of restaurant', () => {
  cy.get('[data-cy=restaurantImage]').click();
});

Then('I should see all "image" of restaurant', () => {
  cy.get('.viewer-move').should('be.visible');
});

//-------invalid review----------
When('I click myreview button', () => {
  cy.get('[data-cy="MyReviewBtn"]').click();
});

And('I should see review form', () => {
  cy.get('[data-cy="reviewModal"]').should('be.visible');
});

And('I click submit button', () => {
  cy.get('[data-cy="submitBtn"]').click();
});

Then('I should see review successful', () => {
  cy.get('[data-cy="successModal"]').should('be.visible');
});

//------- add review ---------
When('I click myreview button', () => {
  cy.get('[data-cy="MyReviewBtn"]').click();
});

Then('I should see review form', () => {
  cy.get('[data-cy="reviewModal"]').should('be.visible');
});

When('I rate stars', () => {
  cy.get('[data-cy="star"]').eq(3).click({force:true});
});

And('I click comment words button', () => {
  cy.get('[data-cy="commentWordBtn"]').first().click({force:true});
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
  cy.get('[data-cy="uploadPhoto"]').selectFile('src/assets/image/halal.jpg');
});

When('I click submit button', () => {
  cy.get('[data-cy="submitBtn"]').click();
});

Then('I should see review successful', () => {
  cy.get('[data-cy="successModal"]').should('be.visible');
});


// -------- edit review-------
When('I click myreview button', () => {
  cy.get('[data-cy="MyReviewBtn"]').click();
});

And('I click EditReview button', () => {
  cy.get('[data-cy="EditReviewBtn"]').click();
});

Then('I should see review form', () => {
  cy.get('[data-cy="reviewModal"]').should('be.visible');
});

When('I rates stars', () => {
  cy.get('[data-cy="star"]').eq(4).click({force:true});
});

And('I click comment words button', () => {
  cy.get('[data-cy="commentWordBtn"]').first().click({force:true});
});

And('I remove comment', () => {
  cy.get('[data-cy="commentBox"]').clear();
});

And('I write comment', (dataTable) => {
  dataTable.hashes().forEach((item: { commentBox: string}) => {
    cy.get('[data-cy="commentBox"]').type(item.commentBox);
  });
});

And('I click submit button', () => {
  cy.get('[data-cy="submitBtn"]').click();
});

Then('I should see review successful', () => {
  cy.get('[data-cy="successModal"]').should('be.visible');
});


//----- select stars------
When('I select star', () => {
  cy.get('select').select('3').should('have.value', '3');
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviews"]').should('be.visible');
});

//-----filer all reviews--------
When('I select star', () => {
  cy.get('select').select('4').should('have.value', '4');
});

And('I click All button', () => {
  cy.get('[data-cy="AllBtn"]').click();
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviews"]').should('be.visible');
});

//------ filer picture reviews-------
When('I select star', () => {
  cy.get('select').select('3').should('have.value', '3');
});

And('I click Picture button', () => {
  cy.get('[data-cy="PicBtn"]').click();
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviews"]').should('be.visible');
});

//----filer comment reviews----
When('I select star', () => {
  cy.get('select').select('5').should('have.value', '5');
});

And('I click Comment button', () => {
  cy.get('[data-cy="CommentBtn"]').click();
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviews"]').should('be.visible');
});

//----------filer menu reviews-------------
When('I click Menu button', () => {
  cy.get('[data-cy="MenuBtn"]').click();
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviews"]').should('be.visible');
});

//--------search and filter reviews-----------
When ('I search "อร่อย" in search review', (dataTable) => {
  dataTable.hashes().forEach((item: { SearchReview : string }) => {
    cy.get(`[data-cy="SearchReview"]`).type(item.SearchReview, {force: true});
  });
});

And('I click Picture button', () => {
  cy.get('[data-cy="PicBtn"]').click();
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviews"]').should('be.visible');
});

