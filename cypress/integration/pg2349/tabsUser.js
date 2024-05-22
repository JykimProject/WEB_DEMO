export function tabsUserTest () {
    var user = false
    var group = false
    it('Check is it user or group', () => {
        cy.get('.u-list--parental-filter__item').contains('TestNameEdit').last().click()
        cy.wait(500)
        cy.get('.btn').contains('Delete').then($btn => {
            if ($btn.text().trim() === 'Delete user') user = true
            else if ($btn.text().trim() === 'Delete group') group = true
            else throw new Error("No delete button")
        })
    })
    it('User or group tabs and buttons test', () => {
        cy.get('.tabs__link').contains('Devices')
        cy.get('.is-active').contains('Devices')
        cy.get('.tabs__link').contains('Usage quota')
        cy.get('.tabs__link').contains('Internet Access')
        cy.get('.tabs__link').contains('Application filter')
        cy.get('.tabs__link').contains('digital parenting')
        cy.get('.tabs__link').contains('security')
        cy.get('.tabs__link').contains('DNS history')

        cy.get('.btn').contains('Add devices')
        if (user) cy.get('.btn').contains('Delete user')
        else cy.get('.btn').contains('Delete group')

        if (user) cy.get('.page').contains("This user doesn't have any device")
        else cy.get('.page').contains("You don't have any devices in this group")

        cy.get('.tabs__link').contains('Usage quota').click()
        cy.wait(500)
        cy.get('.is-active').contains('Usage quota')
        if (user) cy.get('.page').contains("This user doesn't have any device")
        else cy.get('.page').contains("You don't have any devices in this group")

        cy.get('.tabs__link').contains('Internet Access').click()
        cy.wait(500)
        cy.get('.is-active').contains('Internet Access')
        if (user) cy.get('.page').contains("This user doesn't have any device")
        else cy.get('.page').contains("You don't have any devices in this group")

        cy.get('.tabs__link').contains('Application filter').click()
        cy.wait(500)
        cy.get('.is-active').contains('Application filter')
        if (user) cy.get('.page').contains("This user doesn't have any device")
        else cy.get('.page').contains("You don't have any devices in this group")
        cy.get('form').contains('By selecting an app, you are blocking its usage on this device')

        cy.get('h5').contains('Social media')
        cy.get('[name="Facebook"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('Facebook')
            expect($field.find('.ivu-switch')).to.exist
        })
        cy.get('[name="Snapchat"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('Snapchat')
            expect($field.find('.ivu-switch')).to.exist
        })
        cy.get('[name="Instagram"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('Instagram')
            expect($field.find('.ivu-switch')).to.exist
        })
        cy.get('[name="TikTok"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('TikTok')
            expect($field.find('.ivu-switch')).to.exist
        })

        cy.get('h5').contains('Streaming applications')
        cy.get('[name="Youtube"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('Youtube')
            expect($field.find('.ivu-switch')).to.exist
        })
        cy.get('[name="HBOGO"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('HBOGO')
            expect($field.find('.ivu-switch')).to.exist
        })
        cy.get('[name="Amazon Prime"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('Amazon Prime')
            expect($field.find('.ivu-switch')).to.exist
        })
        cy.get('[name="Netflix"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('Netflix')
            expect($field.find('.ivu-switch')).to.exist
        })
        cy.get('[name="Disney+"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('Disney+')
            expect($field.find('.ivu-switch')).to.exist
        })
        cy.get('[name="Apple tv+"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('Apple tv+')
            expect($field.find('.ivu-switch')).to.exist
        })

        cy.get('h5').contains('Chat applications')
        cy.get('[name="WhatsApp"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('WhatsApp')
            expect($field.find('.ivu-switch')).to.exist
        })
        cy.get('[name="Viber"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('Viber')
            expect($field.find('.ivu-switch')).to.exist
        })

        cy.get('h5').contains('games')
        cy.get('[name="Fortnite"]').then($field => {
            expect($field.find('.field__lbl').text()).to.contain('Fortnite')
            expect($field.find('.ivu-switch')).to.exist
        })

        cy.get('.tabs__link').contains('digital parenting').click()
        cy.wait(500)
        cy.get('.is-active').contains('digital parenting')
        if (user) cy.get('.page').contains("This user doesn't have any device")
        else cy.get('.page').contains("You don't have any devices in this group")

        cy.get('.tabs__link').contains('security').click()
        cy.wait(500)
        cy.get('.is-active').contains('security')
        if (user) cy.get('.page').contains("This user doesn't have any device")
        else cy.get('.page').contains("You don't have any devices in this group")

        cy.get('.tabs__link').contains('DNS history').click()
        cy.wait(500)
        cy.get('.is-active').contains('DNS history')
        if (user) cy.get('.page').contains("This user doesn't have any device")
        else cy.get('.page').contains("You don't have any devices in this group")
    })
}
