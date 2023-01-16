Feature: Restaurant Detail
  Restaurant owner is able to see restaurant detail , rating , reviews and write review

  Scenario: Restaurant owner can see all restaurant detail
    Given I visit on the Restaurant Detail
    Then  I should see all detail

  Scenario: Restaurant owner can edit their detail
    Given I visit on the Restaurant Detail
    Then  I should see all detail
    When  I press "edit" button
    Then  I should be on Restaurant's edit detail page
