const InvitationPage = {
    literals: {
        BASEURL: 'https://app-staging.food.ee/team-order/',
        PAGE_TITLE: 'Beetbox | Foodee',
        FULLNAME_PLACEHOLDER: 'Jim Bob',
        FULLNAME: 'Rohit Sirohi',
        EMAIL_PLACEHOLDER: 'jimbob@company.com',
        EMAIL: 'rohitsirohi@food.ee',
        PHONE_NUMBER_PLACEHOLDER: '(201) 555-0123',
        PHONE_NUMBER: '(999) 999-9999',
        DEPARTMENT_PLACEHOLDER: 'Accounting',
        DEPARTMENT: 'QA',
        NOTIFY_BY_EMAIL: true,
        NOTIFY_BY_SMS: false
    },

    elements: {
        modalDialogue: '[data-test-basic-modal-body]:parent',
        signInButton: '[data-test-rd-ui-button="primary"]:eq(0)',
        continueAsGuestButton: '[data-test-rd-ui-button="secondary"]',
        backButton: '[data-test-rd-ui-button="button"]',
        signupPageMessage: 'Test Order',
        formBody: '[data-test-basic-modal-body]',
        fullNameLabel: 'Your Full Name*',
        emailLabel: 'Your Email*',
        phoneNumberInput: '[data-intl-tel-input-id]',
        departmentLabel: 'Your Department',
        notifyByEmailLabel: 'Notify by email',
        notifyBySmsLabel: 'Notify by Sms',
        startOrderButton: 'Start Ordering',
    },

    actions: {
        assertPageTitle() {
            cy
                .log('Verifying Page Title')
                .title()
                .should('equal', InvitationPage.literals.PAGE_TITLE)
        },

        assertPageUrl() {
            cy
                .log('Verifying Page Url')
                .url()
                .should('contain', InvitationPage.literals.BASEURL)
        },

        assertIfModalDialogueExists() {
            cy
                .log('Verifying if Modal Diagogue Exists')
                .get(InvitationPage.elements.modalDialogue)
                .should('be.visible')
        },

        clickOnSignIn() {
            cy
                .log('Clicking on Sign In Button')
                .get(InvitationPage.elements.signInButton)
                .click()
                .should('not.exist')
        },

        clickOnContinueAsGuest() {
            cy
                .log('Clicking on Continue as Guest Button')
                .get(InvitationPage.elements.continueAsGuestButton)
                .click()
                .should('not.exist')
        },

        clickOnBackButton() {
            cy
                .log('Clicking on Back Button')
                .get(InvitationPage.elements.backButton)
                .click()
                .should('not.exist')
        },

        assertSignupPageDisplayMessage() {
            cy
                .log('Verifying Signup Display Message')
                .contains(InvitationPage.elements.signupPageMessage)
                .should('exist')
        },

        enterNameInForm(fullName) {
            cy
                .log('Entering FullName')
                .log(fullName)
                .get(InvitationPage.elements.formBody)
                .contains(InvitationPage.elements.fullNameLabel, { matchCase: false }).next()
                .should('have.attr', 'placeholder', InvitationPage.literals.FULLNAME_PLACEHOLDER)
                .type(fullName)
                .should('have.value', fullName)
        },

        enterEmailInForm(email) {
            cy
                .log('Entering Email')
                .get(InvitationPage.elements.formBody)
                .contains(InvitationPage.elements.emailLabel, { matchCase: false }).next()
                .should('have.attr', 'placeholder', InvitationPage.literals.EMAIL_PLACEHOLDER)
                .type(email)
                .should('have.value', email)
        },

        enterPhoneNumberInForm(phoneNumber) {
            cy
                .log('Entering Phone Number')
                .get(InvitationPage.elements.phoneNumberInput)
                .should('have.attr', 'placeholder', InvitationPage.literals.PHONE_NUMBER_PLACEHOLDER)
                .type(phoneNumber)
                .should('have.value', phoneNumber)
        },

        enterDepartmentInForm(department) {
            cy
                .log('Entering Department')
                .get(InvitationPage.elements.formBody)
                .contains(InvitationPage.elements.departmentLabel, { matchCase: false }).next()
                .should('have.attr', 'placeholder', InvitationPage.literals.DEPARTMENT_PLACEHOLDER)
                .type(department)
                .should('have.value', department)
        },

        enterNotifyByEmailInForm(notifyByEmail) {
            cy
                .get(InvitationPage.elements.formBody)
                .contains(InvitationPage.elements.notifyByEmailLabel, { matchCase: false }).prev()
                .as('emailCheckbox')
                .should('not.be.checked')
            if (notifyByEmail) {
                cy
                    .log('Checking notify By EMail')
                    .get('@emailCheckbox')
                    .check({ force: true })
                    .should('be.checked')
            }
        },

        enterNotifyBySmsInForm(notifyBySms) {
            cy
                .get(InvitationPage.elements.formBody)
                .contains(InvitationPage.elements.notifyBySmsLabel, { matchCase: false }).prev()
                .as('smsCheckbox')
                .should('not.be.checked')
            if (notifyBySms) {
                cy
                    .log('Checking notify By Sms')
                    .get('@smsCheckbox')
                    .check({ force: true })
                    .should('be.checked')
            }
        },

        fillSignupForm(fullName, email, phoneNumber, department, notifyByEmail, notifyBySms) {
            if (fullName == undefined) fullName = InvitationPage.literals.FULLNAME;
            if (email == undefined) email = InvitationPage.literals.EMAIL;
            if (phoneNumber == undefined) phoneNumber = InvitationPage.literals.PHONE_NUMBER;
            if (department == undefined) department = InvitationPage.literals.DEPARTMENT;
            if (notifyByEmail == undefined) notifyByEmail = InvitationPage.literals.NOTIFY_BY_EMAIL;
            if (notifyBySms == undefined) notifyBySms = InvitationPage.literals.NOTIFY_BY_SMS;
            this.notifyByEmail = (this.notifyByEmail === 'yes') ? true : false;
            this.notifyBySms = (this.notifyBySms === 'yes') ? true : false;
            InvitationPage.actions.enterNameInForm(fullName)
            InvitationPage.actions.enterEmailInForm(email)
            InvitationPage.actions.enterPhoneNumberInForm(phoneNumber)
            InvitationPage.actions.enterDepartmentInForm(department)
            InvitationPage.actions.enterNotifyByEmailInForm(notifyByEmail)
            InvitationPage.actions.enterNotifyBySmsInForm(notifyBySms)
        },

        clickOnStartOrderButton() {
            cy
                .log('Clicking on Starting Order')
                .get(InvitationPage.elements.formBody)
                .contains(InvitationPage.elements.startOrderButton)
                .click()
                .should('not.exist')
        }
    }
}

export default { InvitationPage }