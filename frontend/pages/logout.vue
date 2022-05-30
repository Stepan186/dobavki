<template>
    <div class="container">
        Вы успешно вышли из личного кабинета.
    </div>
</template>

<script>
export default {
    name: 'Index',
    mounted() {
        this.$store.dispatch('auth/logout');
    },
};
</script>

<style scoped>

</style>
