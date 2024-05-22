export function portForwardingTest() {

	describe('port forwarding page', () => {
		it('loads port forwarding page', () => {
			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
			cy.wait(500)
			//test title
			cy.get('.page').contains('Port forwarding')

			//test add rule button
			cy.get('button').contains('Add new rule')

			//it does not always contain rule-items, so we'll skip testing that

		})
	})

	describe('rule form', () => {
		it('loads rule form', () => {
			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
            cy.wait(500)
			//open form
			cy.get('button').contains('Add new rule').click()

			//check page title
			cy.get('.page__title').contains('Add rule')

			//check enabled switch field
			cy.get('.field[name="enabled"]').within(() => {
				cy.get('.field__lbl').contains('Enabled')
				cy.get('.ivu-switch')
			})

			//check name input field
			cy.get('.field[name="name"]').within(() => {
				cy.get('.field__lbl').contains('Name')
				cy.get('.ivu-input')
			})

			//check source column
			cy.get('div').within(($div) => {
				//check title
				cy.get($div).contains('Source')

				//check network ifc select field
				cy.get('.field[name="src-network"]').within(() => {
					cy.get('.field__lbl').contains('Network interfaces')
					cy.get('.ivu-select')
				})

				//check external port select field
				cy.get('.field[name="external-port"]').within(() => {
					cy.get('.field__lbl').contains('External port')
					cy.get('.ivu-select')
				})

			})

			//check destination column
			cy.get('div').within(($div) => {
				//check title
				cy.get($div).contains('Destination')

				//check network ifc select field
				cy.get('.field[name="dest-network"]').within(() => {
					cy.get('.field__lbl').contains('Network interfaces')
					cy.get('.ivu-select')
				})

				//check ip address select field
				cy.get('.field[name="dest-ip"]').within(() => {
					cy.get('.field__lbl').contains('IP Address')
					cy.get('.ivu-select')
				})

				//check port select field
				cy.get('.field[name="dest-port"]').within(() => {
					cy.get('.field__lbl').contains('Port')
					cy.get('.ivu-select')
				})

			})

			//check protocol select field
			cy.get('.field[name="protocol"]').within(() => {
				cy.get('.field__lbl').contains('Protocol')
				cy.get('.ivu-select')
			})

			cy.get('.btn[type="button"]')
			cy.get('.btn[type="submit"]')
		})

		it ('has working switch', () => {
			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
            cy.wait(500)

			//open form
			cy.get('button').contains('Add new rule').click()

			//test switch
			cy.get('.field[name="enabled"]').find('.ivu-switch').each(($switch) => {
				cy.get($switch).find('input')
					.should('have.attr', 'value')
					.then(value => {
						if (value === 'true') {
							//click
							cy.get($switch)
								.click()

							//expect to change to false
							cy.get($switch).within(() =>
								cy.get('input[value="false"]')
							)
							//click
							cy.get($switch)
								.click()
							//expect to change to true
							cy.get($switch).within(() =>
								cy.get('input[value="true"]')
							)

						} else {
							//click
							cy.get($switch)
								.click()
							//expect to change to true
							cy.get($switch).within(() =>
								cy.get('input[value="true"]')
							)
							//click
							cy.get($switch)
								.click()
							//expect to change to false
							cy.get($switch).within(() =>
								cy.get('input[value="false"]')
							)

						}
					})
			})

		})

		//test cancel button
		it('has working cancel button', () => {
			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
            cy.wait(500)

			//open form
			cy.get('button').contains('Add new rule').click()

			cy.get('.btn[type="button"]').click()

			//test if back
			cy.get('.page').contains('Port forwarding')
		})

		//test submit button
		it('has working submit button', () => {
			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
            cy.wait(500)

			//open form
			cy.get('button').contains('Add new rule').click()

			cy.get('.btn[type="submit"]').click()

			//test if back
			cy.get('.page').contains('Port forwarding')
		})


		//test selects
		it('has working select inputs', () => {
			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
            cy.wait(500)

			//open form
			cy.get('button').contains('Add new rule').click()

			//test selects

			//check source column
			cy.get('div').within(($div) => {

				//check network ifc select field
				cy.get('.field[name="src-network"]').within(() => {
					cy.get('.ivu-select').within(($select) => {
						let item = ""
						cy.get($select).within(() => {

							//select an option
							cy.get('.ivu-select-arrow').eq(0).click()
							cy.get('.ivu-select-item').eq(0).then($item => item = $item.text())
							cy.get('.ivu-select-item').eq(0).click().then(() => {
								//test if it was selected
								cy.get($select).contains(item)
							})

						})
					})
				})

				//check external port select field
				cy.get('.field[name="external-port"]').within(() => {
					cy.get('.ivu-select').within(($select) => {
						let item = ""
						cy.get($select).within(() => {

							//select an option
							cy.get('.ivu-select-arrow').eq(0).click()
							cy.get('.ivu-select-item').eq(0).then($item => item = $item.text())
							cy.get('.ivu-select-item').eq(0).click().then(() => {
								//test if it was selected
								cy.get($select).contains(item)
							})

						})
					})
				})

			})

			//check destination column
			cy.get('div').within(($div) => {

				//check network ifc select field
				cy.get('.field[name="dest-network"]').within(() => {
					cy.get('.ivu-select').within(($select) => {
						let item = ""
						cy.get($select).within(() => {

							//select an option
							cy.get('.ivu-select-arrow').eq(0).click()
							cy.get('.ivu-select-item').eq(0).then($item => item = $item.text())
							cy.get('.ivu-select-item').eq(0).click().then(() => {
								//test if it was selected
								cy.get($select).contains(item)
							})

						})
					})
				})

				//check ip address select field
				cy.get('.field[name="dest-ip"]').within(() => {
					cy.get('.ivu-select').within(($select) => {
						let item = ""
						cy.get($select).within(() => {

							//select an option
							cy.get('.ivu-select-arrow').eq(0).click()
							cy.get('.ivu-select-item').eq(0).then($item => item = $item.text())
							cy.get('.ivu-select-item').eq(0).click().then(() => {
								//test if it was selected
								cy.get($select).contains(item)
							})

						})
					})
				})

				//check port select field
				cy.get('.field[name="dest-port"]').within(() => {
					cy.get('.ivu-select').within(($select) => {
						let item = ""
						cy.get($select).within(() => {

							//select an option
							cy.get('.ivu-select-arrow').eq(0).click()
							cy.get('.ivu-select-item').eq(0).then($item => item = $item.text())
							cy.get('.ivu-select-item').eq(0).click().then(() => {
								//test if it was selected
								cy.get($select).contains(item)
							})

						})
					})
				})

			})

			//check protocol select field
			cy.get('.field[name="protocol"]').within(() => {
				cy.get('.ivu-select').within(($select) => {
					let item = ""
					cy.get($select).within(() => {
						//select an option
						cy.get('.ivu-select-arrow').eq(0).click()
						cy.get('.ivu-select-item').eq(0).then($item => item = $item.text())
						cy.get('.ivu-select-item').eq(0).click().then(() => {
							//test if it was selected
							cy.get($select).contains(item)
						})

					})
				})
			})

		})


		it ('supports adding a new rule', () => {
			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
            cy.wait(500)

			//add a rule so it is easier to store rulesNo
			cy.get('button').contains('Add new rule').click()

			//type something
			cy.get('.field[name="name"]').within(() => {
				cy.get('.ivu-input').type('add before')
			})

			//submit
			cy.get('.btn[type="submit"]').click()

			//remember existing port forwarding rules' number
			let rulesNo
			cy.get('.u-list--parental-filter').children().then(children => rulesNo = children.length)
				.then(() => {
					//open form
					cy.get('button').contains('Add new rule').click()
            
					//type something
					cy.get('.field[name="name"]').within(() => {
						cy.get('.ivu-input').type('some port forwarding rule name')
					})

					//submit
					cy.get('.btn[type="submit"]').click()

					//compare new number of port forwarding rules: it should have one more
					cy.get('.u-list--parental-filter').children().should('have.length', rulesNo + 1)
                
				})

			//delete add rule
			cy.get('.u-list--parental-filter').contains('add before').trigger('mouseenter').then(() =>
				cy.get('.btn').contains('Delete rule').click()
					.then(() =>  cy.get('.modal').find('.btn').contains('Delete').click()))
		})

		it ('does not save empty form', () => {
			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
            cy.wait(500)
            
			//remember existing port forwarding rules' number
			let rulesNo
			cy.get('.u-list--parental-filter').children().then(children => rulesNo = children.length)
				.then(() => {
					//open form
					cy.get('button').contains('Add new rule').click()
            
					//submit form without typing
					cy.get('.btn[type="submit"]').click()

					//compare new number of port forwarding rules: it should not have had changed
					cy.get('.u-list--parental-filter').children().should('have.length', rulesNo)
				})
		})
        
		it ('cancels form', () => {
			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
            cy.wait(500)
			//remember existing port forwarding rules' number
			let rulesNo
			cy.get('.u-list--parental-filter').children().then(children => rulesNo = children.length)
				.then(() => {
					//open form
					cy.get('button').contains('Add new rule').click()
            
					//type something
					cy.get('.field[name="name"]').within(() => {
						cy.get('.ivu-input').type('some port forwarding rule name')
					})

					//cancel
					cy.get('.btn[type="button"]').click()

					//compare new number of port forwarding rules: it should have not had changed
					cy.get('.u-list--parental-filter').children().should('have.length', rulesNo)
				})
		})
       
        
		it ('supports canceling deleting a rule', () => {
			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
            cy.wait(500)
            
			//remember existing port forwarding rules' number
			let rulesNo
			cy.get('.u-list--parental-filter').children().then(children => rulesNo = children.length)
				.then(() => {
					cy.get('.u-list--parental-filter').contains('some port forwarding rule name').trigger('mouseenter').then(() =>
						cy.get('.btn').contains('Delete rule').click()
							.then(() =>  cy.get('.modal').find('.btn').contains('Cancel').click()))

					//compare new number of port forwarding rules: it should have not had changed
					cy.get('.u-list--parental-filter').children().should('have.length', rulesNo)
                
				})
		})
		it ('supports deleting a rule', () => {
			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
            cy.wait(500)
            
			//remember existing port forwarding rules' number
			let rulesNo
			cy.get('.u-list--parental-filter').children().then(children => rulesNo = children.length)
				.then(() => {
					cy.get('.u-list--parental-filter').contains('some port forwarding rule name').trigger('mouseenter').then(() =>
						cy.get('.btn').contains('Delete rule').click()
							.then(() =>  cy.get('.modal').find('.btn').contains('Delete').click()))

					//compare new number of port forwarding rules: it should have one less
					cy.get('.u-list--parental-filter').children().should('have.length', rulesNo - 1)
                
				})
		})

		it ('keeps same values on a created rule', () => {
			let port

			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
            cy.wait(500)
            
			//ensure there is a rule by adding one
			cy.get('button').contains('Add new rule').click()
            
			//add some data to test later
			cy.get('.field[name="name"]').within(() => {
				cy.get('.ivu-input').type('test rule')
			})
			cy.get('.field[name="dest-port"]').within(() => {
				cy.get('.ivu-select-arrow').eq(0).click()
				cy.get('.ivu-select-item').eq(0).then($port => port = $port.text())
				cy.get('.ivu-select-item').eq(0).click()
			})
            
			//submit
			cy.get('.btn[type="submit"]').click()
            
			//click on the added rule
			cy.get('.u-list--parental-filter').contains('test rule').click()
            
			//test added data
			/*
            I could not access typed text in input
            cy.get('.field[name="name"]').within(() => {
				cy.get('.ivu-input').contains('test rule shouldBeTheOnlyOneWithThisName')
			})*/
			cy.get('.field[name="dest-port"]').within(() => {
				cy.get('.ivu-select').contains(port)
			})

		})
		it ('supports updating a rule', () => {
			//visit port forwarding page
			cy.visit('advanced/firewall/port-forwarding')
            cy.wait(500)

			let port

			//click on the added rule
			cy.get('.u-list--parental-filter').contains('test rule').click()

			//update it
			cy.get('.field[name="dest-port"]').within(() => {
				cy.get('.ivu-select-arrow').eq(0).click()
				cy.get('.ivu-select-item').eq(1).then($port => port = $port.text())
				cy.get('.ivu-select-item').eq(1).click()
			})

			//submit
			cy.get('.btn[type="submit"]').click()

			//click on the updated rule
			cy.get('.u-list--parental-filter').contains('test rule').click()

			//check if it has updated value
			cy.get('.field[name="dest-port"]').within(() => {
				cy.get('.ivu-select').contains(port)
			})

			cy.get('.btn[type="button"]').click()

			//delete
			cy.get('.u-list--parental-filter').contains('test rule').trigger('mouseenter').then(() =>
				cy.get('.btn').contains('Delete rule').click()
					.then(() =>  cy.get('.modal').find('.btn').contains('Delete').click()))

		})

	})
}
