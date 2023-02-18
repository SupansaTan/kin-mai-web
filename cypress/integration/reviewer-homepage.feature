Feature: Reviewer Homepage
  Reviewer is able to see buttons and restarant near them

  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button
    And I should be on reviewer homepage
    And I see searchbox
    And I see list of restarant near me
  
  Scenario: Reviewer click restaurant detail
    When  I click title of Restaurant
    Then  I should be on Restaurant detail page

  Scenario: Reviewer unlike restaurant
    When  I unclick "Love" button
    Then  I should see love button change

  Scenario: Reviewer like restaurant
    When  I click "Love" button
    Then  I should see love button change

  Scenario: Reviewer search restaurant and click catagory
    When  I search "Jaidee" in a search box
      | searchbox |
      | Jaidee |
    Then  I should see list of "restaurant" near me
    And   I should see filter
    When  I click catagory
    Then  I should see restaurant

  Scenario: Reviewer filter restaurant 
    When  I search "Test" in a search box
      | searchbox |
      | Test |
    Then  I should see list of "restaurant" near me
    And   I should see filter
    When  I click open button
    Then  I should see restaurant
  
  Scenario: Reviewer see review
    When  I search "Jaidee" in a search box
      | searchbox |
      | Jaidee |
    Then  I should see list of "restaurant" near me
    And   I should see filter
    When  I click MyReview button
    Then  I should see review form
    
  Scenario: Reviewer edit review
    When  I search "Jaidee" in a search box
      | searchbox |
      | Jaidee |
    Then  I should see list of "restaurant" near me
    And   I should see filter
    When  I click EditReview button
    Then  I should see review form

  Scenario: Reviewer add review 
    When  I search "Test" in a search box
      | searchbox |
      | Test Cafe |
    Then  I should see list of "restaurant" near me
    And   I should see filter
    When  I click AddReview button
    Then  I should see review form