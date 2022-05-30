<template>
    <div>
        <h3>Бренды</h3>
        <div class="brands-table">
            <brand-card v-for="item in d_items"
                        :key="item.guid"
                        :brand="item"
            />
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
    name: 'AdminBrands',
    layout: 'admin',
    mixins: [UsesPagination],
    // data() {
    //     return {
    //         d_brands: null,
    //     };
    // },
    methods: {
        async fetch({ limit, offset }) {
            return await this.$api.brands.fetch({
                limit,
                offset,
            });
        },
    },
};
</script>

<style>

</style>
