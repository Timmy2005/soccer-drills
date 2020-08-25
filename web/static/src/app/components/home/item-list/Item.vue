<template>
	<li ref="el" class="item">
		<a @click="addLink" :href="session" target="_blank" :class="{ 'next-up-item': isNextUp, 'visited': visited && !isNextUp }">
			Session {{ sessionNum }}
		</a>
	</li>
</template>
<script>
	export default {
		name: 'Item',
		props: ['index'],
		computed: {
			session() {
				return this.$store.state.sessions[this.index]
			},
			sessionNum() {
				return this.index + 1
			},
			visited() {
				const visited = this.$store.state.visitedArr
				return visited ? visited.includes(this.sessionNum) : false
			},
			isNextUp() {
				return this.$store.getters.nextUp.sessionNum === this.sessionNum
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h3 {
		margin: 40px 0 0;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: flex;
	}
	
	a {
		color: var(--color-light);
		text-decoration: none;
	}
	
	a {
		cursor: pointer;
		display: flex;
		padding: 10px 0;
		transition: 150ms all ease;
		
	}
	
	a:hover {
		color: var(--color-dark);
	}
	
	.next-up-item {
		color: var(--color-dark);
		font-weight: 600;
	}
	
	.visited {
		color: var(--dark-grey);
	}
</style>
