<template>
	<section class="section">
		<ipsec-table
			:columns="columns"
			:data="rules"
			@edit='onRowEdit'
			@delete='onRowDelete'
			@add='openForm'>
		</ipsec-table>
		<ipsec-form
			v-if='formShown'
			:section='section'
			:check_name='check_name'
			@close='closeForm($event)'>
		</ipsec-form>
	</section>
</template>

<script>
import ws from '@/shared/lib/ws'
import { API } from '@/shared/constants'
import { reportError, reportSuccess, trackFields, fillObject, QSpinshow, QSpinhide} from '@/shared/functions'
import IpsecTable from './table.vue'
import IpsecForm from './form.vue'

export default {
	components: {
		IpsecTable,
		IpsecForm
	},
	data() {
		return {
			section: null,
			formShown: false,
			columns: [
				{ name: 'name', key: 'name', align: 'center' },
				{ name: 'remote-gateway', key: 'gateway', align: 'center' },
				{ name: 'local-address', key: 'local_subnet', align: 'center' },
				{ name: 'remote-address', key: 'remote_subnet', align: 'center' },
				{ name: 'status', key: 'status', align: 'center' },
				{ name: 'enable', key: 'enabled', align: 'center' },
				{ name: 'actions', key: 'actions', align: 'center' },
			],
			rules: [],
			check_name: []
		}
	},
	computed: {
	},
	mounted() {
		this.fetchData()
	},
	methods: {
		onRowEdit(rowIndex) {
			this.openForm(this.rules[rowIndex])
		},
		onRowDelete(rowIndex) {
			this.deleteRule(this.rules[rowIndex])
		},
		fetchData () {
			ws.call(API.vpn.ipsec.get).then(({ dict }) => {
				if(!dict.ipsec)
					return false

				this.rules = dict.ipsec

				this.rules.forEach((rule) => {
					this.check_name.push(rule.name)
					const statusMatch = rule.status.match(/\b[A-Z]+\b/)
					if (statusMatch && statusMatch.length > 0) {
						rule.status = statusMatch[0]
					}
				})
			})
			.catch(err => reportError(err))
		},
		deleteRule (rule) {
			QSpinshow()

			let params = {
				name: rule['name'],
			}

			if (confirm(this.t('are-you-sure-to-delete').cap)) {
				ws.call(API.vpn.ipsec.del, params)
				.then(() => { 
					ws.call(API.commit)
				})
				.finally(() => {
					this.fetchData()
					QSpinhide()
				})
			}
			else {
				QSpinhide()
			}
		},
		openForm (rule) {
			this.section = rule ? rule : null
			this.formShown = true
		},
		closeForm (refresh) {
			if (refresh) {
				this.fetchData()
			}
			this.formShown = false
			window.scrollTo(0, 0)
		}
	}
}
</script>
