Feature: Reviewer search playlist
  Reviewer can search playlist

  Background:
    Given I visit on the playlist page
    Then  I should see restaurant playlist

  Scenario: Reviewer search for somtam restaurant
    When  I search "somtam" in a search box
      | searchBox |
      | ส้มตำ |
    Then  I should see list of "somtam restaurant" playlist

  Scenario: Reviewer click playlist title
    When  I click on title of detail
    Then  I should be on playlist-detail page
  
  

  

  
