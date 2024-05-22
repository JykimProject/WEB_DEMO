export function applicationFilterTabTest (deviceOrGroup, modal) {
    var exist = false
    var facebookToggled = false
    it('Open tab', () => {
        if (deviceOrGroup === 'device' && modal) {
            cy.visit('/')
            cy.wait(500)
            cy.get('.circle__inner').click()
            cy.get('a[title="Connected devices"]').click({ force: true })
            cy.wait(500)
            //search only for devices not users or groups; maybe fix this in other tests for device modals
            cy.checkIfEleExists('#deviceCircle')
                .then(value => {
                    if (value === true) {
                        cy.get('#deviceCircle').first().click()
                        cy.wait(500)
                        cy.get('.tabs__item').contains('Application filter').click()
                        cy.wait(500)
                        exist = true
                    }
                })
        }
        else if (deviceOrGroup === 'group' && modal) {
            cy.visit('/')
            cy.wait(500)
            cy.get('.circle__inner').click()
            cy.get('a[title="Connected devices"]').click({ force: true })
            cy.wait(500)
            //search only for users or groups not devices; maybe fix this in other tests for device modals
            cy.checkIfEleExists('#groupCircle')
                .then(value => {
                    if (value === true) {
                        cy.get('#groupCircle').first().click()
                        cy.wait(500)
                        cy.get('.tabs__item').contains('Application filter').click()
                        cy.wait(500)
                        exist = true
                    }
                })
        }

        else if (deviceOrGroup === 'group' && !modal) {
            cy.get('.tabs__link').contains('Application filter').click()
            cy.wait(500)
            exist = true
        }
        
    })

    it('Tab elements', () => {
        if (exist) {
            cy.get('.is-active').contains('Application filter')

            cy.get('form').contains('By selecting an app, you are blocking its usage on this device')

            cy.get('h5').contains('Social media')
            cy.get('[name="Facebook"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('Facebook')
                expect($field.find('.ivu-switch')).to.exist
            })
            cy.get("[name = 'Facebook']").find('input')
                .invoke('val')
                .then(value => {
                    if (value === 'true') {
                        facebookToggled = true
                    }
                })

            cy.get('[name="Snapchat"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('Snapchat')
                expect($field.find('.ivu-switch')).to.exist
            })
            cy.get('[name="Instagram"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('Instagram')
                expect($field.find('.ivu-switch')).to.exist
            })
            cy.get('[name="TikTok"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('TikTok')
                expect($field.find('.ivu-switch')).to.exist
            })

            cy.get('h5').contains('Streaming applications')
            cy.get('[name="Youtube"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('Youtube')
                expect($field.find('.ivu-switch')).to.exist
            })
            cy.get('[name="HBOGO"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('HBOGO')
                expect($field.find('.ivu-switch')).to.exist
            })
            cy.get('[name="Amazon Prime"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('Amazon Prime')
                expect($field.find('.ivu-switch')).to.exist
            })
            cy.get('[name="Netflix"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('Netflix')
                expect($field.find('.ivu-switch')).to.exist
            })
            cy.get('[name="Disney+"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('Disney+')
                expect($field.find('.ivu-switch')).to.exist
            })
            cy.get('[name="Apple tv+"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('Apple tv+')
                expect($field.find('.ivu-switch')).to.exist
            })

            cy.get('h5').contains('Chat applications')
            cy.get('[name="WhatsApp"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('WhatsApp')
                expect($field.find('.ivu-switch')).to.exist
            })
            cy.get('[name="Viber"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('Viber')
                expect($field.find('.ivu-switch')).to.exist
            })

            cy.get('h5').contains('games')
            cy.get('[name="Fortnite"]').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('Fortnite')
                expect($field.find('.ivu-switch')).to.exist
            })
        }
    })

    //Why these togglers need to be disabled?
    it('Disabled and enabled togglers', () => {
        if (exist) {
            cy.get('[name="Facebook"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).not.to.exist
            })
            cy.get('[name="Snapchat"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).to.exist
            })
            cy.get('[name="Instagram"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).to.exist
            })
            cy.get('[name="TikTok"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).to.exist
            })
            cy.get('[name="Youtube"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).not.to.exist
            })
            cy.get('[name="HBOGO"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).to.exist
            })
            cy.get('[name="Amazon Prime"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).to.exist
            })
            cy.get('[name="Netflix"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).to.exist
            })
            cy.get('[name="Disney+"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).to.exist
            })
            cy.get('[name="Apple tv+"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).to.exist
            })
            cy.get('[name="WhatsApp"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).to.exist
            })
            cy.get('[name="Viber"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).to.exist
            })
            cy.get('[name="Fortnite"]').then($field => {
                expect($field.find('.ivu-switch-disabled')).to.exist
            })
        }
    })

    it('Toggling app', () => {
        if (exist) {
            cy.get('[name="Facebook"]').find('.ivu-switch').click()
            cy.wait(300)
            cy.get('.ivu-notice').contains('Success')
            cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
            cy.wait(500)
            if (facebookToggled) {
                cy.get('[name="Facebook"]').then($field => {
                    expect($field.find('.ivu-switch-checked')).not.to.exist
                })
            }
            else {
                cy.get('[name="Facebook"]').then($field => {
                    expect($field.find('.ivu-switch-checked')).to.exist
                })
            }
            cy.get('[name="Facebook"]').find('.ivu-switch').click()
            cy.get('.ivu-notice').contains('Success')
            cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
            cy.wait(500)
            if (facebookToggled) {
                cy.get('[name="Facebook"]').then($field => {
                    expect($field.find('.ivu-switch-checked')).to.exist
                })
            }
            else {
                cy.get('[name="Facebook"]').then($field => {
                    expect($field.find('.ivu-switch-checked')).not.to.exist
                })
            }
        }
    })
}
