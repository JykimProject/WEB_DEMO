/* eslint-disable no-unused-vars */

export function administrationPageTest () {

	//test page loading
	it('loads administration page', () => {
		cy.visit('administration')
		cy.wait(500)
		cy.get('.page__title').contains('administration')
		
		cy.get('fieldset').eq(0).within($fieldset => {
			cy.get('legend').contains('administration password')
			cy.get('.field[name="oldPassword"]').get('input[type="password"]')
		})

		cy.get('fieldset').eq(1).within($fieldset => {
			cy.get('legend').contains('change administration password')
			cy.get('.field[name="newPassword"]').get('input[type="password"]')
		})


		cy.get('fieldset').eq(2).within($fieldset => {
			cy.get('legend').contains('language')
			//there is not input[type="text"]
			cy.get('.field[name="language"]').get('input')
		})


		cy.get('fieldset').eq(3).within($fieldset => {
			cy.get('legend').contains('timezone')
			cy.get('.field[name="timezone"]').get('input[type="text"]')
		})

		cy.get('button').contains('Cancel')
		cy.get('button').contains('Save')
	})
	//test password change
	it('supports password change', () => {
		cy.get('.field[name="oldPassword"]').within($field => {
			cy.get('input[type="password"]').type(Cypress.env('DEFAULT_PASSWORD'))
		})

		cy.get('.field[name="newPassword"]').within($field => {
			cy.get('input[type="password"]').type('a12345new54321pass')
		})

		cy.get('button').contains('Save').click()

		cy.reload()

		//change back (checking if it really was changed, too)
		cy.get('.field[name="oldPassword"]').within($field => {
			cy.get('input[type="password"]').type('a12345new54321pass')
		})

		cy.get('.field[name="newPassword"]').within($field => {
			cy.get('input[type="password"]').type(Cypress.env('DEFAULT_PASSWORD'))
		})

		cy.get('button').contains('Save').click()

		cy.reload()
	});

	//test language change
	it('supports language change to Croatian', () => {
		cy.get('.field[name="language"]').within($field => {
			cy.get('.c-select').click()
			cy.get('.ivu-select-item').contains('Hrvatski').click()
		})

		cy.get('button[type="submit"]').click()

		cy.get('.fieldset__legend').contains('jezik')

		cy.reload()
	});

	it('supports language change to Spanish', () => {
		cy.get('.field[name="language"]').within($field => {
			cy.get('.c-select').click()
			cy.get('.ivu-select-item').contains('Español').click()
		})

		cy.get('button[type="submit"]').click()

		cy.get('.fieldset__legend').contains('idioma')

		cy.reload()
	});

	it('supports language change to Italian', () => {
		cy.get('.field[name="language"]').within($field => {
			cy.get('.c-select').click()
			cy.get('.ivu-select-item').contains('Italiano').click()
		})

		cy.get('button[type="submit"]').click()

		cy.get('.fieldset__legend').contains('lingua')

		cy.reload()
	});

	it('supports language change to German', () => {
		cy.get('.field[name="language"]').within($field => {
			cy.get('.c-select').click()
			cy.get('.ivu-select-item').contains('Deutsch').click()
		})

		cy.get('button[type="submit"]').click()

		cy.get('.fieldset__legend').contains('Sprache')

		cy.reload()
	});

	it('supports language change to Portugese', () => {
		cy.get('.field[name="language"]').within($field => {
			cy.get('.c-select').click()
			cy.get('.ivu-select-item').contains('Português').click()
		})

		cy.get('button[type="submit"]').click()

		cy.get('.fieldset__legend').contains('idioma')

		cy.reload()
	});

	it('supports language change to English', () => {
		cy.get('.field[name="language"]').within($field => {
			cy.get('.c-select').click()
			cy.get('.ivu-select-item').contains('English').click()
		})

		cy.get('button[type="submit"]').click()

		cy.get('.fieldset__legend').contains('language')

		cy.reload()
	});


	//test timezone change
	it('supports timezone change', () => {

		let items = {};

		cy.get('.field[name="timezone"]').within($field => {
			cy.get('.c-select').click()
	
			let i = 0;
			cy.get('.ivu-select-item').eq(0).then(($item) => {
				items[0] = $item
				$item.click()
			})
			
		}).then(() => {
	
			var timezone = items[0].text()
	
			cy.get('button[type="submit"]').click()
	
			cy.get('.field[name="timezone"]').contains(timezone)
	
				
		})
	
		cy.get('.field[name="timezone"]').within($field => {
			cy.get('.c-select').click()
		
			cy.get('.ivu-select-item').contains('UTC').then(($item) => {
				$item.click()
			})
			
		}).then(() => cy.get('button[type="submit"]').click())
	
		

	});
}
