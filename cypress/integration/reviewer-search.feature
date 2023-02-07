Feature: Reviewer search restaurant
  Reviewer can search restaurant,filters, see reviews , write and edit review

  Scenario: Reviewer see search result
    Given I visit on search restaurant page
    Then  I should see search box
    And   I should see filter
    And   I should see total result
    And   I should see list of restaurant

  Scenario: Reviewer search for somtam restaurant
    Given I visit on search restaurant page
    Then  I should see search box
    When  I search "somtam" in a search box
      | searchBox |
      | ส้มตำ |
    And   I click on search button
    Then  I should see list of "somtam restaurant" near me

 