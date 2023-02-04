Feature: Reviewer search playlist
  Reviewer can search playlist

  Scenario: Reviewer search somtam playlist
    Given I visit on the playlist page
    When  I search "somtam" in a search box
    Then  I should see list of "somtam " 
  
  Scenario: Reviewer click on playlist title
    Given I visit on the playlist page
    When  I search "somtam" in a search box
    Then  I should see list of "somtam " 
    When  I click on "playlist title"
    Then  I should visit on playlist detail
