<template>
	<div id="login">
		<div class="header">
			Sign In
		</div>
		<form id="password-form" @submit.prevent="login" spellcheck="false">
			<label id="username-text-field"
				   class="mdc-text-field mdc-text-field--filled text-field--inner password-field"
				   :class="{ 'text-field--invalid': invalidCredentials, 'mdc-text-field--disabled': textFieldDisabled }"
				   v-text-field>
				<input class="mdc-text-field__input" type="text" v-model="username" ref="username"
					   @keydown="(e) => e.key === 'Enter' ? null : this.invalidCredentials = false"
					   name="username" :disabled="textFieldDisabled">
				<span class="mdc-floating-label">Username</span>
				<span class="mdc-line-ripple" ref="ripple"></span>
			</label>
			<label id="password-text-field" ref="passwordTextField"
				   class="mdc-text-field mdc-text-field--filled text-field--inner password-field"
				   :class="{ 'text-field--invalid': invalidCredentials, 'mdc-text-field--disabled': textFieldDisabled }"
				   v-text-field>
				<input id="password-input" class="mdc-text-field__input"
					   type="password" v-model="password" ref="password"
					   @keydown="(e) => e.key === 'Enter' ? null : this.invalidCredentials = false"
					   name="password" :disabled="textFieldDisabled">
				<!--					   @animationstart="checkAnimation"-->
				<span class="mdc-floating-label" ref="passwordFloatingLabel">Password</span>
				<span class="mdc-line-ripple" ref="ripple"></span>
			</label>
			<div class="mdc-text-field-helper-line">
				<div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg"
					 :class="{ 'shake': shake }" aria-hidden="true">
					<i class="material-icons error-icon">error</i>
					{{ passwordErrorText }}
				</div>
			</div>
			<div class="button-container">
				<div class="sign-up" @click="register">
					Register
				</div>
				<button id="login-button" class="mdc-button mdc-button--unelevated" type="submit" v-button>
					<div class="mdc-button__ripple"></div>
					<span v-if="!processing" class="mdc-button__label">Sign In</span>
					<svg v-else class="spinner" viewBox="0 0 50 50">
						<circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
					</svg>
				</button>
			</div>
		</form>
	</div>
</template>
<script>
	import { MDCTextField } from '@material/textfield'
	import { button } from '../../directives.js'
	
	export default {
		name: 'Login',
		data() {
			return {
				processing: false,
				passwordErrorText: 'hi',
				shake: false,
				textFieldDisabled: false,
				password: '',
				username: '',
				invalidCredentials: false,
			}
		},
		methods: {
			login(e) {
				e.preventDefault()
				this.processing = true
				this.shake = false
				let that = this
				this.$http.post('/login-user/', {
					'username': this.username,
					'password': this.password,
				}).then(function (response) {
						console.log(response)
						if (response.data.login === 'valid') {
							window.location = response.data.url
						} else {
							that.passwordErrorText = 'Username or password is incorrect'
							that.invalidCredentials = true
							that.shake = true
						}
						that.processing = false
					})
					.catch(function (error) {
						console.log(error)
					})
			},
			register() {
				this.$store.dispatch('setRoute', 1)
			}
		},
		directives: {
			textField: {
				inserted(el, binding, vnode) {
					new MDCTextField(el)
					if (el.id === 'username-text-field') {
						let timeout = setTimeout(() => {
							vnode.context.$refs.username.focus()
							window.clearTimeout(timeout)
						}, 700)
					}
				}
			},
			button
		},
	}
</script>
<style scoped>
	.password-field {
		display: flex;
		flex: 1;
		background: transparent;
		padding: 0 2px;
		height: 45px;
	}
	
	#login {
		display: flex;
		flex-direction: column;
		width: 345px;
	}
	
	#login-button {
		margin-top: 35px;
		align-self: center;
		text-transform: none;
		font-size: 13px;
		font-weight: 400;
		letter-spacing: 0.02rem;
		padding: 4px 30px;
		border-radius: 3px;
		transition: background-color 250ms ease;
		will-change: background-color;
		min-height: 28px;
		min-width: 102px;
		justify-self: flex-end;
	}
	
	#password-form {
		display: flex;
		flex-direction: column;
	}
	
	#confirm-password-text-field {
		margin-top: 10px;
	}
	
	#username-text-field {
		margin-bottom: 10px;
	}
	
	.button-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	.sign-up {
		display: flex;
		height: 36px;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--mdc-theme-primary);
		font-size: 13px;
		-webkit-font-smoothing: antialiased;
		user-select: none;
		text-transform: none;
		letter-spacing: inherit;
		font-family: var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
		font-weight: 600;
	}
	
	#password-input:-webkit-autofill {
		animation: autofill !important;
	}
	
	#password-input:not(:-webkit-autofill) {
		animation: noAutofill;
	}
	
	@keyframes autofill {
		from {
		}
		to {
		}
	}
	
	@keyframes noAutofill {
		from {
		}
		to {
		}
	}
</style>
