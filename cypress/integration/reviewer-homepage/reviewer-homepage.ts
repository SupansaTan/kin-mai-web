import { Given } from "cypress-cucumber-preprocessor/steps";
import { environment } from '../../fixtures/environment';

Given(`I visit on the Homepage`, () => {
  cy.visit(environment.webUrl);
})
