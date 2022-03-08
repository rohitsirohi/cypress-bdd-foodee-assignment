import { WebUtils } from '../support/webUtils';

const OrderPage = {
    literals: {

    },

    elements: {
        menuItems: '[data-test-restaurant-menu-item]',
        emptyCart: '.fde-restaurant-cart_empty',
        itemCart: '.fde-cart-order-items',
        addOptionsWindow: '[data-test-rd-ui-modal]',
        addOptionsParentWindow: '#rd-modal-overlays',
        optionsOrderButton: '[data-test-form-button="submit"]',
        ingredientsCheckbox: '[data-test-ff-control-checkbox-select]',
        modifyCartItemChild: '.ember-tooltip-base',
        placeOrderButton: '[data-test-checkout-button]',
        addCutleryForm: '[data-test-field-for="object_cutlery-items-selected"]',
        cutleryCheckbox: '[data-test-ff-control-checkbox-select-input="0"]',
        platesCheckbox: '[data-test-ff-control-checkbox-select-input="1"]',
        servingSpoonCheckbox: '[data-test-ff-control-checkbox-select-input="2"]',
        servingTongCheckbox: '[data-test-ff-control-checkbox-select-input="3"]',
        cutleryUnitInput: '[data-test-ff-control-input]',
        checkoutButton: '[data-test-form-button="submit"]',
        problemPlacingOrderWindow: '[data-test-basic-modal-body]',
        budgetAmount: '.fde-restaurant-cart-budget_amount'
    },

    actions: {
        addItemToCart(foodItem) {
            cy
                .log('Adding ' + foodItem + ' to cart')
                .get(OrderPage.elements.menuItems)
                .contains(foodItem, { matchCase: false })
                .click()

            cy.get(OrderPage.elements.addOptionsParentWindow).then(($element) => {
                if ($element.find('form').length > 0) {
                    cy.log("Options Window Exists").then(() => {
                        cy
                            .get(OrderPage.elements.optionsOrderButton)
                            .click()
                    })
                }
            })
        },

        addItemHavingOptionsToCart(foodItem, addOptions) {
            cy
                .log('Adding ' + foodItem + ' to cart')
                .get(OrderPage.elements.menuItems)
                .contains(foodItem, { matchCase: false })
                .click()

            cy.get(OrderPage.elements.addOptionsParentWindow).then(($element) => {
                if ($element.find('form').length > 0) {
                    cy.log('Options Window Exists').then(() => {
                        for (let properties in addOptions) {
                            let ingredient = addOptions[properties];
                            cy
                                .log('Adding Option' + ingredient)
                                .get(OrderPage.elements.ingredientsCheckbox)
                                .contains(ingredient, { matchCase: false }).prev()
                                .should('not.be.checked')
                                .check({ force: true })
                                .should('be.checked')
                        }
                        cy
                            .get(OrderPage.elements.optionsOrderButton)
                            .click()
                    })
                }
            })
        },

        modifyCartItemHavingOptions(foodItem, addOptions, deleteOptions) {
            OrderPage.actions.modifyItemInCart(foodItem)
            cy.get(OrderPage.elements.addOptionsParentWindow).then(($element) => {
                if ($element.find('form').length > 0) {
                    cy.log('Options Window Exists').then(() => {
                        for (let properties in addOptions) {
                            let ingredient = addOptions[properties];
                            cy
                                .log('Adding Option' + ingredient)
                                .get(OrderPage.elements.ingredientsCheckbox)
                                .contains(ingredient, { matchCase: false }).prev()
                                .should('not.be.checked')
                                .check({ force: true })
                                .should('be.checked')
                        }
                        for (let properties in deleteOptions) {
                            let ingredient = deleteOptions[properties];
                            cy
                                .log('Adding Option' + ingredient)
                                .get(OrderPage.elements.ingredientsCheckbox)
                                .contains(ingredient, { matchCase: false }).prev()
                                .should('be.checked')
                                .uncheck({ force: true })
                                .should('not.be.checked')
                        }
                        cy
                            .get(OrderPage.elements.optionsOrderButton)
                            .click()
                    })
                }
            })
        },

        assertThatCartIsEmpty() {
            cy
                .log('Verify Cart is Empty')
                .get(OrderPage.elements.emptyCart)
                .should('exist')
                .should('be.visible')
        },

        assertThatCartIsNotEmpty() {
            cy
                .log('Verify Cart is Empty')
                .get(OrderPage.elements.emptyCart)
                .should('not.exist')
        },

        assertThatItemIsAddedToCart(foodItem) {
            cy
                .log('Verify ' + foodItem + ' is added to Cart')
                .get(OrderPage.elements.itemCart)
                .contains(foodItem, { matchCase: false })
                .should('exist')
                .should('be.visible')
        },

        modifyItemInCart(foodItem) {
            cy
                .log('Modifying Item ' + foodItem + ' in Cart')
                .get(OrderPage.elements.itemCart)
                .contains(foodItem, { matchCase: false })
                .parent()
                .within(() => {
                    cy
                        .get(OrderPage.elements.modifyCartItemChild).parent()
                        .click()
                        .should('not.be.visible')
                })
        },

        clickOnPlaceOrder() {
            cy
                .log('Clicking on Place Order')
                .get(OrderPage.elements.placeOrderButton)
                .click()
                .should('not.be.focused')
        },

        addCuttleryToOrder(cutleryList) {
            cy
                .log('Adding cutlery to the Order')
                .get(OrderPage.elements.addCutleryForm).as('cutleryForm')
                .should('be.visible')
            for (let cutlery in cutleryList) {
                let numberOfCutlery = cutleryList[cutlery];
                cy
                    .log('Adding ' + numberOfCutlery + ' ' + cutlery)
                switch (cutlery) {
                    case 'Cutlery':
                        if (numberOfCutlery > 0)
                            OrderPage.actions.selectCutlery(OrderPage.elements.cutleryCheckbox, numberOfCutlery)
                        if (numberOfCutlery > 1)
                            OrderPage.actions.modifyUnitsOfCutlery(OrderPage.elements.cutleryCheckbox, numberOfCutlery)
                        break;

                    case 'Plates':
                        if (numberOfCutlery > 0)
                            OrderPage.actions.selectCutlery(OrderPage.elements.platesCheckbox, numberOfCutlery)
                        if (numberOfCutlery > 1)
                            OrderPage.actions.modifyUnitsOfCutlery(OrderPage.elements.platesCheckbox, numberOfCutlery)
                        break;

                    case 'Serving Spoon':
                        if (numberOfCutlery > 0)
                            OrderPage.actions.selectCutlery(OrderPage.elements.servingSpoonCheckbox, numberOfCutlery)
                        if (numberOfCutlery > 1)
                            OrderPage.actions.modifyUnitsOfCutlery(OrderPage.elements.servingSpoonCheckbox, numberOfCutlery)
                        break;

                    case 'Serving Tong':
                        if (numberOfCutlery > 0)
                            OrderPage.actions.selectCutlery(OrderPage.elements.servingTongCheckbox, numberOfCutlery)
                        if (numberOfCutlery > 1)
                            OrderPage.actions.modifyUnitsOfCutlery(OrderPage.elements.servingTongCheckbox, numberOfCutlery)
                        break;

                    default:
                        cy.log('Incorrect cuttlery name ' + cutlery)
                }
            }
        },

        selectCutlery(element) {
            cy
                .get(element)
                .should('not.be.checked')
                .check({ force: true })
                .should('be.checked')
        },

        modifyUnitsOfCutlery(element, unitsOfCutlery) {
            cy
                .log('Modifying units of cutlery')
                .get(element).parent()
                .find('[data-test-rd-ui-button]')
                .last()
                .as('increaseCutlery')
            for (let count = 2; count <= unitsOfCutlery; count++) {
                cy
                    .get('@increaseCutlery')
                    .click()
            }
        },

        clickOnCheckout() {
            cy
                .log('Checking out the placed order')
                .get(OrderPage.elements.checkoutButton)
                .click({ force: true })
        },

        clickOnProblemPlacingOrder() {
            cy
                .log('Clicking OK! on Problem Placing Order')
                .get(OrderPage.elements.problemPlacingOrderWindow)
                .contains('Ok', { matchCase: false })
                .click()
        },

        getBudgetAmountLeft() {
            const budgetAmountLeft = WebUtils.actions.getInnerText(OrderPage.elements.budgetAmount)
            cy.log('Budget Remaining is ' + budgetAmountLeft)
            return budgetAmountLeft
        },

        assertThatBudgetIsNotNegative() {
            cy
                .log('Checking if Budget is greater than or equal to zero')
            const budgetAmountLeft = OrderPage.actions.getBudgetAmountLeft()
            expect(budgetAmountLeft.slice(1, 2)).not.to.be.equal('-')
        }


    }

}

export default { OrderPage }