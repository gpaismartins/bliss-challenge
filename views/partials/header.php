<?php $url = "http://$_SERVER[HTTP_HOST]"; ?>

   <div id="cookies" v-if="cookies" v-cloak>
      <div class="bar">
         <p>Bar of biscuits.</p>
         <div class="btn btn-close margin" @click="closeCookiesBar()">Close</div>
      </div>
   </div>

   <header>
      <div class="container-fluid h-100">
         <div class="row h-100 justify-content-between align-items-center">
            <div class ="col-auto">
               <a class="logo" href="/"> •LOGO• </a>
            </div>

            <div class ="col-auto">
              <div class="hamburger" :class="{ open: openMenu }" @click="triggerMenu()" v-cloak>
                <span></span>
              </div>
            </div>

            <transition>
            <menu v-show="openMenu" v-cloak>
               <div class="backgrd" @click="triggerMenu()" ></div>
               <div class="wrap">
                  <nav>
                     <a href="/" class="link">HOME</a>
                  </nav> 
               </div>
            </menu>
           </transition>

         </div>
      </div>
   </header>
