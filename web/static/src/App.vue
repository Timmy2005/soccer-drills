<template>
	<div id="app" :class="{ 'dark-theme': darkTheme }">
		<menu-el></menu-el>
		<top-bar></top-bar>
		<div id="main-content">
			<div id="list-container">
				<ul ref="list">
					<next-up-item-indicator></next-up-item-indicator>
					<item v-for="(link, index) in links" :index="index" :key="index"/>
				</ul>
			</div>
			<div id="content">
				<next-up></next-up>
				<div id="lastSession">{{ lastSession }}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Item from './components/item-list/Item.vue'
	import NextUp from './components/NextUp.vue'
	import TopBar from './components/TopBar.vue'
	import NextUpItemIndicator from './components/item-list/NextUpItemIndicator.vue'
	import Menu from './components/menu/Menu.vue'
	
	export default {
		name: 'App',
		components: {
			Item,
			NextUp,
			TopBar,
			NextUpItemIndicator,
			MenuEl: Menu,
		},
		computed: {
			darkTheme() {
				const darkTheme = this.$store.state.darkTheme
				document.body.style.background = darkTheme ? '#292929' : 'white'
				return darkTheme
			},
			nextUp() {
				return this.$store.getters.nextUp
			},
			lastSession() {
				if (this.lastSessionDate) {
					let daysSince = this.getDaysSince(this.lastSessionDate)
					return this.daysAgoToString(daysSince)
				} else {
					return 'You have not completed any sessions yet'
				}
			},
			visitedArr() {
				return this.$store.state.visitedArr
			},
			lastSessionDate() {
				return this.$store.state.lastSessionDate
			},
			links() {
				return this.$store.state.links
			}
		},
		methods: {
			scrollTo(element, to, duration) {
				const that = this
				let toMod = to > element.offsetHeight ? element.offsetHeight : to
				let start = element.scrollTop,
					change = toMod - start,
					currentTime = 0,
					increment = 20;
				
				let animateScroll = function () {
					currentTime += increment;
					element.scrollTop = that.easeInOutQuad(currentTime, start, change, duration);
					if (currentTime < duration) {
						setTimeout(animateScroll, increment);
					}
				};
				animateScroll();
			},
			easeInOutQuad(t, b, c, d) {
				t /= d / 2;
				if (t < 1) return c / 2 * t * t + b;
				t--;
				return -c / 2 * (t * (t - 2) - 1) + b;
			},
			daysAgoToString(days) {
				const prefix = 'Your last session was '
				if (days === 0) {
					return prefix + 'today'
				} else if (days === 1) {
					return prefix + 'yesterday'
				} else {
					return prefix + days + ' days ago'
				}
			},
			getDaysSince(lastDate) {
				let one_day = 1000 * 60 * 60 * 24
				
				let present_date = new Date()
				
				if (present_date.getMonth() === 11 && present_date.getDate() > 25) {
					lastDate.setFullYear(lastDate.getFullYear() + 1)
				}
				let result = Math.round(lastDate.getTime() - present_date.getTime()) / (one_day)
				
				return Math.abs(parseInt(result.toFixed(0)))
			}
		},
		watch: {
			nextUp() {
				let that = this
				this.$nextTick(() => {
					let nextItemElTop = document.getElementsByClassName('next-up-item')[0].offsetTop - 300
					that.scrollTo(that.$refs.list, nextItemElTop, 500)
				})
			}
		},
		mounted() {
			this.$store.dispatch('setVisitedArr')
			this.$store.dispatch('setLastSessionDate')
		},
		data() {
			return {
				weekdays: [
					'Sunday',
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday'
				],
				months: [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec'
				
				]
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
	
	#main-content {
		display: flex;
		flex: 1;
		overflow: hidden;
	}
	
	a:visited + a {
		display: flex;
	}
	
	ul {
		padding: 20px 60px 20px 50px;
		overflow: scroll;
		margin: 0;
		border-right: var(--border-color) 1px solid;
		transition: var(--dark-theme-border-transition);
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
		border-right: var(--border-color) 1px solid;
		transition: var(--dark-theme-border-transition), opacity 250ms ease;
		bottom: -10px;
	}
	
	#list-container::after {
		background-image: linear-gradient(transparent, white);
		
	}
	
	#list-container::before {
		background-image: linear-gradient(transparent, #292929);
		
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
		
	}
	
	ul::-webkit-scrollbar {
		display: none;
	}
	
	ul {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	
	#app:not(.dark-theme) {
		--background: white;
		--border-color: #e0e0e0;
		--text-color: #2c3e50;
		--color-light: #42a7b9;
		--color-dark: #2f6b8c;
		--dark-grey: #949494
	}
	
	#app.dark-theme {
		--background: #292929;
		--border-color: #555555;
		--text-color: #eeeeee;
		--color-light: #82c0cb;
		--color-dark: #447591;
		--dark-grey: #b7b7b7
	}
	
	#app {
		--dark-theme-background-transition: 250ms background ease;
		--dark-theme-border-transition: 250ms border ease;
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
		transition: color 250ms ease;
	}
</style>
