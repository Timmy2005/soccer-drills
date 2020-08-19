<template>
	<div id="set-completed-sessions-container">
		<div id="set-completed-sessions-container-inner">
			<input placeholder="Last completed" id="set-completed-sessions" type="number" min="0" max="30"
				   @keyup.13="setCompletedSessions" v-model="inputIndex">
			<div id="set-completed-sessions-shadow"></div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'SetCompletedSessions',
		computed: {
			inputIndex: {
				get() {
					return this.$store.state.inputIndex
				},
				set(value) {
					this.$store.dispatch('setInputIndexInputValue', value)
				}
			}
		},
		methods: {
			setCompletedSessions() {
				if (this.inputIndex >= 0 && this.inputIndex <= 29) {
					let array = []
					for (let i = 0; i < this.inputIndex; i++) {
						array.push(i + 1)
					}
					localStorage.setItem('visitedLinks', JSON.stringify(array))
					this.$store.dispatch('setVisitedArr')
				}
				if (parseInt(this.inputIndex) === 30) {
					localStorage.setItem('visitedLinks', JSON.stringify([]))
					this.$store.dispatch('setVisitedArr')
				}
			}
		}
	}
</script>
<style scoped>
	#set-completed-sessions {
		outline: none;
		border: none;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: var(--color-light);
		width: 91px;
		background: transparent;
	}
	
	#set-completed-sessions-container-inner {
		padding: 4px 14px;
		border-radius: 30px;
		border: var(--color-dark) 1px solid;
		position: relative;
	}
	
	#set-completed-sessions-shadow {
		width: 100%;
		height: 100%;
		box-shadow: 0 0 5px 0 var(--color-light);
		border-radius: 30px;
		z-index: -1;
		opacity: 0;
		transition: opacity 150ms ease;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	#set-completed-sessions:focus ~ #set-completed-sessions-shadow {
		opacity: 1 !important;
	}
	
	#set-completed-sessions:hover ~ #set-completed-sessions-shadow {
		opacity: .35;
	}
	
	#set-completed-sessions-container {
		margin-right: 20px;
	}
	
	::-webkit-input-placeholder { /* Edge */
		color: var(--dark-grey);
	}
	
	:-ms-input-placeholder { /* Internet Explorer 10-11 */
		color: var(--dark-grey);
	}
	
	::placeholder {
		color: var(--dark-grey);
	}
</style>
