
function visit() {
	cy.visit('advanced/diagnostics')
	cy.wait(500)
}

function switchTrue() {
	cy.get('.field[name="enable"]').within(() => {
		cy.get('.field__lbl').contains('Remote log server')
		cy.get('.ivu-switch').within(($switch) => {
			cy.get('input').should('have.attr', 'value').then((value) => {

				if (value) {
					cy.get($switch).click()
					cy.wait(300)
				}
			})
		})
	})
}

function fillSystemLogForm(ip, port, protoNum) {
	//enter a valid IP address
	cy.get('.field[name="log_ip"]').within(() => {
		cy.get('.ivu-input').type(ip)
	})

	//enter a valid port
	cy.get('.field[name="log_port"]').within(() => {
		cy.get('.ivu-input').type(port)
	})

	//select a protocol
	cy.get('.field[name="log_proto"]').within(() => {
		cy.get('.ivu-select-arrow').eq(0).click()
			.then(() => {
				cy.get('.ivu-select-item').eq(protoNum).click()
			})

	})

}

export function diagnosticsTest () {
	describe('diagnostics page', () => {

		it('loads diagnostics page', () => {
			visit()
    

			//test title
			cy.get('.page__title').contains('diagnostics')

			//test tabs
			cy.get('.tabs'). within(() => {
				cy.get('.tabs__item').contains('System log')
				cy.get('.tabs__item').contains('connectivity')
			})
            

		})
        
		it('loads system log tab', () => {
			visit()


			cy.get('.tabs'). within(() => {
				//select the system log tab
				cy.get('.tabs__item').contains('System log').click()
			})
			//check enable
			cy.get('.field[name="enable"]').within(() => {
				cy.get('.field__lbl').contains('Remote log server')
				cy.get('.ivu-switch')
			})
			
			//check IP address
			cy.get('.field[name="log_ip"]').within(() => {
				cy.get('.field__lbl').contains('IP Address')
				cy.get('.ivu-input')
			})
			
			//check port
			cy.get('.field[name="log_port"]').within(() => {
				cy.get('.field__lbl').contains('Port')
				cy.get('.ivu-input')
			})

			//check proto
			cy.get('.field[name="log_proto"]').within(() => {
				cy.get('.field__lbl').contains('Proto')
				cy.get('.ivu-select')
			})

			//test buttons rendering
			cy.get('.btn[type="button"]')
			cy.get('.btn[type="submit"]')
			cy.get('.btn').contains('Show logs')
			cy.get('.btn').contains('clear')
			

		})
        
		it('loads connectivity', () => {
			visit()


			cy.get('.tabs'). within(() => {
				//select the system log tab
				cy.get('.tabs__item').contains('connectivity').click()
			})
			
			//wait for ping statistics to render
			cy.wait(1000)
			//check table
			cy.get('.ctable').within(() => {

				//check header
				cy.get('.ctable__cell--header').contains('name')
				cy.get('.ctable__cell--header').contains('IP')
				cy.get('.ctable__cell--header').contains('Ping Status')

				//check rows
				cy.get('.ctable__cell').contains('Primary DNS')
				cy.get('.ctable__cell').contains('Default Gateway')

			})


			//check input
			cy.get('.ivu-input')
			cy.get('.ivu-select')

			cy.get('.btn')


		})
	
	})

	describe('system log form', () => {

		it('has working save functionality', () => {
			visit()


			//ensure the 'system log' is the active tab
			cy.get('.tabs'). within(() => {
				//select the system log tab
				cy.get('.tabs__item').contains('System log').click()
			})

			//ensure remote log server switch is set to true
			switchTrue()

			fillSystemLogForm('127.0.0.1', '8000', 0)
			
			//save
			cy.get('.btn[type="submit"]').click().then(() => {
				cy.get('.ivu-notice').contains('Success')

			})
		})


		
		//check validation
		it('validates required fields', () => {
			visit()

			//ensure the 'system log' is the active tab
			cy.get('.tabs'). within(() => {
				//select the system log tab
				cy.get('.tabs__item').contains('System log').click()
				cy.wait(500)
			})

			//ensure remote log server switch is set to true
			switchTrue()

			//press save without entering data
			cy.get('.btn[type="submit"]').click()
			cy.wait(500)


			//check fields validation
			cy.get('.field[name="log_ip"]').within(() => {
				cy.contains('Field is required')

			})
			
			cy.get('.field[name="log_port"]').within(() => {
				cy.contains('Field is required')

			})
			
			cy.get('.field[name="log_proto"]').within(() => {
				cy.contains('Field is required')

			})
		})

		it('validates IP address input not a number', () => {
			visit()

			//ensure the 'system log' is the active tab
			cy.get('.tabs'). within(() => {
				//select the system log tab
				cy.get('.tabs__item').contains('System log').click()
			})

			//ensure remote log server switch is set to true
			switchTrue()

			//enter a non-digit
			cy.get('.field[name="log_ip"]').type('a')

			//press save without entering data
			cy.get('.btn[type="submit"]').click()


			cy.get('.field[name="log_ip"]').within(() => {
				cy.contains('Each number must be between 0-255')

			})
		})

		it('validates IP address wrong input', () => {
			visit()

			//ensure the 'system log' is the active tab
			cy.get('.tabs'). within(() => {
				//select the system log tab
				cy.get('.tabs__item').contains('System log').click()
			})

			//ensure remote log server switch is set to true
			switchTrue()

			//enter a non-digit
			cy.get('.field[name="log_ip"]').type('111')

			//press save without entering data
			cy.get('.btn[type="submit"]').click()


			cy.get('.field[name="log_ip"]').within(() => {
				cy.contains('IP addresses are four numbers separated by dots')
			})
		})

		it('validates port wrong input', () => {
			visit()

			//ensure the 'system log' is the active tab
			cy.get('.tabs'). within(() => {
				//select the system log tab
				cy.get('.tabs__item').contains('System log').click()
			})

			//ensure remote log server switch is set to true
			switchTrue()

			//enter a non-digit
			cy.get('.field[name="log_port"]').type('q')

			//press save without entering data
			cy.get('.btn[type="submit"]').click()


			cy.get('.field[name="log_port"]').within(() => {
				cy.contains('Port numbers range from 1 to 65535')
			})
		})

		it('shows logs', () => {
			//ensure there is a saved configuration
			visit()

			//ensure the 'system log' is the active tab
			cy.get('.tabs'). within(() => {
				//select the system log tab
				cy.get('.tabs__item').contains('System log').click()
			})

			switchTrue()

			fillSystemLogForm('111.111.111.111', '1', 0)

			//save data
			cy.get('.btn[type="submit"]').click()

			//click show logs button
			cy.get('.btn').contains('Show logs').click()

			cy.get('.logging').find('pre')
		})

	})

	it('clears logs', () => {
		//ensure there is a saved configuration
		visit()

		//ensure the 'system log' is the active tab
		cy.get('.tabs'). within(() => {
			//select the system log tab
			cy.get('.tabs__item').contains('System log').click()
		})

		//click show logs button
		cy.get('.btn').contains('clear').click()

		cy.contains('Showing only new messages')
	})


	describe('connectivity', () => {

		it('has working ping action', () => {
			visit()

			//ensure 'connectivity' is the active tab
			cy.get('.tabs'). within(() => {
				//select the system log tab
				cy.get('.tabs__item').contains('connectivity').click()
			})

			//enter a valid argument as IP address
			const ip = '127.0.0.1'
			cy.get('.ivu-input').type(ip)

			//select ping
			cy.get('.ivu-select-arrow').eq(0).click().then(() => {
				cy.get('.ivu-select-item').contains('ping').click()
			})

			cy.wait(1000)

			//go
			cy.get('.btn').click()
			cy.wait(500)

			//check data
			cy.get('.logging').within(($data) => {
				cy.get($data).contains('PING')

				cy.get($data).contains(ip)

				cy.get($data).contains('bytes')
				cy.get($data).contains('from')
				cy.get($data).contains('seq')
				cy.get($data).contains('ttl')
				cy.get($data).contains('time')

				cy.get($data).contains('ping statistics')
				cy.get($data).contains('packets transmitted')
				cy.get($data).contains('packets received')
				cy.get($data).contains('packet loss')
				cy.get($data).contains('round-trip min/avg/max')

			})
		})

		it('prints invalid ping argument', () => {
			visit()

			//ensure 'connectivity' is the active tab
			cy.get('.tabs'). within(() => {
				//select the system log tab
				cy.get('.tabs__item').contains('connectivity').click()
			})

			//enter a valid argument as IP address
			const ip = '1'
			cy.get('.ivu-input').type(ip)

			//select ping
			cy.get('.ivu-select-arrow').eq(0).click().then(() => {
				cy.get('.ivu-select-item').contains('ping').click()
			})

			//go
			cy.get('.btn').click()

			//check data
			cy.get('.logging').within(($data) => {
				cy.get($data).contains('PING')

				cy.get($data).contains(ip)

				cy.get($data).contains('Invalid argument')
				
			})
		})

		it('has working traceroute', () => {
			visit()

			//ensure 'connectivity' is the active tab
			cy.get('.tabs'). within(() => {
				//select the system log tab
				cy.get('.tabs__item').contains('connectivity').click()
			})

			//enter a valid argument as IP address
			const ip = '208.80.152.2'
			cy.get('.ivu-input').type(ip)

			//select ping
			cy.get('.ivu-select-arrow').eq(0).click().then(() => {
				cy.get('.ivu-select-item').contains('traceroute').click()
			})

			//go
			cy.get('.btn').click()

			//check data
			cy.get('.logging').within(($data) => {
				cy.get($data).contains('traceroute to')

				cy.get($data).contains(ip)

				cy.get($data).contains('hops max')
				cy.get($data).contains('byte packets')

			})
		})

		it('prints invalid traceroute argument', () => {
			visit()

			//ensure 'connectivity' is the active tab
			cy.get('.tabs'). within(() => {
				//select the system log tab
				cy.get('.tabs__item').contains('connectivity').click()
			})

			//enter a valid argument as IP address
			const ip = '1'
			cy.get('.ivu-input').type(ip)

			//select ping
			cy.get('.ivu-select-arrow').eq(0).click().then(() => {
				cy.get('.ivu-select-item').contains('traceroute').click()
			})

			//go
			cy.get('.btn').click()

			//check data
			cy.get('.logging').within(($data) => {
				cy.get($data).contains('traceroute to')

				cy.get($data).contains(ip)

				cy.get($data).contains('hops max')

				cy.get($data).contains('byte packets')

				cy.get($data).contains('Invalid argument')
				
			})
		})
	})
}