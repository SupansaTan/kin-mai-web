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

And ('I search "Jaidee" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchbox : string }) => {
    cy.get(`[data-cy="searchbox"]`).type(item.searchbox, {force: true});
  });
});

And('I click name of restaurant', () => {
  cy.wait(3000);
  cy.get('.restaurant-name').first().click({force: true});
});


//------see all restaurant detail---------

Given(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});

Then('I should see restaurant image', () => {
  cy.get('[data-cy="restaurantImage"]').should('be.visible');
});

And('I should see restaurant information', () => {
  cy.get('[data-cy="information"]').should('be.visible');
});

And('I should see rating', () => {
  cy.get('[data-cy="rating"]').should('be.visible');
});

And('I should see recommended menu', () => {
  cy.get('[data-cy="recommendMenu"]').should('be.visible');
});

And('I should see review button', () => {
  cy.get('[data-cy="MyReviewBtn"]').should('be.visible');
});

And('I should see review filter', () => {
  cy.get('[data-cy="reviewFilter"]').should('be.visible');
});

And('I should see reviews', () => {
  cy.get('[data-cy="reviews"]').should('be.visible');
});

// -----see all restaurant image------

Given(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});


Then('I should see restaurant image', () => {
  cy.get('[data-cy="restaurantImage"]').should('be.visible');
});

When('I click "image" of restaurant', () => {
  cy.get('[data-cy=restaurantImage]').click();
});

Then('I should see all "image" of restaurant', () => {
  cy.get('.viewer-move').should('be.visible');
});

// ----- read review-------
Given(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});

Then('I should see myreview button', () => {
  cy.get('[data-cy="MyReviewBtn"]').should('be.visible');
});

When('I click myreview button', () => {
  cy.get('[data-cy="MyReviewBtn"]').click();
});

Then('I should see review modal', () => {
  cy.get('[data-cy="reviewModal"]').should('be.visible');
});

//------- add review ---------
Given(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});

Then('I should see myreview button', () => {
  cy.get('[data-cy="MyReviewBtn"]').should('be.visible');
});

When('I click myreview button', () => {
  cy.get('[data-cy="MyReviewBtn"]').click();
});


Then('I should see review form', () => {
  cy.get('[data-cy="reviewModal"]').should('be.visible');
});

When('I rate stars', () => {
  cy.get('[data-cy="star"]').eq(1).click({force:true});
});

// And('I click comment words button', () => {
//   cy.get('[data-cy="commentWordBtn"]').click();
// });

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
  // cy.wait(3000);
  cy.get('[data-cy="successModal"]').should('be.visible');
});


// -------- edit review-------
Given(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});

Then('I should see myreview button', () => {
  cy.get('[data-cy="MyReviewBtn"]').should('be.visible');
});

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
  cy.get('[data-cy="star"]').first().click({force:true});
});

And('I click comment words button', () => {
  cy.get('[data-cy="commentWordBtn"]').first().click();
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


//---- search review----
Given(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});

When ('I search "อร่อย" in search review', (dataTable) => {
  dataTable.hashes().forEach((item: { SearchReview : string }) => {
    cy.get(`[data-cy="SearchReview"]`).type(item.SearchReview, {force: true});
  });
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviews"]').should('be.visible');
});

//----- select stars------
Given(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});

When('I select star', () => {
  cy.get('select').select('3').should('have.value', '3');
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviews"]').should('be.visible');
});

//-----filer all reviews--------
Given(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});

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
Given(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});

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
Given(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});

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
Given(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});

When('I click Menu button', () => {
  cy.get('[data-cy="MenuBtn"]').click();
});

Then('I should see reviews', () => {
  cy.get('[data-cy="reviews"]').should('be.visible');
});

//--------search and filter reviews-----------
Given(`I should be on Restaurant Detail page`, () => {
  cy.url().should('include', '/reviewer/restaurant;restaurantId=');
});

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

