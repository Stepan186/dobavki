<template>
    <div class="cabinet-nav">
        <div class="cabinet-nav__user">
            <div class="cabinet-nav__user-logo">
                КС
            </div>
            <div>
                <div class="cabinet-nav__user-name">
                    Кокорин Степан
                </div>
                <div class="cabinet-nav__user-bonuses">
                    512 бонусов
                </div>
            </div>
        </div>
        <div class="cabinet-nav__menu">
            <nuxt-link v-for="(item, idx) in d_nav"
                       :key="idx"
                       :to="item.slug"
                       class="cabinet-nav__menu-item"
                       :class="{'cabinet-nav__menu_active': item.slug == $route.path}"
            >
                {{ item.name }}
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CabinetNav',
    data() {
        return {
            d_nav: [
                {
                    slug: '/cabinet',
                    name: 'Мой профиль',
                },
                {
                    slug: '/cabinet/orders',
                    name: 'Мои заказы',
                },
                {
                    slug: '/cabinet/reviews',
                    name: 'Мои отзывы',
                },
                {
                    slug: '/',
                    name: 'Выйти из аккаунта',
                },
            ],
        };
    },
};
</script>

<style lang="scss">
.cabinet-nav {
  background: $light;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  padding: 20px;
  .cabinet-nav__user {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .cabinet-nav__user-logo {
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: $dark;
    color: $light;
    margin-right: 10px;
    font-size: 32px;
  }
  .cabinet-nav__user-name {
    font-size: 14px;
    font-weight: 600;
  }
  .cabinet-nav__user-bonuses {
    font-size: 14px;
    color: $gray;
  }
  .cabinet-nav__menu {
    display: flex;
    flex-direction: column;

    .cabinet-nav__menu-item {
      padding: 15px 55px;
      background: $gray-light;
      border-radius: 15px;
      margin-bottom: 10px;
      color: $dark;
      position: relative;
      overflow: hidden;
      &::before {
        content: '';
        width: 15px;
        height: 100%;
        background: $primary;
        position: absolute;
        left: -15px;
        top: 0;
        transition: left .1s ease-in;
      }
    }
    .cabinet-nav__menu_active{
      background: #B1FEC2;
      &::before {
        left: 0;
      }
    }
  }
}
</style>
