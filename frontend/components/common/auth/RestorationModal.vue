<template>
    <v-modal title="Восстановление пароля"
             @close="$emit('close')"
    >
        <v-input v-model="d_email"
                 class="mb-4"
                 label="Электронная почта"
        />
        <div class="d-flex justify-content-between align-items-center">
            <loading-component v-if="d_loading" />
            <v-button v-else
                      schema="primary"
                      @click.native="restore"
            >
                Восстановить пароль
            </v-button>
            <span role="button"
                  class="link link_primary"
                  @click="$emit('goto', {component: 'signin'})"
            >Я вспомнил пароль</span>
        </div>
    </v-modal>
</template>

<script>
export default {
    name: 'RestorationModal',
    data() {
        return {
            d_email: null,
            d_loading: false,
        };
    },
    methods: {
        async restore() {
            this.d_loading = true;
            await this.$api.auth.resetPassword({
                email: this.d_email,
            });
            this.d_loading = false;
            this.$emit('goto', {
                component: 'restoration-complete',
                data: {
                    email: this.d_email,
                },
            });
        },
    },
};
</script>

<style scoped>

</style>
