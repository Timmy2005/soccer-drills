<template>
	<div id="main-content">
		<actions></actions>
		<edit-group></edit-group>
		<div v-if="status <= 1" id="inner">
			<div id="list-container">
				<ul ref="list" id="item-list" v-if="status === 1">
					<next-up-item-indicator></next-up-item-indicator>
					<item v-for="session in sessions" :id="session.id" :key="session.id"/>
				</ul>
				<item-content-placeholder v-else></item-content-placeholder>
			</div>
			<div id="content">
				<next-up></next-up>
				<div id="lastSession">{{ lastSession }}</div>
			</div>
		</div>
		<div v-else-if="status === 2" id="no-sessions">There no sessions in this group</div>
		<no-group-selected v-else></no-group-selected>
	</div>
</template>
<script>
	import Item from '../components/home/item-list/Item.vue'
	import NextUp from '../components/home/NextUp.vue'
	import NextUpItemIndicator from '../components/home/item-list/NextUpItemIndicator.vue'
	import ItemContentPlaceholder from '../components/home/item-list/ItemContentPlaceholder.vue'
	import NoGroupSelected from './home/NoGroupSelected.vue'
	import Actions from './home/Actions.vue'
	import EditGroup from './home/EditGroup.vue'
	
	export default {
		name: 'Home',
		components: {
			Item,
			NextUp,
			NextUpItemIndicator,
			ItemContentPlaceholder,
			NoGroupSelected,
			Actions,
			EditGroup
		},
		computed: {
			sessions() {
				return this.$store.state.home.sessions
			},
			lastSessionDate() {
				return this.$store.state.home.lastSessionDate
			},
			lastSession() {
				if (this.lastSessionDate) {
					let daysSince = this.getDaysSince(this.lastSessionDate)
					return this.daysAgoToString(daysSince)
				} else {
					return 'You have not completed any sessions yet'
				}
			},
			nextUp() {
				return this.$store.getters['home/nextUp']
			},
			sessionsLoaded() {
				return this.$store.state.home.sessionsLoaded
			},
			status() {
				return this.$store.getters['home/status']
			}
		},
		methods: {
			scrollTo(element, to, duration) {
				const that = this
				let toMod = to > element.offsetHeight ? element.offsetHeight : to
				let start = element.scrollTop,
					change = toMod - start,
					currentTime = 0,
					increment = 20
				
				let animateScroll = function () {
					currentTime += increment
					element.scrollTop = that.easeInOutQuad(currentTime, start, change, duration)
					if (currentTime < duration) {
						setTimeout(animateScroll, increment)
					}
				}
				animateScroll()
			},
			easeInOutQuad(t, b, c, d) {
				t /= d / 2
				if (t < 1) {
					return c / 2 * t * t + b
				}
				t--
				return -c / 2 * (t * (t - 2) - 1) + b
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
				if (this.$store.state.home.sessions && this.$store.state.home.sessions.length > 0) {
					let that = this
					this.$nextTick(() => {
						let nextItemElTop = document.getElementsByClassName('next-up-item')[0].offsetTop - 300
						that.scrollTo(that.$refs.list, nextItemElTop, 500)
					})
				}
			}
		},
		mounted() {
			this.$store.dispatch('home/init')
			this.$store.dispatch('home/setLastSessionDate')
		}
	}
</script>
<style scoped>
	#inner {
		display: flex;
		flex: 1;
		overflow: hidden;
		position: relative;
	}
	
	#no-sessions {
		display: flex;
		flex: 1;
		margin-top: 100px;
		justify-content: center;
		font-size: 20px;
		transition: var(--dark-theme-text-transition);
	}
</style>
