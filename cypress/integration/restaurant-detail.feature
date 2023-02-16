Feature: Reataurnat Detail
    Restaurant owner is able tot see thier restaurant's information and rating

    Background:
    Given I visit on login page
    When   I complete fill in login form
      | email               | password |
      | punch3@gmail.com    | 12345678 |
    And I click on Login button
    And I should be on Restaurant homepage

    Scenario: Restaurant owner can see all restaurant's information
      Given I visit on Restaurant Detail page
      And I should see restaurant image
      And I should see rating
      And I should see information
      And I should see google map
      And I should see edit button
    
    Scenario: Restaurant owner click edit button
      Given I visit on Restaurant Detail page
      When I press edit button
      Then I should be on edit page

        