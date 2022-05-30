<template>
    <nuxt-link class="category-card"
               :to="`/catalog/${category.slug}`"
    >
        <img class="category-card__img"
             :src="category.image ? category.image.url : '/no-image.svg'"
             alt=""
        >
        <span class="text-center">{{ category.name }}</span>
    </nuxt-link>
</template>

<script>
export default {
    name: 'CategoryCard',
    props: {
        category: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.category-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 12px 35px -20px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    padding: 20px;
    color: $dark;
    font-weight: bold;
    transition: box-shadow 0.2s ease-in;
    background: $light;
    &:hover{
        box-shadow: 0px 12px 35px -10px rgba(0, 0, 0, 0.4);
    }
    .category-card__img {
        width: 60%;
        margin-bottom: 20px;
    }
}
</style>
