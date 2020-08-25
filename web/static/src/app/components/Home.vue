<template>
	<div id="main-content">
		<div id="list-container">
			<ul ref="list" id="item-list" v-if="sessions.length > 0">
				<next-up-item-indicator></next-up-item-indicator>
				<item v-for="(session, index) in sessions" :index="index" :key="index"/>
			</ul>
			<item-content-placeholder v-else></item-content-placeholder>
		</div>
		<div id="content">
			<next-up></next-up>
			<div id="lastSession">{{ lastSession }}</div>
		</div>
	</div>
</template>
<script>
	import Item from '../components/home/item-list/Item.vue'
	import NextUp from '../components/home/NextUp.vue'
	import NextUpItemIndicator from '../components/home/item-list/NextUpItemIndicator.vue'
	import ItemContentPlaceholder from '../components/home/item-list/ItemContentPlaceholder.vue'
	
	export default {
		name: 'Home',
		components: {
			Item,
			NextUp,
			NextUpItemIndicator,
			ItemContentPlaceholder
		},
		computed: {
			sessions() {
				return this.$store.state.sessions
			},
			lastSessionDate() {
				return this.$store.state.lastSessionDate
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
				return this.$store.getters.nextUp
			},
			visitedArr() {
				return this.$store.state.visitedArr
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
				let that = this
				this.$nextTick(() => {
					let nextItemElTop = document.getElementsByClassName('next-up-item')[0].offsetTop - 300
					that.scrollTo(that.$refs.list, nextItemElTop, 500)
				})
			}
		},
		mounted() {
			this.$store.dispatch('initHome')
		}
	}
</script>
<style scoped>
</style>
