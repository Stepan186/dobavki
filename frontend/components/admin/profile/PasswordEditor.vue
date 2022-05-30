<template>
    <form class="card"
          @submit.prevent="save"
    >
        <h2>Смена пароля</h2>
        <v-input v-model="d_data.oldPassword"
                 label="Старый пароль"
                 class="mb-4"
                 :error="d_errors.oldPassword"
        />
        <v-input v-model="d_data.password"
                 label="Новый пароль"
                 class="mb-4"
                 :error="d_errors.password"
        />
        <v-input v-model="d_data.passwordConfirmation"
                 label="Повторите новый пароль"
                 class="mb-4"
                 :error="d_errors.passwordConfirmation"
        />
        <loading-component v-if="d_loading" />
        <v-button v-else>
            Изменить
        </v-button>
    </form>
</template>

<script>
export default {
    name: 'PasswordEditor',
    data() {
        return {
            d_data: {
                oldPassword: null,
                password: null,
                passwordConfirmation: null,
            },
            d_loading: false,
            d_errors: {},
        };
    },
    methods: {
        async save() {
            this.d_loading = true;
            try {
                await this.$store.dispatch('auth/update', this.d_data);
            } catch (e) {
                this.d_errors = e.data;
            }
            this.d_loading = false;
        },
    },
};
</script>

<style lang="scss">

</style>
