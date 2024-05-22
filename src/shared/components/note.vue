<template>
	<li class="notic" v-click-outside='() => notiClose()' @click="notiOpen">
		<span>{{ t('note') }}</span>
		<!-- class option : none / active -->
		<div class="num" :class="{'active': getReportCount > 0}">{{ getReportCount }}</div>
			<!-- class option : none / active -->
			<div class="option-wrap" :class="{'active': showNoti}">
				<span class="option-wrap-close" @click.stop="notiClose"></span>
				<div class="option-title">{{ t('noti-message') }} <strong>({{ getReportCount }})</strong></div>
				<ul class="notic-option">
					<!-- class option : none / new / checek -->
					<li class="" v-for="(item, idx) in getReport"
						:key="idx"
						@click.stop="removeReport(item, idx)"
						:class="{'new': item.type === 'new', 'checek': item.check}"
					>
						<div class="notic-content">{{ item.desc }}</div>
						<div class="notic-date">{{ item.date }}</div>
					</li>
				</ul>
		</div>
	</li>
</template>
<script>
import vClickOutside from 'v-click-outside'

export default {
	directives: {
		clickOutside: vClickOutside.directive
	},
	data() {
		return {
			showNoti: false,
			check: false
		}
	},
	methods: {
		notiOpen() {
			this.showNoti = this.getReportCount > 0
		},
		notiClose() {
			if (this.showNoti) {
				this.showNoti = false
				this.$store.commit('CHANGE_REPORT', {report: this.changeReport()})
			}
		},
		changeReport() {
			const newReport = this.getReport.map(x => {
				x.type = "old"
				return x
			})

			return newReport
		},
		removeReport(item, idx) {
			item.check = true
			this.$store.commit('REMOVE_REPORT', {idx: idx})
			if (this.getReportCount === 0) this.showNoti = false
		}
	},
	computed: {
		getReportCount() {
			return this.$store.getters.GET_REPORTCOUNT
		},
		getReport() {
			return this.$store.getters.GET_REPORT
		}
	}
}
</script>
