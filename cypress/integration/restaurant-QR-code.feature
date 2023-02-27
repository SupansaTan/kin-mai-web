Feature: Generate QR Code
  Restaurant owner is able to see their dashboard , reviews and rating

  Background:
    Given I visit on login page
    When  I complete fill in login form
      | email               | password |
      | punch3@gmail.com  | 12345678 |
    And I click on Login button
    And I should be on Restaurant homepage
  
  Scenario: Owner have QR Code
    When  I click QR code button
    Then  I should be on QR code page
    And   I should see QR code
    When  I click save image
    Then  I should see QR code image
    
  


