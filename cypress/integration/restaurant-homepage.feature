Feature: Restaurant Homepage
  Restaurant owner is able to see their dashboard , reviews and rating

   Background:
    Given I visit on login page
    When  I complete fill in login form
      | email               | password |
      | punch3@gmail.com  | 12345678 |
    And I click on Login button
    And I should be on Restaurant homepage

  Scenario: Restaurant owner can see restaurant's detail
    Given I should see today rating
    And   I should see total rating
    And   I should see customer satisfaction
    And   I should see recommend menu
    And   I should see reviews




