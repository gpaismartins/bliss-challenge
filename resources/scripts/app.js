import './bootstrap'

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, {locale: 'en'});

import {EventBus, breakPoint, cookies, onScroll} from './mixin'
import modal from './components/modal.vue'
import list from './modules/list'
import detail from './modules/detail' 


const app = new Vue({
	el: '#app',

	mixins: [
		EventBus,
		breakPoint,
		cookies,
		onScroll,
	],

	components: {
		modal,
		list,
		detail,
	},

	data: {
		urlAjax: 'https://private-anon-a3dd37a172-blissrecruitmentapi.apiary-mock.com',
		openMenu: false,
		loadingPage: true,
		health: false,
	},

	methods: {
	 
		/* button for menu on mobile */
		triggerMenu: function () {
			this.openMenu = !this.openMenu;
		},

		callHealth: function()  {
			var self = this
			this.loadingPage = true
			axios({
				method: 'get',
				url: this.urlAjax+'/health',
			}).then(function (response) {
				if(response.data.status == 'OK'){
					self.health = true
					Vue.nextTick( function () {
						EventBus.$emit('callList')
					})
				}
			}).catch(function (error) {
				self.loadingPage = false
			});
		},

		triggerRetry: function () {
			this.callHealth()
		},

		/* function for animate side-txt on scroll to move */
		animaSide: function() {
			var self = this
			var side = document.querySelectorAll('.side-box');
			if( side.length ){
				window.addEventListener('scroll', function() {
					for (var i=0, len=side.length; i < len; i++) {

						var headH = document.querySelector('header').offsetHeight
						var prntRect = side[i].parentNode.getBoundingClientRect()
						var elemRect = side[i].getBoundingClientRect()
						var prntH = prntRect.height
						var elemH = elemRect.height

						if(prntH > elemH){
							if(prntRect.top-headH <= 0){
								if(prntRect.bottom - headH - elemH >= 0 ){
									var y = Math.abs(prntRect.top-headH)
									side[i].style.transform = 'translateY('+y+'px)'
								} else {
									var y = prntH - elemH
									side[i].style.transform = 'translateY('+y+'px)'
								}
							} else {
								side[i].style.transform = 'translateY(0)'
							}
						}

					}
				})

			}
		},
		
		shareThis: function() {
        	EventBus.$emit('openModal', {'name':'share'} )        
     	},

     	creatNew: function() {
      	var self = this
      	var newItem = {
			  'question': 'Favourite programming language?',
			  'image_url': 'https://dummyimage.com/600x400/000/fff.png&text=question+1+image+(600x400)',
			  'thumb_url': 'https://dummyimage.com/120x120/000/fff.png&text=question+1+image+(120x120)',
			  'choices': [
			    'Swift',
			    'Python',
			    'Objective-C',
			    'Ruby'
			  ]
			};
				
			var msg = '<div class="section-modal"><div class="bar"></div><div class="msg"><h4>thanks for the new item</h4><div></div>'

			axios({
				method: 'post',
				url: this.urlAjax+'/questions',
				data: JSON.stringify(newItem),
			}).then(function (response) {
				self.openModal(msg)
			}).catch(function (error) {
				
			});
     	},

		/* function for Load / Resize / Scroll */
		beforeLoad: function () {
			this.callHealth()
		},
		onLoad: function () {
			this.animaSide()
		},
		onResize: function () {
						
		},
		onScroll: function () {
						
		},

		/* for open modal */
		openModal: function(event){
			EventBus.$emit('openModal', event )            
		},

	},

	watch: {
		/* change header/menu if desktop or mobile */
		'breakpoint': function (val) {
			if (val == 'desktop') {
					
			}
			if (val == 'tablet') {
					
			}
			if (val == 'mobile') {
					
			}
		},
	},

	mounted() {
		var self = this
		this.beforeLoad();
		window.addEventListener('load', this.onLoad )
		window.addEventListener('resize', this.onResize )
		window.addEventListener('scroll', this.onScroll )
	},

});


