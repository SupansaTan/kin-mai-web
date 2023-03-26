Feature: Visitor on homepage

  Background:
    Given I visit reviewer homepage
  
  Scenario: Visitor see list of restaurant near me
    Given I see restaurant near me
  
  Scenario: Visitor watch restaurant detail
    When  I click title of Restaurant
    Then  I should be on Restaurant detail page

  Scenario: Visitor can not find restaurant
    When  I search in a search box
      | searchbox |
      | ร้านลุงดีส้มตำ |
    Then I should not see list of "restaurant" near me

  Scenario: Visitor can find restaurant with filter
    When  I search in a search box
      | searchbox |
      | ร้าน |
    And  I should see filter
    And  I click open button
    And  I click food categories
    Then I should see list of "restaurant" near me
  
  Scenario: Visitor can not like restaurant
    Given I should not see love button
  
  Scenario: Visitor can not review restaurant
    Given I should not see review button
  
  Scenario: Visitor click login button
    When I click login button
    Then I should be on login page


  
  
