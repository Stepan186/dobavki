<template>
    <div>
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h1 class="h2 m-0">
                Категории
            </h1>
            <v-button v-if="!d_loading"
                      @click.native="syncCategories"
            >
                Синхронизировать c 1C
            </v-button>
            <loading-component v-else />
        </div>
        <categories-table />
    </div>
</template>

<script>

export default {
    name: 'AdminCategories',
    layout: 'admin',
    // middleware: ['authenticated', 'employee'],
    data() {
        return {
            d_showEditor: false,
            d_loading: false,
        };
    },
    methods: {
        async syncCategories() {
            try {
                this.d_loading = true;
                await this.$api.sync.syncCategories();
                await this.$store.dispatch('categories/fetch');
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
