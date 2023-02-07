Feature: Restaurant Homepage
  Restaurant owner is able to see their dashboard , reviews and rating

  Scenario: Restaurant owner can see restaurant's detail
    Given I visit on the Restaurant Homepage
    Then  I should see today rating
    And   I should see total rating
    And   I should see customer satisfaction
    And   I should see recommend menu
    And   I should see reviews




