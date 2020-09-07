<template>
	<div @click="logout" class="user-drop-down-item  mdc-ripple-surface" v-ripple>
		<i class="material-icons">power_settings_new</i>
		Logout
	</div>
</template>
<script>
	import { ripple } from '../../../../directives.js'
	
	export default {
		name: 'Logout',
		methods: {
			logout() {
				this.$http.post('/logout-user/').then(response => {
					window.location = response.data.location
				}).catch(error => {
					console.log(error)
				})
			}
		},
		directives: {
			ripple
		}
	}
</script>
<style scoped lang="scss">
</style>
