export function securityModalTest () {
    var httpValidation
    it('Open modal', () => {
        cy.visit('radar')
        cy.wait(5000)
        cy.get('.circle__inner').click()
        cy.get('a[title="Sentinel Internet Security"]').click({ force: true })
        cy.wait(1000)

        cy.get('.modal__title').contains('Sentinel internet security')
    })

    it('Security', () => {
        cy.get('.activity--modal__summary__title').last().then(elem => {
            if (elem.text() == 'Enabled'){
                cy.get('.ivu-switch-checked')
                cy.get('input[value="true"]')
                httpValidation = true
            }
            else {
                cy.get('.ivu-switch')
                cy.get('input[value="false"]')
                cy.get('.activity--modal__summary__title').contains('Disabled')
                httpValidation = false
            }
        })
        cy.get('.activity--modal__summary__text').contains('Total threats prevented')
        cy.get('.activity--modal__summary__text').contains('Total files validated')
        cy.get('.activity--modal__summary__text').contains('Sentinel File Validation')

        cy.get('button').contains('blocked malware').click()
        cy.wait(1000)
        cy.get('.modal__title').contains('security log')
        cy.get('button').contains('Back').click()
        cy.wait(1000)
    })
    it('Http validation and modal elements', () => {
        cy.get('.ivu-switch').click()
        cy.wait(1000)
        cy.get('button').contains('Save').click()
        cy.wait(1000)
        cy.get('.circle__inner').click()
        cy.wait(1000)
        cy.get('a[title="Sentinel Internet Security"]').click({ force: true })
        cy.wait(2000)

        cy.get('input')
            .invoke('val')
            .then(state =>  expect(state).to.be.eq((!httpValidation).toString()))

        cy.get('.ivu-switch').click()
        cy.get('button').contains('Save').click()
        cy.get('.circle__inner').click()
        cy.get('a[title="Sentinel Internet Security"]').click({ force: true })
        cy.wait(1000)

        cy.get('.fieldset__legend').contains('web')
        cy.get('.field__lbl').contains('HTTP Validation')

        cy.get('input')
            .invoke('val')
            .then(state =>  expect(state).to.be.eq((httpValidation).toString()))

        cy.get('span').contains('advanced security').click()
        cy.wait(1000)
        cy.get('.security__title').contains('security')
        cy.get('.header__logo').click()
        cy.wait(1000)

        cy.get('.circle__inner').click()
        cy.get('a[title="Sentinel Internet Security"]').click({ force: true })
        cy.wait(1000)

        cy.get('button').contains('Cancel')
        cy.get('button').contains('Save')
    })

    it('Close modal', () => {
        cy.get('.modal__close').click()
        cy.wait(500)
    })
}
