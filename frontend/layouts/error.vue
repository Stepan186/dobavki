<template>
    <div class="container">
        <h1>
            {{ error.statusCode }}
        </h1>
        <p>
            {{ error.message }}
        </p>
        <div v-if="error.statusCode === 401"
             class="mt-3"
        >
            <v-button schema="light"
                      type="button"
                      @click.native="showAuthModal"
            >
                Авторизоваться
            </v-button>
        </div>
    </div>
</template>
<script>

export default {
    components: {},
    props: {
        error: {
            type: Object,
            default: null,
        },
    },
    methods: {
        showAuthModal() {
            window.showAuthModal();
        },
    },
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
