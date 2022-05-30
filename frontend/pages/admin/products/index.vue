<template>
    <div>
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h1 class="h2 m-0">
                Продукты
            </h1>
            <v-button v-if="!d_loading"
                      @click.native="syncProducts"
            >
                Синхронизировать c 1C
            </v-button>
            <loading-component v-else />
        </div>
        <products-table />
    </div>
</template>

<script>

export default {
    name: 'AdminProducts',
    layout: 'admin',
    // middleware: ['authenticated', 'employee'],
    data() {
        return {
            d_showEditor: false,
            d_loading: false,
            d_items: null,
        };
    },
    methods: {
        async syncProducts() {
            try {
                this.d_loading = true;
                await this.$api.sync.syncProducts();
            } catch (e) {
                console.error(e);
            } finally {
                this.d_loading = false;
            }
        },
    },
};
</script>

<style scoped>

</style>
