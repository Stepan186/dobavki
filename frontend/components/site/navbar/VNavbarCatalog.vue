<template>
    <div class="navbar-catalog">
        <v-button
            class="navbar-catalog__btn"
            schema="secondary"
            @click.native="d_showMenu = !d_showMenu"
        >
            Каталог
        </v-button>
        <v-input class="navbar-catalog__input"
                 placeholder="Поиск"
        />
        <transition name="fade">
            <div v-if="d_showMenu"
                 class="navbar-catalog__menu"
            >
                <ul class="navbar-catalog__menu-nav">
                    <li
                        v-for="item in c_rootCategories"
                        :key="item.id"
                        class="navbar-catalog__menu-item"
                        :class="{
                            'navbar-catalog__menu-item_active':
                                item.guid === d_selectedCategory,
                        }"
                        @click="d_selectedCategory = item.guid"
                    >
                        {{ item.name }}
                    </li>
                </ul>
                <ul
                    v-if="c_selectedTree.length"
                    class="navbar-catalog__menu-items"
                >
                    <li v-for="item in c_selectedTree"
                        :key="item.guid"
                        class="navbar-catalog__subcategory"
                    >
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import VButton from '../../common/form/VButton.vue';
import VInput from '../../common/form/VInput.vue';
export default {
    name: 'VNavbarCatalog',
    components: { VInput, VButton },
    data() {
        return {
            d_showMenu: false,
            d_selectedCategory: null,
        };
    },
    computed: {
        c_rootCategories() {
            return this.$store.getters['categories/rootCategories'];
        },
        c_selectedTree() {
            return this.d_selectedCategory
                ? this.$store.getters['categories/whereParentId'](
                    this.d_selectedCategory,
                )
                : [];
        },
    },
};
</script>

<style lang="scss">
.navbar-catalog {
    display: flex;
    width: 60%;

    .navbar-catalog__btn {
        border-radius: 5px 0 0 5px;
        width: 200px;
        font-size: 16px;
        position: relative;
        &::before {
            width: 13px;
            height: 2px;
            content: "";
            background: black;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: rotate(45deg) translateY(-50%);
            transition: right 0.1s ease-in;
        }
        &::after {
            width: 13px;
            height: 2px;
            content: "";
            background: black;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: rotate(-45deg) translateY(-50%);
            transition: right 0.1s ease-in;
        }
    }
    .navbar-catalog__input {
        width: 100%;
        .input__input {
            height: 100%;
            border-radius: 0 5px 5px 0;
            padding: 5px 20px;
            border: none;
        }
    }
    .navbar-catalog__menu {
        position: absolute;
        background: $light;
        box-shadow: 0px 12px 35px -20px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        display: flex;
        // transform: scaleY(0);
        overflow: hidden;
        top: 70px;
        z-index: 10;
        transition: transform 0.3s ease, widows 0.3s;
        max-height: calc(100vh - 200px);
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .navbar-catalog__menu-nav {
            padding: 30px;
            overflow-y: auto;
            .navbar-catalog__menu-item {
                padding: 5px 0 5px 10px;
                &:hover {
                    background: $gray-light;
                    cursor: pointer;
                }
            }
        }
        .navbar-catalog__menu-item_active {
            position: relative;
            background: $gray-light;
            &::before {
                content: "";
                width: 3px;
                height: 100%;
                background: $primary;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
            }
        }
        .navbar-catalog__menu-items {
            display: grid;
            grid-auto-flow: row;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(8, 1fr);
            row-gap: 20px;
            column-gap: 40px;
            box-shadow: 0px 12px 35px -20px rgba(0, 0, 0, 0.4);
            flex-grow: 1;
            padding: 20px;
        }
    }
    &.navbar-catalog_open {
        .navbar-catalog__menu {
            // top: 70px;
            // opacity: 1;
            transform: scaleY(1);
        }
        .navbar-catalog__btn {
            &::before {
                right: 15px;
            }
            &::after {
                right: 14px;
            }
        }
    }
    .navbar-catalog__subcategory {
        border: 1px solid black;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
}
</style>
