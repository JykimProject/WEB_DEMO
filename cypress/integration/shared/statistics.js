
export function statisticsTest () {
	describe('statistics', () => {
		it('loads statistics page', () => {
			cy.visit('advanced/statistics')
			cy.wait(500)
    
			//test title
			cy.get('.page__title').contains('statistics')
            
			//test refresh button
			cy.get('.btn[type="button"]').contains('refresh')
            
			//test receive table
			cy.get('.fieldset__legend').contains('receive')
			cy.get('.ctable').eq(0).within(() => {

				//test header
				cy.get('.ctable__cell--header').contains('interface')
				cy.get('.ctable__cell--header').contains('bytes')
				cy.get('.ctable__cell--header').contains('packets')
				cy.get('.ctable__cell--header').contains('errs')
				cy.get('.ctable__cell--header').contains('drop')
				cy.get('.ctable__cell--header').contains('fifo')
				cy.get('.ctable__cell--header').contains('frame')
				cy.get('.ctable__cell--header').contains('compress')

				//test row names
				cy.get('.ctable__cell').contains('LAN1')
				cy.get('.ctable__cell').contains('LAN2')
				cy.get('.ctable__cell').contains('LAN3')
				cy.get('.ctable__cell').contains('LAN4')
				cy.get('.ctable__cell').contains('WIFI-2.4G')
				cy.get('.ctable__cell').contains('WIFI-5G')
				cy.get('.ctable__cell').contains('eth4.0')
				cy.get('.ctable__cell').contains('eth4.1/wan6/wan')
			})

			//test transmit table
			cy.get('.fieldset__legend').contains('transmit')
			cy.get('.ctable').eq(1).within(() => {
	
				//test header
				cy.get('.ctable__cell--header').contains('interface')
				cy.get('.ctable__cell--header').contains('bytes')
				cy.get('.ctable__cell--header').contains('packets')
				cy.get('.ctable__cell--header').contains('errs')
				cy.get('.ctable__cell--header').contains('drop')
				cy.get('.ctable__cell--header').contains('fifo')
				cy.get('.ctable__cell--header').contains('colls')
				cy.get('.ctable__cell--header').contains('carrier')
				cy.get('.ctable__cell--header').contains('compressed')
	
	
				//test row names
				cy.get('.ctable__cell').contains('LAN1')
				cy.get('.ctable__cell').contains('LAN2')
				cy.get('.ctable__cell').contains('LAN3')
				cy.get('.ctable__cell').contains('LAN4')
				cy.get('.ctable__cell').contains('WIFI-2.4G')
				cy.get('.ctable__cell').contains('WIFI-5G')
				cy.get('.ctable__cell').contains('eth4.0')
				cy.get('.ctable__cell').contains('eth4.1/wan6/wan')
	
			})


		})

		it('has working refresh button', () => {
			cy.visit('radar')
			cy.wait(500)
			cy.visit('advanced/statistics')
			cy.wait(500)
	
			//click the refresh button
			cy.get('.btn[type="button"]').contains('refresh').click()

			//test if title is the same
			cy.get('.page__title').contains('statistics')
            

		})
	})
	describe('values in table', () => {
		it('has values in table', () => {
			cy.visit('advanced/statistics')
			cy.wait(500)
			cy.visit('advanced/statistics')
			cy.wait(500)

			//check values
			cy.get('.ctable__cell').each($cell => {
				cy.get($cell).its('length')    
					.should('be.gt', 0)

			})
		})
	})
}