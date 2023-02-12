Feature: Reviewer see playlist detail
  Reviewer can see playlist detail

  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button
    And I should be on reviewer homepage

  Scenario: Reviewer click playlist detail
    Given I visit on the playlist detail page
    When  I click playlist title 
    Then  I should be on restaurant detail

  