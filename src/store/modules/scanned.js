import ws from '@/shared/lib/ws'
import { RPC } from '@/shared/constants'
import { reportError } from '@/shared/functions'
import moment from 'moment'

const state = {
	cDay: {},
	lDay: {},
	cWeek: {},
	lWeek: {},
	cMonth: {},
	lMonth: {},
	total: {},
}

const mutations = {
	SET_STATE (state, { field, value }) {
		state[field] = value
	},
	UPDATE_SF (state, { field, subfield, value }) {
		state[field][subfield].sf += value
	},
	UPDATE_MF (state, { field, subfield, value }) {
		state[field][subfield].mf += value
	}
}

const actions = {
	startScanUpdate ({ rootState, commit }) {
		return ws.call(RPC.sqlAliasExec.hashCount.get).then(({ list }) => {
			// subscribe to new scaned files/malware (db updates)
			ws.subscribe(RPC.sqlTableModify.updateCounters, ({ list }) => {
				if (list.length) {
					// set the same time for each item in this iteration
					const values = list[0].result.values
					const subfieldDay = moment.unix(values[0]).format('H') + ':00'
					const subfieldWeek = moment.unix(values[0]).format('ddd')
					const subfieldMonth = moment.unix(values[0]).format('D')
					const subfieldTotal = moment.unix(values[0]).format('MMM') + ' ' +
						moment.unix(values[0]).format('YY')

					let sfToAdd = 0
					let mfToAdd = 0

					for (let i = 0; i < list.length; i++) {
						const values = list[i].result.values
						sfToAdd += values[1]
						mfToAdd += values[2]
					}

					commit('UPDATE_SF', {field: 'cDay', subfield: subfieldDay, value: sfToAdd})
					commit('UPDATE_SF', {field: 'cWeek', subfield: subfieldWeek, value: sfToAdd})
					commit('UPDATE_SF', {field: 'cMonth', subfield: subfieldMonth, value: sfToAdd})
					commit('UPDATE_SF', {field: 'total', subfield: subfieldTotal, value: sfToAdd})

					commit('UPDATE_MF', {field: 'cDay', subfield: subfieldDay, value: mfToAdd})
					commit('UPDATE_MF', {field: 'cWeek', subfield: subfieldWeek, value: mfToAdd})
					commit('UPDATE_MF', {field: 'cMonth', subfield: subfieldMonth, value: mfToAdd})
					commit('UPDATE_MF', {field: 'total', subfield: subfieldTotal, value: mfToAdd})
				}
			}).catch(reportError)

			ws.subscribe(RPC.sqlTableModify.updateDeviceList, ({ list }) => {
				if (list.length
					&& list[0].result.command.toUpperCase() === 'INSERT') {

					// toggles between true and false every time new device gets scanned
					commit('SET_STATUS', {
						path: 'newDeviceScanned.value',
						value: !rootState.status.newDeviceScanned.value
					})
				}
			}).catch(reportError)

			// filter data which is in future (devices time can be set wrong)
			// var now = moment().unix()
			// var timestamps = list[0].filter(x => x[0] < now )
			var timestamps = list[0]

			if (timestamps.length === 0) {
				timestamps.push([])
			}

			var cDay = {}
			var lDay = {}
			var cWeek = {}
			var lWeek = {}
			var cMonth = {}
			var lMonth = {}
			var total = {}

			// placeholders for each period
			// today
			for (let i = 0; i < 24; i++) {
				cDay[i+':00'] = {
					sf: 0,
					mf: 0
				}
			}
			// this week
			for (let i = 0; i < 7; i++) {
				cWeek[moment().startOf('isoWeek').add(i, 'day').format('ddd')] = {
					sf: 0,
					mf: 0
				}
			}
			// this month
			for (let i = 0; i < moment().endOf('month').format('D'); i++) {
				cMonth[moment().startOf('month').add(i, 'day').format('D')] = {
					sf: 0,
					mf: 0
				}
			}

			// order the items by timestamp (if time on device changes, the order becomes inconsistent)
			timestamps.sort(function (a, b) {
				return a[0] - b[0]
			})

			var earliestTimestamp = timestamps[0][0]

			// calculate num of months (from now to earliest timestamp)
			var numOfMonths = moment().startOf('month')
				.diff(moment.unix(earliestTimestamp).startOf('month'), 'months')
			numOfMonths = numOfMonths > 4 ? numOfMonths + 1 : 5

			for (var i = numOfMonths; i >= 0 ; i--) {
				var monthName = moment().add(-i, 'month').format('MMM') + ' ' +
					moment().add(-i, 'month').format('YY')
				total[monthName] = {
					sf: 0,
					mf: 0
				}
			}

			// reverse the order of timestamps
			timestamps.reverse()

			// these values are not shown in graphs so we can group all of them
			// yesterday
			lDay[0] = {
				sf: 0,
				mf: 0
			}
			// last week
			lWeek[0] = {
				sf: 0,
				mf: 0
			}
			// last month
			lMonth[0] = {
				sf: 0,
				mf: 0
			}

			const TODAY = moment()
			const YESTERDAY = moment().subtract(1,'day')
			const LAST_WEEK = moment().subtract(1,'week')
			const LAST_MONTH = moment().subtract(1,'month')

			var checkcDay = true
			var checklDay = true
			var checkcWeek = true
			var checklWeek = true
			var checkcMonth = true
			var checklMonth = true

			timestamps.forEach(timestamp => {
				var stamp = moment.unix(timestamp[0])

				if (!stamp['_isValid']) {
					return
				}

				// checkcDay variable is added to speedup the checks
				// today
				if (checkcDay && stamp.isSame(TODAY, 'day')) {
					var dayName = stamp.format('H') + ':00'
					cDay[dayName].sf += timestamp[1]
					cDay[dayName].mf += timestamp[2]
				}
				else if (!checkcDay || stamp.isBefore(TODAY, 'day')) {
					checkcDay = false
				}
				// yesterday
				if (checklDay && stamp.isSame(YESTERDAY, 'day')) {
					lDay[0].sf += timestamp[1]
					lDay[0].mf += timestamp[2]
				}
				else if (!checklDay || stamp.isBefore(YESTERDAY, 'day')) {
					checklDay = false
				}
				// this week
				if (checkcWeek && stamp.isSame(TODAY, 'isoWeek')) {
					var weekName = stamp.format('ddd')
					cWeek[weekName].sf += timestamp[1]
					cWeek[weekName].mf += timestamp[2]
				}
				else if (!checkcWeek || stamp.isBefore(TODAY, 'isoWeek')) {
					checkcWeek = false
				}
				// last week
				if (checklWeek && stamp.isSame(LAST_WEEK, 'isoWeek')) {
					lWeek[0].sf += timestamp[1]
					lWeek[0].mf += timestamp[2]
				}
				else if (!checklWeek || stamp.isBefore(LAST_WEEK, 'isoWeek')) {
					checklWeek = false
				}
				// this month
				if (checkcMonth && stamp.isSame(TODAY, 'month')) {
					var monthName = stamp.format('D')
					cMonth[monthName].sf += timestamp[1]
					cMonth[monthName].mf += timestamp[2]
				}
				else if (!checkcMonth || stamp.isBefore(TODAY, 'month')) {
					checkcMonth = false
				}
				// last month
				if (checklMonth && stamp.isSame(LAST_MONTH, 'month')) {
					lMonth[0].sf += timestamp[1]
					lMonth[0].mf += timestamp[2]
				}
				else if (!checklMonth || stamp.isBefore(LAST_MONTH, 'month')){
					checklMonth = false
				}

				// total
				{
					var totalName = stamp.format('MMM') + ' ' + stamp.format('YY')
					total[totalName].sf += timestamp[1]
					total[totalName].mf += timestamp[2]
				}
			})

			commit('SET_STATE', {field: 'cDay', value: cDay})
			commit('SET_STATE', {field: 'lDay', value: lDay})
			commit('SET_STATE', {field: 'cWeek', value: cWeek})
			commit('SET_STATE', {field: 'lWeek', value: lWeek})
			commit('SET_STATE', {field: 'cMonth', value: cMonth})
			commit('SET_STATE', {field: 'lMonth', value: lMonth})
			commit('SET_STATE', {field: 'total', value: total})

			return true
		})
	},
}

export default {
	state,
	mutations,
	actions,
}
