Feature: Register Page
  Reviewer and restaurant owner can create new account

  Scenario: User register as reviewer with valid form
    Given I visit on register page
    Then I should see register form
    And I click register as reviewer
    When I complete fill in the form
    And I click "Submit" button
    Then I should see modal "Create account successful"

  Scenario: User register as restaurant owner with valid form
    Given I visit on register page
    Then I should see register form
    And I click register as restaurant owner
    When I complete fill in the form
    And I click "Submit" button
    Then I should see modal "Create account successful"

  Scenario: User register as reviewer with invalid form
    Given I visit on register page
    Then I should see register form
    And I click register as reviewer
    When I fill in some field in the form
    And I click "Submit" button
    Then I should see red border field and message that field is required

  Scenario: User register as restaurant owner with invalid form
    Given I visit on register page
    Then I should see register form
    And I click register as restaurant owner
    When I fill in some field in the form
    And I click "Submit" button
    Then I should see red border field and message that field is required
