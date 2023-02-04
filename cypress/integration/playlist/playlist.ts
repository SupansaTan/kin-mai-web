import {  And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I visit on the Homepage`, () => {
  cy.visit('reviewer/random');
})
