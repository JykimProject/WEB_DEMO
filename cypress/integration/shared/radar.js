export function radarTest () {
	describe('languages', () => {
		it('language list', () => {
			cy.visit('/')
			cy.wait(500)
				
			//check every language
			cy.get('.subnav__lang').click()
			cy.get('.subnav__tooltip__link')
				.contains('Deutsch').click()
			cy.get('.subnav__logout')
				.contains('Abmelden')

			cy.get('.subnav__lang').click()
			cy.get('.subnav__tooltip__link')
				.contains('Italiano').click()
			cy.get('.subnav__logout')
				.contains('Esci')

			cy.get('.subnav__lang').click()
			cy.get('.subnav__tooltip__link')
				.contains('Español').click()
			cy.get('.subnav__logout')
				.contains('Cerrar sesión')

			cy.get('.subnav__lang').click()
			cy.get('.subnav__tooltip__link')
				.contains('Português').click()
			cy.get('.subnav__logout')
				.contains('Sair')

			cy.get('.subnav__lang').click()
			cy.get('.subnav__tooltip__link')
				.contains('Hrvatski').click()
			cy.get('.subnav__logout')
				.contains('Odjava')

			cy.get('.subnav__lang').click()
			cy.get('.subnav__tooltip__link')
				.contains('English').click()
			cy.get('.subnav__logout')
				.contains('Log out')
		})
	})

	describe('notifications', () => {
		it('notificationList', () => {
			cy.wait(500)
			cy.get('.subnav__notifications').click()
			cy.get('.subnav__tooltip__content').should('be.visible')
			//TODO: implement here detailed test for notifications
		})
	})

	// loads dashboard
	describe('advanced', () => {
		it('go to dashboard', () => {
			cy.wait(500)
			cy.get('.radar__advanced').click()
			cy.get('.page__title').contains('activity')
			cy.get('.header__logo').click()
		})
	})

	describe('radar stats', () => {
			it('time period tabs', () => {
				cy.wait(500)
				cy.get('.stats__list__link').contains('Total')
				cy.get('.stats__list__link').contains('Month')
				cy.get('.stats__list__link').contains('Week')
				cy.get('.stats__list__link').contains('Day')
			})

			it('virus download', () => {
				cy.visit('http://malwaretest.foi.hr/')
				cy.wait(500)
				// TODO: finish implementation downloading virus
				//cy.get('td > a').contains('HTTP').click()
			})
			it('threats prevented', () => {
				cy.visit('/')
				cy.wait(500)
				cy.get('.stats__label').contains('threats prevented').click()
				cy.get('.modal__title').contains('security log')
				cy.get('.modal__close').click()
			})
			it('files validated', () => {
				cy.visit('/')
				cy.wait(500)
				cy.get('.stats__label').contains('files validated')
				// TODO: implement test for files validation here by opening http website
			})
		})
	describe('radar circle', () => {
		it('expand', () => {
			cy.get('.circle__inner').click()
			cy.get('a[title="Connected devices"]')
				.should('be.visible')
			cy.get('a[title="Sentinel Internet Security"]')
				.should('be.visible')
			cy.get('a[title="Digital Parenting"]')
				.should('be.visible')
		})
	})
}
	