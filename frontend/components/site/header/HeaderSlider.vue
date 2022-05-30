<template>
    <div class="header">
        <div class="container">
            <div
                class="header-slider swiper-container"
            >
                <div class="swiper-wrapper">
                    <div v-for="(item, idx) in d_promos"
                         :key="idx"
                         class="swiper-slide"
                    >
                        <promo-item v-if="!d_loading"
                                    :promo="item"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper } from 'swiper';
export default {
    name: 'HeaderSlider',
    async fetch() {
        try {
            this.d_loading = true;
            this.d_promos = await this.$api.promos.fetch();
            if (process.client) {
                this.$nextTick(this.initSwiper);
            }
        } catch (e) {
            console.error(e);
        }
        this.d_loading = false;
    },
    data() {
        return {
            d_loading: false,
            d_slider: null,
            d_promos: null,
        };
    },
    mounted() {
        if (this.d_promos) {
            this.initSwiper();
        }
    },
    methods: {
        initSwiper() {
            this.d_slider = new Swiper('.header-slider', {
                spaceBetween: 30,
                slidesPerView: 1,
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                    },
                    992: {
                        slidesPerView: 1,
                    },
                },
                centeredSlides: true,
                loop: true,
            });
        },
    },
};
</script>

<style lang="scss">
.header {
  padding: 30px 0;
}
.header-slider{
  .header-slider__slide {
    background: $primary;
    height: 400px;
    border-radius: 15px;
  }
  .swiper-slide-next, .swiper-slide-prev {
    opacity: 0.3;
  }
}
</style>
