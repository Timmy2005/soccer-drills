<template>
	<li ref="el" class="item">
		<a @click="addSession" :href="session.link" target="_blank"
		   :class="{ 'next-up-item': isNextUp, 'visited': visited && !isNextUp }">
			Session {{ sessionNum }}
		</a>
	</li>
</template>
<script>
	export default {
		name: 'Item',
		props: ['id'],
		computed: {
			session() {
				return this.$store.state.home.sessions.find(x => x.id === this.id)
			},
			sessionNum() {
				return this.session.index + 1
			},
			visited() {
				const visited = this.$store.state.home.groupProgress
				return visited.some(x => x.id === this.id)
			},
			isNextUp() {
				return this.$store.getters['home/nextUp'].id === this.id
			}
		},
		methods: {
			addSession() {
				this.$store.dispatch('home/sessionCompleted', this.id)
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
