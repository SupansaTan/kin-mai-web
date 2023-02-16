Feature: Restaurant Review
  Reviewer is able to create review 

  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button

  Scenario: Reviwer see review form
    Given I visit on Restaurant Detail page
    Then  I should see create review button
    When  I click create review button
    Then  I should see create review modal
    And   I should see rates stars
    And   I should see comment words button
    And   I should see comment box
    And   I should see upload photo
    And   I should see add menu button
    And   I should see submit button

  Scenario: Reviwer create review
    Given I visit on Restaurant Detail page
    Then  I should see create review button
    When  I click create review button
    Then  I should see create review modal
    When  I rates stars
    And   I click comment words button
    And   I write comment
      | commentBox |
      | Clean food Good taste |
    And   I upload photo
    And   I click add menu button
    And   I write menu name
    When  I click submit button
    Then  I should not see review modal

