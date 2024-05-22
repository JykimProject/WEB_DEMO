// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, pass) => {
	if (typeof username === 'undefined') {
		username = Cypress.env('DEFAULT_USERNAME')
	}
	if (typeof pass === 'undefined') {
		pass = Cypress.env('DEFAULT_PASSWORD')
	}

	cy.clearCookie('nexus-wamp-cookie')
	cy.visit('/')
	cy.wait(500)
	cy.get('.field[name=username]').type(username)
	cy.get('.field[name=password]').type(pass)
	cy.get('.btn').click()
})

Cypress.Commands.add('logout', () => {
	cy.visit('/')
	cy.wait(500)
	cy.get('.subnav__logout').click()
	cy.get('.btn[name="submit"]')
	.should('be.visible')
})

Cypress.Commands.add('checkIfEleExists', (el) => {
	let found
	const nonExistent = Cypress.$(el)

	if (!nonExistent.length) {
		found = false
		cy.log('Element not found')
	} else {
		found = true
		cy.log('Element found')
	}
	return cy.wrap(found)
})
