
<?php $pageName = 'home' ?>

<?php include 'partials/head.php' ?>

<main>

   <list inline-template>
   <section class="section-list padding">
      <div class="container">
         <div class="row">

            <div class="col-auto col-side">
               <div class="side-box text" v-cloak>
                  {{$root.breakpoint}} <br>
                  menu open: {{$root.openMenu}} <br>
                  scroll: {{$root.scrollTop}} <br>
                  limit: {{search.limit}} <br>
                  offset: {{search.offset}} <br>
                  filter: {{search.filter}} <br>
                  total: {{search.total}} <br>
                  loading: {{loading}} <br>
               </div>
            </div>

            <div class="col col-itens">
               <div class="loading" v-if="$root.loadingPage"> <icon class="spin animate-spin"></icon> </div>
               <div class="retry" v-if="!$root.loadingPage && !$root.health" v-cloak>
                  <div class="btn" @click="$root.triggerRetry()"> Retry Action </div>
               </div>
          
               <transition-group tag="div" class="list-wrap row" v-if="$root.health" v-cloak>
                  <div class="item col-sm-12 col-24" v-for="(item, index) in itensList" :key="index">
                     <div class="img square-box">
                        <img :src="item.thumb_url" alt="pic">
                     </div>
                     <h6>{{item.published_at}}</h6>
                     <h3>{{item.question}}</h3>
                     <a :href="'detail?id='+item.id" class="btn"> View more </a>
                  </div>
                  <div class="erroload" key="erro" v-if="responseErro">
                     <p>something is wrong</p>
                     <div class="btn center" @click="clickToReload()" v-cloak> Reload page </div>
                  </div>
                  <div class="btn center" :class="{loading: loading}" @click="clickMore()" v-if="itensList.length < search.total && itensList.length" key="btn" v-cloak> Load More <samp><icon class="spin animate-spin"></icon></samp> </div>
               </transition-group>               
         
            </div>

            <div class="col-md-auto col-24 col-filter">
               <div class="side-box">
                  <div class="btn-wrap row">
                     <div class="col-md-24 col-12">
                        <div class="btn full-w" @click="$root.creatNew()">new Item</div>
                     </div>
                     <div class="col-md-24 col-12">
                        <div class="btn full-w" @click="$root.shareThis()">Share</div>
                     </div>
                  </div>
                  <div class="form-group search">
                     <input type=text" name="filter" v-model="search.filter" v-on:keyup="searchOnEnter"/>
                     <icon class="search" @click="searchFilter()"></icon>
                  </div>
                  <span v-if="search.filter || lastFiter" class="clean" @click="cleanFilter()" v-cloak> clean <icon class="cancel"></icon> </span>
               </div>
            </div>
            
         </div>
      </div>
   </section>
   </list>

</main>

<?php include 'partials/footer.php' ?>