Feature: Reataurnat Detail
    Restaurant owner is able tot see thier restaurant's information and rating

    Background:
    Given I visit on login page
    When   I complete fill in login form
      | email               | password |
      | punch3@gmail.com    | 12345678 |
    And I click on Login button
    And I should be on Restaurant homepage
    And I visit on Restaurant Detail page

    Scenario: Restaurant owner can see all restaurant's information
        Given I should see restaurant image
        And I should see rating
        And I should see information
        And I should see google map
        And I should see edit button
        