<template>
	<section class="layer-popup-wrap">
		<div class="layer-popup">
			<div class="layer-content none-min-width">
				<div class="layer-header">
					<div class="layer-title">
						<div class="title">{{ t('static-ip-backup') }}</div>
					</div>
					<div class="close" @click='closeForm'>close</div>
				</div> 
				<div class="layer-body">
					<div class="table-responsive">
						<table class="table-setting-wide">
							<tbody>
								<tr>
									<th>
										<label class="form-label" for="backup">{{ t('Backup-configuration').cap }}</label>
									</th>
									<td>
										<div class="btn-area">
											<button class="btn btn-secondary btn-administaion"
												@click="createBackup()">{{ this.t('backup').cap }}</button>
										</div>
									</td>
									<td></td>
								</tr>
							</tbody>
						</table>
						<br> 
						<table class="table-setting-wide">
							<tbody>
								<tr>
									<th>
										<label class="form-label" for="restore">{{ t('restore-config-backup').cap }}</label>
									</th>
									<td>
										<div class="btn-area">
											<input class="input" type="file" id="arquivo" name="arquivo" ref='uploader'
												accept="application/x-gzip" @change='uploadConfig()' />
										</div>
									</td>
									<td></td>
								</tr>
								<tr>
									<th></th>
									<td>
										<div class="btn-area">
										<button class="btn btn-secondary btn-administaion" @click='restoreBackup' type="button">{{ t('restore').cap }}</button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						<br> 
					</div>
					
					<!--c-confirm v-if='confirmModalShown' @close='confirmModalShown = ""' @done='restoreBackup'
						:type="confirmModalShown" :yeslabel='t("backup").cap'
						:modalmsg='t("are-you-sure-to-restore-backup").cap' /-->
				</div>
			</div>
		</div>
	</section> 
</template>

<script>
import ws from '@/shared/lib/ws'
import { apiRPC, API } from '@/shared/constants'
//import cConfirm from './confirm-password-dialog'
import { base64toBlob, reportSuccess, reportError, getBase64, QSpinTimer, trackFields } from '@/shared/functions'
import { saveAs } from 'file-saver'

export default {
	components: {
		//cConfirm
	},
	data() {
		return {
			backup: null,
			configBlob: null,
			backupLink: null,
			confirmModalShown: '',
			uploadingBackup: false,
			creatingBackup: false,
			restoringBackup: false,
			downloadingBackup: false,
			errorUpload: false,
			loading: false
		}
	},
	mounted() {
		Promise.all([
			ws.call(API.feature)
		])
		.catch(err => reportError(err))
	},
	methods: {
		async createBackup() {
			this.loading = true
			var today = new Date();
			var year = today.getFullYear();
			var month = ('0' + (today.getMonth() + 1)).slice(-2);
			var day = ('0' + today.getDate()).slice(-2);
			var hours = ('0' + today.getHours()).slice(-2);
			var minutes = ('0' + today.getMinutes()).slice(-2);
			var seconds = ('0' + today.getSeconds()).slice(-2);
			var dateString = 'Static-IP_backup_' + year + month + day + '-' + hours + minutes + seconds + '.tar.gz';
			const params_create = {
				file: '/tmp/config-static-ip-backup.tar.gz'
			}

			const params_download = {
				path: '/tmp/config-static-ip-backup.tar.gz',
				base64: true
			}

			Promise.all([
				await ws.call(API.dhcp.static.create.post, params_create),
				await ws.call(API.dhcp.static.download.post, params_download)
			]).then(([
				{ dict: create },
				{ dict: download }
			]) => {
				this.configBlob = this.createConfigBlob(download.data)
				const objectURL = window.URL.createObjectURL(this.configBlob)
				this.backupLink = objectURL
			}).catch(reportError).finally(() => {
				if (this.backupLink) {
					saveAs(this.configBlob, dateString)
				}
				this.loading = false
			})
		},
		createConfigBlob(base64) {
			return base64toBlob(base64, "application/octet-stream")
		},
		uploadConfig() {
			this.loading = true
			this.uploadBackup(this.$refs.uploader.files[0])
		},
		uploadBackup(file) {
			this.backup = file
			this.uploadingBackup = true

			getBase64(file).then(async data => {
				const restore_path = '/tmp/' + file.name
				const requestData = {
					method: 'upload',
					params: {
						msg: {
							path: restore_path,
							chunk: data,
							append: false
						}
					}
				}
				await ws.call(requestData)
			}).catch(e => {
				reportError(e)
			}).finally(() => {
				this.uploadingBackup = false
				this.loading = false
			})
		},
		restoreBackup() {
			this.confirmModalShown = ''
			this.loading = true
			const formData = new FormData()
			if (this.$refs.uploader.files.length == 0) {
				reportError(this.t('restore-config-backup').cap)
				this.loading = false
				return
			}

			if (this.$refs.uploader.files[0].type !== 'application/x-gzip') {
				reportError(this.t('invalid-firmware-files-should-be-tar.gz').cap)
				this.loading = false
			}
			else if (this.$refs.uploader.files[0]) {
				const restore_path = '/tmp/' + this.$refs.uploader.files[0].name
				const params = {
					file: restore_path,
					formData: formData.append('file', this.$refs.uploader.files[0])
				}
				ws.call(API.dhcp.static.restore.post, params).then(({ dict }) => {
						if (dict.code !== 0) {
						reportError(this.t('config-restore-fail').cap);
						throw new Error('Config restore failed');
						}
				}).catch(err => {
						reportError(this.t('config-restore-fail').cap);
						throw err;
					})
					.then(() => {
						QSpinTimer(10, "Static IP Backup file Update....").finally(() => {
						this.closeForm(1);
						reportSuccess();
						});
					})
					.finally(() => {
						this.loading = false;
				});
				
			}
			else {
				reportError(this.t('restore-config-backup').cap)
				this.loading = false
			}
		},
		closeForm (refresh) {
			window.scrollTo(0, 0)
			if (refresh) {
				this.$emit('close', refresh)
			}
		}
	},
}
</script>