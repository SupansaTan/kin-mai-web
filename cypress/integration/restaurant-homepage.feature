Feature: Restaurant Homepage
  Restaurant owner is able to see their dashboard , reviews and rating

   Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | punch3@gmail.com  | 12345678 |
    And I click on Login button

  Scenario: Restaurant owner can see restaurant's detail
    Given I visit on the Restaurant Homepage
    Then  I should see today rating
    And   I should see total rating
    And   I should see customer satisfaction
    And   I should see recommend menu
    And   I should see reviews




