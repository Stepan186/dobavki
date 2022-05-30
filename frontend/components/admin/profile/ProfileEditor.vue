<template>
    <form class="card"
          @submit.prevent="save"
    >
        <h2>Личные данные</h2>
        <div class="row">
            <div class="col-12 col-md-6 mb-4">
                <v-input v-model="d_data.firstName"
                         label="Имя"
                         :error="d_errors.firstName"
                />
            </div>
            <div class="col-12 col-md-6 mb-4">
                <v-input v-model="d_data.lastName"
                         label="Фамилия"
                         :error="d_errors.lastName"
                />
            </div>
        </div>
        <v-input v-model="d_data.phone"
                 label="Телефон"
                 class="mb-4"
                 :error="d_errors.phone"
        />
        <v-input v-model="d_data.email"
                 label="Электронная почта"
                 class="mb-4"
                 :error="d_errors.email"
        />
        <loading-component v-if="d_loading" />
        <v-button v-else>
            Сохранить
        </v-button>
    </form>
</template>

<script>
export default {
    name: 'ProfileEditor',
    data() {
        const user = this.$store.state.auth.user;
        return {
            d_data: {
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
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
