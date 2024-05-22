/* eslint-disable no-undef */
export function internetSecurityTest() {
	it('loads internet security page', () => {
		cy.visit('security')
		cy.wait(500)

		//test header:
		cy.get('.security__header').find('.security__title').contains('security overview')
		cy.get('.security__header').find('img').should('have.attr', 'src', '/img/sentinel-sign.2fc0d071.svg')

		//test div:
		//test security list
		cy
			.get('.security__list__item')
			.eq(0)
			.within(() =>
				cy.get('a')
					.should('contain.text', 'total'))

		cy
			.get('.security__list__item')
			.eq(1)
			.within(() =>
				cy.get('a')
					.should('contain.text', 'month'))

		cy
			.get('.security__list__item')
			.eq(2)
			.within(() =>
				cy.get('a')
					.should('contain.text', 'week'))

		cy
			.get('.security__list__item')
			.eq(3)
			.within(() =>
				cy.get('a')
					.should('contain.text', 'day'))

		//test security summary
		cy
			.get('.security__summary__item')
			.eq(0)
			.within(() => {
				cy.get('strong')
				cy.get('button')
					.should('contain.text', 'security')
			})


		cy
			.get('.security__summary__item')
			.eq(1)
			.within(() =>
				cy.get('strong'))


		cy
			.get('.security__summary__item')
			.eq(2).within(() => {
				cy.get('.activity__summary__title')
					.get('.activity__summary__text')
			})

		//test activity chart:
		cy
			.get('.activity__chart__item')
			.eq(0)
			.should('contain.text', 'scanned files')

		cy
			.get('.activity__chart__item')
			.eq(0)
			.get('.chartjs')

		cy
			.get('.activity__chart__item')
			.eq(1)
			.should('contain.text', 'blocked malware')

		cy
			.get('.activity__chart__item')
			.eq(1).within(() =>
				cy.get('.chartjs'))


		//test page div:
		cy.get('.page__header').find('.page__title').contains('Internet security')

		cy
			.get('.page').find('fieldset').find('.field')
			.eq(0)
			.should('contain.text', 'HTTP Validation')

		cy
			.get('.page').find('fieldset').find('.field')
			.eq(0).within(() => {
				cy.get('.ivu-icon')
				cy.get('.ivu-switch')
			})

		cy
			.get('.page').find('fieldset').find('.field')
			.eq(1)
			.should('contain.text', 'Disable ping on WAN')

		cy
			.get('.page').find('fieldset').find('.field')
			.eq(1).within(() => {
				cy.get('.ivu-icon')
				cy.get('.ivu-switch')
			})

		//no testing tooltips because they are DOM elements even without being shown, so one cannot know for sure if they are shown (if I'm not wrong)


		//test buttons
		cy
			.get('.page').find('button')
			.eq(0)
			.should('contain.text', 'Cancel')

		cy
			.get('.page').find('button')
			.eq(1)
			.should('contain.text', 'Save')
	})
	describe('switches', () => {
		it('has working HTTP validation switch', () => {
			cy
				.get('.page').find('fieldset').find('.field').find('.ivu-switch').eq(0).then(($switch) => {
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
								cy.get('.activity__summary__title').contains('Disabled')
								//click
								cy.get($switch)							
									.click()
								//expect to change to true
								cy.get($switch).within(() =>
									cy.get('input[value="true"]')
								)
								cy.get('.activity__summary__title').contains('Enabled')

                            
							} else {
							//click
								cy.get($switch)							
									.click()
								cy.wait(500)
								//expect to change to true
								cy.get($switch).within(() =>
									cy.get('input[value="true"]')
								)
								cy.get('.activity__summary__title').contains('Enabled')
								//click
								cy.get($switch)							
									.click()
								//expect to change to false
								cy.get($switch).within(() =>
									cy.get('input[value="false"]')
								)
								cy.get('.activity__summary__title').contains('Disabled')
                                
							}
						})
				})
		})

		it('has working disable ping on WAN switch', () => {
			cy
				.get('.page').find('fieldset').find('.field').find('.ivu-switch').eq(0).then(($switch) => {
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
		
	}) 
	describe('total', () => {
		it('loads total', () => {

			//select total
			cy
				.get('.security__list__item')
				.eq(0)
				.click()

			//test if total is selected
			cy
				.get('.security__list__item')
				.eq(0).within(() =>
					cy.get('a')
						.should('contain.text', 'total')
						.should('have.class', 'active'))


			//check text and button
			cy
				.get('.security__summary__item')
				.eq(0).within(() => {
					cy.get('strong')
					cy.get('button')
						.should('contain.text', 'security log')
				})

			cy
				.get('.security__summary__item')
				.eq(0)
				.should('contain.text', 'total threats prevented')

			cy
				.get('.security__summary__item')
				.eq(1).within(() =>
					cy.get('strong'))

			cy
				.get('.security__summary__item')
				.eq(1)
				.should('contain.text', 'total files validated')

			cy
				.get('.security__summary__item')
				.eq(2).within(() => {
					cy.get('.activity__summary__title')
					cy.get('.activity__summary__text')
				})


		})
	})
	describe('month', () => {

		it('loads month', () => {

			//select month
			cy
				.get('.security__list__item')
				.eq(1)
				.click()

			//test if month is selected
			cy
				.get('.security__list__item')
				.eq(1).within(() =>
					cy.get('a')
						.should('contain.text', 'month')
						.should('have.class', 'active'))


			//check text and button
			cy
				.get('.security__summary__item')
				.eq(0).within(() => {
					cy.get('strong')
					cy.get('button')
						.should('contain.text', 'security log')
				})

			cy
				.get('.security__summary__item')
				.eq(0)
				.should('contain.text', 'Blocked malware this month')

			cy
				.get('.security__summary__item')
				.eq(1).within(() =>
					cy.get('strong'))

			cy
				.get('.security__summary__item')
				.eq(1)
				.should('contain.text', 'Files scanned this month')

			cy
				.get('.security__summary__item')
				.eq(2).within(() => {
					cy.get('.activity__summary__title')
					cy.get('.activity__summary__text')
				})

		})
	})

	describe('week', () => {
		it('loads week', () => {

			//select week
			cy
				.get('.security__list__item')
				.eq(2)
				.click()

			//test if week is selected
			cy
				.get('.security__list__item')
				.eq(2).within(() =>
					cy.get('a')
						.should('contain.text', 'week')
						.should('have.class', 'active'))


			//check text and button
			cy
				.get('.security__summary__item')
				.eq(0).within(() => {
					cy.get('strong')
					cy.get('button')
						.should('contain.text', 'security log')
				})

			cy
				.get('.security__summary__item')
				.eq(0)
				.should('contain.text', 'Blocked malware this week')


			cy
				.get('.security__summary__item')
				.eq(1).within(() =>
					cy.get('strong'))

			cy
				.get('.security__summary__item')
				.eq(1)
				.should('contain.text', 'Files scanned this week')

			cy
				.get('.security__summary__item')
				.eq(2).within(() => {
					cy.get('.activity__summary__title')
					cy.get('.activity__summary__text')
				})

		})
	})

	describe('day', () => {
		it('loads day', () => {

			//select day
			cy
				.get('.security__list__item')
				.eq(3)
				.click()

			//test if day is selected
			cy
				.get('.security__list__item')
				.eq(3).within(() =>
					cy.get('a')
						.should('contain.text', 'day')
						.should('have.class', 'active'))


			//check text and button
			cy
				.get('.security__summary__item')
				.eq(0).within(() => {
					cy.get('strong')
					cy.get('button')
						.should('contain.text', 'security log')
				})
			cy
				.get('.security__summary__item')
				.eq(0)
				.should('contain.text', 'Blocked malware today')

			cy
				.get('.security__summary__item')
				.eq(1)
				.get('strong')

			cy
				.get('.security__summary__item')
				.eq(1)
				.should('contain.text', 'Files scanned today')


			cy
				.get('.security__summary__item')
				.eq(2).within(() => {
					cy.get('.activity__summary__title')
					cy.get('.activity__summary__text')
				})
		})
		it('has working cancel button', () => {
			cy.get('button[type="button"]').click()

			cy.wait(500)

			cy.get('.security__header').find('.security__title').contains('security overview')
		})
	})

	//test security log modal
	describe('security log modal', () => {
		it('loads security log modal and closes', () => {
			cy.visit('security')
			cy.wait(500)

			cy
				.get('.security__summary__item')
				.eq(0)
				.within(() => {
					cy.get('button').click()	
				})

			cy.get('.modal').within(() => {
				cy.get('.modal__title').contains('security log')
				cy.get('.modal__content')
				//not sure if the list loads even when there are no items	

				cy.get('.modal__close').click()
			})
		})
	})

	//test save and cancel
	describe('saving', () => {

		it('has working save button', () => {
			cy.visit('security')
			cy.wait(500)

			let oldValue

			//change one switch (let it be WAN)
			cy
				.get('.page').find('fieldset').find('.field').find('.ivu-switch').eq(0).then(($switch) => {
					cy.get($switch).find('input')
						.should('have.attr', 'value')
						.then(switchValue => {

							//remember the value
							oldValue = switchValue

							//click to change the switch value
							cy.get($switch)							
								.click()	

						})
				})

			//click the submit button
			cy.get('button[type="submit"]').click()

			//reload the page
			cy.reload()

			//check if the value is still changed after reload
			cy
				.get('.page').find('fieldset').find('.field').find('.ivu-switch').eq(0).then(($switch) => {
					cy.get($switch).find('input')
						.should('have.attr', 'value', (!oldValue).toString())
				})
		})

	})

	describe('cancelling saving', () => {

		it('has working cancel button', () => {
			cy.visit('security')
			cy.wait(500)

			let oldValue

			//change one switch (let it be WAN)
			cy
				.get('.page').find('fieldset').find('.field').find('.ivu-switch').eq(0).then(($switch) => {
					cy.get($switch).find('input')
						.should('have.attr', 'value')
						.then(switchValue => {

							//remember the value
							oldValue = switchValue

							//click to change the switch value
							cy.get($switch)							
								.click()	

						})
				})

			//click the submit button
			cy.get('button[type="button"]').click()

			//check if the value is still changed after reload
			cy
				.get('.page').find('fieldset').find('.field').find('.ivu-switch').eq(0).then(($switch) => {
					cy.get($switch).find('input')
						.should('have.attr', 'value', (oldValue).toString())
				})
		})

	})


}