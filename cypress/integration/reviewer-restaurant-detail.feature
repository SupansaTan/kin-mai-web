Feature: Restaurant Detail
  Reviewer is able to see restaurant detail , rating , reviews and write review
  
  Scenario: Reviewer can see all restaurant detail
    Given I visit on the Restaurant Detail
    Then I should see all detail 
  
  Scenario: Reviewer can see all reviews
    Given I visit on the Restaurant Detail
    Then I should see all detail
    When I click "all stars" of Reviewers
    Then I should see all reviews from Reviewers
  
  Scenario: Reviewer search recommended menus and comments 
    Given I visit on the Restaurant Detail
    Then I should see all reviews from Reviewers
    When I search "recommended menus" and "comments" to know reviews
    Then I should see reviews about these "recommended menu" and "comments"

  Scenario: Reviewer select 3 stars 
    Given I visit on the Restaurant Detail
    Then I should see all detail
    When I press "3 stars" of Reviewers
    Then I should see all "3 stars" reviews from Reviewers
  
  Scenario: Reviewer press All button for reviews 
    Given I visit on the Restaurant Detail
    Then I should see all detail
    When I press "all" button
    Then I should see all reviews from Reviewers
  
  Scenario: Reviewer press picture button for reviews 
    Given I visit on the Restaurant Detail
    Then I should see all detail
    When I press "picture" button
    Then I should see all reviews that have pictures from Reviewers
  
  Scenario: Reviewer press comment button for reviews 
    Given I visit on the Restaurant Detail
    Then I should see all detail
    When I press "comment" button
    Then I should see all reviews that have comments from Reviewers
  
  Scenario: Reviewer press recommended menu button for reviews 
    Given I visit on the Restaurant Detail
    Then I should see all detail
    When I press "recommended menu" button
    Then I should see all reviews that have recommended menus from Reviewers


