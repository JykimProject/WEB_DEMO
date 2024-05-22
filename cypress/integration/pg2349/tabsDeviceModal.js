export function tabsDeviceModalTest () {
    it('Tabs check', () => {
        cy.visit('/')
        cy.wait(500)
        cy.get('.circle__inner').click()
        cy.get('a[title="Connected devices"]').click({ force: true })
        cy.wait(500)
        cy.checkIfEleExists('.circle__inner--small')
            .then(value => {
                if (value === true) {
                    cy.get('.circle__inner--small').first().click()
                    cy.wait(500)
                    cy.get('.tabs__item').contains('general')
                    cy.get('.tabs__item').contains('Users')
                    cy.get('.tabs__item').contains('Usage quota')
                    cy.get('.tabs__item').contains('Application filter')
                    cy.get('.tabs__item').contains('Internet Access')
                    cy.get('.tabs__item').contains('digital parenting')
                    cy.get('.tabs__item').contains('security')
                    cy.get('.tabs__item').contains('DNS history')
                } 
            })
    })
}
