<template>
	<div id="submit-container">
		<button id="cancel-button" class="mdc-button" type="submit" @click="reset" v-button>
			<div class="mdc-button__ripple"></div>
			<span class="mdc-button__label">Cancel</span>
			<!--			<svg v-else class="spinner" viewBox="0 0 50 50">-->
			<!--				<circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>-->
			<!--			</svg>-->
		</button>
		<button id="submit-button" class="mdc-button mdc-button--unelevated" type="submit" @click="create" v-button>
			<div class="mdc-button__ripple"></div>
			<span class="mdc-button__label">Create group</span>
			<!--			<svg v-else class="spinner" viewBox="0 0 50 50">-->
			<!--				<circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>-->
			<!--			</svg>-->
		</button>
	</div>
</template>
<script>
	import { button } from '../../../../directives.js'
	
	export default {
		name: 'Submit',
		directives: {
			button
		},
		methods: {
			reset() {
				this.$store.dispatch('groups/newGroup/reset')
				this.$router.push('/groups/')
			},
			create() {
				this.$store.dispatch('groups/newGroup/createNewGroup').then(() => {
					this.$router.push(this.$store.state.groups.newGroup.next)
				})
			}
		}
	}
</script>
<style scoped>
	#submit-button, #cancel-button {
		text-transform: none;
		font-size: 13px;
		font-weight: 400;
		letter-spacing: 0.02rem;
		padding: 4px 30px;
		border-radius: 3px;
		transition: var(--dark-theme-background-transition);
		will-change: background-color;
		min-height: 28px;
		min-width: 102px;
	}
	
	.mdc-button:not(:first-child) {
		margin-left: 20px;
	}
	
	#submit-container {
		flex: 1;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: 20px 0;
		position: sticky;
		bottom: 0;
		width: 100%;
		background: var(--background);
		transition: var(--dark-theme-background-transition);
	}
</style>
