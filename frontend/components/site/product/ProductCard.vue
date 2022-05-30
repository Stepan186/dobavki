<template>
    <nuxt-link to="/products/product"
               class="product-card"
    >
        <img class="product-card__img"
             :src="product.image ? product.image.url : '/no-image.svg'"
             alt=""
        >
        <div class="product-card__code">
            {{ product.code }}
        </div>
        <div class="product-card__name">
            {{ product.name }}
        </div>
        <div class="product-card__bottom">
            <span>{{ c_minPrice }}₽</span>
            <v-button>В корзину</v-button>
        </div>
    </nuxt-link>
</template>

<script>
import VButton from '../../common/form/VButton.vue';
export default {
    name: 'ProductCard',
    components: { VButton },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    computed: {
        c_minPrice() {
            const tmp = this.product.variants.map(i => i.price);
            const arr = Object.values(tmp);
            return Math.min(...arr);
        },
    },
};
</script>

<style lang="scss">
.product-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    box-shadow: 0px 12px 35px -20px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    padding: 20px;
    color: $dark;
    font-weight: bold;
    transition: box-shadow 0.2s ease-in;
    background: $light;

    &:hover{
      box-shadow: 0px 12px 35px -10px rgba(0, 0, 0, 0.4);
      cursor: pointer;
      color: $dark;
    }

    .product-card__bottom {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24px;
      font-weight: normal;
    }
    .product-card__img {
      margin: 0 auto 10px auto;
    }
    .product-card__code {
      color: $gray;
      font-size: 14px;
      font-weight: normal;
    }
    .product-card__name {
      margin-bottom: 10px;
    }
}
</style>
