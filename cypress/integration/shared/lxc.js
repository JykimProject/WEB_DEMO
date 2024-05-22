export function lxcTest () {
    let moreThenZeroLXC = false
    let button
    it('Open page', () => {
        cy.visit('advanced/lxc')
        cy.wait(500)
        cy.url().should('include', '/advanced/lxc')
        cy.get('.page__title').contains('LXC')
    })

    it('Page elements', () => {
        cy.checkIfEleExists('#zeroLXCContainers')
            .then(value => {
                if (value === true) {
                    cy.get('#zeroLXCContainers').then(($zeroLXCContainers) => {
                        expect($zeroLXCContainers).to.contain("You don't have any LXC containers")
                    })
                }
                else {
                    cy.get('#LXCContainers').then($LXCContainers => {
                        expect($LXCContainers.find('.u-list--parental-filter__item')).to.be.visible
                        moreThenZeroLXC = true
                    })
                }
            })
    })

    it('LXC container not expanded', () => {
        if (moreThenZeroLXC === true) {
            cy.get('#LXCContainers').find('.u-list--parental-filter__item').each(($el, index) => {
                expect($el.find('.u-list--parental-filter__label').text().trim().length).to.be.greaterThan(0)
                expect($el.find('.icon-dot')).to.be.visible
                expect($el.find('button')).to.be.visible
                if ($el.find('button').text().trim() === 'stop') {
                    expect($el.find('button')).to.have.css('color', 'rgb(14, 122, 230)')
                    expect($el.find('.icon-dot')).to.have.css('background-color', 'rgb(31, 187, 70)')
                }
                else {
                    expect($el.find('button').text().trim()).to.be.eq('start')
                    expect($el.find('button')).to.have.css('color', 'rgb(31, 187, 70)')
                    expect($el.find('.icon-dot')).to.have.css('background-color', 'rgb(187, 187, 187)')
                }
            })
        } 
    })

    it('Set state', () => {
        if (moreThenZeroLXC === true) {
            cy.get('#LXCContainers').find('.u-list--parental-filter__item').last().invoke('show').then($LXCContainers => {
                if ($LXCContainers.find('button').text().trim() === 'stop') {
                    button = 'stop'
                }
                else {
                    button = 'start'
                }
            })
        }
    })

    it('LXC container stop and start', () => {
        if (moreThenZeroLXC === true) {
            cy.get('#LXCContainers').find('.u-list--parental-filter__item').invoke('show').last().find('button').click()
            cy.wait(13000)
            if (button === 'start') {
                cy.get('#LXCContainers').find('.u-list--parental-filter__item').invoke('show').last().find('button').invoke('text').then((text) => {
                    expect(text.trim()).equal('stop')
                })
                cy.get('#LXCContainers').find('.u-list--parental-filter__item').invoke('show').last().find('.icon-dot').then($LXCContainers => {
                    expect($LXCContainers).to.have.css('background-color', 'rgb(31, 187, 70)')
                })
            }
            else {
                cy.get('#LXCContainers').find('.u-list--parental-filter__item').invoke('show').last().find('button').invoke('text').then((text) => {
                    expect(text.trim()).equal('start')
                })
                cy.get('#LXCContainers').find('.u-list--parental-filter__item').invoke('show').last().find('.icon-dot').then($LXCContainers => {
                    expect($LXCContainers).to.have.css('background-color', 'rgb(187, 187, 187)')
                })
            }
            cy.get('#LXCContainers').find('.u-list--parental-filter__item').invoke('show').last().find('button').click()
            cy.wait(13000)
        }
    })

    it('LXC container expanded', () => {
        if (moreThenZeroLXC === true) {
            if (button === 'start') {
                cy.get('#LXCContainers').find('.u-list--parental-filter__item').invoke('show').last().find('button').click()
                cy.wait(13000)
            }
            /*cy.visit('radar')
            cy.wait(500)
            cy.visit('advanced/lxc')
            cy.wait(500)*/
            cy.get('#LXCContainers').find('.u-list--parental-filter__label').last().click()
            cy.wait(500)
            cy.get('#detailsLXC').last().then($detailsLXC => {
                expect($detailsLXC.find('li').length).to.be.eq(5)
                expect($detailsLXC.find('li').eq(0)).to.contain('CPU:')
                expect($detailsLXC.find('li').eq(0).text().trim().split('Name:')[0].length).to.be.greaterThan(4)
                expect($detailsLXC.find('li').eq(0)).to.contain('Name:')
                expect($detailsLXC.find('li').eq(0).text().trim().split('Name:')[1].trim().length).to.be.greaterThan(0)

                expect($detailsLXC.find('li').eq(1)).to.contain('PID:')
                expect($detailsLXC.find('li').eq(1).text().trim().split('RX bytes:')[0].length).to.be.greaterThan(4)
                expect($detailsLXC.find('li').eq(1)).to.contain('RX bytes:')
                expect($detailsLXC.find('li').eq(1).text().trim().split('RX bytes:')[1].trim().length).to.be.greaterThan(0)

                expect($detailsLXC.find('li').eq(2)).to.contain('Memory:')
                expect($detailsLXC.find('li').eq(2).text().trim().split('TX bytes:')[0].length).to.be.greaterThan(7)
                expect($detailsLXC.find('li').eq(2)).to.contain('TX bytes:')
                expect($detailsLXC.find('li').eq(2).text().trim().split('TX bytes:')[1].trim().length).to.be.greaterThan(0)

                expect($detailsLXC.find('li').eq(3)).to.contain('KMem:')
                expect($detailsLXC.find('li').eq(3).text().trim().split('Total bytes:')[0].length).to.be.greaterThan(5)
                expect($detailsLXC.find('li').eq(3)).to.contain('Total bytes:')
                expect($detailsLXC.find('li').eq(3).text().trim().split('Total bytes:')[1].trim().length).to.be.greaterThan(0)

                expect($detailsLXC.find('li').eq(4)).to.contain('IP:')
                // page need to be refreshed to display ip???
                // there is not always ip value
                //expect($detailsLXC.find('li').eq(4).text().trim().length).to.be.greaterThan(3)
            })
        }
    })
}
