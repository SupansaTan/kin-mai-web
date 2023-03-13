Feature: Edit Profile
  Reviewers can chage their name and id name

  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button
    And I should be on reviewer homepage
    And I click dropdown menu
    And  I click edit profile button
    Then I should be on edit profile page

  

  Scenario: Reviewer fill valid form
    When I remove old IDname
    And  I change IDname in edit form
      | IDname|
      | aaaaaaaaaa |
    And I click next button
    And  I click submit button
    Then I should see successful modal


  Scenario: Reviewer fill invalid form
    When I remove old IDname
    And  I click next button
    Then I should be on edit profile page



