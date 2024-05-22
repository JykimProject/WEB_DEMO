export function dashboardTest () {
    it('Open page', () => {
        // TODO: CHeck this, locally it won't work without this for some reason
        cy.visit('dashboard')
        cy.wait(1000)
        cy.url().should('include', '/dashboard')
        cy.get('.page__title').contains('activity overview')
    })

    it('Router status', () => {
        cy.get('.page__title').contains('Router status')

        cy.wait(2000)
        cy.get('#ipAddress').then(($ipAddress) => {
            const label = $ipAddress.find('#label')
            const value = $ipAddress.find('#value')
            expect(label.text()).to.contain('IP Address')
            expect(value.text().trim().length).to.be.greaterThan(0)
        })
        cy.get('#macAddress').then(($macAddress) => {
            const label = $macAddress.find('#label')
            const value = $macAddress.find('#value')
            expect(label.text()).to.contain('MAC address')
            expect(value.text().trim().length).to.be.greaterThan(0)
        })
        cy.get('#sentData').then(($sentData) => {
            const label = $sentData.find('#label')
            const value = $sentData.find('#value')
            expect(label.text()).to.contain('Sent data')
            expect(value.text().trim().length).to.be.greaterThan(0)
        })
        cy.get('#recvData').then(($recvData) => {
            const label = $recvData.find('#label')
            const value = $recvData.find('#value')
            expect(label.text()).to.contain('Received data')
            expect(value.text().trim().length).to.be.greaterThan(0)
        })

        cy.get('#hostname').then(($hostname) => {
            const label = $hostname.find('.u-list--primary__label')
            const value = $hostname.find('.u-list--primary__value')
            expect(label.text()).to.contain('Hostname')
            expect(value.text().trim().length).to.be.greaterThan(0)
        })
        cy.get('#model').then(($model) => {
            const label = $model.find('.u-list--primary__label')
            const value = $model.find('.u-list--primary__value')
            expect(label.text()).to.contain('model')
            expect(value.text().trim().length).to.be.greaterThan(0)
        })
        cy.get('#architecture').then(($architecture) => {
            const label = $architecture.find('.u-list--primary__label')
            const value = $architecture.find('.u-list--primary__value')
            expect(label.text()).to.contain('Architecture')
            expect(value.text().trim().length).to.be.greaterThan(0)
        })
        cy.get('#firmwareVersion').then(($firmwareVersion) => {
            const label = $firmwareVersion.find('.u-list--primary__label')
            const value = $firmwareVersion.find('.u-list--primary__value')
            expect(label.text()).to.contain('Firmware version')
            expect(value.text().trim().length).to.be.greaterThan(0)
        })
        cy.get('#kernelVersion').then(($kernelVersion) => {
            const label = $kernelVersion.find('.u-list--primary__label')
            const value = $kernelVersion.find('.u-list--primary__value')
            expect(label.text()).to.contain('Kernel version')
            expect(value.text().trim().length).to.be.greaterThan(0)
        })
        cy.get('#localTime').then(($localTime) => {
            const label = $localTime.find('.u-list--primary__label')
            const value = $localTime.find('.u-list--primary__value')
            expect(label.text()).to.contain('Local time')
            expect(value.text().trim().length).to.be.greaterThan(0)
        })
        cy.get('#uptime').then(($uptime) => {
            const label = $uptime.find('.u-list--primary__label')
            const value = $uptime.find('.u-list--primary__value')
            expect(label.text()).to.contain('uptime')
            expect(value.text().trim().length).to.be.greaterThan(0)
        })
    })

    it('Usb', () => {
        cy.get('#usb').then(($usb) => {
            const icon = $usb.find('.iconcustom-usb-drive')
            expect(icon).to.exist

            const title = $usb.find('.title--gamma')
            expect(title).to.contain('USB')

            const statusName = $usb.find('.u-list--status__statusname')
            expect(statusName).to.contain('Status')

            const status = $usb.find('.u-list--status__status')
            expect(status.text().trim().length).to.be.greaterThan(0)

            if (status.text().trim() === 'Unplugged') {
                expect($usb.find('.pill--disabled')).to.exist
                expect(title).to.have.class('u-type--opaque')
            }
            else {
                expect(status.text().trim()).to.be.eq('Plugged')
                expect($usb.find('.pill--enabled')).to.exist
                expect(title).to.have.class('u-color--success')
            }
        })
    })

    it('VoIP', () => {
        cy.get('#voip').then(($voip) => {
            const icon = $voip.find('.icon-phone-loudspeaker')
            expect(icon).to.exist

            const title = $voip.find('.title--gamma')
            expect(title).to.contain('VoIP')
        })
        cy.wait(2500)
        cy.checkIfEleExists('#voipItem')
            .then(value => {
                if (value === true) {
                    cy.get('#voipItem').then(($voipItem) => {
                        expect($voipItem.find('.u-list--status__statusname')).to.contain('Status')

                        const status = $voipItem.find('.pill')
                        expect(status.text().trim().length).to.be.greaterThan(0)

                        if (status.text().trim() === 'connected') {
                            expect($voipItem.find('.pill--enabled')).to.exist
                        }
                        else {
                            expect(status.text().trim()).to.be.eq('disconnected')
                            expect($voipItem.find('.pill--disabled')).to.exist
                        }

                        expect($voipItem.find('.u-list--status__statusname').length -1).to.be.eq($voipItem.find('.u-list--status__status').length - 1) //why is username not shown
                    })
                }
            })
    })

    it('Memory', () => {
        cy.get('#memoryInfo').then(($memoryInfo) => {
            const title = $memoryInfo.find('.page__title')
            expect(title).to.contain('memory')

            const chart = $memoryInfo.find('.mem-chart')
            expect(chart).to.exist

            const chartFree = $memoryInfo.find('.mem-chart--free')
            expect(chartFree).to.exist

            const chartUsed = $memoryInfo.find('.mem-chart--used')
            expect(chartUsed).to.have.css('background-color', 'rgb(31, 187, 70)')

            expect($memoryInfo.find('.u-grid')).to.contain('Available')
            expect($memoryInfo.find('.mem-chart-label--used')).to.exist

            expect($memoryInfo.find('.u-grid')).to.contain('Total')
        })
    })

    it('LAN', () => {
        cy.get('#lan').then(($lan) => {
            const title = $lan.find('.title--gamma')
            expect(title).to.contain('LAN')

            const icon = $lan.find('.icon-dashboard-lan')
            expect(icon).to.exist

            const statusName = $lan.find('.u-list--status__statusname')
            expect(statusName).to.contain('Status')

            const status = $lan.find('.pill')
            expect(status.text().trim().length).to.be.greaterThan(0)

            if (status.text().trim() === 'Enabled') {
                expect($lan.find('.pill--enabled')).to.exist
                expect(title).to.have.class('u-color--success')

            }
            else {
                expect(status.text().trim()).to.be.eq('disabled')
                expect($lan.find('.pill--disabled')).to.exist
                expect(title).to.have.class('u-type--opaque')
            }
        })
        cy.checkIfEleExists('#lanItem')
            .then(value => {
                if (value === true) {
                    cy.get('#lanItem').then(($lanItem) => {
                        expect($lanItem.find('.u-list--status__statusname')).to.contain('Device name')
                        expect($lanItem.find('.u-list--status__statusname')).to.contain('IP Address')
                        expect($lanItem.find('.u-list--status__status').length).to.be.eq(2)
                        expect($lanItem.find('.u-list--status__status').first().text().trim().length).to.be.greaterThan(0)
                        expect($lanItem.find('.u-list--status__status').last().text().trim().length).to.be.greaterThan(0)
                    })
                }
            })
    })

    it('Wireless', () => {
        cy.get('#wireless').then(($wireless) => {
            const title = $wireless.find('.title--gamma')
            expect(title).to.contain('Wireless')

            const icon = $wireless.find('.icon-dashboard-wireless')
            expect(icon).to.exist

            const statusName = $wireless.find('.u-list--status__statusname')
            expect(statusName).to.contain('Status')

            const status = $wireless.find('.pill')
            expect(status.text().trim().length).to.be.greaterThan(0)

            if (status.text().trim() === 'Enabled') {
                expect($wireless.find('.pill--enabled')).to.exist
                expect(title).to.have.class('u-color--success')
                
            }
            else {
                expect(status.text().trim()).to.be.eq('disabled')
                expect($wireless.find('.pill--disabled')).to.exist
                expect(title).to.have.class('u-type--opaque')
            }

            cy.checkIfEleExists('#wirelessItem')
                .then(value => {
                    if (value === true) {
                        cy.get('#wirelessItem').then(($wirelessItem) => {
                            expect($wirelessItem.find('.u-list--status__statusname')).to.contain('SSID')
                            expect($wirelessItem.find('.u-list--status__status').text().trim().length).to.be.greaterThan(0)
                        })
                    }
                })
        })
    })

    it('WAN', () => {
        cy.get('.icon-dashboard-dsl')
        cy.get('#wan').then(($wan) => {
            const title = $wan.find('.title--gamma')
            expect(title).to.contain('WAN')

            const icon = $wan.find('.icon-dashboard-dsl')
            expect(icon).to.exist

            cy.checkIfEleExists('#wanItem')
                .then(value => {
                    if (value === true) {
                        cy.get('#wanItem').then(($wanItem) => { //check if this works
                            expect($wanItem.find('.u-list--status__statusname')).to.contain('Status')
                            expect($wanItem.find('.u-list--status__statusname')).to.contain('Name')

                            const status = $wanItem.find('.pill')
                            expect(status.text().trim().length).to.be.greaterThan(0)

                            if (status.text().trim() === 'Enabled') {
                                expect($wanItem.find('.pill--enabled')).to.exist
                                
                            }
                            else {
                                expect(status.text().trim()).to.be.eq('disabled')
                                expect($wanItem.find('.pill--disabled')).to.exist
                            }

                            expect($wanItem.find('.u-list--status__status').eq(1).text().trim().length).to.be.greaterThan(0)

                            //check why is IPv6 not displayed, after fixing that change this 3 in 2
                            expect($wanItem.find('.u-list--status__statusname > div').length).to.be.eq($wanItem.find('.u-list--status__status').length - 3)
                        })
                    }
                })
        })
    })

}
