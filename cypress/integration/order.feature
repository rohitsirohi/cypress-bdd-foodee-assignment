Feature: Order food as a Guest user

    Order food as a guest

    Background:
        Given the user is signed in as a guest

    Scenario Outline: Adding items to users cart
        When the user selects a food item "<foodItem>" with no options
        Then that item "<foodItem>" is added to the users cart
        Examples:
            | foodItem           |
            | Burger With Cheeze |
            | PH Orange          |

    Scenario Outline: Budget Protection for user
        When the user selects multiple items "<firstItem>" "<secondItem>" "<thirdItem>" with no options
        Then the user is unable to exceed the budget
        Examples:
            | firstItem                       | secondItem   | thirdItem                     |
            | Roast Broccoli With Mushroom XO | PH Root Beer | PH Orange                     |
            | French Fries (Small)            | PH Cola      | Kombucha (Cranberry - Lychee) |


    Scenario: Selecting Options
        When the user selects an item with options
            | foodItem           | addFirstOption | addSecondOption |
            | Burger With Cheeze | Extra Patty    | Avocado         |
        Then the user is able to select some modifications to the menu item
            | foodItem           | addOption       | deleteOption |
            | Burger With Cheeze | Fried Mushrooms | Avocado      |

    Scenario: Checking out
        When the user has finished ordering and checkout
            | foodItem       | addFirstOption   | addSecondOption      |
            | Crispy Gordita | Bac-Un! (Seitan) | Cheeze *contain Nuts |
        Then the user is prompted for cutlery
            | cutlery | plates | servingSpoon | servingTong |
            | 0       | 1      | 2            | 0           |
        And the user is able to accept and finish the checkout process