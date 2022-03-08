/// <reference types="cypress" />
import { Before, Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { OrderPage } from '../../page-objects/order-page';
import { OrderConfirmationPage } from '../../page-objects/order-confirmation-page'

Before(() => {
    cy.navigateToFoodeeInvitationPage()
})

beforeEach(function () {
    cy.fixture('user').then(function (userData) {
        this.userData = userData;
    })
})

Given('the user is signed in as a guest', () => {
    cy.signInAsGuest()
})

When('the user selects a food item {string} with no options', (foodItem) => {
    OrderPage.actions.assertThatCartIsEmpty()
    OrderPage.actions.addItemToCart(foodItem)
})

Then('that item {string} is added to the users cart', (foodItem) => {
    OrderPage.actions.assertThatCartIsNotEmpty()
    OrderPage.actions.assertThatItemIsAddedToCart(foodItem)
})

When('the user selects multiple items {string} {string} {string} with no options', (firstFoodItem, secondFoodItem, thirdFoodItem) => {
    OrderPage.actions.assertThatCartIsEmpty()
    OrderPage.actions.addItemToCart(firstFoodItem)
    OrderPage.actions.addItemToCart(secondFoodItem)
    OrderPage.actions.addItemToCart(thirdFoodItem)
    OrderPage.actions.assertThatCartIsNotEmpty()
    OrderPage.actions.assertThatItemIsAddedToCart(firstFoodItem)
    OrderPage.actions.assertThatItemIsAddedToCart(secondFoodItem)
    OrderPage.actions.assertThatItemIsAddedToCart(thirdFoodItem)
})

Then('the user is unable to exceed the budget', () => {
    OrderPage.actions.assertThatBudgetIsNotNegative()
})

When('the user selects an item with options', (datatable) => {
    let foodItem, addOptions;
    OrderPage.actions.assertThatCartIsEmpty()
    datatable.hashes().forEach((item) => {
        foodItem = item.foodItem
        addOptions = {
            'firstOption': item.addFirstOption,
            'secondOption': item.addSecondOption
        }
    });
    OrderPage.actions.addItemHavingOptionsToCart(foodItem, addOptions)
})

Then('the user is able to select some modifications to the menu item', (datatable) => {
    let foodItem, addOptions, deleteOptions;
    OrderPage.actions.assertThatCartIsNotEmpty()
    datatable.hashes().forEach((item) => {
        foodItem = item.foodItem
        addOptions = {
            'firstOption': item.addOption,
        }
        deleteOptions = {
            'firstOption': item.deleteOption,
        }
    });
    OrderPage.actions.modifyCartItemHavingOptions(foodItem, addOptions, deleteOptions)
})


When('the user has finished ordering and checkout', (datatable) => {
    let foodItem, addOptions;
    OrderPage.actions.assertThatCartIsEmpty()
    datatable.hashes().forEach((item) => {
        foodItem = item.foodItem
        addOptions = {
            'firstOption': item.addFirstOption,
            'secondOption': item.addSecondOption
        }
    });
    OrderPage.actions.addItemHavingOptionsToCart(foodItem, addOptions)
    OrderPage.actions.clickOnPlaceOrder()
})

Then('the user is prompted for cutlery', (datatable) => {
    let cutleryList;
    datatable.hashes().forEach((item) => {
        cutleryList = {
            'Cutlery': item.cutlery,
            'Plates': item.plates,
            'Serving Spoon': item.servingSpoon,
            'Serving Tong': item.servingTong
        }
    })
    OrderPage.actions.addCuttleryToOrder(cutleryList)
})

And('the user is able to accept and finish the checkout process', () => {
    OrderPage.actions.clickOnCheckout()
    OrderConfirmationPage.actions.assertPageUrl()
    OrderConfirmationPage.actions.assertPageTitle()
    OrderConfirmationPage.actions.assertThatPageHasConfirmationTitle()
    OrderConfirmationPage.actions.assertThatPageHasConfirmationInfo()
})



