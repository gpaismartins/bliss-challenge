import {EventBus, onScroll, scrollTo} from '../mixin'

export default {

   name: 'list',

   mixins: [
      EventBus,
      onScroll,
      scrollTo,
   ],

   data: () => {
      return {
         urlSearch: window.location.search,
         itensList: [],
         search: {
            limit: 10, 
            offset: 0,
            filter: '',
            total: 30,
         },
         lastFiter: '',
         loading: true,
         responseErro: false,
         detail: false,
         scrollPos: 0,
         itemData: null,
         msg: '',
         lang: '',
      }
   },

    methods: {
      /* if url existe */
      getUrl: function() {
         this.search.limit = urlParam(this.urlSearch, 'limit')
         this.search.offset = urlParam(this.urlSearch, 'offset')
         this.search.filter = urlParam(this.urlSearch, 'filter')
         this.callList()
      },
      /* call to get list */
      callList: function()  {
         var self = this
         this.responseErro = false
         axios({
            method: 'get',
            url: this.$root.urlAjax+'/questions?limit='+this.search.limit+'&offset='+this.search.offset+'&filter='+this.search.filter+'',
         }).then(function (response) {
           
            self.itensList = self.itensList.concat(response.data)
            self.search.offset = self.itensList.length
            self.lastFiter = self.search.filter
            self.$root.loadingPage = false
            self.loading = false
            self.setUtl()

         }).catch(function (error) {
            self.responseErro = true
            self.$root.loadingPage = false
         });
      },
      /* for creat url to share */
      setUtl: function() {
         var s = '?limit='+this.search.limit+'&offset='+this.search.offset+'&filter='+this.search.filter
         window.history.pushState({}, null, s)
      },
      /* for relasd page */
      clickToReload: function() {
         if( this.responseErro ) {
            this.loading = true
            this.search.offset = 0
            this.search.filter = ''
            this.callList()
         }
      },
      /* click for more */
      clickMore: function() {
         if( !this.loading  ) {
            this.loading = true
            this.callList()
         }
      },
      /* Filter */
      searchOnEnter: function(e) {
         if(e.keyCode === 13){
            this.searchFilter()
         }
      },
      searchFilter: function() {
         if(this.search.filter != '' && this.search.filter != this.lastFiter){
            window.location.search = 'limit=10&filter='+this.search.filter
         }
      },
      cleanFilter: function() {
         if(this.search.filter == this.lastFiter){
               window.location.search = ''
         } else{
            if(this.search.filter == ''){
               window.location.search = ''
            } else {
               this.search.filter = this.lastFiter
            }
         }
      },

      showDetail: function(idx) {
         this.itemData = this.itensList[idx]
         window.history.pushState({}, 'detail', 'detail?id='+this.itemData.id)
         this.detail = true
         this.scrollPos = this.scrollTop
         this.scrollTo('top', 'document', 0, 0)
      },
      backToList: function(idx) {
         window.history.back();
         this.detail = false
         this.msg = ''
         this.lang = ''
         this.scrollTo('top', 'document', this.scrollPos, 0)
      },
      /* call for volte */
      voteLang: function(lang) {
         var self = this
         this.lang = lang
         axios({
            method: 'put',
            url: this.$root.urlAjax+'/questions/'+this.itemID
         }).then(function (response) {
            self.itemData = response.data
            self.msg = 'thanks for voting on '+self.lang
         }).catch(function (error) {
            
         });
      },

   },

   watch: {

   },

   mounted () {
      var self = this
      EventBus.$on('callList', function(){
         Vue.nextTick( function () {
            if(self.urlSearch){
               self.getUrl()
            } else{
               self.callList()
            }
         })
      })      
      EventBus.$on('sendData', function(data){
         Vue.nextTick( function () {
            self.itensList = self.itensList.concat(data)
            self.search.offset = self.itensList.length
            self.search.total = self.search.total+1
            self.setUtl()
         })
      })
   
   }

}