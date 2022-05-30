<template>
    <aside class="sidebar">
        <v-select v-model="c_selectValue"
                  class="sidebar__select"
                  :options="c_mobileItems"
                  placeholder="Выберите раздел"
                  label="name"
                  schema="filled"
        >
            <template #option="{option}">
                <div v-if="option.name === 'Выйти'"
                     class="sidebar__select-exit"
                >
                    Выйти <i class="icon-exit" />
                </div>
                <template v-else>
                    {{ option.name }}
                </template>
            </template>
        </v-select>
        <ul class="sidebar__list">
            <li v-for="item in d_items"
                :key="item.name"
            >
                <nuxt-link class="sidebar__link"
                           :to="item.url"
                >
                    {{ item.name }}
                </nuxt-link>
            </li>
            <li>
                <nuxt-link class="sidebar__link sidebar__exit"
                           to="/logout"
                >
                    Выйти
                    <i class="icon-exit align-middle ml-1" />
                </nuxt-link>
            </li>
        </ul>
    </aside>
</template>

<script>

export default {
    name: 'VSidebar',
    data() {
        return {
            d_items: [
                {
                    name: 'Категории',
                    url: '/admin/categories',
                },
                {
                    name: 'Пользователи',
                    url: '/admin/users',
                },
                {
                    name: 'Сотрудники',
                    url: '/admin/employees',
                },
                {
                    name: 'Обратная связь',
                    url: '/admin/feedback',
                },
                {
                    name: 'Настройки',
                    url: '/admin/settings',
                },
            ],
        };
    },
    computed: {
        c_selectValue: {
            get() {
                return this.d_items.find(item => item.url === this.$route.fullPath);
            },
            set(val) {
                this.$router.push(val.url);
            },
        },
        c_mobileItems() {
            return this.d_items.concat([
                {
                    name: 'Выйти',
                    url: '/logout',
                },
            ]);
        },
    },
};
</script>

<style lang="scss"
       scoped>
.sidebar {
    .sidebar__list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .sidebar__list {
        display: grid;
        grid-gap: 10px;

        @include media-breakpoint-down(md) {
            display: none;
        }
    }

    .sidebar__select {
        @include media-breakpoint-up(lg) {
            display: none;
        }

        .multiselect__option--selected:after {
            display: none;
        }
    }

    .sidebar__link {
        color: $dark;
        font-size: 14px;
        line-height: 16px;
        display: inline-block;

        &:hover {
            color: $primary;
            text-decoration: none;
        }
    }

    .sidebar__exit {
        color: $gray;
        margin-top: 20px;
    }

    .sidebar__link.nuxt-link-exact-active {
        border-bottom: 2px solid $primary;
    }

    .sidebar__select-exit {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid $light;
        margin: -12px;
        padding: 12px;
        color: $gray;
    }

}
</style>
