<template>
    <div
        class="categories-table"
    >
        <category-tree-item v-for="item in c_rootCategories"
                            :key="item.id"
                            :category="item"
        />
    </div>
</template>

<script>
import CategoryTreeItem from './CategoryTreeItem.vue';
export default {
    name: 'CategoriesTable',
    components: { CategoryTreeItem },
    data() {
        return {
            d_categories: null,
        };
    },
    computed: {
        c_categories() {
            return this.$store.state.categories.items;
        },
        c_rootCategories() {
            return this.$store.getters['categories/rootCategories'];
        },
    },
};
</script>

<style lang="scss">
.categories-table {
}
</style>
