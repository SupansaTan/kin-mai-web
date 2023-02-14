Feature: Reviewer search playlist
  Reviewer can search playlist

   Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button
    And I should be on reviewer homepage

  Scenario: Reviewer search for somtam restaurant
    Given I visit on the playlist page
    When  I search "somtam" in a search box
      | searchBox |
      | ส้มตำ       |
    Then  I should see list of "somtam restaurant" playlist

  Scenario: Reviewer click playlist title
    Given I visit on the playlist page
    When  I click on title of detail
    Then  I should be on playlist-detail page
  
  

  

  
