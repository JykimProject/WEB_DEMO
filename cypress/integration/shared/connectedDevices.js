export function connectedDevicesPageTest () {
    it('Open page and check buttons', () => {
        cy.visit('/')
        cy.wait(500)

        cy.get('.circle__inner').click()
        cy.get('a[title="Connected devices"]').click({ force: true })
        cy.get('.radar__title').contains('connected devices')

        cy.get('button').contains('LAN')
        cy.get('button').contains('WiFi 2.4 GHz')
        cy.get('button').contains('WiFi 5.0 GHz')

        cy.get('.btn--group').get('button').contains('all')
        cy.get('.btn--group').get('button').contains('devices')
        cy.get('.btn--group').get('button').contains('users')

        cy.get('.circle__inner--medium').click()
    })

    it('Check users and devices', () => {
        cy.checkIfEleExists('.circle__inner--small')
            .then(value => {
                if (value === true) {
                    cy.get('.radar')
                        .find('.circle__inner--small')
                        .then(listing => {
                            const listingCount = Cypress.$(listing).length
                            if (listingCount > 6) {
                                cy.get('.radar__scroll')
                                    .find('.circle--multi')
                                    .then(listingScroll => {
                                        const scrollCount = Cypress.$(listingScroll).length
                                        expect(listingScroll).to.have.length(scrollCount)
                                        expect(scrollCount).to.be.greaterThan(6)
                                    })
                            }
                            else {
                                expect(listingCount).to.be.lessThan(7)
                            }  
                        })
                }
                
            })
    })
}