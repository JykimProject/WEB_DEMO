<!--template>
	<div class="login-page">
	  <div class="login-container">
		<div class="login-header">
		  <img src="" alt="Telia Company" class="logo" />
		  <h1>Telia Company</h1>
		</div>
		<button class="btn btn-expressive" @click="loginWithSSO">Telia login (SSO)</button>
		<div class="separator">
		  <span>or</span>
		</div>
		<div class="login-form">
		  <p>
			Login with password: External users. If you have not received a password,
			please notify your contact person at Telia.
		  </p>
		  <form @submit.prevent="login">
			<label for="email">Email:</label>
			<input type="email" id="email" v-model="email" placeholder="you@example.com" required />
			<label for="password">Password:</label>
			<input type="password" id="password" v-model="password" placeholder="Enter your password" required />
			<button type="submit" class="btn btn-primary">Login</button>
		  </form>
		  <a href="#" class="forgot-password">Lost your password?</a>
		</div>
	  </div>
	</div>
  </template-->
<template>
	<section class="content-section">
		<article class="article">
			<div class="wrap-content">
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

							<div class="mt-4">
								<button type="submit" class="btn">{{ t('login') }}</button>
							</div>
						</c-form>
					</section>
				</div>
			</div>
		</article>
	</section>
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
		}
	}
}
</script>
<!--style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('') no-repeat center center fixed;
  background-size: cover;
}

.login-container {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.login-header {
  text-align: center;
  margin-bottom: 1rem;
}

.logo {
  max-width: 100px;
  margin-bottom: 1rem;
}

.btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  background-color: #29003E;
  color: #F4E0FF;
}

.btn-expressive {
  background-color: #990AE3;
  color: white;
}

.separator {
  text-align: center;
  margin: 1rem 0;
  font-size: 0.875rem;
  color: #888;
}

.separator span {
  background: white;
  padding: 0 0.5rem;
}

.login-form p {
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #555;
}

.login-form label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.login-form input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.forgot-password {
  display: block;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #888;
  text-decoration: none;
}
</style-->