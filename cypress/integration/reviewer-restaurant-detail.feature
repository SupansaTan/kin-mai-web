Feature: Restaurant Detail
  Reviewer is able to see restaurant detail , rating , reviews and write review

  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com  | 12345678 |
    And I click on Login button

  Scenario: Reviewer see all restaurant detail
    Given I visit on Restaurant Detail page
    Then  I should see restaurant image
    And   I should see restaurant information
    And   I should see rating
    And   I should see recommended menu
    And   I should see create review button
    And   I should see review filter
    And   I should see reviews

  Scenario: Reviewer see all restaurant image
    Given I visit on Restaurant Detail
    Then I should see restaurant image
    When I click "image" of restaurant
    Then I should see all "image" of restaurant


  Scenario: Reviewer read myreview
    Given I visit on Restaurant Detail page
    Then  I should see  myreview button
    When  I click myreview button
    Then  I should see review modal

  Scenario: Reviewer edit review
    Given I visit on Restaurant Detail page
    Then  I should see  ditReview button
    And   I click EditReview button
    Then  I should see review form
    When  I rates stars
    And   I click comment words button
    And   I write comment
      | commentBox |
      | อร่อยมากๆค่ะ |
    And   I click submit button
    Then  I should review successful

  Scenario: Reviewer search review
    When I search "อร่อย" in search review
      | SearchReview |
      | อร่อย      |
    Then I should see reviews

  Scenario: Reviewer select stars
    When I select star
    Then I should see reviews


  Scenario: Reviewer filer reviews
    When I select star
    And  I click filters button
    Then I should see reviews


  Scenario: Reviewer filer all reviews
    When I select star
    And  I click All button
    Then I should see reviews

  Scenario: Reviewer filer picture reviews
    When I select star
    And  I click Picture button
    Then I should see reviews

  Scenario: Reviewer filer comment reviews
    When I select star
    And  I click Comment button
    Then I should see reviews

  Scenario: Reviewer search and filter reviews
    When I search "อร่อย" in search review
      | SearchReview |
      | อร่อย      |
    And I select star
    And I click Picture button
    Then I should see reviews

  Scenario: Reviewer filer menu reviews
    When I select star
    And  I click Menu  button
    Then I should see reviews






