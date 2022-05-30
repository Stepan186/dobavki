<template>
    <div class="category-page container">
        <h1 class="h2">
            {{ d_category.name }}
        </h1>
        <div class="category-page__grid">
            <template v-if="d_children">
                <category-card v-for="item in d_children"
                               :key="item.guid"
                               :category="item"
                />
            </template>
            <template v-if="d_products">
                <product-card v-for="item in d_products"
                              :key="item.guid"
                              :product="item"
                />
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoryPage',
    async asyncData({ store, route, error, $api }) {
        const category = store.getters['categories/whereSlug'](route.params.slug);
        if (!category) {
            error({ statusCode: 404, message: 'Страница не найдена' });
        }
        const children = store.getters['categories/whereParentId'](category.guid);
        if (children.length) {
            return {
                d_children: children,
                d_category: category,
            };
        } else {
            try {
                const products = await $api.products.fetch({ categorySlug: category.slug, limit: 999, offset: 0 });
                return {
                    d_products: products[0],
                    d_productsCount: products[1],
                    d_category: category,
                };
            } catch (e) {
                console.error(e);
            }
        }
    },
    data() {
        return {
            d_children: null,
            d_products: null,
        };
    },
};
</script>

<style lang="scss">
.category-page {
    .category-page__grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
    }
}
</style>
