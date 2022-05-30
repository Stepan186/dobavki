<template>
    <div class="wholesale">
        <div class="container">
            <h1>Оптовые покупки</h1>
            <div class="wholesale__content">
                <div class="wholesale__content-title mb-3">
                    Вы владелец, фитнес клуба, спортивной студии, магазина спортивного питания или кофейни? Тогда Вам будет интересно наше предложение!
                </div>
                <p class="mb-3">
                    Помимо розничной торговли мы активно отгружаем товар в мелкий ОПТ, предоставляя нашим партнерам следующее:
                </p>
                <ul class="wholesale__content-list">
                    <li>Широкий ассортимент самых популярных и продаваемых товаров - все в одном месте!</li>
                    <li>Выгодные цены и небольшой порог на минимальный оптовый заказ в 15 000 руб.</li>
                    <li>Кратчайшие сроки отгрузки "до порога" заказчика от 1 до 3-х дней с момента оплаты счета.</li>
                    <li>Поможем сформировать товарную матрицу под Вас (если такое потребуется).</li>
                    <li>Готовы предоставить сопутствующие к товару, обучающие материаты по приобретаемой продукции.</li>
                    <li>Предоставим если протребуется скрипты продаж Вашим сотрудникам.</li>
                    <li>При долгосрочном сотрудничестве возможна отсрочка по платежам.</li>
                    <li>Оплата по Р/С, предоставляем все необходимые документы!</li>
                    <li>Индивидуальный подход!</li>
                </ul>
                <p>По данной форме сотрудничества работаем с Юридическими Лицами, более подробную информацию можно получить связавшись с нами по телефону или написать нам на почту!</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Wholesale',
};
</script>

<style lang="scss">
.wholesale {
  padding: 50px 0;
  .wholesale__content {
    padding: 40px;
    background: $light;
    border-radius: 10px;
  }
  .wholesale__content-title {
    font-weight: 600;
  }
  .wholesale__content-list {
    margin: 0;
    padding: 0 30px;
    list-style: none;
    li {
      margin-bottom: 15px;
      position: relative;
      &::before {
        content: '';
        background: $secondary;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        position: absolute;
        left: -30px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
