export function digitalParentingFiltersTest () {
    let color
    let copy
    let count
    let newLast
    let category
    //custom values are hardcoded in test
    it('Open page', () => {
        cy.visit('parental-control/filter')
        cy.wait(500)

        cy.url().should('include', '/parental-control/filter')
        cy.get('.page__title').contains('parental control filters').find('img')
    })

    it('Page elements', () => {
        cy.get('button').contains('add filter')
        cy.get('.page').contains('custom filters')
        cy.wait(1000)
        cy.checkIfEleExists('#zeroDigitalParentingFilters')
            .then(value => {
                if (value === true) {
                    cy.get('#zeroDigitalParentingFilters').then(($zeroDigitalParentingFilters) => {
                        expect($zeroDigitalParentingFilters.find('[alt="Category"]')).to.be.visible
                        expect($zeroDigitalParentingFilters).to.contain("You don't have any custom filters")
                        expect($zeroDigitalParentingFilters).to.contain('Use button on top to create a new one')
                    })
                }
                else {
                    cy.get('.u-list--parental-group__item')
                    cy.wait(500)
                    cy.get('.u-list--parental-group__item').each(($el, index) => {
                        if ($el.find('.u-list--parental-group__label').text().trim().split("\n")[0] == 'TestNameEdit') {
                            cy.wrap($el.find('button')).click()
                            cy.wait(500)
                            cy.get('.modal__window')
                            cy.get('.modal__title').contains('warning')
                            cy.get('.modal__content').contains('Are you sure?')
                            cy.get('.modal__footer').find('button').contains('Delete').click()
                            cy.get('.ivu-notice-notice').contains('Success')
                            cy.wait(500)
                        }
                    })
                    cy.get('.u-list--parental-group__item').each(($el, index) => {
                        if ($el.find('.u-list--parental-group__label').text().trim().split("\n")[0] == 'TestName') {
                            cy.wrap($el.find('button')).click()
                            cy.wait(500)
                            cy.get('.modal__window')
                            cy.get('.modal__title').contains('warning')
                            cy.get('.modal__content').contains('Are you sure?')
                            cy.get('.modal__footer').find('button').contains('Delete').click()
                            cy.get('.ivu-notice-notice').contains('Success')
                            cy.wait(500)
                        }
                    })
                }
            })
    })

    it('Create new filter', () => {
        cy.get('button').contains('add filter').click()
        cy.wait(500)
        cy.get('.modal__title').contains('add new parental control filter')
        cy.get('.modal__close')
        cy.get('button').contains('Cancel')
        cy.get('button').contains('Save')

        cy.get('.field__lbl').contains('Filter name')
        cy.get('.field__lbl').contains('Filter description')
        cy.get('.field__lbl').contains('Filter color')
        cy.get('.field__lbl').contains('Copy categories from existing filter')

        cy.get('[name="filter-name"]')
            .find('input')
            .clear()
            .type('TestName')

        cy.get('[name="filter-description"]')
            .find('textarea')
            .clear()
            .type('This is text example for filter description.')

        cy.get('.u-list--parental-group__color-picker').find('.parental__color').click()
        cy.wait(500)
        cy.get('.u-list--parental-group__color-picker').find('.vanilla-color-picker').should('be.visible')
        cy.get('.vanilla-color-picker-single-color').first().click()
        cy.wait(500)
        cy.get('.u-list--parental-group__color-picker').find('.parental__color').invoke('attr', 'style').then($color => {
            color = ($color.split(" ")[1] + " " + $color.split(" ")[2] + " " +  $color.split(" ")[3]).split(";")[0]
        })

        cy.get('[name="copy"]').find('.c-select').click()
        cy.wait(500)
        cy.get('[name="copy"]').find('.ivu-select-item').contains('Do not copy').click()


        cy.get('button').contains('Save').click()
        cy.get('.ivu-notice-notice').contains('Success')
    })

    it('Check new filter', () => {
        //new filter is always at the end
        cy.wait(1500)
        cy.get('#customDigitalParentingFilters').invoke('show').then($newItem => {
            expect($newItem.find('.parental__color').last()).to.have.css('background', color + ' none repeat scroll 0% 0% / auto padding-box border-box') // for some reason it only works like this
            expect($newItem.find('button').last().text()).to.contain('delete filter')
            expect($newItem.find('.u-list--parental-group__label').last().text().trim()).to.contain('TestName')
            expect($newItem.find('.u-list--parental-group__label').last().find('span').text().trim()).to.contain('(0 categories)')
            expect($newItem.find('.tooltip--simple').last().text().trim()).to.be.eq('This is text example for filter description.')
        })
        cy.get('#customDigitalParentingFilters').find('.u-list--parental-group__item').last().click()
        cy.wait(500)
        cy.get('.split-action__label').then($newItem => {
            expect($newItem.find('.parental__color').last()).to.have.css('background', color + ' none repeat scroll 0% 0% / auto padding-box border-box') // for some reason it only works like this
            expect($newItem.find('.page__title').text()).to.contain('TestName')
            expect($newItem.find('.page__title').find('span').text().trim()).to.contain('(0)')
            expect($newItem.find('.icon-pencil')).to.be.visible
            expect($newItem.find('.page__title').find('span').text()).to.contain('This is text example for filter description.')
        })

        cy.get('[alt="Category"]').should('be.visible')
        cy.get('.page').contains("You don't have any active categories in this filter")
        cy.get('.page').contains('Use button on top to add a new one')
    })

    it('Edit new filter', () => {
        cy.get('button').contains('add category').click()
        cy.wait(500)

        cy.get('.modal__title').contains('add category to TestName filter')
        cy.get('.modal__close')
        cy.get('.modal__content').contains('custom categories')
        cy.get('.modal__content').contains('default categories')
        cy.get('.u-list--parental-filter__label').first().then($category => {
            category = $category.text().trim().split('\n')[0]
        })
        cy.get('.u-list--parental-filter__label').first().click()
        cy.wait(500)

        cy.get('button').contains('Back').click()
        cy.wait(500)

        cy.get('button').contains('back')
        cy.get('.split-action__label').click()
        cy.wait(500)
        cy.get('.modal__title').contains('edit filter')
        cy.get('.modal__close')
        cy.get('button').contains('Cancel')
        cy.get('button').contains('Save')

        cy.get('[name="filter-name"]')
            .find('input')
            .clear()
            .type('TestNameEdit')

        cy.get('[name="filter-description"]')
            .find('textarea')
            .clear()
            .type('This is text example for filter description edit.')

        cy.get('.u-list--parental-group__color-picker').find('.parental__color').click()
        cy.wait(500)
        cy.get('.u-list--parental-group__color-picker').find('.vanilla-color-picker').should('be.visible')
        cy.get('.vanilla-color-picker-single-color').eq(1).click()
        cy.wait(500)
        cy.get('.u-list--parental-group__color-picker').find('.parental__color').invoke('attr', 'style').then($color => {
            color = ($color.split(" ")[1] + " " + $color.split(" ")[2] + " " +  $color.split(" ")[3]).split(";")[0]
        })

        cy.get('button').contains('Save').click()
        cy.get('.ivu-notice-notice').contains('Success')

        cy.get('button').contains('back').click()
    })

    it('Check edited custom filter', () => {
        cy.wait(500)
        cy.get('#customDigitalParentingFilters').invoke('show').then($newItem => {
            expect($newItem.find('.parental__color').last()).to.have.css('background', color + ' none repeat scroll 0% 0% / auto padding-box border-box') // for some reason it only works like this
            expect($newItem.find('button').last().text()).to.contain('delete filter')
            expect($newItem.find('.u-list--parental-group__label').last().text().trim()).to.contain('TestNameEdit')
            expect($newItem.find('.u-list--parental-group__label').last().find('span').text().trim()).to.contain('(1 category)')
            expect($newItem.find('.tooltip--simple').last().text().trim()).to.be.eq('This is text example for filter description edit.')
        })

        cy.get('#customDigitalParentingFilters').find('.u-list--parental-group__item').last().click()
        cy.wait(500)
        cy.get('.split-action__label').then($newItem => {
            expect($newItem.find('.parental__color').last()).to.have.css('background', color + ' none repeat scroll 0% 0% / auto padding-box border-box') // for some reason it only works like this
            expect($newItem.find('.page__title').text()).to.contain('TestNameEdit')
            expect($newItem.find('.page__title').find('span').text().trim()).to.contain('(1)')
            expect($newItem.find('.icon-pencil')).to.be.visible
            expect($newItem.find('.page__title').find('span').text()).to.contain('This is text example for filter description edit.')
        })
        cy.get('.u-list--parental-filter__item').then($category => {
            expect($category.find('.u-list--parental-filter__label').text()).to.contain(category.toString())
            expect($category.find('button').last().text()).to.contain('remove from filter')
        })
        cy.get('.u-list--parental-filter__item').find('button').click()
        cy.get('.ivu-notice-notice').contains('Success')
        cy.wait(500)
        cy.get('[alt="Category"]').should('be.visible')
        cy.get('.page').contains("You don't have any active categories in this filter")
        cy.get('.page').contains('Use button on top to add a new one')

        cy.get('button').contains('back').click()
    })

    it('Form validators test', () => {
        cy.wait(500)
        cy.get('button').contains('add filter').click()
        cy.wait(500)

        cy.get('button').contains('Save').click()
        cy.wait(500)

        cy.get('[name="filter-name"]').find('.field__infotext--warning').contains('Field is required')

        cy.get('[name="filter-name"]')
            .find('input')
            .clear()
            .type('TestNameEdit')
        
        cy.get('button').contains('Save').click()

        cy.wait(500)
        cy.get('.modal__window')
        cy.get('.modal__title').contains('warning')
        cy.get('.modal__content').contains('Filter with same name already exists')
        cy.get('.modal__footer').find('button').contains('Close').click()
        cy.wait(500)

        cy.get('button').contains('Cancel').click()
        cy.wait(500)

        cy.get('#customDigitalParentingFilters').find('.u-list--parental-group__item').last().click()
        cy.wait(500)
        cy.get('.split-action__label').click()
        cy.wait(1500)

        cy.get('[name="filter-name"]')
            .find('input')
            .clear()

        cy.get('button').contains('Save').click()
        cy.wait(500)
        cy.get('[name="filter-name"]').find('.field__infotext--warning').contains('Field is required')
        cy.get('.modal__close').click()
        cy.wait(500)

        cy.get('button').contains('back').click()
    })

    it('Check custom filters count', () => {
        cy.get('#customDigitalParentingFilters')
            .find('.u-list--parental-group__item')
            .then(listing => {
                count = Cypress.$(listing).length
            })
    })

    it('Check new custom filter', () => {
        if (count > 1) {
            cy.get('.u-list--parental-group__item').eq(count -2).find('.u-list--parental-group__label').then($newLast => newLast = $newLast.text().trim())
        }
    })

    it('Delete custom filter', () => {
        cy.wait(500)
        cy.get('#customDigitalParentingFilters').find('.u-list--parental-group__label').last().contains('TestNameEdit') 
        cy.get('#customDigitalParentingFilters').find('button').last().click()
        cy.wait(500)
        cy.get('.modal__window')
        cy.get('.modal__title').contains('warning')
        cy.get('.modal__content').contains('Are you sure?')
        cy.get('.modal__footer').find('button').contains('Cancel')
        cy.get('.modal__footer').find('button').contains('Delete').click()
        cy.get('.ivu-notice-notice').contains('Success')
        cy.wait(500)
        if (count == 1) {
            cy.get('#zeroDigitalParentingFilters').then(($zeroDigitalParentingFilters) => {
                expect($zeroDigitalParentingFilters.find('[alt="Category"]')).to.be.visible
                expect($zeroDigitalParentingFilters).to.contain("You don't have any custom filters")
                expect($zeroDigitalParentingFilters).to.contain('Use button on top to create a new one')
            })
        }
        else {
            expect(count).to.be.greaterThan(1)
            cy.get('#customDigitalParentingFilters').then($newItem => {
                expect($newItem.find('.u-list--parental-group__label').last().text().trim()).to.contain(newLast.toString().split("\n")[0])
            })
        }

    })
}
