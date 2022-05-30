<template>
    <div class="popular-categories">
        <div class="container">
            <h2 class="h3">
                Популярные категории
            </h2>
            <div class="popular-categories__wrapper">
                <category-card v-for="item in c_popularCategories"
                               :key="item.id"
                               :category="item"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PopularCategories',
    computed: {
        c_popularCategories() {
            return this.$store.getters['categories/popular'];
        },
    },
};
</script>

<style lang="scss">
.popular-categories {
    padding-top: 30px;
    .popular-categories__wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
    }
}
</style>
