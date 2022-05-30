<template>
    <div>
        <v-navbar />
        <div class="container">
            <div class="cabinet-layout">
                <cabinet-nav />
                <Nuxt class="content" />
            </div>
        </div>
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

.cabinet-layout {
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 50px 0;
}

.content {
  padding: 20px;
    @include media-breakpoint-down(md) {
        margin-top: 46px;
        padding-top: 15px;
    }
}
</style>
