<template>
    <div>
        Orders
    </div>
</template>

<script>

export default {
    name: 'AdminOrders',
    layout: 'admin',
    // middleware: ['authenticated', 'employee'],
    data() {
        return {
            d_showEditor: false,
        };
    },
};
</script>

<style scoped>

</style>
