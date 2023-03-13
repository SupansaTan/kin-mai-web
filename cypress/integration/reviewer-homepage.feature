Feature: Reviewer Homepage
  Reviewer is able to see buttons and restarant near them

  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button
    And I should be on reviewer homepage

  Scenario: Reviewer click restaurant detail
    When  I click title of Restaurant
    Then  I should be on Restaurant detail page

  Scenario: Reviewer unlike restaurant
    When  I unclick "Love" button
    Then  I should see love button change

  Scenario: Reviewer like restaurant
    When  I click "Love" button
    Then  I should see love button change

  Scenario: Reviewer search and filter restaurant
    When  I search "test" in a search box
      | searchbox |
      | test |
    Then  I should see list of "restaurant" near me
    And   I should see filter
    When  I click open button
    And   I click food categories
    Then  I should see restaurants which open

  Scenario: Reviewer add new review
    When  I search in a search box
      | searchbox |
      | ร้านบ้านดีคาเฟ่ |
    And   I click open button
    Then  I should see list of "restaurant" near me
    When  I click MyReview button
    Then  I should see review form
    When  I rate stars
    And   I click comment words button
    And   I write comment
      | commentBox |
      | บรรยากาศร้านดีมากๆค่ะ |
    And   I click add menu button
    And   I write menu name
      | MenuName |
      | คุ๊กกี้ขิง |
    And   I upload photo
    When  I click submit button
    Then  I should see review successful

  Scenario: Reviewer edit  review
    When  I search in a search box
      | searchbox |
      | ร้านบ้านดีคาเฟ่ |
    And   I click open button
    Then  I should see list of "restaurant" near me
    When  I click MyReview button
    And   I click EditReview button
    Then  I should see review form
    When  I rates stars
    And   I click comment words button
    And   I remove comment
    And   I write comment
      | commentBox |
      | อร่อยมากๆค่ะ |
    And   I remove photo
    And   I remove menu
    When  I click submit button
    Then  I should see review successful



