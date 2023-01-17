Feature: Reviewer search restaurant
  Reviewer can search restaurant,filters, see reviews , write and edit review

  Scenario: Reviewer search somtam restaurant
    Given I visit on the search restaurant 
    When  I search "somtam" in a search box
    Then  I should see list of "somtam restaurant" near me

  Scenario: Reviewer add favorite restaurant
    Given I visit on the search restaurant 
    When  I search "somtam" in a search box
    Then  I should see list of "somtam restaurant" near me
    And I should see "thin heart" icon
    When I click on "Heart" icon
    Then I should see "solid yellow heart" icon

  Scenario: Reviewer undo favorite restaurant
    Given I visit on the search restaurant 
    When  I search "somtam" in a search box
    Then  I should see list of "somtam restaurant" near me
    And I should see "solid heart" icon
    When I click "Heart" button
    Then I should see "light heart" icon

  Scenario: Reviewer see restaurant's detail
    Given I visit on the search restaurant 
    When  I search "somtam" in a search box
    Then  I should see list of "somtam restaurant" near me
    When I click title of Restaurant
    Then I should be on Restaurant's detail page
  
  Scenario: Reviewer can filters restaurant
    Given I visit on the search restaurant 
    When  I search "somtam" in a search box
    And   I filter "open"restarant 
    Then  I should see somtam restaurant with "open" filters near me
  
  Scenario: Reviewer can reset filters restaurant
    Given I visit on the search restaurant 
    When  I search "somtam" in a search box
    And   I press "reset" button 
    Then  I should see "somtam restaurant" without filters near me
  
  Scenario: Reviewer select thai in food categories
    Given I visit on the search restaurant 
    When  I press "thai" in food categories
    Then  I should see "thai" restaurant near me

  Scenario: Reviwer see my review 
    Given I visit on the search restaurant 
    When  I search "somtam" in a search box
    Then  I should see list of "somtam restaurant" near me
    And   I should see "My Review" button
    When  I click "My Review" button
    Then  I should see "My Review Page " 

  Scenario: Reviwer write review 
    Given I visit on the search restaurant 
    When  I search "somtam" in a search box
    Then  I should see list of "somtam restaurant" near me
    And   I should see "Edit Review " button
    When  I click "Edit Review"
    Then  I should see "Edit Review Page " 
    When  I write review 
    Then  I should see review text 

  Scenario: Reviwer add review picture
    Given I visit on the search restaurant 
    When  I search "somtam" in a search box
    Then  I should see list of "somtam restaurant" near me
    And   I should see "Edit Review " button
    When  I click "Edit Review"
    Then  I should see "Edit Review Page " 
    When  I  add review picture 
    Then  I should see picture
  
  

