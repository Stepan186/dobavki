<template>
    <div>
        <v-navbar />
        <Nuxt class="content" />
        <v-footer />
    </div>
</template>
<script>
import VFooter from '../components/site/footer/VFooter.vue';
import VNavbar from '../components/site/navbar/VNavbar.vue';

export default {
    components: { VNavbar, VFooter },
};
</script>

<style lang="scss">
@import "assets/sass/variables";

.content {
    @include media-breakpoint-down(md) {
        margin-top: 46px;
        padding-top: 15px;
    }
}
</style>
