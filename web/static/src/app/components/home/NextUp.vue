<template>
	<div id="main-container">
		<div id="inner-next-up-container">
			<div class="title">Next up</div>
			<a v-if="href && sessionNum" id="next-up" :href="href" target="_blank" @click="addSession">
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
				return this.$store.getters['home/nextUp'].link
			},
			sessionNum() {
				return this.$store.getters['home/nextUp'].index + 1
			},
			id() {
				return this.$store.getters['home/nextUp'].id
			}
		},
		methods: {
			addSession() {
				this.$store.dispatch('home/sessionCompleted', this.id)
			},
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
		transition: var(--dark-theme-text-transition);
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
