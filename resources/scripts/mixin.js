var EventBus = new Vue();

var breakPoint = {

    data: () => {
        return {
            breakpoint: '',
        }
    },
    methods: {
        breakPoint: function(opt) {
            if( window.innerWidth > 992 && this.breakpoint != 'desktop' ){
                this.breakpoint = 'desktop';
                if(opt.fnDesktop != undefined) opt.fnDesktop() 
            }
            if( window.innerWidth < 992 && window.innerWidth > 767 && this.breakpoint != 'tablet' ){
                this.breakpoint = 'tablet';
                if(opt.fnTablet != undefined) opt.fnTablet()
            }
            if( window.innerWidth < 767 && this.breakpoint != 'mobile' ){
                this.breakpoint = 'mobile';
                if(opt.fnMobile != undefined) opt.fnMobile()   
            }
        },
    },
    
    mounted() {
        window.addEventListener('load', this.breakPoint )
        window.addEventListener('resize', this.breakPoint )
    },
}

var cookies = {

    mixins: [
        breakPoint,
    ],

    data: () => {
        return {
            cookies: false,
        }
    },
    methods: {
        setCookie: function(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        getCookie: function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        },
        checkCookie: function(cname) {
            var name = this.getCookie(cname);
            if (name != '') {
                return name;
            } else {
                return false;
            }
        },

        /* Bar of cookies */
        cookiesBar: function () {
            if( !this.checkCookie('CookiesAccept') ) {
                this.cookies = true
                this.$nextTick(function () {
                    var self = this;
                    this.resizeCookiesBar()
                    window.addEventListener('resize', function(){
                        self.resizeCookiesBar()
                    })
                })
            }
        },
        closeCookiesBar: function () {
            this.setCookie('CookiesAccept', 'true', 365)
            this.cookies = false
        },
        resizeCookiesBar: function () {
            var h = document.querySelector('#cookies .bar').offsetHeight
            if( this.breakpoint === 'desktop' ){
                document.querySelector('#cookies').style.height = h+'px';
            } else {
                document.querySelector('#cookies').style.height = '0';
            }
        },
    },

    mounted() {
        this.cookiesBar();
    }
}


var sorted = {

    methods: {
        objToArray(obj) {
            const array = [];
            for (let prop in obj) {
                array.push(obj[prop])
            }
            return array
        },
        orderBy(obj, column, type) {
            var orderBy = !type ? 'ASC' : type.toUpperCase();
            if (['ASC','DESC'].indexOf(orderBy) == -1) {
                return
            }
            return this['order' + orderBy](this.objToArray(obj), column)
        },
        orderASC(obj, column) {
            return obj.sort((a,b) => {return (a[column] > b[column]) ? 1 : ((b[column] > a[column]) ? -1 : 0)})
        },
        orderDESC(obj, column) {
            return obj.sort((a,b) => {return (a[column] > b[column]) ? -1 : ((b[column] > a[column]) ? 1 : 0)})
        },
    },

}

var onScroll = {

    data: () => {
        return {
            scrollTop: '',
        }
    },
    methods: {
        onScrollTop: function () {
            this.scrollTop =  window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        },
    },

    mounted() {
        window.addEventListener('load', this.onScrollTop )
        window.addEventListener('scroll', this.onScrollTop )
    },
}

var scrollTo = {

    methods: {
        // pure javascript animation scrollLeft
        // element == 'document' is for the body
        scrollTo: function(direction, element, to, duration) {
            Math.easeInOutQuad = function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            };
            var start
            if(element == 'document'){
                element = document.documentElement || document.body || document.body.parentNode || 0;
            }
            if(direction === 'left' ) start = element.scrollLeft;
            if(direction === 'top' ) start = element.scrollTop;
            var change = to - start;
            var currentTime = 0;
            var increment = 20;
            var animateScroll = function(){        
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime, start, change, duration);
                if(direction === 'left') element.scrollLeft = val;
                if(direction === 'top') element.scrollTop = val;
                if(currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }
            }; animateScroll();
        },
    },

}

var selectTab = {

    mixins: [
        scrollTo,
    ],

    data: () => {
        return {
            tabTake: '',
        }
    },

    methods: {
        // click on tabs
        selectTab: function(event){
            var id = event.currentTarget.id;
            if( this.tabTake !== id){
                this.tabTake = id
            } else {
                this.tabTake = !this.tabTake
            }
           
            var wth = event.currentTarget.offsetWidth;
            //this.scrollTab(event)
        },
        // for scroll on mobile if tab horizon
        scrollTab: function(event){
            var wth = event.currentTarget.offsetWidth;
            var els = Array.prototype.slice.call( event.currentTarget.parentNode.children, 0 );
            var idx = els.indexOf(event.currentTarget)
            this.scrollTo('left', event.currentTarget.parentNode, idx*wth, 250); 
        },
        // click for left
        selectTabPrev: function(elem){
            var elemPrev = document.getElementById(elem).previousElementSibling;
            if( elemPrev !== null) {
                elemPrev.click()
            }
        },
        // click for rigth
        selectTabNext: function(elem){
            var elemNext = document.getElementById(elem).nextElementSibling;
            if( elemNext !== null) {
                elemNext.click()
            }
        },
    },

}

var openVideo = {

    mixins: [
        EventBus,
    ],

    data: () => {
        return {

        }
    },

    methods: {
        openModalVideo: function openModalVideo(idVideo) {
            var html = '<iframe class="iframe-video" src="https://www.youtube.com/embed/' + idVideo + '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
            EventBus.$emit('openModal', html )    
        },

        onLoad: function onLoad() {
            if (window.location.hash) {
                var url = window.location.hash.slice(1);
                var el = document.querySelectorAll('a[href="#'+url+'"]')[0];
                var idVideo = el.getAttribute('data-idvideo');
                this.$nextTick(function () {
                    this.openModalVideo(idVideo);
                });
            }
        },

    },

    mounted: function mounted() {
        this.onLoad();
    }
}

export {
    EventBus,
    breakPoint,
    cookies,
    sorted,
    onScroll,
    scrollTo,
    selectTab,
    openVideo,
}
