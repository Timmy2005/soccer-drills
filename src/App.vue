<template>
  <div id="app">
    <ul>
      <item v-for="(link, index) in links" :link="link" :sessionNum="index+1" :key="index"
			:visited="isVisited(index+1)" @visited-changed="updateVisitedArr"/>
    </ul>
    <next-up :session-num="nextUp.sessionNum" :href="nextUp.href" @visited-changed="updateVisitedArr"></next-up>
    <div class="clear-next-up" @click="clearNextUp">Clear</div>
  </div>
</template>

<script>
import Item from './components/Item.vue'
import NextUp from '@/components/NextUp.vue'

export default {
	name: 'App',
	components: {
		Item,
		NextUp
	},
	computed: {
		nextUp() {
			let runningIndex = 1
			
			const that = this
			
			console.log(that.visitedArr)
			that.nextUpLinkIndex = null
			if (that.visitedArr.length > 0) {
				for (let i of that.visitedArr) {
					if (runningIndex !== i) {
						console.log(runningIndex)
						console.log(i)
						that.nextUpLinkIndex = runningIndex
						break
					}
					runningIndex++
				}
				if (!this.nextUpLinkIndex) {
					that.nextUpLinkIndex = that.visitedArr[that.visitedArr.length - 1] + 1
				}
			} else {
				that.nextUpLinkIndex = 1
			}
			return {
				sessionNum: that.nextUpLinkIndex,
				href: this.links[this.nextUpLinkIndex - 1]
			}
		}
	},
	methods: {
		isVisited(sessionNum) {
			const visited = localStorage.getItem('visitedLinks')
			console.log(visited)
			return visited ? visited.includes(sessionNum) : false
		},
		clearNextUp() {
			localStorage.setItem('visitedLinks', JSON.stringify([]))
			this.updateVisitedArr()
		},
		updateVisitedArr() {
			console.log('ran')
			this.visitedArr = JSON.parse(localStorage.getItem('visitedLinks')).sort((a, b) => a - b)
		}
	},
	mounted() {
		this.updateVisitedArr()
	},
	data() {
		return {
			links: [
				'https://www.facebook.com/318748909507/videos/649968942464224',
				'https://www.facebook.com/318748909507/videos/2612971758972997/',
				'https://www.facebook.com/318748909507/videos/498942800766464/',
				'https://www.facebook.com/318748909507/videos/527572888153782/',
				'https://www.facebook.com/318748909507/videos/926772904410122/',
				'https://www.facebook.com/318748909507/videos/2574431759464489/',
				'https://www.facebook.com/318748909507/videos/247198643102613/',
				'https://www.facebook.com/318748909507/videos/1588663631296750/',
				'https://www.facebook.com/318748909507/videos/2665635223721596/',
				'https://www.facebook.com/318748909507/videos/2669484819990940/',
				'https://www.facebook.com/318748909507/videos/535514280498748/',
				'https://www.facebook.com/318748909507/videos/3697736870267369/',
				'https://www.facebook.com/318748909507/videos/705004410305115/',
				'https://www.facebook.com/318748909507/videos/3025730300817570/',
				'https://www.facebook.com/318748909507/videos/222023952224132/',
				'https://www.facebook.com/318748909507/videos/659991487900808/',
				'https://www.facebook.com/318748909507/videos/629913900921785/',
				'https://www.facebook.com/318748909507/videos/2911103542318651/',
				'https://www.facebook.com/318748909507/videos/836336946858397/',
				'https://www.facebook.com/318748909507/videos/245310483493661/',
				'https://www.facebook.com/318748909507/videos/251541702868527/',
				'https://www.facebook.com/318748909507/videos/2614751715434132/',
				'https://www.facebook.com/318748909507/videos/165132848228069/',
				'https://www.facebook.com/318748909507/videos/184435959355973/',
				'https://www.facebook.com/318748909507/videos/244576203543813/',
				'https://www.facebook.com/318748909507/videos/276445793512600/',
				'https://www.facebook.com/318748909507/videos/710323713052933/',
				'https://www.facebook.com/318748909507/videos/246632956586240/',
				'https://www.facebook.com/318748909507/videos/556846081927489/',
				'https://www.facebook.com/318748909507/videos/171019884353180/'
			],
			nextUpLinkIndex: null,
			visitedArr: []
		}
	},
	
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 40px;
	display: flex;
	
}

a:visited + a {
	display: flex;
}

ul {
	width: 120px;
}

.clear-next-up {
	position: absolute;
	right: 20px;
	top: 10px;
	font-size: 15px;
	cursor: pointer;
}
</style>
