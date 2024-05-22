export function administratorCWMPConfigTest () {
    let oldConfig = {}
    let newConfig = {}
    //custom values are hardcoded in test
    it('Open page', () => {
        cy.visit('advanced/cwmp-config')
        cy.wait(500)
        cy.url().should('include', '/advanced/cwmp-config')
        cy.get('.page__title').contains('Cwmp config')
    })

    it('Page elements', () => {
        cy.get("[name = 'acs-url']").find('.field__lbl').contains('ACS URL')
        cy.get("[name = 'acs-url']").find('input').invoke('val').then(text => oldConfig.acs_url = text)

        cy.get("[name = 'acs-username']").find('.field__lbl').contains('ACS username')
        cy.get("[name = 'acs-username']").find('input').invoke('val').then(text => oldConfig.acs_username = text)

        cy.get("[name = 'acs-password']").find('.ivu-icon').click()
        cy.get("[name = 'acs-password']").find('.field__lbl').contains('ACS password')
        cy.get("[name = 'acs-password']").find('input').invoke('val').then(text => oldConfig.acs_password = text)

        cy.get("[name = 'inform']").find('.field__lbl').contains('Inform')
        cy.get("[name = 'inform']").find('input')
                .invoke('val')
                .then(value => oldConfig.inform = value)

        cy.get("[name = 'inform-interval']").find('.field__lbl').contains('Inform interval')
        cy.get("[name = 'inform-interval']").find('input').invoke('val').then(text => oldConfig.inform_interval = text)

        cy.get("[name = 'HTTPConnectionRequestEnable']").find('.field__lbl').contains('HTTP connection request')
        cy.get("[name = 'HTTPConnectionRequestEnable']").find('input')
                .invoke('val')
                .then(value => oldConfig.HTTPConnectionRequestEnable = value)

        cy.get("[name = 'management-interface']").last().find('.field__lbl').contains('Management interface')
        cy.get("[name = 'management-interface']").last().find('.ivu-select-selected-value').then(el => oldConfig.management_interface = el.text().trim())

        cy.get("[name = 'management_port']").find('.field__lbl').contains('Management port')
        cy.get("[name = 'management_port']").find('input').invoke('val').then(text => oldConfig.management_port = text)

        cy.get("[name = 'conn-req-username']").find('.field__lbl').contains('Connection request username')
        cy.get("[name = 'conn-req-username']").find('input').invoke('val').then(text => oldConfig.conn_req_username = text)

        cy.get("[name = 'conn-req-password']").find('.ivu-icon').click()
        cy.get("[name = 'conn-req-password']").find('.field__lbl').contains('Connection request password')
        cy.get("[name = 'conn-req-password']").find('input').invoke('val').then(text => oldConfig.conn_req_password = text)

        cy.get("[name = 'xmpp']").find('.field__lbl').contains('XMPP')
        cy.get("[name = 'xmpp']").find('input')
                .invoke('val')
                .then(value => {
                    oldConfig.xmpp = value
                    if (value === 'false') {
                        cy.get("[name = 'xmpp']").find('.ivu-switch').click()
                    }
                })
        cy.wait(500)
        cy.get("[name = 'username']").find('.field__lbl').contains('Username')
        cy.get("[name = 'username']").find('input').invoke('val').then(text => oldConfig.username = text)

        cy.get("[name = 'password']").find('.ivu-icon').click()
        cy.get("[name = 'password']").find('.field__lbl').contains('Password')
        cy.get("[name = 'password']").find('input').invoke('val').then(text => oldConfig.password = text)

        cy.get("[name = 'domain']").find('.field__lbl').contains('Domain')
        cy.get("[name = 'domain']").find('input').invoke('val').then(text => oldConfig.domain = text)

        cy.get("[name = 'resource']").find('.field__lbl').contains('Resource')
        cy.get("[name = 'resource']").find('input').invoke('val').then(text => oldConfig.resource = text)

        cy.get('button').contains('Cancel')
        cy.get('button').contains('Save')
    })

    it('Edit cwmp config', () => {
        cy.get('[name="acs-url"]')
            .find('input')
            .clear()
            .type('acs-url')

        cy.get('[name="acs-username"]')
            .find('input')
            .clear()
            .type('acs-username')

        cy.get('[name="acs-password"]')
            .find('input')
            .clear()
            .type('acs-password')

        cy.get("[name = 'inform']").find('input')
            .invoke('val')
            .then(value => {
                if (value === 'false') {
                    cy.get("[name = 'inform']").find('.ivu-switch').click()
                }
            })

        cy.get('[name="inform-interval"]')
            .find('input')
            .clear()
            .type('500')

        cy.get("[name = 'HTTPConnectionRequestEnable']").find('input')
            .invoke('val')
            .then(value => {
                if (value === 'false') {
                    cy.get("[name = 'HTTPConnectionRequestEnable']").find('.ivu-switch').click()
                }
            })

        cy.get('[name="management-interface"]').last().find('.c-select').click()
        cy.wait(500)
        cy.get('[name="management-interface"]').last().find('.ivu-select-item').last().then(item => {
            newConfig.management_interface = item.text().trim()
        })
        cy.get('[name="management-interface"]').last().find('.ivu-select-item').last().click()

        cy.get('[name="management_port"]')
            .find('input')
            .clear()
            .type('500')

        cy.get('[name="conn-req-username"]')
            .find('input')
            .clear()
            .type('conn-req-username')

        cy.get('[name="conn-req-password"]')
            .find('input')
            .clear()
            .type('conn-req-password')

        cy.get('[name="username"]')
            .find('input')
            .clear()
            .type('username')

        cy.get('[name="password"]')
            .find('input')
            .clear()
            .type('password')

        cy.get('[name="domain"]')
            .find('input')
            .clear()
            .type('domain')

        cy.get('[name="resource"]')
            .find('input')
            .clear()
            .type('resource')

        cy.get('button').contains('Save').click()
    })

    it('Check edited cwmp config', () => {
        cy.get("[name = 'acs-url']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('acs-url'))

        cy.get("[name = 'acs-username']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('acs-username'))

        cy.get("[name = 'acs-password']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('acs-password'))

        cy.get("[name = 'inform']").then(elem => expect(elem.find('.ivu-switch-checked')).to.exist)

        cy.get("[name = 'inform-interval']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('500'))

        cy.get("[name = 'HTTPConnectionRequestEnable']").then(elem => expect(elem.find('.ivu-switch-checked')).to.exist)

        cy.get("[name = 'management-interface']").find('.ivu-select-selected-value').then(el => expect(el.text().trim()).to.be.eq(newConfig.management_interface))

        cy.get("[name = 'management_port']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('500'))

        cy.get("[name = 'conn-req-username']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('conn-req-username'))

        cy.get("[name = 'conn-req-password']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('conn-req-password'))

        cy.get("[name = 'xmpp']").then(elem => expect(elem.find('.ivu-switch-checked')).to.exist)

        cy.get("[name = 'username']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('username'))

        cy.get("[name = 'password']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('password'))

        cy.get("[name = 'domain']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('domain'))

        cy.get("[name = 'resource']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('resource'))
    })

    it('Form validators test', () => {
        cy.get('[name="inform-interval"]')
            .find('input')
            .type('abc1')

        cy.get('[name="management_port"]')
            .find('input')
            .type('abc1')

        cy.get('[name="username"]')
            .find('input')
            .clear()

        cy.get('[name="password"]')
            .find('input')
            .clear()

        cy.get('[name="domain"]')
            .find('input')
            .clear()

        cy.get('button').contains('Save').click()
        cy.wait(1500)

        cy.get('[name="inform-interval"]').find('.field__infotext').contains('Field must contain only numbers')
        cy.get('[name="management_port"]').find('.field__infotext').contains('Field must contain only numbers')

        //fix validation for username, password and domain
        /*cy.get('[name="username"]').find('.field__infotext--warning').contains('Field is required')
        cy.get('[name="password"]').find('.field__infotext--warning').contains('Field is required')
        cy.get('[name="domain"]').find('.field__infotext--warning').contains('Field is required')*/

        cy.get('[name="management_port"]')
            .find('input')
            .clear()
            .type('65537')

        cy.get('button').contains('Save').click()
        cy.wait(500)

        cy.get('[name="management_port"]').find('.field__infotext--warning').contains('Port numbers range from 1 to 65535')

        cy.get('[name="management_port"]')
            .find('input')
            .clear()
            .type('-11')

        cy.get('button').contains('Save').click()
        cy.wait(500)

        cy.get('[name="management_port"]').find('.field__infotext--warning').contains('Port numbers range from 1 to 65535')

        cy.get('[name="inform-interval"]')
            .find('input')
            .clear()

        cy.get('[name="management_port"]')
            .find('input')
            .clear()

        cy.get('button').contains('Save').click()
        cy.wait(1500)

        cy.get('[name="inform-interval"]').find('.field__infotext').contains('Field must contain only numbers')
        cy.get('[name="management_port"]').find('.field__infotext').contains('Field must contain only numbers')
    })

    it('Return cwmp config to previous state', () => {
        cy.get('[name="acs-url"]')
            .find('input')
            .clear()
            .then(e => { if (oldConfig.acs_url !== '') cy.wrap(e).type(oldConfig.acs_url) })

        cy.get('[name="acs-username"]')
            .find('input')
            .clear()
            .then(e => { if (oldConfig.acs_username !== '') cy.wrap(e).type(oldConfig.acs_username) })

        cy.get('[name="acs-password"]')
            .find('input')
            .clear()
            .then(e => { if (oldConfig.acs_password !== '') cy.wrap(e).type(oldConfig.acs_password) })

        cy.get('[name="inform-interval"]')
            .find('input')
            .clear()
            .then(e => { if (oldConfig.inform_interval !== '') cy.wrap(e).type(oldConfig.inform_interval) })

        cy.get("[name = 'inform']").find('input')
            .invoke('val')
            .then(value => {
                if (value != oldConfig.inform) {
                    cy.get("[name = 'inform']").find('.ivu-switch').click()
                }
            })

        if (oldConfig.management_interface != '') {
            cy.get('[name="management-interface"]').find('.c-select').click()
            cy.wait(500)
            cy.get('[name="management-interface"]').find('.ivu-select-item').contains(oldConfig.management_interface).click()
        }

        cy.get('[name="management_port"]')
            .find('input')
            .clear()
            .then(e => { if (oldConfig.management_port !== '') cy.wrap(e).type(oldConfig.management_port) })

        cy.get('[name="conn-req-username"]')
            .find('input')
            .clear()
            .then(e => { if (oldConfig.conn_req_username !== '') cy.wrap(e).type(oldConfig.conn_req_username) })

        cy.get('[name="conn-req-password"]')
            .find('input')
            .clear()
            .then(e => { if (oldConfig.conn_req_password !== '') cy.wrap(e).type(oldConfig.conn_req_password) })

        cy.get("[name = 'HTTPConnectionRequestEnable']").find('input')
            .invoke('val')
            .then(value => {
                if (value != oldConfig.HTTPConnectionRequestEnable) {
                    cy.get("[name = 'HTTPConnectionRequestEnable']").find('.ivu-switch').click()
                }
            })

        cy.get('[name="username"]')
            .find('input')
            .clear()
            .then(e => { if (oldConfig.username !== '') cy.wrap(e).type(oldConfig.username) })

        cy.get('[name="password"]')
            .find('input')
            .clear()
            .then(e => { if (oldConfig.password !== '') cy.wrap(e).type(oldConfig.password) })

        cy.get('[name="domain"]')
            .find('input')
            .clear()
            .then(e => { if (oldConfig.domain !== '') cy.wrap(e).type(oldConfig.domain) })

        cy.get('[name="resource"]')
            .find('input')
            .clear()
            .then(e => { if (oldConfig.resource !== '') cy.wrap(e).type(oldConfig.resource) })

        cy.get("[name = 'xmpp']").find('input')
            .invoke('val')
            .then(value => {
                if (value != oldConfig.xmpp) {
                    cy.get("[name = 'xmpp']").find('.ivu-switch').click()
                }
            })

        cy.get('button').contains('Save').click()
        cy.wait(500)
    })
}
