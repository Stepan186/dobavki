<template>
    <v-overlay :title="d_user.id ? 'Редактирование пользователя' : 'Создание пользователя'"
               @close="$emit('close')"
    >
        <form @submit.prevent="d_user.id ? update() : store()">
            <v-input v-model="d_user.lastName"
                     class="mb-3"
                     label="Фамилия"
                     :error="d_errors.lastName"
            />
            <v-input v-model="d_user.firstName"
                     class="mb-3"
                     label="Имя*"
                     :error="d_errors.firstName"
            />
            <v-input v-model="d_user.middleName"
                     class="mb-3"
                     label="Отчество"
                     :error="d_errors.middleName"
            />
            <div class="row">
                <div class="col-12 col-md-6">
                    <v-input v-model="d_user.email"
                             class="mb-3"
                             type="email"
                             label="E-Mail"
                             :error="d_errors.email"
                    />
                </div>
                <div class="col-12 col-md-6">
                    <v-masked-input v-model="d_user.phone"
                                    class="mb-4"
                                    mask="+7(###)###-##-##"
                                    placeholder="+7(___)___-__-__"
                                    label="Телефон*"
                                    :error="d_errors.phone"
                    />
                </div>
            </div>
            <v-checkbox v-if="d_user.id"
                        v-model="d_showPasswordFields"
                        class="mb-3"
                        label="Сменить пароль"
            />
            <transition-collapse>
                <div v-if="d_showPasswordFields"
                     class="row"
                >
                    <div class="col-12 col-md-6">
                        <v-input v-model="d_user.password"
                                 class="mb-3"
                                 type="password"
                                 label="Пароль*"
                                 :error="d_errors.password"
                        />
                    </div>
                    <div class="col-12 col-md-6">
                        <v-input v-model="d_user.passwordConfirmation"
                                 class="mb-3"
                                 type="password"
                                 label="Подтвердите пароль*"
                                 :error="d_errors.passwordConfirmation"
                        />
                    </div>
                </div>
            </transition-collapse>
            <v-checkbox v-model="d_user.isEmployee"
                        class="mb-3"
                        label="Является сотрудником"
            />
            <transition-collapse>
                <div v-if="d_user.isEmployee">
                    <employee-fields-editor v-model="d_user"
                                            class="mb-3"
                                            :errors="d_errors"
                    />
                </div>
            </transition-collapse>

            <form-errors class="mb-4"
                         :errors="d_errors"
            />

            <div v-if="!d_loading"
                 class="d-flex justify-content-between mt-3"
            >
                <v-button
                    schema="primary"
                >
                    Сохранить
                </v-button>
                <v-button v-if="d_user.id"
                          type="button"
                          schema="light"
                          :outline="true"
                          @click.native="d_showDelete = true"
                >
                    Удалить
                </v-button>
            </div>
            <loading-component v-else />
        </form>
        <v-notify v-if="d_showDelete"
                  :confirm="true"
                  type="confirm"
                  :fixed="true"
                  @cancel="d_showDelete = false"
                  @close="d_showDelete = false"
                  @confirm="remove"
        >
            Вы подтверждаете удаление?
        </v-notify>
    </v-overlay>
</template>

<script>
import UserFactory from '~/assets/js/factories/UserFactory';

export default {
    name: 'UserEditor',
    props: {
        user: {
            type: [Object, Boolean],
            default: null,
        },
        isEmployee: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            d_user: {
                isEmployee: typeof this.user === 'object' ? this.user.isEmployee : this.isEmployee,
                position: undefined,
                permissions: [],
                password: undefined,
                passwordConfirmation: undefined,
                ...UserFactory.create(this.user),
            },
            d_loading: false,
            d_deleting: false,
            d_showDelete: false,
            d_errors: {},
            d_showPasswordFields: !(this.user && this.user.id),
        };
    },
    watch: {
        d_showPasswordFields(val) {
            if (!val) {
                this.d_user.password = undefined;
                this.d_user.passwordConfirmation = undefined;
            }
        },
    },
    methods: {
        async store() {
            if (this.d_loading) {
                return;
            }
            this.d_loading = true;
            try {
                const res = await this.$api.users.store(this.d_user);
                this.$emit('store', res);
            } catch (e) {
                this.d_errors = e.data;
            }
            this.d_loading = false;
        },
        async update() {
            if (this.d_loading) {
                return;
            }
            this.d_loading = true;
            try {
                const res = await this.$api.users.update(this.user.id, this.d_user);
                this.$emit('update', res);
            } catch (e) {
                this.d_errors = e.data;
            }
            this.d_loading = false;
        },
        async remove() {
            if (this.d_loading) {
                return;
            }
            this.d_showDelete = false;
            this.d_loading = true;
            try {
                await this.$api.users.delete(this.user.id);
                this.$emit('remove', this.d_user);
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
