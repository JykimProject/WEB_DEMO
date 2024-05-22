
function visit () {
	cy.visit('radar')

	cy.get('.circle__inner').click()
	cy.get('a[title="Connected devices"]').click({ force: true })

	cy.wait(1000)

	cy.get('.circle__inner').eq(1).click()

	cy.get('.tabs__link').contains('general').click()

}

const items = [
	//value is empty because it varies
	{
		label: 'device type',
		tooltip: 'Choose the type of your device.',
		value: '',
		editable: true
	},    {
		label: 'user hostname',
		tooltip: 'Define a custom alias for you device. If left blank, the device hostname will be used.',
		value: '',
		editable: true
	},
	{
		label: 'device hostname',
		tooltip: 'Unique label identifying a hardware device.',
		value: '',
		editable: false
	},   
	{
		label: 'MAC address',
		tooltip: 'Hardware identification number used to uniquely identify computer network adapters. Usually found on the device label or product box.',
		value: '',
		editable: false
	},   
	{
		label: 'IP Address',
		tooltip: 'A unique address that identifies a device on the Internet or a local network.',
		value: '',
		editable: false
	},   
]

export function generalTest () {
	describe('page', () => {
		it('loads page elements', () => {
			var i = 0
			visit()
            
			cy.get('span').contains('data usage')

			cy.get('.u-list--primary').children().each($li => {
				cy.get($li).within($li => {
					cy.get('.tooltip--simple__wrapper').contains(items[i].label)
					cy.get('.tooltip--simple').should('have.text', items[i].tooltip)
					cy.get('.u-list--primary__value')

					if (items[i++].editable) {
						cy.get('.u-list--primary__editable')
					}
				})
			})
			cy.get('.btn').contains('Delete')
		})
	})
    
	describe('actions', () => {
		it('edit', () => {
			var val1, val2, actual, val

			cy.get('.u-list--primary__editable').eq(0).then($editable => {

				cy.get($editable).eq(0).click().then(() => {
					//get value before changes
					cy.get($editable).find('span').eq(0).then($span => {
						val1 = $span.text().trim()
					}).then(() => {

						cy.get($editable).eq(0).click().then(() => {
							cy.get('.ivu-select-dropdown-list').find('.ivu-select-item').eq(0).then($item =>{
								val = $item.text()}).then(() => {
								cy.get('.ivu-select-dropdown-list').find('.ivu-select-item').eq(0).then($item => {
									cy.get($item).click().then(() => {
										cy.get('.ivu-notice').within(() => {
											cy.contains('Success')
											cy.get('.ivu-icon-ios-close').click()
										})
				
									}) 
								})
							})
						
							
						})
					}) 
				})

			})
			

			const input = 'test input'

			cy.get('.u-list--primary__editable').eq(1).then($editable => {

				cy.get($editable).eq(0).click().then(() => {
					//get value before changes
					cy.get($editable).find('span').eq(0).then($span => {
						val2 = $span.text().trim()

					})
				})
					
					.then(() => {

						cy.get($editable).find('.ivu-input').eq(0).clear()
					
						cy.get($editable).find('.ivu-input').eq(0).type(input)

					}).then(() => //click outside of editable
						cy.get('span').contains('data usage').click().then(() => 
							cy.get('.ivu-notice').within(() => {
								cy.contains('Success')
								cy.get('.ivu-icon-ios-close').click()
							})
						))
				
			}) 

			//return to as before
			cy.get('.u-list--primary__editable').eq(0).then($editable => {

				cy.get($editable).eq(0).click().then(() => {
					cy.get($editable).eq(0).click()

					cy.get('.ivu-select-dropdown-list').find('.ivu-select-item').contains(val1).then($item => {
						cy.get($item).click().then(() => {
							cy.wait(300)
							cy.get('.ivu-notice').each(() => {
								cy.get('.ivu-icon-ios-close').click()
							})
						})
					})
				})
			})


			cy.get('.u-list--primary__editable').eq(1).then($editable => {

				cy.get($editable).eq(0).click().then(() => {
					
					cy.get($editable).find('.ivu-input').eq(0).clear()
					
					cy.get($editable).find('.ivu-input').eq(0).type(val2)

				})
			})


			//click outside of editable
			cy.get('span').contains('data usage').click().then(() => 	
				cy.get('.ivu-notice').each(() => {
					cy.get('.ivu-icon-ios-close').click()
				}))



			//exit the modal
			cy.visit('/')
		})
	})

}