Feature: Restaurant Homepage
  Restaurant owner is able to see their dashboard , reviews and rating

  Scenario: Restaurant owner can see restaurant's detail
    Given I visit on the Restaurant Homepage
    Then I should see today rating
    And I should see total rating
    And I should see customer satisfaction
    And I should see recommend menu
    And I should see reviews

  Scenario: Restaurant owner search recommended menus and comments
    Given I visit on the Restaurant Homepage
    Then  I should see all reviews from Reviewers
    When  I search "recommended menus" and "comments" to know reviews
    Then  I should see reviews about these "recommended menu" and "comments"

  Scenario: Restaurant owner can see all reviews
    Given I visit on the Restaurant Homepage
    Then  I should see all detail
    When  I click "all stars" of Reviewers
    Then  I should see all reviews from Reviewers

  Scenario: Restaurant owner select 3 stars
    Given I visit on the Restaurant Homepage
    Then  I should see all detail
    When  I press "3 stars" of Reviewers
    Then  I should see all "3 stars" reviews from Reviewers

  Scenario: Restaurant owner press All button for reviews
    Given I visit on the Restaurant Homepage
    Then  I should see all detail
    When  I press "all" button
    Then  I should see all reviews from Reviewers

  Scenario: Restaurant owner press picture button for reviews
    Given I visit on the Restaurant Homepage
    Then  I should see all detail
    When  I press "picture" button
    Then  I should see all reviews that have pictures from Reviewers

  Scenario: Restaurant owner press comment button for reviews
    Given I visit on the Restaurant Homepage
    Then  I should see all detail
    When  I press "comment" button
    Then  I should see all reviews that have comments from Reviewers

  Scenario: Restaurant owner press recommended menu button for reviews
    Given I visit on the Restaurant Homepage
    Then  I should see all detail
    When  I press "recommended menu" button
    Then  I should see all reviews that have recommended menus from Reviewers

  Scenario: Restaurant owner can reply reviewer back
    Given I visit on the Restaurant Homepage
    Then  I should see all detail
    When  I press "reply" button
    Then  I should see text box for type text


