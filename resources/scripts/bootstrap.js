
if (window.Promise === undefined) {
    window.Promise = require('promise-polyfill').default;
}

if (window.axios === undefined) {
    window.axios = require('axios')
}

if (window.Vue === undefined) {
    window.Vue = require('vue/dist/vue')
}

Vue.config.debug = true
Vue.config.ignoredElements = ['icon']

/*/////////////////////////////////////////////////////////////////////////////////////////// polyfill */
/* to create multiple events */
/*addListenerMulti(el, 'touchstart mousedown pointerdown', function(){ },{passive:false});*/
addListenerMulti = function(el, s, fn, prv) {
  s.split(' ').forEach(e => el.addEventListener(e, fn, prv));
}
removeListenerMulti = function(el, s, fn, prv) {
  s.split(' ').forEach(e => el.removeEventListener(e, fn, prv));
}

/* get the closest elem */
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s), i, el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        }
        while ((i < 0) && (el = el.parentElement)); 
        return el;
    };
}

/* Catch a location.search property */
/* urlParam(document.location.search, 'name') ) */
urlParam = function(search, name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec( document.location.search );
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || '';
    }
}