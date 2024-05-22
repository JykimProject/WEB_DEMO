import { loginTest } from '../shared/auth.js'
import { dashboardTest } from '../shared/dashboard.js'
import { advancedLayoutTest } from '../shared/advancedLayout.js'
import { deviceModalTest } from '../shared/deviceModal.js'
import { connectedDevicesPageTest } from '../shared/connectedDevices'
import { radarTest } from '../shared/radar.js'
import { digitalParentingModalTest } from '../shared/digitalParentingModal'
import { securityModalTest } from '../shared/securityModal'
import { internetSecurityTest } from '../shared/internetSecurity'
import { tabsDeviceModalTest } from './tabsDeviceModal.js'
import { administrationPageTest } from '../shared/administration.js'
import { portForwardingTest } from '../shared/portForwarding'
import { digitalParentingFiltersTest } from '../shared/digitalParentingFilters.js'
import { lxcTest } from '../shared/lxc.js'
import { statisticsTest } from '../shared/statistics.js'
import { diagnosticsTest } from '../shared/adminDiagnostics'
import { voipPageTests } from '../shared/voip.js'
import { staticLeasesTest } from '../shared/staticLeases.js'
import { administratorCWMPConfigTest } from '../shared/administratorCWMPConfig.js'
import { pageElementsNewAndEditedUser, addingDeviceToUserOrGroup, deletingUserOrGroup } from '../shared/deviceUserManagement.js'
import { tabsUserTest } from './tabsUser.js'
import { digitalParentingTabTest } from '../shared/digitalParentingTab.js'
import { applicationFilterTabTest } from '../shared/applicationFilterTab.js'
import { generalTest } from '../shared/modalGeneral.js'
import { internetAccessTest } from '../shared/internetAccess.js'

context('Guest', () => {
	describe('Login', () => {
		loginTest()
	})
})

context('Administrator', () => {
	describe('login', () => {
		// login
		it('logs in', () => {
			cy.login()
			cy.get('.radar__logo').should('be.visible')
		})
	})
	describe('Radar', () => {
		radarTest()
	})
	describe('Connected devices page', () => {
		connectedDevicesPageTest()
	})
	describe('Digital parenting modal', () => {
		digitalParentingModalTest()
	})
	describe('Security modal', () => {
		securityModalTest()
	})
	describe('Device modal', () => {
		deviceModalTest()
		tabsDeviceModalTest()
	})
	describe('Device modal digital parenting', () => {
		digitalParentingTabTest('device', true) //'group' for test group or user, true/false for in modal
	})
	describe('Device modal application filter', () => {
		applicationFilterTabTest('device', true) //'group' for test group or user, true/false for in modal
	})
	describe('Advanced layout', () => {
		advancedLayoutTest()
	})
	describe('Dashboard', () => {
		dashboardTest()
	})
	describe('Administration page', () => {
		administrationPageTest()
	})
	describe('Port forwarding page', () => {
		portForwardingTest()
	})
	describe('Digital parenting filters', () => {
		digitalParentingFiltersTest()
	})
	describe('LXC', () => {
		lxcTest()
	})
	describe('Statistics', () => {
		statisticsTest()
	})
	describe('Diagnostics', () => {
		diagnosticsTest()
	})
	describe('VoIP', () => {
		voipPageTests()
	})
	describe('Static leases', () => {
		staticLeasesTest()
	})
	describe('Internet security page', () => {
      	internetSecurityTest()
    })
	describe('Administrator CWMP Config', () => {
		administratorCWMPConfigTest()
	})
	describe('Device user management page', () => {
		pageElementsNewAndEditedUser('/device-users')
		tabsUserTest()
		addingDeviceToUserOrGroup()
		//test every tab separately here
		internetAccessTest('group', false)
		applicationFilterTabTest('group', false)
		digitalParentingTabTest('group', false)
		deletingUserOrGroup()
	})
	describe('General', () => {
		generalTest()
	})
	describe("Internet access", () => {
		internetAccessTest('device', true)
	})
	//always at the end
	describe('Logout', () => {
		it('log out', () => {
		  	cy.logout()
		})
	})
})
