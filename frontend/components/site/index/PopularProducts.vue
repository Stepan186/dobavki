<template>
    <div class="popular-products">
        <div class="container">
            <h2 class="h3">
                Товары
            </h2>
            <ul class="popular-products__tabs">
                <li
                    :class="{ active: d_tab === 'sales' }"
                    @click="d_tab = 'sales'"
                >
                    Скидки
                </li>
                <li
                    :class="{ active: d_tab === 'novelties' }"
                    @click="d_tab = 'novelties'"
                >
                    Новинки
                </li>
            </ul>
            <div class="popular-products__content">
                <transition name="content">
                    <div
                        v-if="d_tab === 'sales'"
                        key="sales"
                        class="popular-products__content-item"
                    >
                        <!-- <product-card /> -->
                    </div>
                    <div
                        v-if="d_tab === 'novelties'"
                        key="novelties"
                        class="popular-products__content-item"
                    >
                        <!-- <product-card /> -->
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PopularProducts',
    data() {
        return {
            d_tab: 'sales',
        };
    },
};
</script>

<style lang="scss">
.popular-products {
    padding-top: 50px;
    padding-bottom: 50px;
}

.popular-products__tabs {
    margin: 0 0 20px 0;
    padding: 0;
    list-style: none;
    display: flex;
    li {
        margin-right: 10px;
        padding: 5px 20px;
        transition: box-shadow 0.2s ease-in;

        &:hover {
            cursor: pointer;
        }
        &.active {
            box-shadow: 0px 5px 14px -3px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
            background: $light;
            // border: 1px solid #E3E3E3;
        }
    }
}
.popular-products__content-item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
}
.popular-products__content {
    .content-enter-active,
    .content-leave-active {
        transition: opacity .2s ease;
    }
    .content-enter,
    .content-leave-to {
        opacity: 0;
    }
}
</style>
