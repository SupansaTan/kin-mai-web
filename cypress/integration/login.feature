Feature: Login page

  Scenario: Login successful
    Given I visit on login page
    Then I should see login form
    When I complete fill in login form
    And I click "Login" button
    Then I should see homepage

  Scenario: Login unsuccessful because of internal error
    Given I visit on login page
    Then I should see login form
    When I complete fill in login form
    And I click on "Login" button
    Then I should see error message as red message

  Scenario: User fill in form invalid
    Given I visit on login page
    Then I should see login form
    When I fill in some form in login form
    And I click on "Login" button
    Then I should see error message and red border on invalid field

  Scenario: Login by Google in first time
    Given I visit on login page
    And I should see "Sign in with Google" button
    When I click on "Sign in with Google" button
    Then I should be on Select Google account page
    When I successful login by Google account
    Then I should be on Register page to set username

  Scenario: Login by Google
    Given I visit on login page
    And I should see "Sign in with Google" button
    When I click on "Sign in with Google" button
    Then I should be on Select Google account page
    When I successful login by Google account
    Then I should be on homepage

  Scenario: User already don't have an account
    Given I visit on login page
    And I should see "Don't have an account ?" as anchor link
    When I click on "Don't have an account ?"
    Then I should be on Register page

  Scenario: User forget password
    Given I visit on login page
    And I should see "Forget your password" as anchor link
    When I click on "Forget your password"
    Then I should be on Reset password page
