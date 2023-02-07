Feature: Reviewer random food game
  Reviewer can random food categories , search restarant and restarant's playlists

    Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button
    And I visit on random game page
    And I should see gachapon game


  Scenario: Reviewer click gachapon random game for receive food categories
    When  I click on gachapon game
    Then  I should see button
          | button |
          | SearchRestaurantBtn |
          | RestarantPlaylistsBtn |

  Scenario: Reviewer click search restaurant
    When  I click on gachapon game
    Then  I see button search restaurant
    When  I click on search restaurant
    Then  I should be on search restaurant page

  Scenario: Reviewer click search restarant's playlists
    When  I click on gachapon game
    Then  I see button search restarant playlists
    When  I click on search restarant playlists
    Then  I should be on search restaurant playlists page
  

  


 