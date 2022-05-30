<template>
    <div class="navbar">
        <div class="navbar__contacts">
            <div class="container">
                <div class="d-flex">
                    <nuxt-link to="/"
                               class="navbar__logo logo"
                    >
                        <img src="/logo.svg"
                             alt="Добавки"
                        >
                        <div>
                            <div class="logo__title">
                                DОБАВКИ.RU
                            </div>
                            <div class="logo__subtitle">
                                твой выбор - твоя выгода
                            </div>
                        </div>
                    </nuxt-link>
                    <div class="navbar__phone">
                        <i>Icon</i>
                        <div>
                            <div class="text-primary">
                                <a class="link"
                                   href="tel:+79324171832"
                                >+7 (932) 417-18-32</a>
                            </div>
                            <div>c 10:00 до 20:00 без выходных</div>
                        </div>
                    </div>
                    <ul class="navbar__menu">
                        <li>
                            <nuxt-link to="/contacts">
                                Контакты
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/delivery">
                                Доставка
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/wholesale">
                                Опт
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/cabinet">
                                Войти
                            </nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="navbar__catalog">
            <div class="container position-relative">
                <div class="d-flex justify-content-between">
                    <v-navbar-catalog />
                    <v-cart />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VCart from './VCart.vue';
import VNavbarCatalog from './VNavbarCatalog.vue';
export default {
    name: 'VNavbar',
    components: { VNavbarCatalog, VCart },
};
</script>

<style lang="scss" scoped>
.navbar {
  z-index: 10;
  position: sticky;
  top: 0;
  background: $light;
  box-shadow: 0px 5px 14px -3px rgba(0, 0, 0, 0.25);

  .navbar__contacts {
    padding: 10px 0;
    .navbar__phone {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 18px;
      flex-grow: 1;
      margin-left: 50px;
      i {
        margin-right: 10px;
      }
    }
    .navbar__menu {
      display: flex;
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        margin-left: 20px;
        a {
          color: $dark;
          &:hover {
            color: $primary;
          }
        }
      }
    }
  }
  .navbar__catalog {
    background: $primary;
    padding: 18px 0;
  }
}

</style>
