<template>
	<section class="layer-popup-wrap">
		<form  :actions='false' @submit.prevent='saveRule'>
			<div class="layer-popup">
				<div class="layer-content none-min-width">
					<div class="layer-header">
						<div class="layer-title">
							<div class="title">{{ t('default-check').cap }}</div>
						</div>
						<div class="close" @click='closeForm'>close</div>
					</div> <!-- /.layer-header -->
					<div class="layer-body" style="min-height: 0px" >
						<div class="table-responsive">
							<table class="table-setting">
								<div class="title">{{ t('web-only-same').cap }}</div>
							</table>
						</div>
					</div>
					<div class="checkbox-list-flex" style="margin-top: 3rem;">
						<div class="form-check">
							<label class="form-check-label" for="dontsee" style="min-width: 150px;">{{ t('dont-see-it-again').str }}</label>
							<input type="checkbox" class="form-check-input" id="dontsee" name="dontsee" style="margin-top: 7.5px; margin-left: 5px;"
								v-model="dontsee">
						</div>
					</div>

					<div class="layer-footer justify-content-center">
						<button class="btn btn-secondary" type="submit" @click='okForm'>{{ t('ok').cap }}</button>
						<button class="btn btn-secondary" type="submit" @click='closeForm'>{{ t('cancel').cap }}</button>
					</div><!-- /.layer-footer -->
				</div> <!-- /.layer-content -->
			</div>
		</form>
	</section> <!-- /.layer-popup-wrap -->
</template>

<script>
import ws from '@/shared/lib/ws'
import { API } from '@/shared/constants'
import { fillObject, reportError, trackFields, QSpinshow, QSpinhide, reportSuccess } from '@/shared/functions'

export default {
	components: {
	},
	data() {
		return {
			dontsee: false,
		}
	},
	mounted() {
	},
	methods: {
		closeForm(refresh) {
			const params = {
				deletepopup: 'web'
			}
			if (this.dontsee) {
				ws.call(API.default.put, params)
				sessionStorage.setItem('is_default_check', '0')
			}
			this.$emit('close', refresh)
		},
		okForm(refresh) {
			const params = {
				deletepopup: 'web'
			}
			if (this.dontsee) {
				ws.call(API.default.put, params)
				sessionStorage.setItem('is_default_check', '0')
			}

			this.$emit('close', refresh)
			this.$router.push('/home/administration')
		},
	}
}
</script>

