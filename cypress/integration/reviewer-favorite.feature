Feature: Favorite Restaurant
  Reviewer can see their favorite restarant

  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button
    And I should be on reviewer homepage
    And I click dropdown menu
    And  I click favorite restarant button
    Then I should be on favorite restarant page

  
  Scenario: Reviewer unlike restaurant
    When  I unclick "Love" button
    Then  I should see favorite restarant change
  
  Scenario: Reviewer click restaurant title
    When  I click restaurant title
    Then  I should be on restarant detail page

    

