<template>
	<div id="main-container">
		<div id="inner-next-up-container">
			<div class="title">Next up</div>
			<a v-if="href && sessionNum" id="next-up" :href="href.link" target="_blank" @click="addLink">
				<div>
					Session {{ sessionNum }}
				</div>
			</a>
			<div v-else class="content-placeholder">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'NextUp',
		computed: {
			href() {
				return this.$store.getters.nextUp.href
			},
			sessionNum() {
				return this.$store.getters.nextUp.sessionNum
			}
		},
		methods: {
			addLink() {
				if (this.sessionNum < 30) {
					const items = localStorage.getItem('visitedLinks')
					if (items) {
						let obj = JSON.parse(items)
						obj.push(this.sessionNum)
						localStorage.setItem('visitedLinks', JSON.stringify(obj))
					} else {
						localStorage.setItem('visitedLinks', JSON.stringify([this.sessionNum]))
					}
					this.updateVisitedArr()
				} else if (parseInt(this.sessionNum) === 30) {
					localStorage.setItem('visitedLinks', JSON.stringify([]))
					this.updateVisitedArr()
				}
			},
			updateVisitedArr() {
				let timeout = window.setTimeout(() => {
					this.$store.dispatch('setVisitedArr')
					this.$store.dispatch('setLastSessionDate')
					window.clearTimeout(timeout)
				}, 100)
			}
		}
	}
</script>
<style scoped>
	#main-container {
		display: flex;
		margin-top: 100px;
		flex: 1;
		flex-direction: column;
		align-items: center;
		
	}
	
	.title {
		font-size: 60px;
		width: auto;
		transition: color 250ms ease;
	}
	
	#next-up {
		text-decoration: none;
		font-size: 40px;
		width: auto;
		transition: 250ms all ease;
		color: var(--color-light);
		
	}
	
	#next-up:hover {
		color: var(--color-dark);
	}
	
	.content-placeholder {
		min-height: 55px;
		flex: 1;
	}
	
	#inner-next-up-container {
	
	}
</style>
