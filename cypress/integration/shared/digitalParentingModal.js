export function digitalParentingModalTest () {
    it('digital parenting', () => {
        cy.visit('/')
        cy.wait(500)
        cy.get('.circle__inner').click()

        cy.get('a[title="Digital Parenting"]').click({ force: true })
        cy.get('.modal__window').contains('digital parenting')

        cy.get('.modal__content').then($modal__content => {
            const enabled = $modal__content.find('.u-display--ib')
            if (enabled.text() == 'connected devices page') {
                cy.get('.modal__content').contains('Parental control enabled')
                cy.get('.modal__content').contains('connected devices page').click()
                cy.get('.radar__title').contains('connected devices')
                cy.get('.radar__logo').click()
                cy.get('.circle__inner').click()
                cy.get('a[title="Digital Parenting"]').click({ force: true })
            }
            else {
                // TODO: implement here testing for modal when digital parenting is disabled
            }
        })

    })
}