<template>
  <li ref="el" class="item">
    <a @click="addLink" :href="link" target="_blank" :class="{ 'next-up-item': isNextUp }">
      <div class="next-up-indicator" :class="{ 'next-up-indicator-active': isNextUp }"></div>
      Session {{ sessionNum }}
    </a>
  </li>
</template>

<script>
export default {
	name: 'Item',
	props: {
		link: String,
		sessionNum: Number,
        visited: Boolean,
        isNextUp: Boolean
    },
	methods: {
		addLink() {
            const items = localStorage.getItem('visitedLinks')
            if (items) {
              let obj = JSON.parse(items)
              obj.push(this.sessionNum)
              localStorage.setItem('visitedLinks', JSON.stringify(obj))
            } else {
              localStorage.setItem('visitedLinks', JSON.stringify([this.sessionNum]))
            }
            this.$emit('visited-changed')
		},
	},
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
  color: #42a7b9;
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
    color: #2f6b8c;
    font-weight: 600;
  }
  
  .next-up-indicator {
    max-width: 0;
    width: 5px;
    background: var(--color-dark);
    margin-right: 0;
    will-change: max-width, margin-right;
    transition: max-width 250ms, margin-right 150ms 100ms ease-out;
  }
  
  .next-up-indicator-active {
    max-width: 5px;
    margin-right: 10px;
    transition: max-width 250ms, margin-right 150ms;
  
  }
</style>
