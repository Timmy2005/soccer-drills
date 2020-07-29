<template>
  <div id="app">
    <div id="set-completed-sessions-container">
      <div id="set-completed-sessions-container-inner">
        <input placeholder="Session" id="set-completed-sessions" type="number" min="0" max="30" @keyup.13="setCompletedSessions" v-model="inputIndex">
        <div id="set-completed-sessions-shadow"></div>
      </div>
    </div>
    <div id="list-container">
      <ul>
  
        <item v-for="(link, index) in links" :link="link" :sessionNum="index+1" :key="index"
              :visited="isVisited(index+1)" @visited-changed="clickedUpdateVisitedArr" :is-next-up="isNextUp(index+1)"/>
      </ul>
    </div>
    <next-up :session-num="nextUp.sessionNum" :href="nextUp.href" @visited-changed="clickedUpdateVisitedArr"></next-up>
    <div class="clear-next-up" @click="clearNextUp">Clear</div>
  </div>
</template>

<script>
import Item from './components/Item.vue'
import NextUp from './components/NextUp.vue'

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
			
			that.nextUpLinkIndex = null
			if (that.visitedArr.length > 0) {
				for (let i of that.visitedArr) {
					if (runningIndex !== i) {
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
		},
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
        clickedUpdateVisitedArr() {
          let timeout = window.setTimeout(() => {
            this.updateVisitedArr()
            window.clearTimeout(timeout)
          }, 100)
        },
		updateVisitedArr() {
            this.visitedArr = JSON.parse(localStorage.getItem('visitedLinks')).sort((a, b) => a - b)
		},
		isNextUp(sessionNum) {
			return this.nextUp.sessionNum === sessionNum
		},
        setCompletedSessions() {
          if (this.inputIndex >= 0 && this.inputIndex <= 29) {
            let array = []
            for (let i = 0; i < this.inputIndex; i++) {
              array.push(i+1)
            }
            localStorage.setItem('visitedLinks', JSON.stringify(array))
            this.updateVisitedArr()
          } if (parseInt(this.inputIndex) === 30) {
            localStorage.setItem('visitedLinks', JSON.stringify([]))
            this.updateVisitedArr()
          }
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
			visitedArr: [],
			inputIndex: null
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
		display: flex;
      height: 100%;
	
	}

	a:visited + a {
		display: flex;
	}

	ul {
      padding: 20px 50px;
      overflow: scroll;
      margin: 0;
      border-right: #e0e0e0 1px solid;
      width: 200px;
      position: relative;
      height: 100%;
      box-sizing: border-box;
	}

    #list-container::before, #list-container::after {
      position: absolute;
      content: '';
      height: 20px;
      left: 0;
      right: 0;
      z-index: 5;
    }
    
    #list-container::before {
      top: 0;
      background-image: linear-gradient(white, transparent);
    }

    #list-container::after {
      bottom: 0;
      background-image: linear-gradient(transparent, white);
    }
    
    #list-container {
      max-height: 100%;
      position: relative;
      width: auto;
      
    }

    ul::-webkit-scrollbar {
      display: none;
    }

    ul {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

	.clear-next-up {
		position: absolute;
		right: 20px;
		top: 20px;
		font-size: 15px;
		cursor: pointer;
	}

	#set-completed-sessions {
		--color: #2f6b8c;
		outline: none;
		border: none;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: var(--color-light);
		width: 50px;
	}

	#set-completed-sessions-container {
		position: absolute;
		top: 15px;
		right: 75px;
	
	}

	#set-completed-sessions-container-inner {
		padding: 4px 14px;
		margin-bottom: 10px;
		border-radius: 30px;
		border: var(--color-dark) 1px solid;
		position: relative;
	}

	#set-completed-sessions-shadow {
		width: 100%;
		height: 100%;
		box-shadow: 0 0 5px 0 var(--color-light);
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		border-radius: 30px;
		z-index: -1;
		opacity: 0;
		transition: opacity 150ms ease;
	}

	#set-completed-sessions:focus ~ #set-completed-sessions-shadow {
		opacity: 1;
	}

	:root {
		--color-light: #42a7b9;
		--color-dark: #2f6b8c;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type=number] {
		-moz-appearance: textfield;
	}
 
 
</style>
