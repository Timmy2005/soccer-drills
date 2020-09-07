<template>
	<div id="main-content">
		<div id="groups-header">Groups</div>
		<div class="groups" v-show="groupsMounted">
			<group-item v-for="(group, index) in groups" :index="index" :key="index"></group-item>
			<router-link to="/groups/new" id="new-group-button-container">
				<div id="new-group-button" class="mdc-ripple-surface" v-ripple>
					<div ></div>
					<i class="material-icons" id="add-group-icon">add</i>
					Add group
				</div>
			</router-link>
		</div>
		<content-placeholder v-if="!groupsMounted"></content-placeholder>
	</div>
</template>
<script>
	import GroupItem from './groups/GroupItem.vue'
	import ContentPlaceholder from './groups/ContentPlaceholder.vue'
	import {ripple} from '../../directives.js'
	
	export default {
		name: 'Groups',
		components: {
			GroupItem,
			ContentPlaceholder
		},
		computed: {
			groups() {
				return this.$store.state.groups.groups
			},
			groupsMounted() {
				return this.$store.state.groups.groupsMounted
			}
		},
		mounted() {
			this.$store.dispatch('groups/init')
		},
		directives: {
			ripple
		}
	}
</script>
<style scoped>
	#main-content {
		flex-direction: column;
		padding: 0 20%;
	}
	
	#new-group-button-container {
		display: flex;
		flex: 0 0 33.333%;
		align-items: stretch;
		justify-content: center;
		transition: var(--dark-theme-text-transition);
		color: var(--success);
		opacity: 1;
		position: relative;
		text-decoration: none;
		height: 105px;
	}
	
	#new-group-button {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		user-select: none;
		flex: 1;
		margin: 10px 10px;
		padding-right: 10px;
		border-radius: 15px;
	}
	
	.mdc-ripple-surface::before, .mdc-ripple-surface::after {
		background-color: var(--success);
	}
	
	.groups {
		flex: 1;
		margin-top: 30px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: flex-start;
	}
	
	#groups-header {
		transition: var(--dark-theme-text-transition);
		margin-top: 60px;
		display: flex;
		font-size: 30px;
		margin-left: 20px;
	}
	
	#add-group-icon {
		margin-right: 5px;
		margin-bottom: 1px;
	}
</style>
