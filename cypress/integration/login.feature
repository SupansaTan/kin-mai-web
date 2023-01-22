Feature: Login page

  Background:
    Given I visit on login page
    Then I should see login form

  Scenario: Login successful as Reviewer
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button
    Then I should see reviewer homepage

  Scenario: Login successful as Restaurant Owner
    When I complete fill in login form
      | email               | password |
      | nampunch5@gmail.com | 12345678 |
    And I click on Login button
    Then I should see restaurant homepage

  Scenario: User fill in form invalid
    When I fill in some form in login form
      | email               |
      | nampunch1@gmail.com |
    And I click on Login button
    Then I should see error message and red border on invalid field

  # Scenario: Login by Google in first time
  #   Then I should see button
  #     | button |
  #     | Google |
  #   When I click on "Google" button
  #   Then I should be on Select Google account page
  #   When I successful login by Google account
  #   Then I should be on Register page to set username

  # Scenario: Login by Google
  #   Then I should see button
  #     | button |
  #     | googleBtn |
  #   When I click on "Google" button
  #   Then I should be on Select Google account page
  #   When I successful login by Google account
  #   Then I should be on homepage

  Scenario: User already don't have an account
    Then I should see button
      | button |
      | doNotHaveAccountBtn |
    When I click on "Don't have an account ?"
    Then I should be on Register page

  # Scenario: User forget password
  #   Then I should see button
  #     | button |
  #     | forgetPasswordBtn |
  #   When I click on "Forget your password"
  #   Then I should be on Reset password page
  #   When I fill new password and confirm password
  #   And  I press "submit"
  #   Then I should be on login page
