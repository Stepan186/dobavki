<template>
    <div>
        <header-slider />
        <brands-slider />
        <popular-categories />
        <popular-products />
    </div>
</template>

<script>
import HeaderSlider from '../components/site/header/HeaderSlider.vue';
import BrandsSlider from '../components/site/index/BrandsSlider.vue';
import PopularCategories from '../components/site/index/PopularCategories.vue';
export default {
    name: 'Index',
    components: { HeaderSlider, BrandsSlider, PopularCategories },
};
</script>

<style lang="scss">
</style>
