<template>
    <div class="delivery-page">
        <div class="container">
            <h1>
                Доставка
            </h1>
            <div class="delivery-page__content">
                <div class="delivery-page__content-item mb-5">
                    <img src="/images/courier.png"
                         alt=""
                    >
                    <div>
                        <div class="delivery-page__content-title">
                            Курьером
                        </div>
                        <p>
                            Бесплатная доставка по городу Сургут, при заказе от 1000 рублей.
                            Доставка в поселки Белый Яр и Солнечный - 150 рублей. Оплачивается отдельно
                        </p>
                    </div>
                </div>
                <div class="delivery-page__content-item mb-5">
                    <img src="/images/geo.png"
                         alt=""
                    >
                    <div>
                        <div class="delivery-page__content-title">
                            Самовывоз
                        </div>
                        <p>
                            Самовывоз осуществляется по адресу: Сургут, ул. Кукуевицкого 13 корпус 1 или ул.Мелик-Карамова 4/4.
                        </p>
                    </div>
                </div>
                <div class="delivery-page__content-item">
                    <img src="/images/sdek.png"
                         alt=""
                    >
                    <div>
                        <div class="delivery-page__content-title">
                            Транспортной компанией
                        </div>
                        <p>
                            Цена за доставку зависит от конечной точки доставки и от объема заказанного товара
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Delivery',
};
</script>

<style lang="scss">
.delivery-page {
  padding: 50px 0;
  .delivery-page__content {
    background: $light;
    padding: 40px;
    border-radius: 10px;
  }
  .delivery-page__content-item {
    display: grid;
    grid-template-columns: 20% 60%;
    align-items: center;
    img {
      margin: 0 auto;
    }
  }
  .delivery-page__content-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
