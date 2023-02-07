Feature: Reviewer see playlist detail
  Reviewer can see playlist detail

  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button

  Scenario: Reviewer see playlist detail
    When I visit on the playlist detail page
    Then I should see playlist detail

  