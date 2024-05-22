export function advancedLayoutTest () {
    it('Open page', () => {
        cy.visit('/')
        cy.wait(500)
        cy.get('.radar__advanced').click()

    })

    it('Check header', () => {
        cy.get('.header')
        cy.get('.hamburger')
        cy.get('.header__logo')
        cy.get('.subnav__nav')
        cy.get('.ivu-icon-md-mail')
        cy.get('.subnav__lang')
        cy.get('.subnav__logout')
    })

    it('Check navigation', () => {
        cy.checkIfEleExists('aside.is-active') 
            .then(value => {
                if (value === false) {
                    cy.get('.hamburger').click()
                }
            })

        cy.get('.menu__branding')
        cy.get('ul.nav')

        cy.get('.router-link-active').contains('Dashboard')

        cy.get('li.nav__item').contains('Dashboard')

        cy.get('li.nav__item').contains('Internet security')

        cy.get('li.nav__item').contains('Wireless settings').click()
        cy.wait(500)
        cy.get('.nav__sublink').contains('Main WiFi')
        cy.get('.nav__sublink').contains('Guest WiFi 1')

        cy.get('li.nav__item').contains('Digital parenting').click()
        cy.wait(500)
        cy.get('.nav__sublink').contains('Filters')
        cy.get('.nav__sublink').contains('Categories')

        cy.get('li.nav__item').contains('Administration')

        cy.get('li.nav__item').contains('Device user management')

        cy.get('li.nav__item').contains('Advanced settings').click()
        cy.wait(500)
        cy.get('.nav__sublink').contains('Local Area Network')
        cy.get('.nav__sublink').contains('Multiwan')
        cy.get('.nav__sublink').contains('Dynamic DNS')
        cy.get('.nav__sublink').contains('Firewall')
        cy.get('.nav__sublink').contains('Port forwarding')
        cy.get('.nav__sublink').contains('Static leases')
        cy.get('.nav__sublink').contains('LXC')
        cy.get('.nav__sublink').contains('VoIP')
        cy.get('.nav__sublink').contains('Administrator pages')
        cy.get('.nav__sublink').contains('Statistics')

        cy.get('li.nav__item').contains('simple dashboard')
    })
}
