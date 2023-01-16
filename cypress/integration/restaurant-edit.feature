Feature: Restaurant Edit Detail
    Restaurant can edit , add and remove their details

  Scenario: Restaurant owner with valid form
    Given I visit on the restaurant edit page
    Then  I should see edit form
    When  I complete fill in the form
    And   I click "Submit" button
    Then  I should see modal "Create account successful"

   Scenario: Restaurant owner with invalid form
    Given I visit on the restaurant edit page
    Then  I should see edit form
    When  I fill in some field in the form
    And   I click "Submit" button
    Then  I should see red border field and message that field is required


