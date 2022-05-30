<template>
    <div class="product-slider swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide product-slider__slide">
                <img src="/images/product-slider.png"
                     alt=""
                >
            </div>
            <div class="swiper-slide product-slider__slide">
                <img src="/images/product-slider.png"
                     alt=""
                >
            </div>
            <div class="swiper-slide product-slider__slide">
                <img src="/images/product-slider.png"
                     alt=""
                >
            </div>
        </div>
        <div class="product-slider-navigation">
            <div ref="prev"
                 class="swiper-button-prev"
            />
            <div class="swiper-pagination" />

            <div ref="next"
                 class="swiper-button-next"
            />
        </div>
    </div>
</template>

<script>
import { Navigation, Swiper, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);
export default {
    name: 'ProductSlider',
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
            this.d_slider = new Swiper('.product-slider', {
                spaceBetween: 30,
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: this.$refs.next,
                    prevEl: this.$refs.prev,
                },
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
.product-slider{
  position: relative;
}
.product-slider__slide{
  display: flex;
  align-items: center;
  justify-content: center;
}

 .product-slider-navigation {
        display: flex;
        justify-content: center;
        align-items: center;
        // margin-top: 30px;
        @include media-breakpoint-down(md) {
            justify-content: center;
        }
    }

    .swiper-pagination-bullets {
        position: relative;
        bottom: auto;
        display: flex;

        .swiper-pagination-bullet {
            transition: .3s;
            width: 16px;
            height: 16px;
            border: 1px solid $primary;
            border-radius: 50%;
            background: transparent;
            margin: 0 7px;
            opacity: 1;
            display: block;
            &:hover {
              cursor: pointer;
            }

            &-active {
                position: relative;

                &:before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                    // margin: -7px 0 0 -6px;
                    border-radius: 50%;
                    width: 10px;
                    height: 10px;
                    background: $primary;
                }
            }
        }
    }

    .swiper-button-prev, .swiper-button-next {
        width: 35px;
        height: 35px;
        background: $primary;
        border-radius: 50%;
        transition: .1s;
        position: absolute;
        cursor: pointer;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;

        &.swiper-button-disabled {
            background: transparent;
            cursor: auto;
        }
    }

    .swiper-button-prev {
        left: 0;
    }

    .swiper-button-next {
        right: 0;
    }
</style>
