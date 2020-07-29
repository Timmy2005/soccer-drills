<template>
  <li ref="el" class="item"><a @click="addLink" :href="link" target="_blank">Session {{ sessionNum }}</a></li>
</template>

<script>
export default {
	name: 'Item',
	props: {
		link: String,
		sessionNum: Number,
        visited: Boolean,
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
  margin: 0 10px;
  }

  a {
  color: #42a7b9;
  text-decoration: none;
  }

  /*a:visited {*/
	/*  color: #295d7a;*/
  /*}*/

  .next-up {
  position: absolute;
  top: 200px;
  right: 50%;
  left: 50%;
  display: none;
  }
  
  .item {
    transition: all 250ms ease;
    will-change: margin-left, transform;
  }
  
  .item:hover {
    margin-left: 20px;
    transform: scale(1.2);
  }

</style>
