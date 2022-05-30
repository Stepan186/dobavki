<template>
    <div class="product-page">
        <div class="container">
            <div class="product-page__wrapper">
                <div class="row">
                    <div class="col-12 col-md-5">
                        <product-slider />
                    </div>
                    <div class="col-12 col-md-7">
                        <h1 class="h2">
                            Rule 1 Pre Amino
                        </h1>
                        <div class="product-page__price">
                            <span>{{ d_price }}</span>₽
                        </div>
                        <div class="product-page__availability mb-3">
                            Наличие в 2х магазинах
                        </div>
                        <div class="product-page__description mb-3">
                            <p>
                                Аминокислотный комплекс R1 Pre Amino от Rule 1 обеспечит вас с
                                каждой порцией 6 г незаменимых аминокислот, из которых 2,5 г
                                приходится на BCAA.
                            </p>
                            <p>
                                Более того, вы получите 120 мг кофеина из натуральных источников
                                (кофейные зерна, экстракт зеленого чая) для повышения умственной активности,
                                а также карнозин, цитруллин и глютамин для борьбы с физическим утомлением
                                организма и поддержания его восстановительного периода после физических
                                нагрузок.
                            </p>
                        </div>
                        <div class="product-page__manufacturer mb-3">
                            <span class="text-primary">Производитель:</span>
                            Rule One(США)
                        </div>
                        <form class="product-page__form"
                              @submit.prevent=""
                        >
                            <v-counter v-model="d_count"
                                       class="me-5"
                            />
                            <div class="product-page__form-price me-5">
                                <span class="text-dark">Итого: </span><b>{{ c_cost }}</b>₽
                            </div>
                            <v-button>Добавить в корзину</v-button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VButton from '../../components/common/form/VButton.vue';
import VCounter from '../../components/common/form/VCounter.vue';
import ProductSlider from '../../components/site/product/ProductSlider.vue';
export default {
    name: 'ProductPage',
    components: { ProductSlider, VButton, VCounter },
    data() {
        return {
            d_count: 1,
            d_price: 1400,
        };
    },
    computed: {
        c_cost() {
            return this.d_count * this.d_price;
        },
    },
};
</script>

<style lang="scss">
.product-page {
  padding: 50px 0;
  .product-page__wrapper {
    background: $light;
    border-radius: 15px;
    padding: 40px;
  }
  .product-page__price{
      color: $primary;
      span{
        font-size: 24px;
        font-weight: bold;
      }
  }
  .product-page__availability {
      color: $gray;
      text-decoration: underline;
      font-size: 14px;
        &:hover {
            cursor: pointer;
        }
  }
  .product-page__description {
      font-size: 14px;
  }
  .product-page__top {
    display: flex;
  }
  .product-page__form {
      display: flex;
      align-items: center;
      .product-page__form-price {
          color: $primary;
          b{
              font-size: 20px;
          }
      }
  }
}
</style>
