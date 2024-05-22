export function staticLeasesTest () {
    let ip
    let mac
    let newLast
    let count
    let customIP = false
    let customMAC = false
    //custom values are hardcoded in test
    it('Open page', () => {
        // TODO: Check this issue, same as dashboard
        cy.visit('advanced/static-leases')
        cy.wait(500)

        cy.url().should('include', '/advanced/static-leases')
        cy.get('.page__title').contains('Static leases')
    })

    it('Page elements', () => {
        cy.get('button').contains('Add new static lease')
        cy.checkIfEleExists('#zeroStaticLease')
            .then(value => {
                if (value === true) {
                    cy.get('#zeroStaticLease').then(($zeroStaticLease) => {
                        expect($zeroStaticLease).to.contain("You don't have any static leases")
                        expect($zeroStaticLease).to.contain('Use button on top to create a new one')
                    })
                }
                else {
                    cy.get('.u-list--parental-filter__item')
                }
            })
    })

    it('Create static lease', () => {
        cy.get('button').contains('Add new static lease').click()
        cy.wait(500)
        cy.get('.modal__title').contains('Add new static lease')
        cy.get('.modal__close')
        cy.get('button').contains('Cancel')
        cy.get('button').contains('Save')

        cy.get('.field__lbl').contains('Name')
        cy.get('.field__lbl').contains('IP Address')
        cy.get('.field__lbl').contains('MAC address')

        cy.get('[name="name"]')
            .find('input')
            .clear()
            .type('TestName')

        cy.get('[name="ip"]').find('.c-select').click()
        cy.get('[name="ip"]').find('.ivu-select-item').contains('Custom IP').click()
        cy.get('[name="ip"]').find('.field__lbl').contains('Custom IP')

        cy.get('[name="ip"]').find('.c-select').click()
        cy.get('[name="ip"]').find('.ivu-select-item').first().click().then($ip => {
            if ($ip.text() === 'Custom IP') {
                cy.get('[name="ip"]')
                    .find('input')
                    .last()
                    .clear()
                    .type('192.169.1.123')
                ip = '192.169.1.123'
                customIP = true
            }
            else {
                ip = $ip.text()
            }
        })

        cy.get('[name="mac"]').find('.c-select').click()
        cy.get('[name="mac"]').find('.ivu-select-item').contains('Custom MAC address').click()
        cy.get('[name="mac"]').find('.field__lbl').contains('Custom MAC address')

        cy.get('[name="mac"]').find('.c-select').click()
        cy.get('[name="mac"]').find('.ivu-select-item').first().click().then($mac => {
            if ($mac.text() === 'Custom MAC address') {
                cy.get('[name="mac"]')
                    .find('input')
                    .last()
                    .clear()
                    .type('00:aa:bb:cc:dd:ff')
                    mac = '00:aa:bb:cc:dd:ff'
                customMAC = true
            }
            else {
                mac = $mac.text()
                customMAC = false
            }
        })

        cy.get('button').contains('Save').click()
        cy.get('.ivu-notice-notice').contains('Success')
    })

    it('Check new static lease', () => {
        //new static lease is always at the end
        cy.wait(500)
        cy.get('.u-list--parental-filter__item').last().click().then($newItem => {
            expect($newItem.find('.u-list--parental-filter__label').text().trim()).to.be.eq('TestName')
            expect($newItem.find('.u-list--parental-filter__actions').find('button').first().text().trim()).to.be.eq('edit')
            expect($newItem.find('.u-list--parental-filter__actions').find('button').last().text().trim()).to.be.eq('delete')
            expect($newItem.find('#ipAddress').text().trim()).to.be.eq('IP Address:' + ip)
            expect($newItem.find('#macAddress').text().trim()).to.be.eq('MAC address:' + mac)
        })
    })

    it('Edit new static lease', () => {
        cy.wait(500)
        cy.get('.u-list--parental-filter__item').last().find('.u-list--parental-filter__actions').find('button').contains('edit').click()
        cy.wait(500)

        cy.get('[name="name"]')
            .find('input')
            .invoke('val')
            .then(text => {
                expect(text).to.be.eq('TestName')
            })
        cy.get('[name="name"]')
            .find('input')
            .clear()
            .type('TestNameEdit')

        if (customIP === false) {
            cy.get('[name="ip"]').find('.c-select').contains(ip).click()
            cy.get('[name="ip"]').find('.ivu-select-item').eq(1).click().then($ip => {
                if ($ip.text() === 'Custom IP') {
                    cy.get('[name="ip"]')
                        .find('input')
                        .last()
                        .clear()
                        .type('192.169.1.123')
                    ip = '192.169.1.123'
                    customIP = true
                }
                else {
                    ip = $ip.text()
                }
            })
        }
        else {
            expect(customIP).to.be.eq(true)
            cy.get('[name="ip"]').find('.c-select').contains('Custom IP').click()
            cy.get('[name="ip"]').find('.ivu-select-item').first().click().then($ip => {
                if ($ip.text() === 'Custom IP') {
                    cy.get('[name="ip"]')
                        .find('input')
                        .last()
                        .clear()
                        .type('192.169.1.123')
                    ip = '192.169.1.123'
                    customIP = true
                }
                else {
                    ip = $ip.text()
                    customIP = false
                }
            })
        }
        
        if (customMAC === false) {
            cy.get('[name="mac"]').find('.c-select').contains(mac).click()
            cy.get('[name="mac"]').find('.ivu-select-item').eq(1).click().then($mac => {
                if ($mac.text() === 'Custom MAC address') {
                    cy.get('[name="mac"]')
                        .find('input')
                        .last()
                        .clear()
                        .type('00:aa:bb:cc:dd:ff')
                        mac = '00:aa:bb:cc:dd:ff'
                    customMAC = true
                }
                else {
                    mac = $mac.text()
                }
            })
        }
        else {
            expect(customMAC).to.be.eq(true)
            cy.get('[name="mac"]').find('.c-select').contains('Custom MAC address').click()
            cy.get('[name="mac"]').find('.ivu-select-item').first().click().then($mac => {
                if ($mac.text() === 'Custom MAC address') {
                    cy.get('[name="mac"]')
                        .find('input')
                        .last()
                        .clear()
                        .type('00:aa:bb:cc:dd:ff')
                        mac = '00:aa:bb:cc:dd:ff'
                    customMAC = true
                }
                else {
                    mac = $mac.text()
                    customMAC = false
                }
            })
        }

        cy.get('button').contains('Save').click()
        cy.get('.ivu-notice-notice').contains('Success')
    })

    it('Check edited static lease', () => {
        //new static lease is always at the end
        cy.wait(500)
        cy.get('.u-list--parental-filter__item').last().click({ force: true }).then($editItem => {
            expect($editItem.find('.u-list--parental-filter__label').text().trim()).to.be.eq('TestNameEdit')
            expect($editItem.find('#ipAddress').text().trim()).to.be.eq('IP Address:' + ip)
            expect($editItem.find('#macAddress').text().trim()).to.be.eq('MAC address:' + mac)
        })
    })

    it('Form validators test', () => {
        cy.get('button').contains('Add new static lease').click()
        cy.wait(500)

        cy.get('button').contains('Save').click()
        cy.wait(500)
        cy.get('[name="name"]').find('.field__infotext--warning').contains('Field is required')
        cy.get('[name="ip"]').find('.field__infotext--warning').contains('IP addresses are four numbers separated by dots')
        cy.get('[name="mac"]').find('.field__infotext--warning').contains('Must be 12 characters long')

        cy.get('[name="ip"]').find('.c-select').click()
        cy.get('[name="ip"]').find('.ivu-select-item').contains('Custom IP').click().then($ip => {
            cy.get('[name="ip"]')
                .find('input')
                .last()
                .clear()
                .type('256.555.0.0')
        })

        cy.get('[name="mac"]').find('.c-select').click()
        cy.get('[name="mac"]').find('.ivu-select-item').contains('Custom MAC address').click().then($mac => {
            cy.get('[name="mac"]')
                .find('input')
                .last()
                .clear()
                .type('g1:aa:bb:cc:dd:žž')
        })

        cy.get('button').contains('Save').click()
        cy.wait(500)
        cy.get('[name="name"]').find('.field__infotext--warning').contains('Field is required')
        cy.get('[name="ip"]').find('.field__infotext--warning').contains('Each number must be between 0-255')
        cy.get('[name="mac"]').find('.field__infotext--warning').contains('Use only numbers (0-9) or letters (a-f)')


        cy.get('[name="ip"]')
            .find('input')
            .last()
            .clear()
            .type('1.1.0.0.1')

        cy.get('[name="mac"]')
            .find('input')
            .last()
            .clear()
            .type('11:aa:bb:cc:dd:fff')

        cy.get('button').contains('Save').click()
        cy.wait(500)
        cy.get('[name="name"]').find('.field__infotext--warning').contains('Field is required')
        cy.get('[name="ip"]').find('.field__infotext--warning').contains('IP addresses are four numbers separated by dots')
        cy.get('[name="mac"]').find('.field__infotext--warning').contains('Must be 12 characters long')

        cy.get('[name="ip"]')
            .find('input')
            .last()
            .clear()
            .type('1.1..1')
            
        cy.get('[name="mac"]')
            .find('input')
            .last()
            .clear()
            .type('00:00:00:00:00:00')

        cy.get('button').contains('Save').click()
        cy.wait(500)
        cy.get('[name="name"]').find('.field__infotext--warning').contains('Field is required')
        cy.get('[name="ip"]').find('.field__infotext--warning').contains('Invalid IP address')
        cy.get('[name="mac"]').find('.field__infotext--warning').contains('Must be 12 characters long')

        cy.get('button').contains('Cancel').click()
    })

    it('Check static leases count', () => {
        cy.get('#staticLeaseList')
            .find('.u-list--parental-filter__item')
            .then(listing => {
                count = Cypress.$(listing).length
            })
    })

    it('Check new last static lease', () => {
        if (count > 1) {
            cy.get('.u-list--parental-filter__item').eq(count -2).find('.u-list--parental-filter__label').then($newLast => newLast = $newLast.text().trim())
        }
    })

    it('Delete static lease', () => {
        cy.get('.u-list--parental-filter__item').last().contains('TestNameEdit')
        cy.get('.u-list--parental-filter__item').last().find('.u-list--parental-filter__actions').find('button').contains('delete').click()
        cy.wait(500)
        cy.get('.modal__window')
        cy.get('.modal__content').contains('Are you sure to delete?')
        cy.get('.modal__footer').find('button').contains('Cancel')
        cy.get('.modal__footer').find('button').contains('Delete').click()
        cy.get('.ivu-notice-notice').contains('Success')
        cy.wait(500)
        if (count == 1) {
            cy.get('#zeroStaticLease').then(($zeroStaticLease) => {
                expect($zeroStaticLease).to.contain("You don't have any static leases")
                expect($zeroStaticLease).to.contain('Use button on top to create a new one')
            })
        }
        else {
            expect(count).to.be.greaterThan(1)
            cy.get('.u-list--parental-filter__item').last().contains(newLast.toString())
        }

    })
}
