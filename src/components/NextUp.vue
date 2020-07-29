<template>
	<div id="main-container">
		<div class="title">Next up</div>
		<a id="next-up" :href="href" target="_blank" @click="addLink">
			<div>
				Session {{ sessionNum }}
			</div>
		</a>
	</div>
</template>

<script>
export default {
	name: 'NextUp',
	props: ['href', 'sessionNum'],
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
					console.log(localStorage)
				}
				this.$emit('visited-changed')
			} else if (parseInt(this.sessionNum) === 30) {
				localStorage.setItem('visitedLinks', JSON.stringify([]))
				this.$emit('visited-changed')
			}
		},
	},
}
</script>

<style scoped>
	#main-container {
		display: flex;
		margin-top: 100px;
		flex: 1;
		flex-direction: column;
		margin-right: 160px;
		align-items: center;
		
	}
	
	.title {
		font-size: 30px;
		width: auto;
		/*margin-right: 40px;*/
	}
	
	#next-up {
		text-decoration: none;
		font-size: 20px;
		width: auto;
		transition: 250ms all ease;
		color: var(--color-light);
		
	}
	
	#next-up:hover {
		color: var(--color-dark);
	}
</style>