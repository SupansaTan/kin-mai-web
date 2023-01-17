Feature: Reviewer random food game
  Reviewer can random food categories , search restarant and restarant's playlists

  Scenario: Reviewer see gachapon random game
    Given I am on the random game page
    Then  I see "gachapon game"
    And   I see buttons "search restaurant" and "search restarant's playlists"

  Scenario: Reviewer click gachapon random game for receive food categories
    Given I am on the random game page
    Then  I see "gachapon game"
    When  I click on "gachapon game"
    Then  The gachapon game should show "food categories"

  Scenario: Reviewer click search restaurant
    Given I am on the random game page
    Then  I see button "search restaurant"
    When  I click on "search restaurant"
    Then  I should see "list of restaurant"

  Scenario: Reviewer click search restarant's playlists
    Given I am on the random game page
    Then  I see button "search restarant's playlists"
    When  I click on "search restarant's playlists"
    Then  I should see "list of restarant's playlists"
  

  


 