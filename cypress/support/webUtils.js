const WebUtils = {
    actions: {
        getInnerText(element) {
            const text =
                Cypress
                    .$(element)
                    .get(0)
                    .innerText
            return text
        }

    }
}

export default { WebUtils }