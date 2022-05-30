<template>
    <v-modal :title="c_title"
             @close="$emit('close')"
    >
        <form v-if="!d_registered"
              @submit.prevent="register"
        >
            <v-input v-model="d_auth.firstName"
                     class="mb-4"
                     label="Ваше имя"
                     :error="d_errors.firstName"
                     required
            />
            <v-masked-input v-model="d_auth.phone"
                            class="mb-4"
                            mask="+7(###)###-##-##"
                            placeholder="+7(___)___-__-__"
                            label="Мобильный телефон"
                            :required="true"
                            :error="d_errors.phone"
            />
            <v-input v-model="d_auth.email"
                     class="mb-4"
                     label="Электронная почта"
                     :error="d_errors.email"
                     type="email"
                     required
            />
            <v-input v-model="d_auth.password"
                     class="mb-4"
                     label="Придумайте пароль"
                     type="password"
                     :error="d_errors.password"
                     required
            />
            <v-input v-model="d_auth.passwordConfirmation"
                     class="mb-4"
                     label="Повторите пароль"
                     type="password"
                     :error="d_errors.passwordConfirmation"
                     required
            />
            <v-checkbox v-model="d_auth.terms"
                        class="mb-4"
                        label="Я согласен на обработку персональных данных"
                        :error="d_errors.terms"
                        required
            />
            <form-errors v-if="Object.keys(d_errors).length"
                         :errors="d_errors"
                         class="mb-3"
            />
            <loading-component v-if="d_loading" />
            <v-button v-else
                      schema="primary"
            >
                Зарегистрироваться
            </v-button>
        </form>
        <template v-if="!d_registered"
                  #footer
        >
            Уже регистрировались?
            <span role="button"
                  class="link link_primary ml-1"
                  @click="$emit('goto', {component: 'signin'})"
            >Войдите</span>
        </template>
        <template v-if="d_registered">
            <p class="mb-3">
                Вы успешно зарегистрировались. На электронную почту отправлено письмо с ссылкой для активации аккаунта.
            </p>
            <nuxt-link class="mt-3"
                       :to="c_homeLink"
            >
                <v-button type="primary"
                          @click.native="$emit('close')"
                >
                    В личный кабинет
                </v-button>
            </nuxt-link>
        </template>
    </v-modal>
</template>

<script>

export default {
    name: 'SignUpModal',
    data() {
        return {
            d_auth: {
                firstName: null,
                phone: null,
                email: null,
                password: null,
                passwordConfirmation: null,
                terms: null,
            },
            d_loading: false,
            d_registered: false,
            d_errors: {},
        };
    },
    computed: {
        c_title() {
            return this.d_registered ? 'Отлично!' : 'Регистрация';
        },
        c_homeLink() {
            return this.$store.getters['auth/homePage'];
        },
    },
    methods: {
        async register() {
            this.d_loading = true;
            this.d_errors = {};
            try {
                await this.$store.dispatch('auth/register', this.d_auth);
                this.d_registered = true;
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
