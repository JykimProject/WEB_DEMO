export function voipPageTests () {
    let global = {}
    let oldGlobal = {}
    let sip = []
    let oldSip = []
    let errorIndex = []

    it('Open page', () => {
        cy.visit('advanced/voip')
        cy.wait(500)
        cy.url().should('include', '/advanced/voip')
        cy.get('.page__title').contains('VoIP')
        cy.get('.tabs').find('button').first().contains('global')
        cy.get('.tabs').find('button').last().contains('SIP account configuration').click()
        cy.wait(500)
        cy.get('.page')
            .find('form')
            .then(listing => {
                const sipCount = Cypress.$(listing).length
                for (let index = 0; index < sipCount; index++) {
                    oldSip.push({})
                    sip.push({})
                }
            })
        cy.get('.tabs').find('button').first().contains('global').click()
        cy.wait(500)
    })

    it('Global tab elements', () => {
        cy.get('.tabs').find('button').first().contains('global').click()
        cy.wait(500)

        cy.get("[name = 'bindif']").find('.field__lbl').contains('Bound Interface Name')
        cy.get("[name = 'bindif']").find('.ivu-select-selected-value').then(el => oldGlobal.bindif = el.text().trim())

        cy.get("[name = 'dns_enabled']").then(elem => {
            if (elem.find('.field__lbl').text().trim() == 'Enabled Voice DNS'){
                expect(elem.find('.ivu-switch-checked')).to.be.visible
                oldGlobal.dns_enabled = 'enabled'
            }
            else {
                expect(elem.find('.field__lbl')).to.contain('Disabled Voice DNS')
                expect(elem.find('.ivu-switch-checked')).not.to.exist
                oldGlobal.dns_enabled = 'disabled'
            }
        })

        cy.get("[name = 'dns1']").find('.field__lbl').contains('Primary voice DNS server address')
        cy.get("[name = 'dns1']").find('input').invoke('val').then(text => oldGlobal.dns1 = text)

        cy.get("[name = 'dns2']").find('.field__lbl').contains('Secondary voice DNS server address')
        cy.get("[name = 'dns2']").find('input').invoke('val').then(text => oldGlobal.dns2 = text)

        cy.get("[name = 'locale']").find('.field__lbl').contains('Country')
        cy.get("[name = 'locale']").find('.ivu-select-selected-value').then(el => oldGlobal.locale = el.text().trim())

        cy.get("[name = 'dialplan']").find('.field__lbl').contains('Voip Dialplan Settings')
        cy.get("[name = 'dialplan']").find('input').invoke('val').then(text => oldGlobal.dialplan = text)

        cy.get("[name = 'dtmf']").find('.field__lbl').contains('Dtmf')
        cy.get("[name = 'dtmf']").find('.ivu-select-selected-value').then(el => oldGlobal.dtmf = el.text().trim())

        cy.get("[name = 'proto']").find('.field__lbl').contains('Proto')
        cy.get("[name = 'proto']").find('.ivu-select-selected-value').then(el => oldGlobal.proto = el.text().trim())

        cy.get("[name = 'ptime']").first().find('.field__lbl').contains('Ptime')
        cy.get("[name = 'ptime']").first().find('input').invoke('val').then(text => oldGlobal.ptime = text)

        cy.get("[name = 'outproxy_enabled']").then(elem => {
            if (elem.find('.field__lbl').text().trim() == 'Enabled SIP Outbound Proxy'){
                expect(elem.find('.ivu-switch-checked')).to.be.visible
                oldGlobal.outproxy_enabled = 'enabled'
            }
            else {
                expect(elem.find('.field__lbl')).to.contain('Disabled SIP Outbound Proxy')
                expect(elem.find('.ivu-switch-checked')).not.to.exist
                oldGlobal.outproxy_enabled = 'disabled'
            }
        })

        cy.get("[name = 'outproxy_host']").find('.field__lbl').contains('SIP Outbound Proxy')
        cy.get("[name = 'outproxy_host']").find('input').invoke('val').then(text => oldGlobal.outproxy_host = text)

        cy.get("[name = 'outproxy_port']").find('.field__lbl').contains('SIP Outbound Proxy port')
        cy.get("[name = 'outproxy_port']").find('input').invoke('val').then(text => oldGlobal.outproxy_port = text)

        cy.get("[name = 'registrar_enabled']").then(elem => {
            if (elem.find('.field__lbl').text().trim() == 'Enabled SIP Registrar'){
                expect(elem.find('.ivu-switch-checked')).to.be.visible
                oldGlobal.registrar_enabled = 'enabled'
            }
            else {
                expect(elem.find('.field__lbl')).to.contain('Disabled SIP Registrar')
                expect(elem.find('.ivu-switch-checked')).not.to.exist
                oldGlobal.registrar_enabled = 'disabled'
            }
        })

        cy.get("[name = 'registrar_host']").find('.field__lbl').contains('SIP Registrar')
        cy.get("[name = 'registrar_host']").find('input').invoke('val').then(text => oldGlobal.registrar_host = text)

        cy.get("[name = 'registrar_port']").find('.field__lbl').contains('SIP Registrar port')
        cy.get("[name = 'registrar_port']").find('input').invoke('val').then(text => oldGlobal.registrar_port = text)

        cy.get("[name = 'ptime']").last().find('.field__lbl').contains('Preferred packetization time')
        cy.get("[name = 'ptime']").last().find('.ivu-select-selected-value').then(el => oldGlobal.ptimeSelect = el.text().trim())

        cy.get("[name = 'T38']").find('.field__lbl').contains('T38') // I don't know what to do with this
        cy.get("[name = 'T38']").find('input')
                .invoke('val')
                .then(value => oldGlobal.T38 = value)

        cy.get("[name = 'regexpire']").find('.field__lbl').contains('Regexpire')
        cy.get("[name = 'regexpire']").find('input').invoke('val').then(text => oldGlobal.regexpire = text)

        cy.get("[name = 'regretry']").find('.field__lbl').contains('Regretry')
        cy.get("[name = 'regretry']").find('input').invoke('val').then(text => oldGlobal.regretry = text)

        cy.get('button').contains('Cancel')
        cy.get('button').contains('Save')
    })

    it('SIP account configuration tab elements', () => {
        cy.get('.tabs').find('button').last().contains('SIP account configuration').click()
        cy.wait(2500)

        cy.get('form').each(($el, index) => {
            expect($el.find('.fieldset__legend').text().trim().length).to.be.greaterThan(0)
            expect($el.find("[name = 'enabled']").find('.field__lbl')).to.contain('Enabled')
            cy.get('form').eq(index).find("[name = 'enabled']").find('input')
                .invoke('val')
                .then(value => oldSip[index].enabled = value)

            expect($el.find("[name = 'host']").find('.field__lbl')).to.contain('Host')
            cy.get('form').eq(index).find("[name = 'host']").find('input').invoke('val').then(text => oldSip[index].host = text)

            expect($el.find("[name = 'extension']").find('.field__lbl')).to.contain('Extension')
            cy.get('form').eq(index).find("[name = 'extension']").find('input').invoke('val').then(text => oldSip[index].extension = text)

            expect($el.find("[name = 'displayname']").find('.field__lbl')).to.contain('Display name')
            cy.get('form').eq(index).find("[name = 'displayname']").find('input').invoke('val').then(text => oldSip[index].displayname = text)

            expect($el.find("[name = 'authuser']").find('.field__lbl')).to.contain('Username')
            cy.get('form').eq(index).find("[name = 'authuser']").find('input').invoke('val').then(text => oldSip[index].authuser = text)

            cy.get('form').eq(index).find("[name = 'secret']").find('.ivu-icon').click()
            expect($el.find("[name = 'secret']").find('.field__lbl')).to.contain('Secret')
            cy.get('form').eq(index).find("[name = 'secret']").find('input').invoke('val').then(text => oldSip[index].secret = text)

            expect($el.find("[name = 'domain']").find('.field__lbl')).to.contain('Domain name')
            cy.get('form').eq(index).find("[name = 'domain']").find('input').invoke('val').then(text => oldSip[index].domain = text)

            expect($el.find("[name = 'cforward']").find('.field__lbl')).to.contain('Forward unconditionally')
            cy.get('form').eq(index).find("[name = 'cforward']").find('input')
                .invoke('val')
                .then(value => oldSip[index].cforward = value)

            expect($el.find("[name = 'cforward-busy']").find('.field__lbl')).to.contain('Forward on busy')
            cy.get('form').eq(index).find("[name = 'cforward-busy']").find('input')
                .invoke('val')
                .then(value => oldSip[index].cforward_busy = value)

            expect($el.find("[name = 'cforward-noanswer']").find('.field__lbl')).to.contain('Forward on no asnwer')
            cy.get('form').eq(index).find("[name = 'cforward-noanswer']").find('input')
                .invoke('val')
                .then(value => oldSip[index].cforward_noanswer = value)

            expect($el.find("[name = 'cforward-num']").find('.field__lbl')).to.contain('Forward number')
            cy.get('form').eq(index).find("[name = 'cforward-num']").find('input').invoke('val').then(text => oldSip[index].cforward_num = text)

            expect($el.find("[name = 'call-waiting']").find('.field__lbl')).to.contain('Call waiting')
            cy.get('form').eq(index).find("[name = 'call-waiting']").find('input')
                .invoke('val')
                .then(value => oldSip[index].call_waiting = value)

            expect($el.find("[name = 'callerid-name']").find('.field__lbl')).to.contain('Caller ID name')
            cy.get('form').eq(index).find("[name = 'callerid-name']").find('input')
                .invoke('val')
                .then(value => oldSip[index].callerid_name = value)

            expect($el.find("[name = 'callerid-num']").find('.field__lbl')).to.contain('Caller ID number')
            cy.get('form').eq(index).find("[name = 'callerid-num']").find('input')
                .invoke('val')
                .then(value => oldSip[index].callerid_num = value)

            expect($el.find("[name = 'dnd']").find('.field__lbl')).to.contain('DND')
            cy.get('form').eq(index).find("[name = 'dnd']").find('input')
                .invoke('val')
                .then(value => oldSip[index].dnd = value)

            expect($el.find("[name = 'mwi']").find('.field__lbl')).to.contain('MWI')
            cy.get('form').eq(index).find("[name = 'mwi']").find('input')
                .invoke('val')
                .then(value => oldSip[index].mwi = value)

            expect($el.find("[name = 'port']").find('.field__lbl')).to.contain('Physical Terminal Assignment')
            cy.get('form').eq(index).find("[name = 'port']").find('.ivu-select-selected-value').then(el => oldSip[index].port = el.text().trim())

            expect($el.find("[name = 'proxy_enabled']").find('.field__lbl')).to.contain('Proxy enabled')
            cy.get('form').eq(index).find("[name = 'proxy_enabled']").find('input')
                .invoke('val')
                .then(value => oldSip[index].proxy_enabled = value)

            expect($el.find("[name = 'proxy_host']").find('.field__lbl')).to.contain('SIP Proxy')
            cy.get('form').eq(index).find("[name = 'proxy_host']").find('input').invoke('val').then(text => oldSip[index].proxy_host = text)

            expect($el.find("[name = 'proxy_port']").find('.field__lbl')).to.contain('Proxy port')
            cy.get('form').eq(index).find("[name = 'proxy_port']").find('input').invoke('val').then(text => oldSip[index].proxy_port = text)
        })
        cy.get('button').contains('Save')
    })

    it('Edit global tab', () => {
        cy.get('.tabs').find('button').first().contains('global').click()
        cy.wait(2500)

        cy.get('[name="bindif"]').find('.c-select').click()
        cy.wait(500)
        cy.get('[name="bindif"]').find('.ivu-select-item').last().then(item => {
            global.bindif = item.text().trim()
        })
        cy.get('[name="bindif"]').find('.ivu-select-item').last().click()

        cy.get("[name = 'dns_enabled']").then(elem => {
            if (elem.find('.field__lbl').text().trim() == 'Disabled Voice DNS'){
                cy.get("[name = 'dns_enabled']").find('.ivu-switch').click()
            }
        })

        cy.get('[name="dns1"]')
            .find('input')
            .clear()
            .type('1.1.1.1')

        cy.get('[name="dns2"]')
            .find('input')
            .clear()
            .type('1.1.1.1')

        cy.get('[name="locale"]').find('.c-select').click()
        cy.wait(500)
        cy.get('[name="locale"]').find('.ivu-select-item').last().then(item => {
            global.locale = item.text().trim()
        })
        cy.get('[name="locale"]').find('.ivu-select-item').last().click()

        cy.get('[name="dialplan"]')
            .find('input')
            .clear()
            .type('123')

        cy.get('[name="dtmf"]').find('.c-select').click()
        cy.wait(500)
        cy.get('[name="dtmf"]').find('.ivu-select-item').last().then(item => {
            global.dtmf = item.text().trim()
        })
        cy.get('[name="dtmf"]').find('.ivu-select-item').last().click()

        cy.get('[name="proto"]').find('.c-select').click()
        cy.wait(500)
        cy.get('[name="proto"]').find('.ivu-select-item').last().then(item => {
            global.proto = item.text().trim()
        })
        cy.get('[name="proto"]').find('.ivu-select-item').last().click()

        cy.get('[name="ptime"]').first()
            .find('input')
            .clear()
            .type('30')

        cy.get("[name = 'outproxy_enabled']").then(elem => {
            if (elem.find('.field__lbl').text().trim() == 'Disabled SIP Outbound Proxy'){
                cy.get("[name = 'outproxy_enabled']").find('.ivu-switch').click()
            }
        })

        cy.get('[name="outproxy_host"]').first()
            .find('input')
            .clear()
            .type('outproxy_host')

        cy.get('[name="outproxy_port"]').first()
            .find('input')
            .clear()
            .type('111')

        cy.get("[name = 'registrar_enabled']").then(elem => {
            if (elem.find('.field__lbl').text().trim() == 'Disabled SIP Registrar'){
                cy.get("[name = 'registrar_enabled']").find('.ivu-switch').click()
            }
        })

        cy.get('[name="registrar_host"]').first()
            .find('input')
            .clear()
            .type('registrar_host')

        cy.get('[name="registrar_port"]').first()
            .find('input')
            .clear()
            .type('111')

        cy.get('[name="ptime"]').last().find('.c-select').click()
        cy.wait(500)
        cy.get('[name="ptime"]').last().find('.ivu-select-item').contains('30').then(item => {
            global.ptimeSelect = item.text().trim()
        })
        cy.get('[name="ptime"]').last().find('.ivu-select-item').contains('30').click()

        //this switch doesn't work
        cy.get("[name = 'T38']").find('input')
                .invoke('val')
                .then(value => {
                    if (value === 'false') {
                        cy.get("[name = 'T38']").find('.ivu-switch').click()
                    }
                })

        cy.get('[name="regexpire"]').first()
            .find('input')
            .clear()
            .type('1000')

        cy.get('[name="regretry"]').first()
            .find('input')
            .clear()
            .type('50')

        cy.get('button').contains('Save').click()
        cy.get('.ivu-notice-notice').contains('Success')
        cy.wait(1000)
    })

    it('Check edited global tab', () => {
        cy.get('.tabs').find('button').first().contains('global').click()
        cy.wait(500)

        cy.get("[name = 'bindif']").find('.ivu-select-selected-value').then(el => expect(el.text().trim()).to.be.eq(global.bindif))

        cy.get("[name = 'dns_enabled']").then(elem => expect(elem.find('.ivu-switch-checked')).to.be.visible)

        cy.get("[name = 'dns1']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('1.1.1.1'))

        cy.get("[name = 'dns2']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('1.1.1.1'))

        cy.get("[name = 'locale']").find('.ivu-select-selected-value').then(el => expect(el.text().trim()).to.be.eq(global.locale))

        cy.get("[name = 'dialplan']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('123'))

        cy.get("[name = 'dtmf']").find('.ivu-select-selected-value').then(el => expect(el.text().trim()).to.be.eq(global.dtmf))

        cy.get("[name = 'proto']").find('.ivu-select-selected-value').then(el => expect(el.text().trim()).to.be.eq(global.proto))

        cy.get("[name = 'ptime']").first().find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('30'))

        cy.get("[name = 'outproxy_enabled']").then(elem => expect(elem.find('.ivu-switch-checked')).to.be.visible)

        cy.get("[name = 'outproxy_host']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('outproxy_host'))

        cy.get("[name = 'outproxy_port']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('111'))

        cy.get("[name = 'registrar_enabled']").then(elem => expect(elem.find('.ivu-switch-checked')).to.be.visible)

        cy.get("[name = 'registrar_host']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('registrar_host'))

        cy.get("[name = 'registrar_port']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('111'))

        cy.get("[name = 'ptime']").last().find('.ivu-select-selected-value').then(el => expect(el.text().trim()).to.be.eq(global.ptimeSelect))

        cy.get("[name = 'T38']").find('.field__lbl').contains('T38') // fix this

        cy.get("[name = 'regexpire']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('1000'))

        cy.get("[name = 'regretry']").find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('50'))
    })

    it('Return global tab to previous state', () => {
        cy.get('.tabs').find('button').first().contains('global').click()
        cy.wait(500)

        cy.get('[name="bindif"]').find('.c-select').click()
        cy.wait(500)
        cy.get('[name="bindif"]').find('.ivu-select-item').contains(oldGlobal.bindif).click()

        cy.get('[name="dns1"]')
            .find('input')
            .clear()
            .then(e => { if (oldGlobal.dns1 !== '') cy.wrap(e).type(oldGlobal.dns1) })

        cy.get('[name="dns2"]')
            .find('input')
            .clear()
            .then(e => { if (oldGlobal.dns2 !== '') cy.wrap(e).type(oldGlobal.dns2) })

        cy.get("[name = 'dns_enabled']").then(elem => {
            if (oldGlobal.dns_enabled === 'disabled'){
                cy.get("[name = 'dns_enabled']").find('.ivu-switch').click()
            }
        })

        if (oldGlobal.locale == '') {
            cy.get('[name="locale"]').last().find('.c-select').invoke('val', '')
        }
        else {
            cy.get('[name="locale"]').find('.c-select').click()
            cy.wait(500)
            cy.get('[name="locale"]').find('.ivu-select-item').contains(oldGlobal.locale).click()
        }
        
        cy.get('[name="dialplan"]')
            .find('input')
            .clear()
            .then(e => { if (oldGlobal.dialplan !== '') cy.wrap(e).type(oldGlobal.dialplan) })

        if (oldGlobal.dtmf == '') {
            cy.get('[name="dtmf"]').last().find('.c-select').invoke('val', '')
        }
        else {
            cy.get('[name="dtmf"]').find('.c-select').click()
            cy.wait(500)
            cy.get('[name="dtmf"]').find('.ivu-select-item').contains(oldGlobal.dtmf).click()
        }

        if (oldGlobal.proto == '') {
            cy.get('[name="proto"]').last().find('.c-select').invoke('val', '')
        }
        else {
            cy.get('[name="proto"]').find('.c-select').click()
            cy.wait(500)
            cy.get('[name="proto"]').find('.ivu-select-item').contains(oldGlobal.proto).click()
        }

        cy.get('[name="ptime"]').first()
            .find('input')
            .clear()
            .then(e => { if (oldGlobal.ptime !== '') cy.wrap(e).type(oldGlobal.ptime) })

        cy.get('[name="outproxy_host"]').first()
            .find('input')
            .clear()
            .then(e => { if (oldGlobal.outproxy_host !== '') cy.wrap(e).type(oldGlobal.outproxy_host) })

        cy.get('[name="outproxy_port"]').first()
            .find('input')
            .clear()
            .then(e => { if (oldGlobal.outproxy_port !== '') cy.wrap(e).type(oldGlobal.outproxy_port) })

        cy.get("[name = 'outproxy_enabled']").then(elem => {
            if (oldGlobal.outproxy_enabled === 'disabled'){
                cy.get("[name = 'outproxy_enabled']").find('.ivu-switch').click()
            }
        })

        cy.get('[name="registrar_host"]').first()
            .find('input')
            .clear()
            .then(e => { if (oldGlobal.registrar_host !== '') cy.wrap(e).type(oldGlobal.registrar_host) })

        cy.get('[name="registrar_port"]').first()
            .find('input')
            .clear()
            .then(e => { if (oldGlobal.registrar_port !== '') cy.wrap(e).type(oldGlobal.registrar_port) })

        cy.get("[name = 'registrar_enabled']").then(elem => {
            if (oldGlobal.registrar_enabled === 'disabled'){
                cy.get("[name = 'registrar_enabled']").find('.ivu-switch').click()
            }
        })

        if (oldGlobal.ptimeSelect == '') {
            cy.get('[name="ptime"]').last().find('.c-select').invoke('val', '')
        }
        else {
            cy.get('[name="ptime"]').last().find('.c-select').click()
            cy.wait(500)
            cy.get('[name="ptime"]').last().find('.ivu-select-item').contains(oldGlobal.ptimeSelect).click()
        }

        // fix this
        cy.get("[name = 'T38']").find('input')
                .invoke('val')
                .then(value => {
                    if (value != oldGlobal.T38) {
                        cy.get("[name = 'T38']").find('.ivu-switch').click()
                    }
                })

        cy.get('[name="regexpire"]').first()
            .find('input')
            .clear()
            .then(e => { if (oldGlobal.regexpire !== '') cy.wrap(e).type(oldGlobal.regexpire) })

        cy.get('[name="regretry"]').first()
            .find('input')
            .clear()
            .then(e => { if (oldGlobal.regretry !== '') cy.wrap(e).type(oldGlobal.regretry) })

        cy.get('button').contains('Save').click()
        cy.get('.ivu-notice-notice', {timeout: 5000}).contains('Success')
        cy.wait(1000)
    })

    it('Edit SIP account configuration', () => {
        cy.get('.tabs').find('button').last().contains('SIP account configuration').click()
        cy.wait(2500)

        cy.get('form').each(($el, index) => {
            cy.get('form').eq(index).find("[name = 'enabled']").find('input')
                .invoke('val')
                .then(value => {
                    if (value === '0') {
                        cy.get('form').eq(index).find("[name = 'enabled']").find('.ivu-switch').click()
                    }
                })

            cy.get('form').eq(index).find('[name="host"]')
                .find('input')
                .clear()
                .type('host')

            cy.get('form').eq(index).find('[name="extension"]')
                .find('input')
                .clear()
                .type('extension')
           
            cy.get('form').eq(index).find('[name="displayname"]')
                .find('input')
                .clear()
                .type('displayname')

            cy.get('form').eq(index).find('[name="authuser"]')
                .find('input')
                .clear()
                .type('authuser')

            cy.get('form').eq(index).find('[name="secret"]')
                .find('input')
                .clear()
                .type('secret')

            cy.get('form').eq(index).find('[name="domain"]')
                .find('input')
                .clear()
                .type('domain')
            
            cy.get('form').eq(index).find("[name = 'cforward']").find('input')
                .invoke('val')
                .then(value => {
                    if (value === '0') {
                        cy.get('form').eq(index).find("[name = 'cforward']").find('.ivu-switch').click()
                    }
                })
                
            cy.get('form').eq(index).find("[name = 'cforward-busy']").find('input')
                .invoke('val')
                .then(value => {
                    if (value === '0') {
                        cy.get('form').eq(index).find("[name = 'cforward-busy']").find('.ivu-switch').click()
                    }
                })

            cy.get('form').eq(index).find("[name = 'cforward-noanswer']").find('input')
                .invoke('val')
                .then(value => {
                    if (value === '0') {
                        cy.get('form').eq(index).find("[name = 'cforward-noanswer']").find('.ivu-switch').click()
                    }
                })
            
            cy.get('form').eq(index).find('[name="cforward-num"]')
                .find('input')
                .clear()
                .type('12345')

            cy.get('form').eq(index).find("[name = 'call-waiting']").find('input')
                .invoke('val')
                .then(value => {
                    if (value === '0') {
                        cy.get('form').eq(index).find("[name = 'call-waiting']").find('.ivu-switch').click()
                    }
                })
                
            cy.get('form').eq(index).find("[name = 'callerid-name']").find('input')
                .invoke('val')
                .then(value => {
                    if (value === '0') {
                        cy.get('form').eq(index).find("[name = 'callerid-name']").find('.ivu-switch').click()
                    }
                })

            cy.get('form').eq(index).find("[name = 'callerid-num']").find('input')
                .invoke('val')
                .then(value => {
                    if (value === '0') {
                        cy.get('form').eq(index).find("[name = 'callerid-num']").find('.ivu-switch').click()
                    }
                })

            cy.get('form').eq(index).find("[name = 'dnd']").find('input')
                .invoke('val')
                .then(value => {
                    if (value === '0') {
                        cy.get('form').eq(index).find("[name = 'dnd']").find('.ivu-switch').click()
                    }
                })
                
            cy.get('form').eq(index).find("[name = 'mwi']").find('input')
                .invoke('val')
                .then(value => {
                    if (value === '0') {
                        cy.get('form').eq(index).find("[name = 'mwi']").find('.ivu-switch').click()
                    }
                })

            cy.get('form').eq(index).find('[name="port"]').find('.c-select').click()
            cy.wait(500)
            cy.get('form').eq(index).find('[name="port"]').find('.ivu-select-item').last().then(item => {
                sip[index].port = item.text().trim()
            })
            cy.get('form').eq(index).find('[name="port"]').find('.ivu-select-item').last().click()

            cy.get('form').eq(index).find("[name = 'proxy_enabled']").find('input')
                .invoke('val')
                .then(value => {
                    if (value === '0' || value === 'false') {
                        cy.get('form').eq(index).find("[name = 'proxy_enabled']").find('.ivu-switch').click({force: true})
                    }
                })

            cy.get('form').eq(index).find('[name="proxy_host"]')
                .find('input')
                .clear()
                .type('proxy_host')

            cy.get('form').eq(index).find('[name="proxy_port"]')
                .find('input')
                .clear()
                .type('111')
        })

        cy.get('button').contains('Save').click()
        cy.get('.ivu-notice-notice').contains('Success')
        cy.wait(1000)
    })

    it('Check edited SIP account configuration', () => {
        cy.get('.tabs').find('button').last().contains('SIP account configuration').click()
        cy.wait(500)

        cy.get('form').each(($el, index) => {
            cy.get('form').eq(index).find('[name="enabled"]').then(elem => expect(elem.find('.ivu-switch-checked')).to.exist)

            cy.get('form').eq(index).find('[name="host"]').find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('host'))

            cy.get('form').eq(index).find('[name="extension"]').find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('extension'))

            cy.get('form').eq(index).find('[name="displayname"]').find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('displayname'))

            cy.get('form').eq(index).find('[name="authuser"]').find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('authuser'))

            cy.get('form').eq(index).find("[name = 'secret']").find('.ivu-icon').click()
            cy.get('form').eq(index).find('[name="secret"]').find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('secret'))

            cy.get('form').eq(index).find('[name="domain"]').find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('domain'))

            cy.get('form').eq(index).find('[name="cforward"]').then(elem => expect(elem.find('.ivu-switch-checked')).to.be.visible)

            cy.get('form').eq(index).find('[name="cforward-busy"]').then(elem => expect(elem.find('.ivu-switch-checked')).to.be.visible)

            cy.get('form').eq(index).find('[name="cforward-noanswer"]').then(elem => expect(elem.find('.ivu-switch-checked')).to.be.visible)

            cy.get('form').eq(index).find('[name="cforward-num"]').find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('12345'))

            cy.get('form').eq(index).find('[name="call-waiting"]').then(elem => expect(elem.find('.ivu-switch-checked')).to.be.visible)

            cy.get('form').eq(index).find('[name="callerid-name"]').then(elem => expect(elem.find('.ivu-switch-checked')).to.be.visible)

            cy.get('form').eq(index).find('[name="callerid-num"]').then(elem => expect(elem.find('.ivu-switch-checked')).to.be.visible)

            cy.get('form').eq(index).find('[name="dnd"]').then(elem => expect(elem.find('.ivu-switch-checked')).to.be.visible)

            cy.get('form').eq(index).find('[name="mwi"]').then(elem => expect(elem.find('.ivu-switch-checked')).to.be.visible)

            cy.get('form').eq(index).find('[name="port"]').find('.ivu-select-selected-value').then(el => expect(el.text().trim()).to.be.eq(sip[index].port))

            // this doesn't save correctly
            /*cy.get('form').eq(index).find('[name="proxy_enabled"]').then(elem => expect(elem.find('.ivu-switch-checked')).to.be.visible)

            cy.get('form').eq(index).find('[name="proxy_host"]').find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('proxy_host'))

            cy.get('form').eq(index).find('[name="proxy_port"]').find('input').invoke('val').then(text => expect(text.trim()).to.be.eq('111'))*/
        })
    })

    it('Return SIP account configuration to previous state', () => {
        cy.get('.tabs').find('button').last().contains('SIP account configuration').click()
        cy.wait(500)

        cy.get('form').each(($el, index) => {
            cy.get('form').eq(index).find('[name="host"]')
                .find('input')
                .clear()
                .then(e => { if (oldSip[index].host !== '') cy.wrap(e).type(oldSip[index].host) })

            cy.get('form').eq(index).find('[name="extension"]')
                .find('input')
                .clear()
                .then(e => { if (oldSip[index].extension !== '') cy.wrap(e).type(oldSip[index].extension) })
           
            cy.get('form').eq(index).find('[name="displayname"]')
                .find('input')
                .clear()
                .then(e => { if (oldSip[index].displayname !== '') cy.wrap(e).type(oldSip[index].displayname) })

            cy.get('form').eq(index).find('[name="authuser"]')
                .find('input')
                .clear()
                .then(e => { if (oldSip[index].authuser !== '') cy.wrap(e).type(oldSip[index].authuser) })

            cy.get('form').eq(index).find('[name="secret"]')
                .find('input')
                .clear()
                .then(e => { if (oldSip[index].secret !== '') cy.wrap(e).type(oldSip[index].secret) })

            cy.get('form').eq(index).find('[name="domain"]')
                .find('input')
                .clear()
                .then(e => { if (oldSip[index].domain !== '') cy.wrap(e).type(oldSip[index].domain) })
            
            cy.get('form').eq(index).find("[name = 'cforward']").find('input')
                .invoke('val')
                .then(value => {
                    if (value != oldSip[index].cforward) {
                        cy.get('form').eq(index).find("[name = 'cforward']").find('.ivu-switch').click()
                    }
                })
                
            cy.get('form').eq(index).find("[name = 'cforward-busy']").find('input')
                .invoke('val')
                .then(value => {
                    if (value != oldSip[index].cforward_busy) {
                        cy.get('form').eq(index).find("[name = 'cforward-busy']").find('.ivu-switch').click()
                    }
                })

            cy.get('form').eq(index).find("[name = 'cforward-noanswer']").find('input')
                .invoke('val')
                .then(value => {
                    if (value != oldSip[index].cforward_noanswer) {
                        cy.get('form').eq(index).find("[name = 'cforward-noanswer']").find('.ivu-switch').click()
                    }
                })
            
            cy.get('form').eq(index).find('[name="cforward-num"]')
                .find('input')
                .clear()
                .then(e => { if (oldSip[index].cforward_num !== '') cy.wrap(e).type(oldSip[index].cforward_num) })

            cy.get('form').eq(index).find("[name = 'call-waiting']").find('input')
                .invoke('val')
                .then(value => {
                    if (value != oldSip[index].call_waiting) {
                        cy.get('form').eq(index).find("[name = 'call-waiting']").find('.ivu-switch').click()
                    }
                })
                
            cy.get('form').eq(index).find("[name = 'callerid-name']").find('input')
                .invoke('val')
                .then(value => {
                    if (value != oldSip[index].callerid_name) {
                        cy.get('form').eq(index).find("[name = 'callerid-name']").find('.ivu-switch').click()
                    }
                })

            cy.get('form').eq(index).find("[name = 'callerid-num']").find('input')
                .invoke('val')
                .then(value => {
                    if (value != oldSip[index].callerid_num) {
                        cy.get('form').eq(index).find("[name = 'callerid-num']").find('.ivu-switch').click()
                    }
                })

            cy.get('form').eq(index).find("[name = 'dnd']").find('input')
                .invoke('val')
                .then(value => {
                    if (value != oldSip[index].dnd) {
                        cy.get('form').eq(index).find("[name = 'dnd']").find('.ivu-switch').click()
                    }
                })
                
            cy.get('form').eq(index).find("[name = 'mwi']").find('input')
                .invoke('val')
                .then(value => {
                    if (value != oldSip[index].mwi) {
                        cy.get('form').eq(index).find("[name = 'mwi']").find('.ivu-switch').click()
                    }
                })

            if (oldSip[index].port == '') {
                cy.get('form').eq(index).find('[name="port"]').find('.c-select').invoke('val', '')
            }
            else {
                cy.get('form').eq(index).find('[name="port"]').find('.c-select').click()
                cy.wait(500)
                cy.get('form').eq(index).find('[name="port"]').find('.ivu-select-item').contains(oldSip[index].port).click()
            }

            cy.get('form').eq(index).find("[name = 'proxy_enabled']").find('input')
                .invoke('val')
                .then(value => {
                    if (value != oldSip[index].proxy_enabled) {
                        cy.get('form').eq(index).find("[name = 'proxy_enabled']").find('.ivu-switch').click()
                    }
                })

            cy.get('form').eq(index).find('[name="proxy_host"]')
                .find('input')
                .clear()
                .then(e => { if (oldSip[index].proxy_host !== '') cy.wrap(e).type(oldSip[index].proxy_host) })

            cy.get('form').eq(index).find('[name="proxy_port"]')
                .find('input')
                .clear()
                .then(e => { if (oldSip[index].proxy_port !== '') cy.wrap(e).type(oldSip[index].proxy_port) })
            
            cy.get('form').eq(index).find("[name = 'enabled']").find('input')
                .invoke('val')
                .then(value => {
                    if (value != oldSip[index].enabled) {
                        cy.get('form').eq(index).find("[name = 'enabled']").find('.ivu-switch').click()
                    }
                })
        })

        cy.get('button').contains('Save').click()
        cy.wait(500)
        cy.checkIfEleExists('.ivu-notice-notice')
            .then(value => {
                cy.log(value)
                if (value === false) {
                    cy.wait(500)
                    cy.get('form').each(($el, index) => {
                        cy.get('form').eq(index).find('[name="authuser"]').find('.field__infotext--warning').then(field => {
                            errorIndex.push(index)
                        })
                    })
                }
                else {
                    cy.get('.ivu-notice-notice').contains('Success')
                }
            })
        cy.wait(500)
    })

    it('Saving after validation', () => {
        if (errorIndex.length > 0) {
            for (let index = 0; index < errorIndex.length; index++) {
                cy.get('form').eq(errorIndex[index]).find('[name="authuser"]').find('.field__infotext--warning').then(field => {
                    cy.get('form').eq(errorIndex[index]).find('[name="authuser"]')
                    .find('input')
                    .clear()
                    .type('username123')
                })
            }

            cy.get('button').contains('Save').click()
            cy.get('.ivu-notice-notice').contains('Success')
            cy.wait(500)
        }
    })

    it('Global tab validation', () => {
        cy.get('.tabs').find('button').first().contains('global').click()
        cy.wait(2500)

        cy.get("[name = 'dns_enabled']").then(elem => {
            if (elem.find('.field__lbl').text().trim() == 'Disabled Voice DNS'){
                cy.get("[name = 'dns_enabled']").find('.ivu-switch').click()
                cy.wait(500)
            }
        })

        cy.get('[name="dns1"]')
            .find('input')
            .clear()

        cy.get('[name="dns2"]')
            .find('input')
            .clear()

        cy.get('[name="regexpire"]').first()
            .find('input')
            .clear()

        cy.get('[name="regretry"]').first()
            .find('input')
            .clear()

        cy.get('button').contains('Save').click()
        cy.wait(500)

        cy.get('[name="dns1"]').find('.field__infotext--warning').contains('Invalid IP address')
        cy.get('[name="dns2"]').find('.field__infotext--warning').contains('Invalid IP address')
        cy.get('[name="regexpire"]').find('.field__infotext--warning').contains('Field must contain only numbers')
        cy.get('[name="regretry"]').find('.field__infotext--warning').contains('Field must contain only numbers')

        cy.get('[name="dns1"]')
            .find('input')
            .clear()
            .type('1.1.1.1.1')

        cy.get('[name="dns2"]')
            .find('input')
            .clear()
            .type('1.1.1.1.1.3')

        cy.get('[name="regexpire"]').first()
            .find('input')
            .clear()
            .type('-1')

        cy.get('[name="regretry"]').first()
            .find('input')
            .clear()
            .type('-10')

        cy.get('button').contains('Save').click()
        cy.wait(500)

        cy.get('[name="dns1"]').find('.field__infotext--warning').contains('Invalid IP address')
        cy.get('[name="dns2"]').find('.field__infotext--warning').contains('Invalid IP address')

        cy.get('[name="regexpire"]').find('.field__infotext--warning').contains('Number must be greater')
        cy.get('[name="regretry"]').find('.field__infotext--warning').contains('Number must be greater')

        cy.get('[name="dns1"]')
            .find('input')
            .clear()
            .type('1.1.1')

        cy.get('[name="dns2"]')
            .find('input')
            .clear()
            .type('1.1.2.ž')

        cy.get('[name="regexpire"]').first()
            .find('input')
            .clear()
            .type('1000000')

        cy.get('[name="regretry"]').first()
            .find('input')
            .clear()
            .type('86401')

        cy.get('button').contains('Save').click()
        cy.wait(500)

        cy.get('[name="dns1"]').find('.field__infotext--warning').contains('Invalid IP address')
        cy.get('[name="dns2"]').find('.field__infotext--warning').contains('Invalid IP address')

        cy.get('[name="regexpire"]').find('.field__infotext--warning').contains('Number must be lower')
        cy.get('[name="regretry"]').find('.field__infotext--warning').contains('Number must be lower')
    })

    it('Sip tab validation', () => {
        cy.get('.tabs').find('button').last().contains('SIP account configuration').click()
        cy.wait(2500)

        cy.get('form').each(($el, index) => {
            cy.get('form').eq(index).find('[name="authuser"]')
                .find('input')
                .clear()
        })

        cy.get('button').contains('Save').click()
        cy.wait(500)

        cy.get('form').each(($el, index) => {
            cy.get('form').eq(index).find('[name="authuser"]').find('.field__infotext--warning').contains('Field is required')
        })
    })
}
