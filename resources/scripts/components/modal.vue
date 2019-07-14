<template>
    <transition>
    <div class="modal" v-if="showing" v-cloak>
        <div class="modal-backgrd" @click="closeModal()"></div>
        <div class="modal-inside">
            <div class="modal-close" @click="closeModal()"></div>
            <div class="modal-contem">
                <component :is="componentHtml"></component>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>

import {EventBus} from '../mixin'
import share from './share.vue'

export default {

    mixins: [EventBus],

    data: () => {
        return {
            showing: false,
            componentHtml: '',
        }
    },

    components: {
        share,
    },

    methods: {

        openModal: function(event){
            var self = this;
            this.showing = true
            document.body.classList.add('no-scroll')

            if( event.type === 'click' ){
                var html =  event.currentTarget.querySelector('.formodal').innerHTML
                innerHTML()
            } else {
                if( event.name ){
                    this.componentHtml = event.name
                } else {
                    var html = event
                    innerHTML()
                }
            }
            
            function innerHTML() {
                Vue.nextTick( function () {
                    document.querySelectorAll('.modal .modal-contem')[0].innerHTML = html  
                })
            }
        },

        closeModal: function(){
            this.showing = false
            document.body.classList.remove('no-scroll');
        },

        pressEsc: function(){
            var self = this;
            document.onkeydown = function(evt) {
                evt = evt || window.event;
                if (evt.keyCode == 27) {
                    self.closeModal()
                }
            };
        },

    },

    mounted () {
        var self = this;
        EventBus.$on('openModal', function(event){
            self.openModal(event)
        })
        this.pressEsc()
    },

}
</script>
