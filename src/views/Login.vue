<template>
	<!-- start : content-section -->
	<section class="content-section">
		<!-- start : article section -->
		<article class="article">
			<div class="wrap-content">
				<!-- class option : container / container-fluid / container-full -->
				<div class="container">
					<section class="module-login">
						<c-form :name='loginForm.name' :actions='false' @submit.prevent='login()' title='login'>
							<c-field
								:label='t("username").cap'
								:value='loginForm.fields.username'
								validate='filled'
								name='username'>
								<label>ID</label>
								<input
									v-model='loginForm.fields.username'
									class="form-control"
									:placeholder='t("username").cap'
									type='text' />
							</c-field>

							<c-field
								:label='t("router-password").cap'
								:value='loginForm.fields.username'
								validate='filled'
								:icon='!showPassword ? "type-view" : ""'
								name='password'>
								<label @click='togglePassword($event)'>Password</label>
								<input
									v-model='loginForm.fields.password'
									:type='showPassword ? "text" : "password"'
									class="form-control" 
									:placeholder='t("router-password").cap' />
							</c-field>

							<!-- <div class="form-check mt-2">
								<input type="checkbox" class="form-check-input" id="RememberMe" v-model="remember">
								<label class="form-check-label" for="RememberMe">Remember Me</label>
							</div> -->

							<div class="mt-4">
								<button type="submit" class="btn">{{ t('login') }}</button>
							</div>
						</c-form>
					</section> <!-- /.module-login -->
					<div class="login-footer">
						<img src="@/images/dev/login/login-footer.png" alt="">
						<div class="copyright">{{ 'copyright 2023 kaonbroadband co., ltd. all right reserved - ' + $buildOptions.version || 'v0.0.0' }}</div>
					</div>
				</div> <!-- /.container -->
			</div> <!-- /.wrap-content -->
		</article> <!-- /.article -->
		<!-- end : article section -->
	</section> <!-- /.content-section -->
</template>
<script>
import ws from '@/shared/lib/ws'
import cForm from './login/form.vue'
import cField from './login/field.vue'
// import Language from 'components/language.vue'
import { digestMessage } from '@/shared/functions'
import filled from '@/shared/validators/filled.js'
import { reportError } from '@/shared/functions'

export default {
	components: {
		cForm,
		cField,
		// Language
	},
	data () {
		return {
			loginForm: {
				name: 'login-form',
				fields: {
					username: '',
					password: ''
				}
			},
			remember: false,
			showPassword: false,
		}
	},
	mounted: function () {
		document.body.className = 'login-page';
		this.loginForm.fields.username = sessionStorage.account;
		this.loginForm.fields.password = sessionStorage.orgPass;
	},
	methods: {
		togglePassword (e) {
			this.showPassword = !this.showPassword
		},
		login () {
			if (this.remember) {
				sessionStorage.setItem('account', this.loginForm.fields.username);
				sessionStorage.setItem('orgPass', this.loginForm.fields.password);
			} else {
				if (sessionStorage.getItem('account')) sessionStorage.removeItem('account');
				if (sessionStorage.getItem('orgPass')) sessionStorage.removeItem('orgPass');
			}
			// digestMessage(this.loginForm.fields.password).then(pass => {
			if(filled(this.loginForm.fields.username)){
				return reportError(this.t('username').cap+" : "+this.t('err.validation.filled-1').cap)
			}
			if(filled(this.loginForm.fields.password)){
				return reportError(this.t('password').cap+" : "+this.t('err.validation.filled-1').cap)
			}
			ws.conn(
				this.loginForm.fields.username,
				this.loginForm.fields.password,
			)
			// })
			
		}
	}
}
</script>
