Feature: Login As Guest User

  New user wants to Signup at foodee and order food

  # Common mistakes writing Gherkin features
  # https://www.spritecloud.com/the-3-most-common-mistakes-writing-gherkin-features/

  Background:
    Given the user navigates to foodee invitation page

  Scenario: Login as a guest
    When the user is presented with the signing modal
    Then the user is able to select guest or sign in option
    And the user is able to sign in as a guest

  Scenario: Provide user details and login as guest
    When the user select sign in as a guest
    Then the user is presented with details form that validates user inputs
      | name         | email               | phoneNumber    | department | notifyByEmail | notifyBySms |
      | Sirohi Rohit | sirohirohit@food.ee | (555) 555-5555 | SDET       | no            | yes         |