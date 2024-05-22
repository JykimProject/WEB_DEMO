export function deviceModalTest () {
    it('Open modal', () => {
        cy.visit('/')
        cy.wait(500)
        cy.get('.circle__inner').click()
        cy.get('a[title="Connected devices"]').click({ force: true })
        cy.wait(500)
        cy.checkIfEleExists('.circle__inner--small')
            .then(value => {
                if (value === true) {
                    cy.get('.circle__name').first()
                        .then($name => {
                            cy.get('.circle__inner--small').first().click()

                            cy.get('.modal__title')
                                .then($nameOfModal => {
                                    expect($nameOfModal.text().trim()).to.eql($name.text().trim())
                                })

                            cy.get('.modal__title--icon')
                        })
                } 
            })
    })

    it('Close modal', () => {
        cy.checkIfEleExists('.circle__inner--small')
            .then(value => {
                if (value === true) {
                    cy.get('.modal__close').click()
                } 
            })
    })
}
