<template>
	<transition appear name='modal'>
		<div v-if='shown'>
			<div class='modal modal--rounded'>
				<div class="modal__window modal__window--rounded">
					<div class="modal__content">
						<h4 v-if='title'>{{ title }}</h4>
						<div v-if='message' class='modal__content'>
							{{ message }}
						</div>
					</div>
					<div class='modal__footer u-spc-top--sml'>
						<button :class='yesButton.class' @click='handle(true)' ref='yesRef'>{{ yesButton.text }}</button>
						<button :class='noButton.class' @click='handle(false)'>{{ noButton.text }}</button>
					</div>
				</div>
			</div>
			<div class='overlay'></div>
		</div>
	</transition>
</template>

<script>
export default {
	data () {
		return {
			shown: false,
			yes: null,
			no: null,
			manual: false,
			title: null,
			message: null,
			yesBtnOption: null,
			noBtnOption: null,
		}
	},
	computed: {
		yesButton () {
			if (typeof this.yesBtnOption === 'string') {
				return {
					text: this.yesBtnOption,
					class: 'btn btn--primary btn--med u-rounded'
				}
			}
			return this.yesBtnOption
		},
		noButton () {
			if (typeof this.noBtnOption === 'string') {
				return {
					text: this.noBtnOption,
					class: 'btn btn--ghost btn--med'
				}
			}
			return this.noBtnOption
		}
	},
	created () {
		setTimeout(() => {
			// TODO: find out why this happens
			this.$refs.yesRef.focus()
		}, 1)
	},
	methods: {
		open (title, options = {}) {
			if (typeof title === 'object' && !Object.keys(options).length) {
				// options given as first param
				options = title
			}

			const promise = new Promise((resolve, reject) => {
				this.yes = resolve
				this.no = reject
			})

			this.yesBtnOption = options.yesBtn
				? options.yesBtn
				: this.t('ok').cap

			this.noBtnOption = options.noBtn
				? options.noBtn
				: this.t('cancel').cap

			this.title = typeof title === 'string'
				? title
				: null
			this.message = options.message
			this.manual = Boolean(options.manual)
			this.shown = true

			return promise
		},
		close () {
			this.shown = false
			this.$nextTick(() => {
				this.$destroy()
			})
		},
		handle (confirm) {
			const exposed = {
				close: this.close
			}

			if (confirm) {
				this.yes(exposed)
			}
			else {
				this.no(exposed)
			}

			if (!this.manual) {
				this.close()
			}
		}
	},
}
</script>
