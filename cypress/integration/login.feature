Feature: Login page

  Background:
    Given I visit on login page
    Then  I should see login form

  Scenario: Login successful as Reviewer
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button
    Then I should see reviewer homepage

  Scenario: Login successful as Restaurant Owner
    When I complete fill in login form
      | email               | password |
      | punch3@gmail.com    | 12345678 |
    And I click on Login button
    Then I should see restaurant homepage

  Scenario: User fill in form invalid
    When I fill in some form in login form
      | email               |
      | nampunch1@gmail.com |
    And  I click on Login button
    Then I should see error message and red border on invalid field
  
  Scenario: User already don't have an account
    Then I should see button
      | button |
      | doNotHaveAccountBtn |
    When I click on "Don't have an account ?"
    Then I should be on Register page

  Scenario: User forget password
    When I click on "Forget your password"
    And I should be on Reset password page
    And I fill email
      | email               |
      | nampunch1@gmail.com | 
    And I click send button
    Then I should see email is sent
