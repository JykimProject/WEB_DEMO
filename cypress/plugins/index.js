/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const fs = require('fs-extra')

// plugins file
module.exports = (on, config) => {
	// if no board specified, throws error by default
	const board = config.env.BOARD
	let rawdata = fs.readFileSync(`cypress/config/base.json`)
	
	let conf = JSON.parse(rawdata)
	
	conf.integrationFolder = `cypress/integration/${board}/`
	return conf
}