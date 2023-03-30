Feature: Reataurnat Detail
    Restaurant owner is able tot see thier restaurant's information and rating

    Background:
    Given I visit on login page
    When   I complete fill in login form
      | email                    | password |
      | natthamon200@gmail.com   | 12345678 |
    And I click on Login button
    And I should be on Restaurant homepage
    And I click dropdown menu
    And I click edit profile button
    And I should be on restaurant detail

    Scenario: Owner can see all restaurant's information
      Given I should see restaurant image
      And   I should see rating
      And   I should see information
      And   I should see edit button
    
    Scenario: Owner click image
      When I click image
      Then I should see restaurant image

    Scenario: Owner click edit button
      When I click edit button
      Then I should be on edit page

