<template>
    <v-overlay :title="d_brand.guid ? 'Редактирование Бренда' :'Создание Бренда'"
               @close="$emit('close')"
    >
        <form @submit.prevent="submit">
            <attach-area-component v-model="d_brand.image"
                                   class="mb-4"
            />
            <v-input v-model="d_brand.name"
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
import BrandFactory from '~/assets/js/factories/BrandFactory';

export default {
    name: 'BrandCard',
    props: {
        brand: {
            type: Object,
            required: true,
        },

    },
    data() {
        return {
            d_brand: BrandFactory.create(this.brand),
            d_errors: [],
            d_loading: false,
        };
    },
    methods: {
        async submit() {
            this.d_errors = [];
            try {
                this.d_loading = true;
                if (this.d_brand.guid) {
                    const res = await this.$api.brand.update(this.d_brand.guid, this.brand);
                    this.$emit('update', res);
                } else {
                    await this.$api.brand.store(this.d_brand);
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
