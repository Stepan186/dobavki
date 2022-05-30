<template>
    <div class="cart">
        <i>icon</i>
        <div>
            <div class="text-secondary">
                4 товара
            </div>
            <div class="text-light">
                10 400 руб
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VCart',
};
</script>

<style lang="scss">
    .cart {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        i {
            margin-right: 20px;
        }
    }
</style>
