<template>
	<div id="select-container">
		<div v-if="status === 0" class="content-placeholder"></div>
		<select v-else id="select-group" v-model="selectedGroup">
			<option disabled selected value="undefined">Select group</option>
			<option v-for="group in groups" :value="group.groupId">
				{{ group.name }}
			</option>
		</select>
	</div>
</template>
<script>
	export default {
		name: 'SelectGroup',
		computed: {
			groups() {
				return this.$store.state.home.groups
			},
			selectedGroup: {
				get() {
					return this.$store.state.home.selectedGroup
				},
				set(value) {
					this.$store.dispatch('home/setSelectedGroup', value)
				}
			},
			status() {
				return this.$store.getters['home/status']
			}
		}
	}
</script>
<style scoped>
	#select-container {
		display: flex;
		z-index: 1;
	}
	
	#select-group {
		background: transparent;
		border: 0;
		color: var(--text-color);
		transition: var(--dark-theme-text-transition);
		font-family: Avenir, Helvetica, Arial, sans-serif;
		outline: none;
	}
	
	.content-placeholder {
		width: 100px;
		height: 20px;
	}
</style>
