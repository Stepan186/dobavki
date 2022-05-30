<template>
    <div class="catalog-page">
        <div class="container">
            <div class="catalog-page__grid">
                <category-card v-for="item in c_rootCategories"
                               :key="item.id"
                               :category="item"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Catalog',
    computed: {
        c_rootCategories() {
            return this.$store.getters['categories/rootCategories'];
        },
    },
};
</script>

<style lang='scss'>
.catalog-page {
  padding: 50px 0;
  .catalog-page__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }
}
</style>
