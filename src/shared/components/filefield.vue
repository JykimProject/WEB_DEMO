<template>
	<div>
		<label v-if='label' :for='name' :class='{required: required}'>{{label}}</label>

		<div>
			<input
				type="file"
				ref=input
				:id='name'
				:accept='mimes'
				class="input--file"
				@change='emitUpdate'
			/>

			<label
				v-if='!actionLabel || (actionLabel && !fileSelected)'
				v-show="!hideUploadButton"
				:for='name'
				class="btn btn--primary btn--lrg u-rounded">
				{{ buttonText || t('choose-file') }}
			</label>

			<label
				v-if='actionLabel && fileSelected'
				@click='emitAction'
				class="btn btn--primary btn--lrg u-rounded"
				:class="{'btn--loading': loading}">
				{{ actionLabel }}
			</label>

			<br><br>

			<div v-if='loading' class='spinner'>{{ t('loading').cap }}...</div>

			<p :class='["filename", {"no-file-selected": !fileSelected}]'>
				{{ filename }}
				<a v-if='fileSelected && !loading' @click.prevent='remove' class='u-spc-left--sml'>
					{{ t('remove').cap }}
				</a>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		name: {
			required: true,
			type: String
		},
		label: [String, Number],
		mimes: String,
		actionLabel: String,
		loading: Boolean,
		required: Boolean,
		buttonText: {type: String},
		hideUploadButton: {type: Boolean, default: false}
	},
	data () {
		return {
			fileSelected: false,
			filename: '',
		}
	},
	methods: {
		remove () {
			this.$refs.input.value = ''
			this.emitUpdate()
			this.$emit('remove', this.name)
		},
		emitUpdate () {
			const file = this.$refs.input.files[0]

			this.filename = file ? file.name : ''
			this.fileSelected = Boolean(file)
			this.$emit('update', this.name, this.$refs.input.files[0])
		},
		emitAction () {
			this.$emit('action', this.name, this.$refs.input.files[0])
		}
	}
}
</script>

