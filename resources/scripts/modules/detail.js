import {EventBus} from '../mixin'

export default {

   name: 'detail',

   mixins: [
      EventBus,
   ],

   data: () => {
      return {
         urlSearch: window.location.search,
         itemID: '',
         itemData:'',
         msg: '',
         lang: '',
      }
   },

    methods: {
      getUrl: function() {
         this.itemID = urlParam(this.urlSearch, 'id')
         this.callItem('get')
      },
      /* volte */
      voteLang: function(lang) {
         this.lang = lang
         this.callItem('put')
      },
      /* call the item id */
      callItem: function(type) {
         var self = this
         axios({
            method: type,
            url: this.$root.urlAjax+'/questions/'+this.itemID
         }).then(function (response) {
            self.itemData = response.data
            if(type == 'put'){
               self.msg = 'thanks for voting on '+self.lang
            }
         }).catch(function (error) {
            
         });
      },

   },

   mounted () {
      this.getUrl()
   }

}