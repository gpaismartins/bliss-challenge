<template>

    <section class="section-modal">
      <div class="bar"> </div>

      <form action="formShare" @submit.prevent="validateBeforeSubmit('formShare')" id="formShare" class="row" data-vv-scope="formShare" novalidate v-if="!msg">

         <div class="form-group col-md-24" :class="{'has-error': errors.has('formShare.email') }">
            <input type="mail" name="email" placeholder="Email" v-model="model.email" v-validate="'required|email'" data-vv-validate-on="none" @focus="runOnFocus($event)"/>
            <span class="help-block">{{ errors.first('formShare.email') }}</span>
         </div>

         <div class="form-group col-md-24 checkbox">
            <input id="accept" type="checkbox" v-model="enabled" />
            <label for="accept">accept</label>
         </div>
         <div class="col">
            <button class="btn" :class="{ disabled: !enabled, loading: loading }" :disabled="!enabled || loading"> share <samp><icon class="spin animate-spin"></icon></samp></button>
         </div>
      </form>

      <div class="msg" v-if="msg">
         <p>{{msg}}</p>
         <div class="btn" @click="$parent.closeModal()"> Close </div>
      </div>
    </section>

</template>

<script>

import {EventBus} from '../mixin'

export default {

    mixins: [EventBus],

    data: () => {
        return {
            model: {},
            enabled: false,
            loading: false,
            url: window.location,
            msg: '',
        }
    },

    methods: {
      /* Validate forms */
      validateBeforeSubmit: function(frmId) {
         this.$validator.validateAll(frmId).then((result) => {
            if (result) {
               this.submitForm(frmId);
               return;
            }
         }).catch(() => {

         });
      },

      /* Submit the form */
      submitForm: function(frmId) {
         var self = this
         this.loading = true;
         axios({
            method: 'post',
            url: this.$root.urlAjax+'/share?destination_email='+this.model.email+'&content_url='+this.url,
         }).then(function (response) {
            self.loading = false;
            console.log(response.data.status)
            self.msg = response.data.status
         }).catch(function (error) {
            self.loading = false;
            self.msg = response.data.status
         });
      },

      /* clear input error on focus */
      runOnFocus: function(event) {
         var target = event.currentTarget
         var frmId = target.closest('form').id
         this.errors.remove(target.name, frmId);
      },
   },


    mounted () {
        
    },

}
</script>
