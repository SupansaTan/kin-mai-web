Feature: Restaurant Review
  Reviewer is able to  edit review 

  Scenario: Reviwer rates stars for review 
    Given I visit on the Restaurant Detail
    Then  I should see "Edit Review " button
    When  I click "Edit Review"
    Then  I should see "Edit Review Page " 
    When  I rates stars
    Then  I should see amount of stars and phrase
  
  Scenario: Reviwer press words for review 
    Given I visit on the Restaurant Detail
    Then  I should see "Edit Review " button
    When  I click "Edit Review"
    Then  I should see "Edit Review Page " 
    When  I press words for review
    Then  I should see my words for review

  Scenario: Reviwer write review 
    Given I visit on the Restaurant Detail
    Then  I should see "Edit Review " button
    When  I click "Edit Review"
    Then  I should see "Edit Review Page " 
    When  I write review 
    Then  I should see review text 

  Scenario: Reviwer add review picture
    Given I visit on the Restaurant Detail
    Then  I should see "Edit Review " button
    When  I click "Edit Review"
    Then  I should see "Edit Review Page " 
    When  I add review picture 
    Then  I should see picture
  
  Scenario: Reviwer add menu review 
    Given I visit on the Restaurant Detail
    Then  I should see "Edit Review " button
    When  I click "Edit Review"
    Then  I should see "Edit Review Page " 
    When  I add menu review 
    Then  I should menu review

  Scenario: Reviwer can sent review to restaurant
    Given I visit on the Restaurant Detail
    Then  I should see "Edit Review " button
    When  I click "Edit Review"
    Then  I should see "Edit Review Page " 
    When  I rates stars
    Then  I should see amount of stars
    When  I click "Send"
    Then  I can see "Thank you for review"
