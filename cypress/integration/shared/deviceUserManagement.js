var count
var addDevice = false
var group = false
var user = false
export function pageElementsNewAndEditedUser (url) { //url should be /groups or / device-users
    it('Open page', () => {
        cy.visit(url)
        cy.wait(500)
        cy.get('.page__title').then($title => {
            if ($title.text().trim() === 'Device user settings') {
                user = true
                cy.url().should('include', '/device-users')
            }
            else if ($title.text().trim() === 'Groups settings') {
                group = true
                cy.url().should('include', '/groups')
            }
            else throw new Error("No title")
        })
    })

    it('Page elements', () => {
        if (user) {
            cy.get('button').contains('Create user')
            cy.checkIfEleExists('#zeroUsersOrGroups')
            .then(value => {
                if (value === true) {
                    cy.get('#zeroUsersOrGroups').then(($zeroUsersOrGroups) => {
                        expect($zeroUsersOrGroups).to.contain("You don't have any users")
                        expect($zeroUsersOrGroups).to.contain('Use button on top to create a new one')
                    })
                }
                else {
                    cy.get('#userOrGroupItems').find('.u-list--parental-filter__item')
                }
            })
        }
        else {
            cy.get('button').contains('Create group')
            cy.checkIfEleExists('#zeroUsersOrGroups')
            .then(value => {
                if (value === true) {
                    cy.get('#zeroUsersOrGroups').then(($zeroUsersOrGroups) => {
                        expect($zeroUsersOrGroups).to.contain("You don't have any groups")
                        expect($zeroUsersOrGroups).to.contain('Use button on top to create a new one')
                    })
                }
                else {
                    cy.get('#userOrGroupItems').find('.u-list--parental-filter__item')
                }
            })
        }
        
    })

    it('Create new user or group', () => {
        if (user) {
            cy.get('button').contains('Create user').click()
            cy.wait(500)
            cy.get('.modal__title').contains('Create user')
        }
        else {
            cy.get('button').contains('Create group').click()
            cy.wait(500)
            cy.get('.modal__title').contains('Create group')
        }
        
        cy.get('.modal__close')
        cy.get('button').contains('Cancel')
        cy.get('button').contains('Save')

        cy.get('.field__lbl').contains('Name')
        cy.get('.field__lbl').contains('Last name')
        cy.get('.field__lbl').contains('Email')
        cy.get('.field__lbl').contains('Icon')

        cy.get('[name="name"]')
            .find('input')
            .clear()
            .type('TestName')

        cy.get('[name="last_name"]')
            .find('input')
            .clear()
            .type('TestLastName')

        cy.get('[name="email"]')
            .find('input')
            .clear()
            .type('hello@cypress.io')

        cy.get('[name="icon"]').find('.c-select').click()
        cy.wait(500)
        cy.get('[name="icon"]').find('.ivu-select-item').contains('Boy')
        cy.get('[name="icon"]').find('.ivu-select-item').contains('Kid')
        cy.get('[name="icon"]').find('.ivu-select-item').contains('Girl').click()


        cy.get('button').contains('Save').click()
        cy.get('.ivu-notice-notice').contains('Success')
    })

    it('Check new user or group', () => {
        //new user or group is always at the end of users or groups with the same name
        cy.wait(500)
        cy.get('#userOrGroupItems').find('.u-list--parental-filter__item').contains('TestName').last().invoke('show').then($newItem => {
            expect($newItem.find('button').text()).to.contain('delete')
        })
        cy.get('.u-list--parental-filter__item').contains('TestName').last().click()
        cy.wait(500)

        cy.get('.page__title').contains('TestName')
        cy.get('.icon-pencil').click()
        cy.wait(500)

        cy.get('[name="name"]')
            .find('input')
            .invoke('val')
            .then(text => expect(text).to.be.eq('TestName'))

        cy.get('[name="last_name"]')
            .find('input')
            .invoke('val')
            .then(text => expect(text).to.be.eq('TestLastName'))

        cy.get('[name="email"]')
            .find('input')
            .invoke('val')
            .then(text => expect(text).to.be.eq('hello@cypress.io'))

        cy.get('[name="icon"]').contains('Girl')
    })

    it('Edit user or group', () => {
        cy.get('[name="name"]')
            .find('input')
            .clear()
            .type('TestNameEdit')

        cy.get('[name="last_name"]')
            .find('input')
            .clear()
            .type('TestLastNameEdit')

        cy.get('[name="email"]')
            .find('input')
            .clear()
            .type('edit@cypress.io')

        cy.get('[name="icon"]').find('.c-select').click()
        cy.wait(500)
        cy.get('[name="icon"]').find('.ivu-select-item').contains('Kid').click()

        cy.get('button').contains('Save').click()
        cy.get('.ivu-notice-notice').contains('Success')
    })

    it('Check edited user or group', () => {
        cy.get('.page__title').contains('TestNameEdit')
        cy.get('.icon-pencil').click()
        cy.wait(500)

        cy.get('[name="name"]')
            .find('input')
            .invoke('val')
            .then(text => expect(text).to.be.eq('TestNameEdit'))

        cy.get('[name="last_name"]')
            .find('input')
            .invoke('val')
            .then(text => expect(text).to.be.eq('TestLastNameEdit'))

        cy.get('[name="email"]')
            .find('input')
            .invoke('val')
            .then(text => expect(text).to.be.eq('edit@cypress.io'))

        cy.get('[name="icon"]').contains('Kid')

        cy.get('.btn').contains('Cancel').click()
        cy.wait(500)

        cy.get('.btn').contains('back').click()
        cy.wait(500)

        cy.get('#userOrGroupItems').find('.u-list--parental-filter__item').contains('TestNameEdit').last().invoke('show').then($newItem => {
            expect($newItem.find('button').text()).to.contain('delete')
        })
    })

    it('Create new user or group form validation', () => {
        if (user) cy.get('button').contains('Create user').click()
        else cy.get('button').contains('Create group').click()
        cy.wait(500)
        cy.get('button').contains('Save').click()
        cy.wait(500)
        cy.get('[name="name"]').find('.field__infotext').contains('Field is required')
        cy.get('button').contains('Cancel').click()
        cy.wait(500)
    })
}
//here should be tabs test in base.js
export function addingDeviceToUserOrGroup () {

    it('Add user or group devices', () => {
        cy.get('.btn').contains('Add devices').click()
        cy.wait(2000)
        cy.get('.radar__title').contains('connected devices')
        cy.checkIfEleExists('#deviceCircle')
            .then(value => {
                if (value === true) {
                    cy.get('#deviceCircle').first().click()
                    cy.wait(500)
                    cy.get('.tabs__item').contains('Users').click()
                    cy.wait(500)
                    cy.get('.u-list--groups__item').contains('TestNameEdit').last().click()
                    cy.wait(500)
                    cy.get('.ivu-notice-notice').contains('Success')
                    cy.wait(500)
                    cy.get('.u-list--groups__item').contains('TestNameEdit').last().then($item =>{
                        expect($item).to.have.class('is-checked')
                    })
                    addDevice = true
                } 
            })
        cy.visit('device-users')
        cy.wait(500)
        cy.url().should('include', '/device-users')

        cy.get('.u-list--parental-filter__item').contains('TestNameEdit').last().click()
        cy.wait(500)
    })
}
//here should be test for every tab in base.js
export function deletingUserOrGroup () {
    it('Check user or group count', () => {
        cy.visit('device-users')
        cy.wait(500)
        cy.url().should('include', '/device-users')
        cy.get('#userOrGroupItems')
            .find('.u-list--parental-filter__item')
            .then(listing => {
                count = Cypress.$(listing).length
            })
    })

    it('Delete user or group', () => {
        cy.get('.u-list--parental-filter__item').contains('TestNameEdit').last().contains('delete').invoke('show').click()
        cy.wait(500)
        cy.get('.modal__window')
        cy.get('.modal__content').contains('Are you sure to delete?')
        cy.get('.modal__footer').find('button').contains('Cancel')
        cy.get('.modal__footer').find('button').contains('Delete').click()
        cy.get('.ivu-notice-notice').contains('Success')
        cy.wait(500)
        cy.log(count)
        if (count == 1) {
            cy.get('#zeroUsersOrGroups').then(($zeroUsersOrGroups) => {
                expect($zeroUsersOrGroups).to.contain("You don't have any users")
                expect($zeroUsersOrGroups).to.contain('Use button on top to create a new one')
            })
        }
        else {
            expect(count).to.be.greaterThan(1)
            cy.get('#userOrGroupItems')
        }
    })

    it('Create new user or group and delete it with another button', () => {
        if (user) cy.get('button').contains('Create user').click()
        else cy.get('button').contains('Create group').click()
        cy.wait(500)

        cy.get('[name="name"]')
            .find('input')
            .clear()
            .type('TestName')

        cy.get('button').contains('Save').click()
        cy.wait(300)
        cy.get('.ivu-notice-notice').contains('Success')
        cy.wait(1000)

        cy.get('.u-list--parental-filter__item').contains('TestName').last().click()
        cy.wait(500)

        if (user) cy.get('.btn').contains('Delete user').click()
        else cy.get('.btn').contains('Delete group').click()
        cy.wait(500)
        cy.get('.modal__window')
        cy.get('.modal__content').contains('Are you sure to delete?')
        cy.get('.modal__footer').find('button').contains('Cancel')
        cy.get('.modal__footer').find('button').contains('Delete').click()
        cy.get('.ivu-notice-notice').contains('Success')
        cy.wait(500)
    })
}
