<template>
    <v-modal title="Вход"
             @close="$emit('close')"
    >
        <form @submit.prevent="login">
            <v-masked-input v-model="d_auth.phone"
                            class="mb-4"
                            mask="+7(###)###-##-##"
                            placeholder="+7(___)___-__-__"
                            label="Мобильный телефон"
                            :required="true"
                            :error="d_errors.phone"
            />
            <v-input v-model="d_auth.password"
                     class="mb-4"
                     label="Пароль"
                     type="password"
                     :error="d_errors.password"
            />
            <form-errors v-if="Object.keys(d_errors).length"
                         :errors="d_errors"
                         class="mb-3"
            />
            <loading-component v-if="d_loading" />
            <div v-else
                 class="d-flex justify-content-between align-items-center"
            >
                <v-button schema="primary"
                          type="submit"
                >
                    Войти
                </v-button>
                <span role="button"
                      class="link link_primary"
                      @click="$emit('goto', {component: 'restoration'})"
                >Восстановить пароль</span>
            </div>
        </form>
        <template #footer>
            Нет аккаунта?
            <span role="button"
                  class="link link_primary ml-1"
                  @click="$emit('goto', {component: 'signup'})"
            >Зарегистрируйтесь</span>
        </template>
    </v-modal>
</template>

<script>

export default {
    name: 'SignInModal',
    data() {
        return {
            d_auth: {
                phone: null,
                password: null,
            },
            d_errors: {},
            d_loading: false,
        };
    },
    methods: {
        async login() {
            this.d_loading = true;
            this.d_errors = {};
            try {
                await this.$store.dispatch('auth/login', this.d_auth);
                this.$router.push(this.$store.getters['auth/homePage']);
                this.$emit('close');
            } catch (e) {
                this.d_errors = e.data;
            }
            this.d_loading = false;
        },
    },
};
</script>

<style scoped>

</style>
