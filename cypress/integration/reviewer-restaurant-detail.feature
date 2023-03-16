Feature: Restaurant Detail
  Reviewer is able to see restaurant detail , rating , reviews and write review

  Background:
    Given I visit on login page
    When  I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And   I click on Login button
    And   I should be on reviewer homepage
    And   I click name of restaurant
    Then  I should be on Restaurant Detail page

  Scenario: Reviewer see all restaurant image
    When I click "image" of restaurant
    Then I should see all "image" of restaurant

  Scenario: Reviewer invalid review
    When  I click myreview button
    And   I should see review form
    And   I click submit button
    Then  I should see rating is required

  Scenario: Reviewer add new review
    When  I click myreview button
    Then  I should see review form
    When  I rate stars
    And   I click comment words button
    And   I write comment
      | commentBox |
      | บรรยากาศร้านดีมากๆค่ะ|
    And   I click add menu button
    And   I write menu name
      | MenuName |
      | น้ำมะม่วงปั่น |
    And   I upload photo
    When  I click submit button
    Then  I should see review successful

  Scenario: Reviewer edit review
    When  I click myreview button
    And   I click EditReview button
    Then  I should see review form
    When  I rates stars
    And   I click comment words button
    And   I remove comment
    And   I write comment
      | commentBox |
      | อร่อยมากๆค่ะ |
    And   I click submit button
    Then  I should see review successful

  Scenario: Reviewer select stars
    When I select star
    Then I should see reviews

  Scenario: Reviewer filter all reviews
    When I select star
    And  I click All button
    Then I should see reviews

  Scenario: Reviewer filter picture reviews
    When I select star
    And  I click Picture button
    Then I should see reviews

  Scenario: Reviewer filter comment reviews
    When I select star
    And  I click Comment button
    Then I should see reviews

  Scenario: Reviewer filter menu reviews
    When  I click Menu button
    Then I should see reviews

  Scenario: Reviewer search and filter reviews
    When I search "อร่อย" in search review
      | SearchReview |
      | อร่อย      |
    And I click Picture button
    Then I should see reviews

  Scenario: Reviewer can not find reviews
    When I search in search review
      | SearchReview |
      | แย่ที่สุด     |
    Then I should see dont have reviews
    





