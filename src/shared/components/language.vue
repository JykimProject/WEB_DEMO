<template>
	<!-- class option : en / de / es / hu / it / pt -->
	<li class="language" :class="currentLangValue" v-click-outside='() => showDropdown = false' @click="showDropdown = true">
		<span>{{ currentLangText }}</span>
		<!-- class option : none / active -->
		<div class="option-wrap" :class="{'active': showDropdown}">
			<span class="option-wrap-close" @click.stop="showDropdown = false"></span>
			<ul class="language-option">
				<li v-for="lang in availableLanguages"
					:key='lang.value'
					@click="setCurrentLanguage(lang.value)"
					:class="{'slected': lang.value === currentLangValue}"
					>
					{{ lang.label }}
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
	data () {
		return {
			showDropdown: false
		}
	},
	methods: {
		toggleLangDropdown () {
			this.showDropdown = !this.showDropdown
		},
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
