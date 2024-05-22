<template>
	<section class="layer-popup-wrap">
		<form :name='staticroutingForm.name' :actions='false' @submit.prevent='saveRule'>
			<div class="layer-popup">
				<div class="layer-content none-min-width">
					<div class="layer-header">
						<div class="layer-title">
							<div class="title">{{ t(`${section ? 'edit' : 'add'}-rule`) }}</div>
						</div>
						<div class="close" @click='closeForm'>close</div>
					</div> <!-- /.layer-header -->
					<div class="layer-body">
						<div class="table-responsive">
							<table class="table-setting">
								<tbody>
									<tr>
										<th>
											<label class="form-label" for="target">{{ t("destination-ip").cap }}</label>
										</th>
										<td>
											<input type="text" class="form-control" id="target" placeholder=""
												v-model='staticroutingForm.fields.target'>
										</td>
									</tr>
									<tr>
										<th>
											<label class="form-label" for="interface" >{{ t("interface").cap }}</label><label
													style="color: red;">*</label>
										</th>
										<td>
											<select class="form-select" v-model='staticroutingForm.fields.interface'>
												<option v-for="item in interfaceOptions" :value="item.name" :key="item.name">
													{{ item.name }}
												</option>
											</select>
										</td>
									</tr>
									<tr>
										<th>
											<label class="form-label" for="netmask">{{ t("netmask").cap }}</label>
										</th>
										<td>
											<input type="text" class="form-control" id="netmask" placeholder=""
												v-model='staticroutingForm.fields.netmask'>
										</td>
									</tr>
									<tr>
										<th>
											<label class="form-label" for="gateway">{{ t("gateway").cap }}</label>
										</th>
										<td>
											<input type="text" class="form-control" id="gateway" placeholder=""
												v-model='staticroutingForm.fields.gateway'>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div class="layer-footer justify-content-center mt-5">
						<button class="btn btn-primary" type="submit">{{ t('save').cap }}</button>
						<button class="btn btn-expressive" @click='closeForm'>{{ t('cancel').cap }}</button>
					</div><!-- /.layer-footer -->
				</div> <!-- /.layer-content -->
			</div>
		</form>
	</section> <!-- /.layer-popup-wrap -->
</template>

<script>
import ws from '@/shared/lib/ws'
import { RPC, API } from '@/shared/constants'
import { fillObject, reportError, trackFields, QSpinshow, QSpinhide } from '@/shared/functions'
import val_ip from '@/shared/validators/ip.js'
import ipaddr from 'ipaddr.js'

export default {
	components: {
	},
	props: {
		section: Object
	},
	data() {
		return {
			staticroutingForm: {
				name: 'rule-form',
				loading: false,
				fields: {
					session_name: '',
					target: '',
					interface: '',
					netmask:'',
					gateway:''
				},
			},
			interfaceOptions: [],
			existingNumbers: [],
		}
	},
	mounted() {
	},
	methods: {
		async saveRule() {
			this.closeForm(true)

		},
		closeForm(refresh) {
			if (this.untrackFields) {
				this.untrackFields()
			}
			this.$store.commit('UNSTAGE_FORM', {
				formName: this.staticroutingForm.name
			})

			this.$emit('close', refresh)
		}
	}
}
</script>

