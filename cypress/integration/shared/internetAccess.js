const accessItems = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function internetAccessTest (deviceOrGroup, modal) {
	var exist = false
	var listingCount
	it('Open tab', () => {
        if (deviceOrGroup === 'device' && modal) {
            cy.visit('radar')
            cy.wait(500)
            cy.get('.circle__inner').click()
            cy.get('a[title="Connected devices"]').click({ force: true })
            cy.wait(2500)
            //search only for devices not users or groups; maybe fix this in other tests for device modals
            cy.checkIfEleExists('#deviceCircle')
                .then(value => {
                    if (value === true) {
                        cy.get('#deviceCircle').first().click()
                        cy.wait(500)
                        cy.get('.tabs__item').contains('Internet Access').click()
                        cy.wait(500)
                        exist = true
                    }
                })
        }
        else if (deviceOrGroup === 'group' && modal) {
            cy.visit('radar')
            cy.wait(500)
            cy.get('.circle__inner').click()
            cy.get('a[title="Connected devices"]').click({ force: true })
            cy.wait(2500)
            //search only for users or groups not devices; maybe fix this in other tests for device modals
            cy.checkIfEleExists('#groupCircle')
                .then(value => {
                    if (value === true) {
                        cy.get('#groupCircle').first().click()
                        cy.wait(500)
                        cy.get('.tabs__item').contains('Internet Access').click()
                        cy.wait(500)
                        exist = true
                    }
                })
        }

        else if (deviceOrGroup === 'group' && !modal) {
            cy.get('.tabs__link').contains('Internet Access').click()
            cy.wait(500)
            exist = true
        }
        
    })
	it('loads elements', () => {
		//limit internet access field
		if (exist) {
			cy.get('.field[name="intaccess-switch"]').contains('Limit internet access')
			cy.get('.ivu-switch')
	
			cy.get("[name = 'intaccess-switch']").find('input')
				.invoke('val')
				.then(value => {
					if (value === 'false') {
						cy.get("[name = 'intaccess-switch']").find('.ivu-switch').click()
						cy.wait(500)
					}
					else {
						expect(value).to.be.eq('true')
						cy.get("[name = 'intaccess-switch']").find('.ivu-switch').click()
	
						cy.get('.btn[type="submit"]').contains('Apply access settings')
						cy.wait(500)
					
						cy.get("[name = 'intaccess-switch']").find('.ivu-switch').click()
						cy.wait(500)
					}
				})
	
			cy.get('.intaccess').within($intaccess => {
				//current time zone note
				cy.get('.u-well--note').within(() => {
					cy.contains('Current time zone is')
					cy.contains('The time zone should match your local time zone - configure it on ')
					cy.get('a[href="#/administration"]').contains('administration page')
				})
					
				//list
				cy.contains('Allow internet access on:')
				cy.get('.u-list--primary').within(() => {
					var i = 0
					cy.get('.u-list--primary__item').each($item => {
						cy.get($item).contains(accessItems[i++])
						cy.get($item).find('.btn[type="button"]').contains('Add time')
					})
				})
			})
			//apply button
			cy.get('.btn[type="submit"]').contains('Apply access settings')
		}
	})

	it('has working add time and apply buttons', () => {
		if (exist) {
			cy.get('.u-list--primary').within(() => {
				cy.get('.u-list--primary__item').each($item => {
					var prevNumberOfItems
					//ensure there is a child so we can get children number
					cy.get($item).find('.btn[type="button"]').click()
					
					//get current number of items
					cy.get('.intaccess--periods').children().its('length').then(length => {
						prevNumberOfItems = length
					}).then(() => {
						//add an item
						cy.get($item).find('.btn[type="button"]').click()
						//the item number should have had increased by 1
						cy.get('.intaccess--periods').children().should('have.length', prevNumberOfItems+1)
					})
				
				})
			})
			//apply
			cy.get('.btn[type="submit"]').click()
		}
		
	})


	it('has working change time', () => {
		if (exist) {
			cy.get('.u-list--primary').within(() => {
				cy.get('.u-list--primary__item').each($item => {
					//get last (should be added in previous test) added time
					cy.get('.intaccess--periods').children().last().then($child => {

						var selected = []
							
						cy.get($child).within(() => {
							cy.get('.ivu-date-picker').click().then(() => {
								cy.get('.ivu-time-picker-cells-ul').each($list => {
									
									cy.get($list).should('not.have.css', 'display', `none`).within(() => cy.get('.ivu-time-picker-cells-cell').eq(2).within($cell => {

										cy.get($cell).click({force:true}).then(() => {
											selected.push($cell.text())
									
										})
									}))})
									.then(() => {
										
										const formatted = '02:02 - 02:02'
										//get input value
										cy.get($child).find('input').should('have.value', formatted)
									})
							})
						})		
					})	
				})
			})
		}	
	})

	it('has working delete time', () => {
		if (exist) {
			cy.get('.intaccess').within(() => {
				cy.get('.u-list--primary')
					.find('.ivu-icon-md-trash')
					.then(listing => {
						listingCount = Cypress.$(listing).length
					})
				cy.get('.intaccess--periods').each($item => {
					cy.wrap($item).find('.ivu-icon-md-trash').last().click()
					cy.wait(500)
				})				
				cy.get('.intaccess--periods').each($item => {
					cy.wrap($item).find('.ivu-icon-md-trash').last().click()
					cy.wait(500)
				})
			})
			//it doesn't delete time for monday for some reason without this
			cy.get('.intaccess--periods').first().find('.ivu-icon-md-trash').last().click()
			cy.wait(500)
			cy.get('.btn[type="submit"]').click()
		}	
	})

	it('has working delete time check count', () => {
		if (exist) {
			cy.log(listingCount)
			cy.get('.u-list--primary').find('.ivu-icon-md-trash').should('have.length', listingCount-14)
		}
		
	})

	it('has working link to administration page', () => {
		if (exist) {
			if (deviceOrGroup === 'group' && !modal) {
				cy.get('a[href="#/administration"]').contains('administration page').click()
				cy.wait(500)
				cy.url().should('include', '/administration')
				cy.go('back')
			}
			else {
				cy.get('a[href="#/administration"]').click()
				cy.wait(500)
				cy.url().should('include', '/administration')
			}
		}
		
	})
}