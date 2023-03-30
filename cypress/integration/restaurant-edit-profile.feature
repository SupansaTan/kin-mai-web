Feature: Restaurant Edit Detail
    Restaurant can edit , add and remove their details

  Background:
    Given I visit on login page
    When I complete fill in login form
      | email                    | password |
      | natthamon200@gmail.com   | 12345678 |
    And I click on Login button
    And I should be on Restaurant homepage
    And I click dropdown menu
    And I click edit profile button
    And I should be on restaurant detail
    And I click edit button
    And I should be on restaurant edit page

  Scenario: Owner fill valid form
    When I remove name of restaurant
    And  I change name of restaurant
          |Name        |
          |ส้มตำป้าจงดี   |
    And I fill address
      | address           | 
      | 133 ประชาราษฎร์ 16/2       |
    And I remove old number
    And I add new number
          |Number     |
          |0948888888 |
    And   I click "Next" button
    Then  I should see upload restaurant photo form
    And   I click "Next" button
    Then  I should see confirmation register form as restaurant
    And   I click "Submit" button
    Then  I should see successful modal

  Scenario: Owner fill invalid form
    When  I remove name of restaurant
    And   I click "Next" button
    Then  I should see error message
