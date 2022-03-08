/// <reference types="cypress" />
const { Before, Given, When, Then, And } = require("cypress-cucumber-preprocessor/steps");
const { InvitationPage } = require('../../page-objects/invitation-page');

Before(() => {
    cy.navigateToFoodeeInvitationPage()
})

beforeEach(function () {
    cy.fixture('user').then(function (userData) {
        this.userData = userData;
    })
})

Given('the user navigates to foodee invitation page', () => {
    cy.navigateToFoodeeInvitationPage()
    InvitationPage.actions.assertPageUrl()
    InvitationPage.actions.assertPageTitle()
})

When('the user is presented with the signing modal', () => {
    InvitationPage.actions.assertIfModalDialogueExists()
})

Then('the user is able to select guest or sign in option', () => {
    InvitationPage.actions.clickOnSignIn()
    InvitationPage.actions.clickOnBackButton()
    InvitationPage.actions.assertPageUrl()
    InvitationPage.actions.assertPageTitle()
    InvitationPage.actions.clickOnContinueAsGuest()
})

And('the user is able to sign in as a guest', () => {
    InvitationPage.actions.assertSignupPageDisplayMessage()
    InvitationPage.actions.fillSignupForm()
})

When('the user select sign in as a guest', () => {
    InvitationPage.actions.clickOnContinueAsGuest()
})

Then('the user is presented with details form that validates user inputs', (datatable) => {
    InvitationPage.actions.assertSignupPageDisplayMessage()
    datatable.hashes().forEach((element) => {
        InvitationPage
            .actions
            .fillSignupForm(element.name, element.email, element.phoneNumber,
                element.department, element.notifyByEmail, element.notifyBySms)
    });
    InvitationPage.actions.clickOnStartOrderButton()
})



