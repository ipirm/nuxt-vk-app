<template>
	<div class="problems-card-slider">
		<div v-swiper:mySwiper="swiperOption">
	    <div class="swiper-wrapper">
	      <div class="swiper-slide" :key="i" v-for="(slide, i) in slides">
        	<a :href="`data:application/octet-stream;base64,${slide}`" :download="slide.split('/').pop()">
		        <div class="problems-card-slider-slide">
		        		<img :src="slide" v-if="slide.split('.').pop() == 'png' || slide.split('.').pop() == 'jpg' || slide.split('.').pop() == 'jpeg' || slide.split('.').pop() == 'gif'">
		        		<span v-else>{{ slide.split('.').pop() }}</span>
		      	</div>
        	</a>
	      </div>
	    </div>
	  </div>
	  <div class="problems-card-slider-arrow-left" @click="mySwiper.slidePrev()">
	  	<img src="~/static/problems/slider-arrow-right.png">
	  </div>
	  <div class="problems-card-slider-arrow-right" @click="mySwiper.slideNext()">
	  	<img src="~/static/problems/slider-arrow-right.png">
	  </div>
	</div>
</template>

<script>
export default {
	props: ['slides'],

	data() {
		return {
			swiperOption: {
				slidesPerView: 2,
				spaceBetween: 12,
				observer: true,
				observeParents: true
			}
		}
	}
}
</script>
