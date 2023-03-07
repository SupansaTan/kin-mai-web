Feature: Restaurant Edit Detail
    Restaurant can edit , add and remove their details
  
  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | punch3@gmail.com | 12345678 |
    And I click on Login button
    And I should be on Restaurant homepage

  Scenario: Restaurant owner can edit  detail
    Given I visit on the Restaurant Detail
    Then  I should see "edit" button
    When  I press "edit" button
    Then  I should be on restaurant edit detail page
    When  I press "next" button
    Then  I should see upload form
    When  I press "next" button
    Then  I should see status form

  # Scenario: Restaurant owner with valid form
  #   Given I visit on the restaurant edit page
  #   And  I should see edit form
  #   When  I complete fill in the form
  #   And   I click "Submit" button
  #   Then  I should see restaurant detail homepage

  #  Scenario: Restaurant owner with invalid form
  #   Given I visit on the restaurant edit page
  #   Then  I should see edit form
  #   When  I fill in some field in the form
  #   And   I click "Submit" button
  #   Then  I should see red border field and message that field is required

 Scenario: User register as restaurant owner with valid form
    And I click register as restaurant owner
    When I complete fill in the reviewer form
      | firstName | lastName | username   | email            | password | confirmPassword |
      | supansa   | test     | supansaa03 | punch3@gmail.com | 12345678 | 12345678        |
    And I click "Next" button
    Then I should see restaurant information form
    When I complete fill in the restaurant information form
      | fieldName         | value                                       |
      | restaurantName    | JaideeTestCafe                              |
      | minPriceRate      | 50                                          |
      | maxPriceRate      | 200                                         |
      | address           | 133 ประชาราษฎร์ 16/2                          |
      | restaurantType    | ทั้งของคาวและของหวาน                           |
      | foodCategory      | อาหารตามสั่ง,ชา/กาแฟ,เครื่องดื่ม/น้ำผลไม้             |
      | deliveryType      | เดลิเวอรี่,รับที่ร้าน                                |
      | paymentMethod     | เงินสด,โอนและสแกนจ่าย,บัตรเดบิตและบัตรเครดิต,คนละครึ่ง  |
      | socialContactType | เบอร์โทร                                      |
      | contactValue      | 0999999999                                  |
      | day               | ทุกวัน                                        |
      | startTime         | 00:00                                       |
      | endTime           | 23:59                                       |
    And I click "Next" button
    Then I should see upload restaurant photo form
    When I complete fill in the upload restaurant photo form
      | filePath                                              | restaurantStatus |
      | src\assets\image\cafe.jpg,src\assets\image\coffee.jpg | Open Now         |
    And I click "Next" button
    Then I should see confirmation register form as restaurant
    And I click "Submit" button
    # Then I should see modal "Create account successful"

  Scenario: User register as restaurant owner with invalid form
    And I click register as restaurant owner
    When I complete fill in the reviewer form
      | firstName | lastName | username   | email            | password | confirmPassword |
      | supansa   | test     | supansaa03 | punch3@gmail.com | 12345678 | 12345678        |
    And I click "Next" button
    Then I should see restaurant information form
    When I fill in some field in the restaurant information form
      | fieldName         | value              |
      | restaurantName    | JaideeTestCafe     |
      | minPriceRate      | 50                 |
      | maxPriceRate      | 200                |
      | address           | 133 ประชาราษฎร์ 16/2 |
    And I click "Next" button
    Then I should see red border field and message that field is required
      | fieldName       | errorMessageType        |
      | restaurantType  | RequireRestaurantType   |
