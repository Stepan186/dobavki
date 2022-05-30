<template>
    <v-overlay :title="d_promo.id ? 'Редактирование Промоакции' :'Создание Промоакции'"
               @close="$emit('close')"
    >
        <form @submit.prevent="submit">
            <attach-area-component v-model="d_promo.image"
                                   class="mb-4"
            />
            <v-input v-model="d_promo.name"
                     class="mb-4"
                     label="Название"
            />
            <v-button class="mb-3">
                Сохранить
            </v-button>
            <form-errors :errors="d_errors" />
        </form>
    </v-overlay>
</template>

<script>
import PromoFactory from '~/assets/js/factories/PromoFactory';

export default {
    name: 'PromoEditor',
    props: {
        promo: {
            type: [Object, Boolean],
            default: false,
        },
    },
    data() {
        return {
            d_promo: PromoFactory.create(this.promo),
            d_errors: [],
            d_loading: false,
        };
    },
    methods: {
        async submit() {
            this.d_errors = [];
            try {
                this.d_loading = true;
                if (this.d_promo.id) {
                    const res = await this.$api.promos.update(this.d_promo.id, this.d_promo);
                    this.$emit('update', res);
                } else {
                    await this.$api.promos.store(this.d_promo);
                    this.$emit('store');
                }
                this.$emit('close');
            } catch (e) {
                console.error(e);
                this.d_errors = e.data;
            } finally {
                this.d_loading = false;
            }
        },
    },
};
</script>

<style>

</style>
