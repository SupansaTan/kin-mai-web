Feature: Restaurant Review
  Reviewer is able to see restaurant reviews and edit review 

  Scenario: Reviewer can see all restaurant detail 
    Given I visit on the Restaurant Detail
    Then I should see all detail
  
  Scenario: Reviewer can see all reviews
    Given I visit on the Restaurant Detail
    Then I should see all detail
    When I click "stars" of Reviewers
    Then I should see all reviews from Reviewers

  Scenario: Reviwer rates stars for review 
    Given I visit on the Restaurant Detail
    Then I should see "Edit Review " button
    When I click "Edit Review"
    Then I should see "Edit Review Page " 
    When I rates stars
    Then I should see amount of stars

  Scenario: Reviwer write review 
    Given I visit on the Restaurant Detail
    Then I should see "Edit Review " button
    When I click "Edit Review"
    Then I should see "Edit Review Page " 
    When I write review 
    Then I should see review text 

  Scenario: Reviwer add review picture
    Given I visit on the Restaurant Detail
    Then I should see "Edit Review " button
    When I click "Edit Review"
    Then I should see "Edit Review Page " 
    When I  add review picture 
    Then I should see picture

  Scenario: Reviwer can sent review to restaurant
    Given I visit on the Restaurant Detail
    Then I should see "Edit Review " button
    When I click "Edit Review"
    Then I should see "Edit Review Page " 
    When I rates stars
    Then I should see amount of stars
    When I click "Send"
    Then I can see "Thank you for review"
