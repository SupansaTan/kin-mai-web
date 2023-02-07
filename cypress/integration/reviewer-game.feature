Feature: Reviewer random food game
  Reviewer can random food categories , search restarant and restarant's playlists

  Background:
    Given I visit on random game page
    Then  I should see gachapon game



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
  

  


 