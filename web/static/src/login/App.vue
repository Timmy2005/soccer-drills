<template>
	<div id="app" :class="{ 'dark-theme': darkTheme }">
		<div id="main-card">
			<div class="logo-container"></div>
			<div id="content">
				<transition :name="'slide-' + transitionDirection">
					<router-view></router-view>
				</transition>
			</div>
		</div>
		<input type="hidden" :value="route">
	</div>
</template>
<script>
	import '../../css/themes.scss'
	
	export default {
		name: 'App',
		computed: {
			route() {
				let route = this.$store.getters['route']
				
				if (this.$store.state.redirect) {
					this.$route.path !== route && this.$router.push(route)
					this.$store.dispatch('turnOffRedirect')
				} else {
					let path = this.$route.path
					let routeIndex = this.$store.state.routes.findIndex(route => route === path)
					this.$store.dispatch('setRoute', routeIndex)
					this.$store.dispatch('turnOffRedirect')
					
				}
				
				return this.$store.getters['route']
			},
			darkTheme() {
				const darkTheme = this.$store.state.darkTheme
				document.body.style.background = darkTheme ? '#292929' : 'white'
				return darkTheme
			},
			transitionDirection() {
				
				return this.$store.state.transitionDirection
			}
		}
	}
</script>
<style scoped>
	#app {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}
	
	#main-card {
		display: flex;
		max-height: 500px;
		height: 341px;
		padding: 48px 40px 60px;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		flex: 1;
		max-width: 448px;
		position: relative;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
	}
	
	.logo-container {
		background: var(--logo) center no-repeat;
		width: 300px;
		height: 82px;
		background-size: 75%;
		margin-bottom: 30px;
		margin-right: 20px;
		min-height: 82px;
	}
	
	.enter-enter-active {
		transition: transform 500ms cubic-bezier(.13, .59, .65, .99) 500ms, opacity 500ms ease-in-out 500ms;
		will-change: transform, opacity;
	}
	
	.enter-enter {
		opacity: 0;
		transform: translateY(50%);
	}
	
	.enter-enter-to {
		opacity: 1;
	}
	
	.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active {
		transition: transform 300ms cubic-bezier(.45, .21, .19, .88);
		will-change: transform;
		position: absolute;
	}
	
	.slide-right-enter, .slide-left-leave-to {
		transform: translateX(150%);
		position: absolute;
	}
	
	.slide-right-leave-to, .slide-left-enter {
		transform: translateX(-150%);
		position: absolute;
	}
	
	.slide-right-enter-to, .slide-right-leave, .slide-left-enter-to, .slide-left-leave {
		transform: translateX(0%);
	}
	
	#content {
		display: flex;
		flex: 1;
		height: 100%;
		align-self: stretch;
		align-content: center;
		justify-content: center;
	}
	
	.demo-sign-in-button-container {
		/*bottom: 0;*/
		top: 0;
		display: flex;
		flex-direction: row;
		right: 0;
		position: absolute;
		/*transform: translateY(400px);*/
	}
	
	.all-content {
		display: flex;
		flex-direction: column;
	}
	
	.demo-sign-in-button {
		display: flex;
		height: 36px;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: #989898;
		font-size: 13px;
		-webkit-font-smoothing: antialiased;
		user-select: none;
		text-transform: none;
		letter-spacing: inherit;
		font-family: var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
		font-weight: 600;
		margin: 0 20px;
	}
	
	.demo-sign-in-enter-active, .demo-sign-in-leave-active {
		transition: opacity 100ms;
	}
	
	.demo-sign-in-enter, .demo-sign-in-leave-to {
		opacity: 0;
	}
	
	.demo-sign-in-enter-to, .demo-sign-in-leave {
		opacity: 1;
	}
</style>
