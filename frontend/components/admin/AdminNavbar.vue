<template>
    <div class="admin-navbar">
        <nuxt-link to="/"
                   class="logo logo_light admin-navbar__logo"
        >
            <img src="/logo.svg"
                 alt="Добавки"
            >
            <div>
                <div class="logo__title">
                    DОБАВКИ.RU
                </div>
            </div>
        </nuxt-link>
        <div class="admin-navbar__menu">
            <nuxt-link v-for="(item, idx) in d_menu"
                       :key="idx"
                       class="admin-navbar__menu-item"
                       :to="item.path"
            >
                {{ item.name }}
            </nuxt-link>
            <nuxt-link to="/"
                       class="admin-navbar__menu-item admin-navbar__btn-exit"
            >
                Выйти
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminNavbar',
    data() {
        return {
            d_menu: [
                {
                    name: ' Категории',
                    path: '/admin/categories',
                },
                {
                    name: 'Товары',
                    path: '/admin/products',
                },
                {
                    name: 'Заказы',
                    path: '/admin/orders',
                },
                {
                    name: 'Сотрудники',
                    path: '/admin/staff',
                },
                {
                    name: 'Магазины',
                    path: '/admin/shops',
                },
                {
                    name: 'Промо',
                    path: '/admin/promos',
                },
                {
                    name: 'Бренды',
                    path: '/admin/brands',
                },
                {
                    name: 'Настройки',
                    path: '/admin/settings',
                },

            ],
        };
    },

};
</script>

<style lang='scss'>
.admin-navbar {
  background: $dark;
  height: 100%;
  width: 100%;
  color: $light;
  position: relative;
  .admin-navbar__logo {
    border-bottom: 1px solid #41465E;
    padding: 20px;
  }
  .admin-navbar__menu {
    display: flex;
    flex-direction: column;
  }
  .admin-navbar__menu-item {
    color: $light;
    padding: 20px;
    border-bottom: 1px solid #41465E;
    &:hover {
      background: #41465E;
    }
  }
  .admin-navbar__btn-exit {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: none;
    border-top: 1px solid #41465E;
  }
}
</style>
