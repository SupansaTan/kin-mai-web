Feature: Restaurant Detail
  Reviewer is able to see restaurant detail , rating , reviews and write review

  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com  | 12345678 |
    And I click on Login button

  Scenario: Reviewer see all restaurant detail
    Given I visit on Restaurant Detail page
    Then  I should see restaurant image
    And   I should see restaurant information
    And   I should see rating
    And   I should see recommended menu
    And   I should see create review button
    And   I should see review filter
    And   I should see reviews

  Scenario: Reviewer see all restaurant image
    Given I visit on Restaurant Detail
    Then I should see restaurant image
    When I click "image" of restaurant
    Then I should see all "image" of restaurant

  Scenario: Reviewer create review
    Given I visit on Restaurant Detail page
    Then  I should see create review button
    When  I click create review button
    Then  I should see create review modal




