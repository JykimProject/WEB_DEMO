export function loginTest () {
	describe('login', () => {
		beforeEach(() => {
			cy.visit('/')
		})
		it('validates', () => {
			cy.visit('/')
			cy.wait(500)
			cy.get('.btn').click()
			cy.get('.ivu-notice-desc')
				.contains('Invalid credentials')

			cy.get('[name="username"]')
				.find('input')
				.clear()
				.type('non@existing')
			cy.get('[name="password"]')
				.find('input')
				.clear()
				.type(Cypress.env('DEFAULT_PASSWORD'))
			cy.get('.btn').click()
			cy.get('.ivu-notice-desc')
				.contains('Invalid credentials')

			cy.get('[name="username"]')
				.find('input')
				.clear()
				.type(Cypress.env('DEFAULT_USERNAME'))
			cy.get('[name="password"]')
				.find('input')
				.clear()
				.type('wrongPassword')
			cy.get('.btn').click()
			cy.get('.ivu-notice-desc')
				.contains('Invalid credentials')
		})
	})
}
