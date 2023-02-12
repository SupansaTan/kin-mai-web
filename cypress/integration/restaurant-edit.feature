Feature: Restaurant Edit Detail
    Restaurant can edit , add and remove their details
  
  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | punch3@gmail.com | 12345678 |
    And I click on Login button
    And I should be on Restaurant homepage

  Scenario: Restaurant owner can see edit  detail
    Given I visit on the Restaurant Detail
    Then  I should see "edit" button
    When  I press "edit" button
    Then  I should be on restaurant edit detail page
    When  I press "next" button
    Then  I should see upload form
    When  I press "next" button
    Then  I should see status form

  # Scenario: Restaurant owner with valid form
  #   Given I visit on the restaurant edit page
  #   And  I should see edit form
  #   When  I complete fill in the form
  #   And   I click "Submit" button
  #   Then  I should see restaurant detail homepage

  #  Scenario: Restaurant owner with invalid form
  #   Given I visit on the restaurant edit page
  #   Then  I should see edit form
  #   When  I fill in some field in the form
  #   And   I click "Submit" button
  #   Then  I should see red border field and message that field is required