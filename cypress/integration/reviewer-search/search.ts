import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";


Given (`I visit on search restaurant page`, () => {
  cy.visit('/reviewer/search');
});

Then ('I should see search box', () => {
  cy.get('[data-cy="searchBox"]').should('be.visible');
});

And ('I should see filter', () => {
  cy.get('[data-cy="filter"]').should('be.visible');
});

And ('I should see total result', () => {
  cy.get('[data-cy="totalResult"]').should('be.visible');
});

And ('I should see list of restaurant', () => {
  cy.get('[data-cy="restaurant"]').should('be.visible');
});

// -----------------------------------

Given (`I visit on search restaurant page`, () => {
  cy.visit('/reviewer/search');
});

Then ('I should see search box', () => {
  cy.get('[data-cy="searchBox"]').should('be.visible');
});


When ('I search "somtam" in a search box', (dataTable) => {
  dataTable.hashes().forEach((item: { searchBox : string }) => {
    cy.get(`[data-cy="searchBox"]`).type(item.searchBox, {force: true});
  });
});

And ('I click on search button', () => {
  cy.get(`[data-cy="searchBtn"]`).click({force: true});
});

Then('I should see list of "somtam restaurant" near me', () => {
  cy.get('[data-cy="restaurant"]').should('be.visible');
});

// -----------------------------------

// When('I search on "restaurant" ', () => {
//   cy.get(`[data-cy="searchBox"]`).type("ส้มตำ");
// });

// Then('I should see information', () => {
//   cy.get('[data-cy="information"]').should('be.visible');
// });

// And ('I should see button', (dataTable) => {
//   dataTable.hashes().forEach((item: { button: string }) => {
//     cy.get(`[data-cy="${item.button}"]`).should('be.visible');
//   });
// });

// When('I click on open button ', () => {
//   cy.get(`[data-cy="OpenBtn"]`).click();
// });

// Then ('I should see restaurant near me ',() =>{
//   cy.get('[data-cy="restaurant"]').should('be.visible');
// })

// When('I click on thai button ', () => {
//   cy.get(`[data-cy="ThaiBtn"]`).click();
// });

// Then ('I should see restaurant near me ',() =>{
//   cy.get('[data-cy="restaurant"]').should('be.visible');
// })

// When('I click on reset button ', () => {
//   cy.get(`[data-cy="ResetBtn"]`).click();
// });

// Then ('I should see restaurant near me ',() =>{
//   cy.get('[data-cy="restaurant"]').should('be.visible');
// })

// When('I click on myreview button ', () => {
//   cy.get(`[data-cy="MyreviewBtn"]`).click();
// });

// Then('I should see myreview', () => {
//   cy.get('[data-cy=" myreview"]').should('be.visible');
// });

// When('I click on editreview button ', () => {
//   cy.get(`[data-cy="EditreviewBtn"]`).click();
// });

// Then('I should see reviews', () => {
//   cy.get('[data-cy="reviewForm"]').should('be.visible');
// });

// When('I click on review button ', () => {
//   cy.get(`[data-cy="ReviewBtn"]`).click();
// });

// Then('I should see reviews', () => {
//   cy.get('[data-cy="reviewForm"]').should('be.visible');
// });