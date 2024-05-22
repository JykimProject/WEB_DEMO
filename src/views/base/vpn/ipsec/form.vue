<template>
	<section class="layer-popup-wrap">
		<form :name='ruleForm.name' :loading='ruleForm.loading' :actions='false' @submit.prevent='saveRule'>
			<div class="layer-popup">
				<div class="layer-content none-min-width">
					<div class="layer-header">
						<div class="layer-title">
							<div class="title">{{ t(`${section ? 'edit' : 'add'}-rule`) }}</div>
						</div>
						<div class="close" @click='closeForm'>close</div>
					</div> <!-- /.layer-header -->
					<div class="layer-body form-container">
						<div class="table-responsive">
							<table class="table-setting">
								<tbody>
									<tr>
										<th>
											<label class="form-label" for="enabled">{{ t("enable").cap }}</label>
										</th>
										<td>
											<div class="form-checkbox">
												<input type="checkbox" id="enabled" class="checkbox"
													v-model='ruleForm.fields.enabled'
													true-value='1' 
													false-value='0'>
												<label class="label" for="enabled">checkbox label</label>
											</div>
										</td>
									</tr>
									<tr>
										<th>
											<label class="form-label" for="name">{{ t("name").cap }}</label>
										</th>
										<td>
											<input type="text" class="form-control" id="name" placeholder=""
												v-model='ruleForm.fields.name' :readonly="is_edit==true">
										</td>
									</tr>
									<tr>
										<th>
											<label class="form-label" for="gateway">{{ t('remote') + ' ' + t('gateway') }}</label>
										</th>
										<td>
											<input type="text" class="form-control" id="gateway" placeholder="0.0.0.0"
												v-model='ruleForm.fields.gateway'>
										</td>
									</tr>
									<br>
									<tr>
										<th>
											<label class="form-label" for="local_subnet">{{ t("local-address").cap }}</label>
										</th>
										<td>
											<input type="text" class="form-control" id="local_subnet" placeholder="0.0.0.0 or 0.0.0.0/0"
												v-model='ruleForm.fields.local_subnet'>
										</td>
									</tr>
									<tr>
										<th>
											<label class="form-label" for="remote_subnet">{{ t('remote') + ' ' + t('address') }}</label>
										</th>
										<td>
											<input type="text" class="form-control" id="remote_subnet" placeholder="0.0.0.0 or 0.0.0.0/0"
												v-model='ruleForm.fields.remote_subnet'>
										</td>
									</tr>
									<br>
									<tr>
										<th>
											<label class="form-label" for="authentication_method">{{ t("auth-mode").cap }}</label>
										</th>
										<td>
											<label class="form-label" for="authentication_method"> {{ ruleForm.fields.authentication_method }}</label>
										</td>
									</tr>
									<tr>
										<th>
											<label class="form-label" for="keyexchange">{{ t("isakmp-version") }}</label>
										</th>
										<td>
											<select class="form-select" v-model='ruleForm.fields.keyexchange'>
												<option v-for="item in versionOption" :value="item.value" :key="item.value">
													{{ item.label }}
												</option>
											</select>
										</td>
									</tr>
									<tr>
										<th>
											<label class="form-label" for="pre_shared_key">{{ t("pre_shared_key").cap }}</label>
										</th>
										<td>
											<div class="form-password-wrap" :class="{ 'type-view': !showPassword.new }">
												<input :type='showPassword.new ? "text" : "password"' class="form-control"
													id="password" placeholder="" v-model='ruleForm.fields.pre_shared_key'>
												<span class="icon-view-passowrd" @click="togglePassword('new')"></span>
											</div>
										</td>
									</tr>
									<br>
									<tr>
										<td>
											<div class="btn-more" @click="btnAdv = !btnAdv" :class="{ 'active': btnAdv }">
												<span></span>
												<span>{{ t('more-options').cap }}</span>
											</div>
										</td>
									</tr>
									<tr>
										<td colspan="2">
											<div class="table-setting table-setting-child" :class="{ 'active': btnAdv }">
												<div class="table-title font-weight-normal">ISAKMP SA(Phase 1)</div>
												<tr>
													<th>
														<label class="form-label" for="mode">{{ t("mode") }}</label>
													</th>
													<td>
														<select class="form-select" v-model='ruleForm.isakmp_sa_fields.mode'>
															<option v-for="item in modeOption" :value="item.value" :key="item.value">
																{{ item.label }}
															</option>
														</select>
													</td>
												</tr>
												<div v-if="ruleForm.isakmp_sa_fields.mode == 'aggressive'">
													<tr>
														<th>
															<label class="form-label" for="local_identifier">{{ t('local-identifier').cap }}</label>
														</th>
														<td>
															<input type="text" class="form-control" id="local_identifier" v-model='ruleForm.isakmp_sa_fields.local_identifier'>
														</td>
													</tr>
													<tr>
														<th>
															<label class="form-label" for="remote_identifier">{{ t('remote-identifier').cap }}</label>
														</th>
														<td>
															<input type="text" class="form-control" id="remote_identifier" v-model='ruleForm.isakmp_sa_fields.remote_identifier'>
														</td>
													</tr>
												</div>
												<tr>
													<th>
														<label class="form-label" for="encryption_algorithm">{{ t('encryption').cap + ' ' + t('algo').cap }}</label>
													</th>
													<td>
														<select class="form-select" v-model='ruleForm.isakmp_sa_fields.encryption_algorithm'>
															<option v-for="item in encryptionOption" :value="item.value" :key="item.value">
																{{ item.label }}
															</option>
														</select>
													</td>
												</tr>
												<tr>
													<th>
														<label class="form-label" for="integrity_algorithm">{{ t('integrity').cap + ' ' + t('algo').cap }}</label>
													</th>
													<td>
														<select class="form-select" v-model='ruleForm.isakmp_sa_fields.integrity_algorithm'>
															<option v-for="item in integrityOption" :value="item.value" :key="item.value">
																{{ item.label }}
															</option>
														</select>
													</td>
												</tr>
												<tr>
													<th>
														<label class="form-label" for="dh_group">{{ t('dh-group').cap }}</label>
													</th>
													<td>
														<select class="form-select" v-model='ruleForm.isakmp_sa_fields.dh_group'>
															<option v-for="item in dhgroupOption" :value="item.value" :key="item.value">
																{{ item.label }}
															</option>
														</select>
													</td>
												</tr>
												<tr>
													<th>
														<label class="form-label" for="life_time">{{ t('key-lift-time').cap }}</label>
													</th>
													<td>
														<input type="number" class="form-control" id="isakmp_sa_life_time" v-model='ruleForm.isakmp_sa_fields.lifetime'>
													</td>
												</tr>
												<br>
												<div class="table-title font-weight-normal">IPSec SA(Phase 2)</div>
												<tr>
													<th>
														<label class="form-label" for="encryption_algorithm">{{ t('encryption').cap + ' ' + t('algo').cap }}</label>
													</th>
													<td>
														<select class="form-select" v-model='ruleForm.ipsec_sa_fields.encryption_algorithm'>
															<option v-for="item in encryptionOption" :value="item.value" :key="item.value">
																{{ item.label }}
															</option>
														</select>
													</td>
												</tr>
												<tr>
													<th>
														<label class="form-label" for="integrity_algorithm">{{ t('integrity').cap + ' ' + t('algo').cap }}</label>
													</th>
													<td>
														<select class="form-select" v-model='ruleForm.ipsec_sa_fields.integrity_algorithm'>
															<option v-for="item in integrityOption" :value="item.value" :key="item.value">
																{{ item.label }}
															</option>
														</select>
													</td>
												</tr>
												<tr>
													<th>
														<label class="form-label" for="dh_group">{{ t('dh-group').cap }}</label>
													</th>
													<td>
														<select class="form-select" v-model='ruleForm.ipsec_sa_fields.dh_group'>
															<option v-for="item in dhgroupOption" :value="item.value" :key="item.value">
																{{ item.label }}
															</option>
														</select>
													</td>
												</tr>
												<tr>
													<th>
														<label class="form-label" for="life_time">{{ t('key-lift-time').cap }}</label>
													</th>
													<td>
														<input type="number" class="form-control" id="ipsec_sa_life_time" v-model='ruleForm.ipsec_sa_fields.lifetime'>
													</td>
												</tr>
												<br>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div> <!-- /.layer-body -->
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
import { fillObject, reportError, trackFields, QSpinshow, QSpinhide, reportSuccess } from '@/shared/functions'
import val_ip from '@/shared/validators/ip4netmask.js'
import validator from 'validator'
import filled from '@/shared/validators/filled.js'
import str_length from '@/shared/validators/str-length.js'
import number from '@/shared/validators/number.js'

export default {
	components: {
	},
	props: {
		section: Object,
		check_name: Array
	},
	data() {
		return {
			ruleForm: {
				name: 'rule-form',
				loading: false,
				fields: {
					name: '',
					gateway: '',
					local_subnet: '',
					remote_subnet: '',
					authentication_method: 'psk',
					pre_shared_key: '',
					enabled: '',
					keyexchange: 'ikev1'
				},
				isakmp_sa_fields: {
					mode: 'main',
					local_identifier: '',
					remote_identifier: '',
					encryption_algorithm: '3des',
					integrity_algorithm: 'md5',
					dh_group: 'modp1024',
					lifetime: '3600'
				},
				ipsec_sa_fields: {
					encryption_algorithm: '3des',
					integrity_algorithm: 'md5',
					dh_group: 'modp1024',
					lifetime: '3600'
				},
			},
			showPassword: {
				new: false,
			},
			modeOption: [
				{ label: 'main', value: 'main' },
				{ label: 'aggressive', value: 'aggressive' },
			],
			versionOption: [
				{ label: 'IKEv1', value: 'ikev1' },
				{ label: 'IKEv2', value: 'ikev2' },
			],
			encryptionOption: [
				{ label: 'DES', value: 'des' },
				{ label: '3DES', value: '3des' },
				{ label: 'AES-128', value: 'aes128' },
				{ label: 'AES-192', value: 'aes192' },
				{ label: 'AES-256', value: 'aes256' },
			],
			integrityOption: [
				{ label: 'MD5', value: 'md5' },
				{ label: 'SHA1', value: 'sha1' },
			],
			dhgroupOption: [
				{ label: '768bit', value: 'modp768' },
				{ label: '1024bit', value: 'modp1024' },
				{ label: '1536bit', value: 'modp1536' },
				{ label: '2048bit', value: 'modp2048' },
				{ label: '3072bit', value: 'modp3072' },
				{ label: '4096bit', value: 'modp4096' },
				{ label: '6144bit', value: 'modp6144' },
			],
			btnAdv: false,
			is_edit: false,
		}
	},
	mounted() {
		QSpinshow()
		if (this.section) {
			fillObject(this.ruleForm.fields, this.section)
			let encrypted
			this.is_edit = true 
			this.ruleForm.isakmp_sa_fields.mode = this.section.mode
			this.ruleForm.isakmp_sa_fields.local_identifier = this.section.local_identifier
			this.ruleForm.isakmp_sa_fields.remote_identifier = this.section.remote_identifier
			this.ruleForm.isakmp_sa_fields.dh_group = this.section.remote_crypto_dh_group
			this.ruleForm.isakmp_sa_fields.lifetime = this.section.remote_lifetime ? this.section.remote_lifetime : '3600'
			encrypted = this.section.remote_crypto_encryption.split('-')
			this.ruleForm.isakmp_sa_fields.encryption_algorithm = encrypted[0]
			this.ruleForm.isakmp_sa_fields.integrity_algorithm = encrypted[1]

			this.ruleForm.ipsec_sa_fields.dh_group = this.section.tunnel_crypto_dh_group
			this.ruleForm.ipsec_sa_fields.lifetime = this.section.tunnel_lifetime ? this.section.tunnel_lifetime : '3600'
			encrypted = this.section.tunnel_crypto_encryption.split('-')
			this.ruleForm.ipsec_sa_fields.encryption_algorithm = encrypted[0]
			this.ruleForm.ipsec_sa_fields.integrity_algorithm = encrypted[1]
		}

		this.untrackFields = trackFields.call(this, 'ruleForm')
		QSpinhide()
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
				formName: this.ruleForm.name
			})

			this.$emit('close', refresh)
		},
		togglePassword(field, e) {
			this.showPassword[field] = !this.showPassword[field]
		},
	}
}
</script>

<style>
	.form-container {
		max-height: 700px;
		overflow-y: scroll;
	}
</style>
