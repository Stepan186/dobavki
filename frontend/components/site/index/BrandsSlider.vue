<template>
    <div class="brands">
        <div class="container">
            <h2 class="h3 mb-0">
                Бренды наших партнеров
            </h2>
            <div class="brands-slider swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide brands-slider__slide">
                        <img src="images/bionic.png"
                             alt="bionic"
                        >
                    </div>
                    <div class="swiper-slide brands-slider__slide">
                        <img src="images/bionic.png"
                             alt="bionic"
                        >
                    </div>
                    <div class="swiper-slide brands-slider__slide">
                        <img src="images/bionic.png"
                             alt="bionic"
                        >
                    </div>
                    <div class="swiper-slide brands-slider__slide">
                        <img src="images/bionic.png"
                             alt="bionic"
                        >
                    </div>
                    <div class="swiper-slide brands-slider__slide">
                        <img src="images/bionic.png"
                             alt="bionic"
                        >
                    </div>
                    <div class="swiper-slide brands-slider__slide">
                        <img src="images/bionic.png"
                             alt="bionic"
                        >
                    </div>
                    <div class="swiper-slide brands-slider__slide">
                        <img src="images/bionic.png"
                             alt="bionic"
                        >
                    </div>
                    <div class="swiper-slide brands-slider__slide">
                        <img src="images/bionic.png"
                             alt="bionic"
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper } from 'swiper';
export default {
    name: 'BrandsSlider',
    data() {
        return {
            d_slider: null,
        };
    },
    mounted() {
        this.initSwiper();
    },
    methods: {
        initSwiper() {
            if (this.d_slider) {
                this.d_slider.destroy();
            }
            this.d_slider = new Swiper('.brands-slider', {
                spaceBetween: 30,
                slidesPerView: 1,
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                    },
                    992: {
                        slidesPerView: 5,
                    },
                },
                centeredSlides: true,
                loop: true,
                autoplay: true,
            });
        },
    },

};
</script>

<style lang="scss">
.brands{
    padding-top: 30px;
}
.brands-slider__slide {
    height: 125px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
