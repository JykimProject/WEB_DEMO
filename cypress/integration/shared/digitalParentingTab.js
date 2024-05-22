export function digitalParentingTabTest (deviceOrGroup, modal) {
    var exist = false
    it('Open tab', () => {
        if (deviceOrGroup === 'device' && modal) {
            cy.visit('/')
            cy.wait(500)
            cy.get('.circle__inner').click()
            cy.get('a[title="Connected devices"]').click({ force: true })
            cy.wait(2000)
            //search only for devices not users or groups; maybe fix this in other tests for device modals
            cy.checkIfEleExists('#deviceCircle')
                .then(value => {
                    if (value === true) {
                        cy.get('#deviceCircle').first().click()
                        cy.wait(500)
                        cy.get('.tabs__item').contains('digital parenting').click()
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
            cy.wait(2000)
            //search only for users or groups not devices; maybe fix this in other tests for device modals
            cy.checkIfEleExists('#groupCircle')
                .then(value => {
                    if (value === true) {
                        cy.get('#groupCircle').first().click()
                        cy.wait(500)
                        cy.get('.tabs__item').contains('digital parenting').click()
                        cy.wait(500)
                        exist = true
                    }
                })
        }

        else if (deviceOrGroup === 'group' && !modal) {
            cy.get('.tabs__link').contains('digital parenting').click()
            cy.wait(500)
            exist = true
        }
        
    })

    it('Tab elements', () => {
        if (exist) {
            cy.get('.is-active').contains('digital parenting')

            cy.get('.fieldset__legend').contains('Safe search')
            cy.get('[name="ggl"]').invoke('show').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('Safe search engines')
                expect($field.find('.ivu-switch')).to.exist
                expect($field.find('.tooltip--simple').text().trim()).to.be.eq('Minimize unwanted content using safe search engines such as Google SafeSearch and Yahoo SafeSearch.')
            })
            cy.get('[name="yt"]').invoke('show').then($field => {
                expect($field.find('.field__lbl').text().trim()).to.be.eq('Safe YouTube')
                expect($field.find('.ivu-switch')).to.exist
                expect($field.find('.tooltip--simple').text().trim()).to.be.eq("Safety Mode is YouTube's opt-in setting for filtering out mature content.")
            })

            cy.get('.fieldset__legend').contains('Filters')
            cy.get('.u-list--parental__item').contains('Child (< 5)').invoke('show').then($item => {
                expect($item.find('.u-list--parental__label').text().trim()).to.be.eq('Child (< 5)')
                expect($item.parent().find('.tooltip--simple').text().trim()).to.be.eq("Children up to age of 5")
                expect($item.find('.parental__color')).to.exist
            })
            cy.get('.u-list--parental__item').contains('Pre-teens (5-9)').invoke('show').then($item => {
                expect($item.find('.u-list--parental__label').text().trim()).to.be.eq('Pre-teens (5-9)')
                expect($item.parent().find('.tooltip--simple').text().trim()).to.be.eq("Children aged from 5 to 9")
                expect($item.find('.parental__color')).to.exist
            })
            cy.get('.u-list--parental__item').contains('Teens (10-16)').invoke('show').then($item => {
                expect($item.find('.u-list--parental__label').text().trim()).to.be.eq('Teens (10-16)')
                expect($item.parent().find('.tooltip--simple').text().trim()).to.be.eq("Teenagers aged from 10 to 16")
                expect($item.find('.parental__color')).to.exist
            })
            cy.get('.u-list--parental__item').contains('Young adults (> 16)').invoke('show').then($item => {
                expect($item.find('.u-list--parental__label').text().trim()).to.be.eq('Young adults (> 16)')
                expect($item.parent().find('.tooltip--simple').text().trim()).to.be.eq("Age 16 or above")
                expect($item.find('.parental__color')).to.exist
            })

            cy.get('span').contains('It is recommended to clean the browser and system DNS cache for the Digital Parenting restrictions to take effect.')

            if (deviceOrGroup === 'device' && modal) {
                cy.get('#advancedPCLink').invoke('show').then($item => {
                    expect($item.find('.icon-cog')).to.exist
                    expect($item.text().trim().split('\n')[0]).to.be.eq('advanced parental control')
                    expect($item.text().trim().split('\n')[2].trim()).to.be.eq('Click here to define or edit custom filters and categories.')
                })
                cy.get('#advancedPCLink').find('a').click()
                cy.wait(500)
                cy.url().should('include', '/parental-control/filter')
                cy.get('.page__title').contains('parental control filters').find('img')

                cy.visit('radar')
                cy.wait(500)
                cy.get('.circle__inner').click()
                cy.get('a[title="Connected devices"]').click({ force: true })
                cy.wait(2000)
                cy.checkIfEleExists('#deviceCircle')
                    .then(value => {
                        if (value === true) {
                            cy.get('#deviceCircle').first().click()
                            cy.wait(500)
                            cy.get('.tabs__item').contains('digital parenting').click()
                            cy.wait(500)
                        }
                    })
            }
        }
    })

    it('Enabling filters', () => { //switches don't change on device user management page when filter is selected??
        if (exist) {
            cy.get("[name = 'ggl']").find('input')
                .invoke('val')
                .then(value => {
                    cy.get("[name = 'ggl']").find('.ivu-switch').click()
                    cy.wait(300)
                    cy.get('.ivu-notice').contains('Success')
                    cy.get('.ivu-notice').find('.ivu-icon-ios-close').click({ multiple: true })
                    if (value === 'false') {
                        cy.get('[name="ggl"]').then($field => {
                            expect($field.find('.ivu-switch-checked')).to.exist
                        })
                        cy.get("[name = 'ggl']").find('.ivu-switch').click()
                        cy.wait(300)
                        cy.get('.ivu-notice').contains('Success')
                        cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
                        cy.wait(500)
                        cy.get('[name="ggl"]').then($field => {
                            expect($field.find('.ivu-switch-checked')).not.to.exist
                        })
                    }
                    else {
                        expect(value).to.be.eq('true')
                        cy.get('[name="ggl"]').then($field => {
                            expect($field.find('.ivu-switch-checked')).not.to.exist
                        })
                        cy.get("[name = 'ggl']").find('.ivu-switch').click()
                        cy.wait(300)
                        cy.get('.ivu-notice').contains('Success')
                        cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
                        cy.wait(500)
                        cy.get('[name="ggl"]').then($field => {
                            expect($field.find('.ivu-switch-checked')).to.exist
                        })
                    }
                })
            cy.get("[name = 'yt']").find('input')
                .invoke('val')
                .then(value => {
                    cy.get("[name = 'yt']").find('.ivu-switch').click()
                    cy.wait(300)
                    cy.get('.ivu-notice').contains('Success')
                    cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
                    cy.wait(500)
                    if (value === 'false') {
                        cy.get('[name="yt"]').then($field => {
                            expect($field.find('.ivu-switch-checked')).to.exist
                        })
                        cy.get("[name = 'yt']").find('.ivu-switch').click()
                        cy.wait(300)
                        cy.get('.ivu-notice').contains('Success')
                        cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
                        cy.wait(500)
                        cy.get('[name="yt"]').then($field => {
                            expect($field.find('.ivu-switch-checked')).not.to.exist
                        })
                    }
                    else {
                        expect(value).to.be.eq('true')
                        cy.get('[name="yt"]').then($field => {
                            expect($field.find('.ivu-switch-checked')).not.to.exist
                        })
                        cy.get("[name = 'yt']").find('.ivu-switch').click()
                        cy.wait(300)
                        cy.get('.ivu-notice').contains('Success')
                        cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
                        cy.wait(500)
                        cy.get('[name="yt"]').then($field => {
                            expect($field.find('.ivu-switch-checked')).to.exist
                        })
                    }
                })
            cy.checkIfEleExists('#selectedChild')
                .then(value => {
                    if (value === true) {
                        cy.get('.u-list--parental__item').contains('Child (< 5)').click().should('have.class', 'is-selected')
                        cy.wait(300)
                        cy.get('.ivu-notice').contains('Success')
                        cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
                        cy.wait(500)
                        cy.get('.u-list--parental__item').contains('Child (< 5)').click().should('not.have.class', 'is-selected')
                        cy.wait(300)
                        cy.get('.ivu-notice').contains('Success')
                        cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
                        cy.wait(500)
                        cy.get('.u-list--parental__item').contains('Child (< 5)').should('have.class', 'is-selected')
                        if (deviceOrGroup === 'device') {
                            cy.get("[name = 'yt']").find('input')
                                .invoke('val')
                                .then(value => {
                                    expect(value).to.be.eq('true')
                                })
                            cy.get("[name = 'ggl']").find('input')
                                .invoke('val')
                                .then(value => {
                                    expect(value).to.be.eq('true')
                                })
                        }
                    } 
                    else {
                        cy.get('.u-list--parental__item').contains('Child (< 5)').click().should('not.have.class', 'is-selected')
                        cy.wait(300)
                        cy.get('.ivu-notice').contains('Success')
                        cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
                        cy.wait(500)
                        if (deviceOrGroup === 'device') {
                            cy.get("[name = 'yt']").find('input')
                                .invoke('val')
                                .then(value => {
                                    expect(value).to.be.eq('true')
                                })
                            cy.get("[name = 'ggl']").find('input')
                                .invoke('val')
                                .then(value => {
                                    expect(value).to.be.eq('true')
                                })
                        }
                        cy.get('.u-list--parental__item').contains('Child (< 5)').click().should('have.class', 'is-selected')
                        cy.wait(300)
                        cy.get('.ivu-notice').contains('Success')
                        cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
                        cy.wait(500)
                        cy.get('.u-list--parental__item').contains('Child (< 5)').should('not.have.class', 'is-selected')
                        if (deviceOrGroup === 'device') {
                            cy.get("[name = 'yt']").find('input')
                                .invoke('val')
                                .then(value => {
                                    expect(value).to.be.eq('false')
                                })
                            cy.get("[name = 'ggl']").find('input')
                                .invoke('val')
                                .then(value => {
                                    expect(value).to.be.eq('false')
                                })
                        }
                    } 
                })

            cy.get('.u-list--parental__item').contains('Pre-teens (5-9)').click().should('not.have.class', 'is-selected')
            cy.wait(300)
            cy.get('.ivu-notice').contains('Success')
            cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
            cy.wait(500)
            if (deviceOrGroup === 'device') {
                cy.get("[name = 'yt']").find('input')
                    .invoke('val')
                    .then(value => {
                        expect(value).to.be.eq('true')
                    })
                cy.get("[name = 'ggl']").find('input')
                    .invoke('val')
                    .then(value => {
                        expect(value).to.be.eq('true')
                    })
            }
            cy.get('.u-list--parental__item').contains('Pre-teens (5-9)').click().should('have.class', 'is-selected')
            cy.wait(300)
            cy.get('.ivu-notice').contains('Success')
            cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
            cy.wait(500)
            cy.get('.u-list--parental__item').contains('Pre-teens (5-9)').should('not.have.class', 'is-selected')
            if (deviceOrGroup === 'device') {
                cy.get("[name = 'yt']").find('input')
                    .invoke('val')
                    .then(value => {
                        expect(value).to.be.eq('false')
                    })
                cy.get("[name = 'ggl']").find('input')
                    .invoke('val')
                    .then(value => {
                        expect(value).to.be.eq('false')
                    })
            }

            cy.get('.u-list--parental__item').contains('Teens (10-16)').click().should('not.have.class', 'is-selected')
            cy.wait(300)
            cy.get('.ivu-notice').contains('Success')
            cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
            cy.wait(500)
            if (deviceOrGroup === 'device') {
                cy.get("[name = 'yt']").find('input')
                    .invoke('val')
                    .then(value => {
                        expect(value).to.be.eq('true')
                    })
                cy.get("[name = 'ggl']").find('input')
                    .invoke('val')
                    .then(value => {
                        expect(value).to.be.eq('true')
                    })
            }
            cy.get('.u-list--parental__item').contains('Teens (10-16)').click().should('have.class', 'is-selected')
            cy.wait(300)
            cy.get('.ivu-notice').contains('Success')
            cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
            cy.wait(500)
            cy.get('.u-list--parental__item').contains('Teens (10-16)').should('not.have.class', 'is-selected')
            if (deviceOrGroup === 'device') {
                cy.get("[name = 'yt']").find('input')
                    .invoke('val')
                    .then(value => {
                        expect(value).to.be.eq('false')
                    })
                cy.get("[name = 'ggl']").find('input')
                    .invoke('val')
                    .then(value => {
                        expect(value).to.be.eq('false')
                    })
            }

            cy.get('.u-list--parental__item').contains('Young adults (> 16)').click().should('not.have.class', 'is-selected')
            cy.wait(300)
            cy.get('.ivu-notice').contains('Success')
            cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
            cy.wait(500)
            if (deviceOrGroup === 'device') {
                cy.get("[name = 'yt']").find('input')
                    .invoke('val')
                    .then(value => {
                        expect(value).to.be.eq('true')
                    })
                cy.get("[name = 'ggl']").find('input')
                    .invoke('val')
                    .then(value => {
                        expect(value).to.be.eq('true')
                    })
            }
            cy.get('.u-list--parental__item').contains('Young adults (> 16)').click().should('have.class', 'is-selected')
            cy.wait(300)
            cy.get('.ivu-notice').contains('Success')
            cy.get('.ivu-notice').find('.ivu-icon-ios-close').click()
            cy.wait(500)
            cy.get('.u-list--parental__item').contains('Young adults (> 16)').should('not.have.class', 'is-selected')
            if (deviceOrGroup === 'device') {
                cy.get("[name = 'yt']").find('input')
                    .invoke('val')
                    .then(value => {
                        expect(value).to.be.eq('false')
                    })
                cy.get("[name = 'ggl']").find('input')
                    .invoke('val')
                    .then(value => {
                        expect(value).to.be.eq('false')
                    })
            }
        }
    })
}

