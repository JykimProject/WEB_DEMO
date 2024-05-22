<template>
	<section class="section">
	    <label class='text-sm text-info' :style="{whiteSpace: 'pre-line'}"> {{ t('staticrouting-info') }}</label>
		<staticroute-table
			:columns="columns"
			:data="rules"
			@edit='onRowEdit'
			@delete='onRowDelete'
			@add='openForm'>
		</staticroute-table>
		<rule-form
			v-if='formShown'
			:section='section'
			@close='closeForm($event)'>
		</rule-form>
	</section>
</template>

<script>
import ws from '@/shared/lib/ws'
import { RPC, API } from '@/shared/constants'
import { reportError, QSpinshow, QSpinhide }  from '@/shared/functions'
import StaticrouteTable from './table.vue'
import RuleForm from './form.vue'
import { Notification } from 'element-ui'

export default {
	components: {
		StaticrouteTable,
		RuleForm
	},
	data() {
		return {
			section: null,
			formShown: false,
			columns: [
				{ name: 'interface', key: 'interface', align: 'center' },
				{ name: 'target', key: 'target', align: 'center' },
				{ name: 'netmask', key: 'netmask', align: 'center' },
				{ name: 'gateway', key: 'gateway', align: 'center' },
				{ name: 'actions', key: 'actions', align: 'center' },
			],
			rules: []
		}
	},
	mounted() {
		this.fetchData()
	},
	computed: {
	},
	methods: {
		async onsetting_check() {
			return false
			try {
				const { dict } = await ws.call(API.wireless.global.get);
				this.onsetting = dict && dict.onsetting == '1';
			} catch (error) {
				this.onsetting = false;
			}
			return this.onsetting;
		},
		async onRowEdit(rowIndex) {
			if (await this.onsetting_check()) {
				Notification.info({
					title: "Notification",
					message: this.t('warning-wireless-loading'),
					duration: 3 * 1000
				})
				return
			}
			this.openForm(this.rules[rowIndex])
		},
		onRowDelete(rowIndex) {
			this.deleteRule(this.rules[rowIndex])
		},
		fetchData () {
			ws.call(API.network.staticrouting.get).then(({ dict }) => {
				this.rules = dict.list
			})
			.catch(err => reportError(err))
		},
		deleteRule (rule) {
			QSpinshow()

			let params = {
				session_name: rule['session_name'],
			}

			if (confirm(this.t('are-you-sure-to-delete').cap)) {
				ws.call(API.network.staticrouting.del, params)
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
		async openForm (rule) {
			if (await this.onsetting_check()) {
				Notification.info({
					title: "Notification",
					message: this.t('warning-wireless-loading'),
					duration: 3 * 1000
				})
				return
			}
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
