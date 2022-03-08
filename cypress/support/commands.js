// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

const { InvitationPage } = require('../page-objects/invitation-page');

Cypress.Commands.add('navigateToFoodeeInvitationPage', () => {
    cy
        .visit('/')
})

Cypress.Commands.add('signInAsGuest', () => {
    // cy
    //     .navigateToFoodeeInvitationPage()
    InvitationPage.actions.assertPageUrl()
    InvitationPage.actions.assertPageTitle()
    InvitationPage.actions.clickOnContinueAsGuest()
    InvitationPage.actions.fillSignupForm()
    InvitationPage.actions.clickOnStartOrderButton()
})

