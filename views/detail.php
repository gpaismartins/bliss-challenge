
<?php $pageName = 'detail' ?>

<?php include 'partials/head.php' ?>
<main>

	<detail inline-template>
	<section class="section-detail padding">
		<div class="container">
         <div class="row">

        		<div class="col-auto col-side">
               <div class="side-box" v-cloak>
               	<a class="btn margin" href="javascript:window.history.back();" >Back</a>
               	<div class="side-txt">id {{itemID}}</div>
               </div>
            </div>

            <div class="col col-detail">
            	<div class="row">
	            	<div class="item col-24">
	                 	<div class="img square-box sq-60">
	                    	<img :src="itemData.image_url" alt="pic">
	                 	</div>
	                 	<h6>{{itemData.published_at}}</h6>
	                 	<h3>{{itemData.question}}</h3>
	                 	<ul class="votes-wrap row justify-content-between">
	                 		<li class="col-lg-auto col-12" v-for="(item, index) in itemData.choices">
		                 		<span class="langs">{{item.choice}}</span>
		                 		<span class="votes">{{item.votes}}</span>
		                 		<div class="btn" @click="voteLang(item.choice)" v-if="!msg"> vote </div>
	                 		</li>
	                 		<li class="col-24" v-if="msg">
	                 			<p>{{msg}}</p>
	                 		</li>
	                 	</ul>
	                 	<div class="btn" @click="$root.shareThis()">Share</div>
	              	</div>
	            </div>
            </div>

            <div class="col-md-auto col-side"></div>

         </div>
 		</div>
	</section>
	</detail>
	 
</main>

<?php include 'partials/footer.php' ?>