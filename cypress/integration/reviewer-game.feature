Feature: Reviewer random food game
  Reviewer can random food categories , search restarant and restarant's playlists

  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button
    And I should be on reviewer homepage

  Scenario: Reviewer play and pause music backgroud
    Given I visit on random game page
    And   I should see music button
    When  I click play music button
    Then  I should listen music
    When  I click pause music button
    Then  I should not listen music
  
  Scenario: Reviewer click gachapon random game for receive food categories
    Given I visit on random game page
    And   I should see gachapon game
    When  I click on gachapon game
    Then  I should see food category
    And   I should see button
          | button |
          | SearchRestaurantBtn |
    When  I click search button
    Then  I should be on homepage


  



  


 