Feature: Restaurant Homepage
  Restaurant owner is able to see their dashboard , reviews and rating

   Background:
    Given I visit on login page
    When  I complete fill in login form
      | email               | password |
      | punch3@gmail.com  | 12345678 |
    And I click on Login button
    And I should be on Restaurant homepage

  Scenario: Owner can see restaurant homepage
    Given I should see today rating
    And   I should see total rating
    And   I should see customer satisfaction
    And   I should see recommend menu
    And   I should see reviews
  
  Scenario: Owner have QR Code
    When  I click QR code button
    Then  I should be on QR code page
    And   I should see QR code
    When  I click save image
    Then  I should see QR code image
    

  Scenario: Owner search review
    When I search "อร่อย" in search review
      | SearchReview |
      | อร่อย      |
    Then I should see reviews

  Scenario: Owner select stars
    When I select star
    Then I should see reviews

  Scenario: Owner filter all reviews
    When  I click All button
    Then  I should see reviews

  Scenario: Owner filter picture reviews
    When  I click Picture button
    Then  I should see reviews

  Scenario: Owner filter comment reviews
    When I click Comment button
    Then I should see reviews

  Scenario: Owner filter menu reviews
    When I click Menu button
    Then I should see reviews

  Scenario: Owner search and filter reviews
    When I search "อร่อย" in search review
      | SearchReview |
      | อร่อย      |
    And I select star
    And I click Picture button
    Then I should see reviews
  
  Scenario: Owner reset reviews
    When I click Picture button
    And I select star
    And I click reset button
    Then I should see reviews

  Scenario: Owner reply review
    When I click answer box
    And I type answer box
      | AnswerBox |
      | ขอบคุณสำหรับรีวิวจ้า |
    And I click reply button
    Then I should see successful modal

  Scenario: Owner edit reply
    When I click edit button
    And I click answer box
    And  I remove old reply
    And  I type answer box
      | AnswerBox |
      | จะนำไปปรับปรุงแก้ไขค่ะ |
    And I click reply button
    Then I should see successful modal

  Scenario: Owner remove reply
    When I click edit button
    And I click answer box
    And  I remove old reply
    And I click reply button
    Then I should see successful modal














