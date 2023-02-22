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

  Scenario: Reviewer search restaurant
    When  I search "Jaidee" in a search box
      | searchbox |
      | Jaidee |
    Then  I should see list of "restaurant" near me
    And   I should see filter
    And   I should see restaurant

  Scenario: Reviewer filter restaurant
    When  I search "test" in a search box
      | searchbox |
      | test |
    Then  I should see list of "restaurant" near me
    And   I should see filter
    When  I click open button
    Then  I should see restaurants which open

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
    When  I click MyReview button
    And   I click EditReview button
    Then  I should see review form
    When  I rates stars
    And   I click comment words button
    And   I write comment
      | commentBox |
      | เค๊กหน้าตาประหลาด |
    And   I click add menu button
    And   I write menu name
      | MenuName |
      | บราวนี่เจ้าหญิง |
    And   I upload photo
    When  I click submit button
    Then  I should see review successful

  Scenario: Reviewer remove some review
    When  I search "Jaidee" in a search box
      | searchbox |
      | Jaidee |
    Then  I should see list of "restaurant" near me
    And   I should see filter
    When  I click MyReview button
    And   I click EditReview button
    Then  I should see review form
    And   I remove comment
    And   I remove photo
    And   I remove menu
    When  I click submit button
    Then  I should see review successful



