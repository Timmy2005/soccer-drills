<template>
	<div id="app" :class="[{ 'dark-theme': darkTheme, 'not-loaded': !loaded},  darkTheme ? 'theme--dark' : 'theme--light']" class="theme" v-mounted>
		<div id="menu-overlay" @click="closeMenu" :class="{ 'menu-overlay-open': menuOpen }"></div>
		<menu-el></menu-el>
		<top-bar></top-bar>
		<router-view></router-view>
	</div>
</template>
<script>
	import TopBar from './components/top-bar/TopBar.vue'
	import Menu from './components/menu/Menu.vue'
	
	import '../../css/themes.scss'
	import '../../css/themes.css'
	
	export default {
		name: 'App',
		components: {
			TopBar,
			MenuEl: Menu
		},
		data() {
			return {
				loaded: false
			}
		},
		computed: {
			darkTheme() {
				const darkTheme = this.$store.state.config.darkTheme
				document.body.style.background = darkTheme ? '#292929' : 'white'
				return darkTheme
			},
			menuOpen() {
				return this.$store.state.menu.open
			}
		},
		methods: {
			closeMenu() {
				this.$store.dispatch('closeMenu')
			}
		},
		mounted() {
			this.$store.dispatch('config/getUserSettings')
		},
		directives: {
			mounted: {
				inserted(el, binding, vnode) {
					vnode.context.loaded = true
					vnode.context.$nextTick(() => {
						document.getElementById('p-container').remove()
					})
				}
			}
		}
	}
</script>
<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: var(--text-color);
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--background);
		transition: var(--dark-theme-background-transition);
		
	}
	
	#app.not-loaded {
		/*display: none;*/
	}
	
	#main-content {
		display: flex;
		flex: 1;
		overflow: hidden;
		position: relative;
	}
	
	a:visited + a {
		display: flex;
	}
	
	#item-list {
		padding: 20px 60px 20px 50px;
		overflow: scroll;
		margin: 0;
		position: relative;
		height: 100%;
		box-sizing: border-box;
	}
	
	#list-container::after, #list-container::before {
		position: absolute;
		content: '';
		height: 50px;
		left: 0;
		right: 0;
		z-index: 5;
		bottom: -10px;
		pointer-events: none;
		transition: opacity var(--dark-theme-transition);
	}
	
	#list-container::after {
		background-image: linear-gradient(transparent, var(--background-light));
		
	}
	
	#list-container::before {
		background-image: linear-gradient(transparent, var(--background-dark));
	}
	
	#app.dark-theme #list-container::after {
		opacity: 0;
	}
	
	#app:not(.dark-theme) #list-container::before {
		opacity: 0;
	}
	
	
	
	#list-container {
		max-height: 100%;
		position: relative;
		width: auto;
		border-right: var(--border-color) 1px solid;
		transition: var(--dark-theme-border-transition);
		min-width: 190px;
	}
	
	#item-list::-webkit-scrollbar {
		display: none;
	}
	
	#item-list {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	
	input[type=number] {
		-moz-appearance: textfield;
	}
	
	#content {
		margin-right: 160px;
		flex: 1;
	}
	
	#lastSession {
		margin-top: 20px;
		transition: var(--dark-theme-text-transition);
	}
	
	#menu-overlay {
		background: black;
		opacity: 0;
		z-index: -2;
		position: absolute;
		right: 0;
		left: 0;
		bottom: 0;
		top: 0;
		transition: opacity 250ms ease, z-index 0ms ease 250ms;
		will-change: opacity, z-index;
	}
	
	#menu-overlay.menu-overlay-open {
		opacity: 0.6;
		z-index: 20;
		transition: opacity 250ms ease;
	}
	
	.mdc-icon-button::before {
		transition: opacity 100ms linear, background-color 250ms linear !important;
	}
	
	.logo-container {
		background: var(--logo) center no-repeat;
		width: 150px;
		height: 36px;
		background-size: 75%;
	}
	
	.content-placeholder {
		background: var(--content-placeholder);
		transition: var(--dark-theme-background-transition);
	}
	
	.router-link-active {
		outline: none;
	}
</style>
