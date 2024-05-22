<template>
	<el-dropdown trigger="click">
		<span :class="currentLangValue" class="el-dropdown-link">
			{{ currentLangText }}
			<i class="el-icon-arrow-down el-icon--right"></i>
		</span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item v-for="lang in availableLanguages"
				:key='lang.value'
				@click="setCurrentLanguage(lang.value)"
				>
				<div @click="setCurrentLanguage(lang.value)">
					{{ lang.label }}
				</div>
			</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
	directives: {
		clickOutside: vClickOutside.directive
	},
	methods: {
		setCurrentLanguage (lang) {
			if (this.$store.getters.isLoggedIn()) {
				this.$store.dispatch('setLang', {lang})
			}
			else {
				this.$store.dispatch('setLang', {lang, save: false})
			}
		}
	},
	computed: {
		currentLang () {
			return this.$store.state.i18n.currentLang
		},
		currentLangText () {
			return this.availableLanguages.filter(x => x.value === this.currentLang)[0].label
		},
		currentLangValue () {
			return this.availableLanguages.filter(x => x.value === this.currentLang)[0].value
		},
		availableLanguages () {
			return this.$store.state.i18n.availableLangs
		}
	},
}
</script>