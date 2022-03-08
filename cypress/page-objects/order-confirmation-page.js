import { expect } from 'chai';
import { WebUtils } from '../support/webUtils';

const OrderConfirmationPage = {
    literals: {
        PAGE_URL: 'checkout/confirmation',
        PAGE_TITLE: 'Confirmed | Beetbox | Foodee',
        ORDER_CONFIRMATION_TITLE: 'Order Submitted',
        ORDER_CONFIRMATION_INFO: "\n      We've sent you a confirmation e-mail with your selection\n    "
    },

    elements: {
        confirmationReceipt: '.fde-order-confirmation_receipt-circle',
        orderConfirmationTitle: '.fde-order-confirmation_title',
        orderConfirmationInfo: '.fde-order-confirmation_information'
    },

    actions: {
        assertPageTitle() {
            cy
                .log('Verifying Page Title')
                .title()
                .should('equal', OrderConfirmationPage.literals.PAGE_TITLE)
        },

        assertPageUrl() {
            cy
                .log('Verifying Page Url')
                .url()
                .should('contain', OrderConfirmationPage.literals.PAGE_URL)
        },

        assertThatPageHasConfirmationTitle() {
            cy
                .log('Verifying Order Confirmation Title')
                .get(OrderConfirmationPage.elements.orderConfirmationTitle)
                .should('have.text', OrderConfirmationPage.literals.ORDER_CONFIRMATION_TITLE)
        },

        assertThatPageHasConfirmationInfo() {
            cy
                .log('Verifying Order Confirmation Info')
                .get(OrderConfirmationPage.elements.orderConfirmationInfo)
                .should('have.text', OrderConfirmationPage.literals.ORDER_CONFIRMATION_INFO)
        }
    }
}

export default { OrderConfirmationPage }