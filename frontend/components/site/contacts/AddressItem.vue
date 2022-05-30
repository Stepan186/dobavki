<template>
    <div class="address-item">
        <div class="address-item__title">
            DOBAVKI.RU г.Сургут ул. Мелик-Карамова 4/4
        </div>
        <hr>
        <div class="address-item__content">
            <div class="address-item__info">
                <div>
                    <b>Адрес</b>
                </div>
                <div class="mb-3">
                    г.Сургут ул. Мелик-Карамова 4/4
                </div>
                <div><b>Телефон</b></div>
                <div class="mb-3">
                    +7 922 258-34-10
                </div>
                <div><b>Режим работы</b></div>
                <div class="mb-3">
                    Пн-Вc: с 10:00 до 20:00
                </div>
                <div><b>Мы в соцсетях</b></div>
                <div>VK TG</div>
            </div>
            <div class="address-item__map">
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af101d1bd6e599d9a2ec74106c0755b4d238993e8c2f0458483bfae442179941a&amp;source=constructor"
                        width="100%"
                        height="300"
                        frameborder="0"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddressItem',
};
</script>

<style lang="scss">
.address-item{
  background: $light;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  padding: 30px;
  .address-item__title {
    font-weight: 400;
  }
  .address-item__content{
    display: grid;
    grid-template-columns: 40% 60%;
    align-items: center;
  }
}
</style>
