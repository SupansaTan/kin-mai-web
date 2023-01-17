Feature: Reataurnat Detail
    Restaurant owner is able tot see thier restaurant's information and rating

    Scenario: Restaurant owner can see all restaurant's information
        Given I visit on Restaurant Detail page
        Then I should see restaurant's image
        And I should see rating
        And I should see information
        And I should see google map
        And I should see button
            | button |
            | editInfoBtn |

    Scenario: Restaurant owner edit information
        Given I visit on Restaurant Detail page
        Then I should see button
            | button |
            | editInfoBtn |
        When I click on "Edit"
        Then I should be on Edit Detail page
        
