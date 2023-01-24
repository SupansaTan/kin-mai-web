Feature: Restaurant Edit Detail
    Restaurant can edit , add and remove their details

  Scenario: Restaurant owner can edit their detail
    Given I visit on the Restaurant Detail
    Then  I should see "edit" button
      | button |
      | editInfoBtn |
    When  I press "edit" button
    Then  I should be on restaurant edit detail page

  Scenario: Restaurant owner with valid form
    Given I visit on the restaurant edit page
    Then  I should see edit form
    When  I complete fill in the form
    And   I click "Submit" button
    Then  I should see modal "Edit Inforamtion successful"

   Scenario: Restaurant owner with invalid form
    Given I visit on the restaurant edit page
    Then  I should see edit form
    When  I fill in some field in the form
    And   I click "Submit" button
    Then  I should see red border field and message that field is required