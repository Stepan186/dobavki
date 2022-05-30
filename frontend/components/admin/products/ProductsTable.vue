<template>
    <div
        class="products-table"
    >
        <div v-for="item in d_items"
             :key="item.guid"
        >
            {{ item.name }}
        </div>
        <v-pagination ref="pagination"
                      :fetch="fetch"
                      :items.sync="d_items"
                      :loading.sync="d_loading"
                      :offset.sync="d_offset"
                      :limit.sync="d_limit"
                      :count.sync="d_count"
        />
    </div>
</template>

<script>
import UsesPagination from '~/assets/js/mixins/UsesPagination';
export default {
    name: 'ProductsTable',
    mixins: [UsesPagination],
    methods: {
        async fetch({ limit, offset }) {
            return await this.$api.products.fetch({
                limit,
                offset,
                // search: this.d_searchQuery || undefined,
            });
        },
    },
};
</script>

<style lang="scss">

</style>
