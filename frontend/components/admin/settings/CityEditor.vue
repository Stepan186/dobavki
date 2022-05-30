<template>
    <v-overlay :title="d_city.guid ? 'Редактирование города' : 'Создание нового города'"
               @close="$emit('close')"
    >
        <form @submit.prevent="d_city.guid ? update() : store()">
            <div class="mb-4">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <v-input v-model="d_city.name"
                                 class="mb-3"
                                 label="Название"
                        />
                    </div>
                    <div class="col-12 col-md-6">
                        <v-input v-model="d_city.slug"
                                 class="mb-3"
                                 label="Slug"
                        />
                    </div>
                </div>
            </div>

            <form-errors class="mb-4"
                         :errors="d_errors"
            />

            <div v-if="!d_loading"
                 class="d-flex justify-content-between mt-3"
            >
                <v-button schema="primary">
                    Сохранить
                </v-button>
                <v-button v-if="d_city.guid"
                          schema="danger"
                          @click.prevent.native="remove"
                >
                    Удалить
                </v-button>
            </div>
            <loading-component v-else />
        </form>
    </v-overlay>
</template>

<script>
import CityFactory from '~/assets/js/factories/CityFactory';
import slugify from '~/assets/js/filters/slugify';

export default {
    name: 'CityEditor',
    props: {
        city: {
            type: [Object, Boolean],
            default: null,
        },
    },
    data() {
        return {
            d_city: CityFactory.create(this.city),
            d_loading: false,
            d_showDelete: false,
            d_errors: {},
        };
    },
    watch: {
        'd_city.name'(val) {
            this.d_city.slug = slugify(val);
        },
    },
    methods: {
        async store() {
            if (this.d_loading) {
                return;
            }
            try {
                this.d_loading = true;
                await this.$store.dispatch('cities/store', this.d_city);
                this.$emit('close');
            } catch (e) {
                console.error(e);
                this.d_errors = e.data;
            } finally {
                this.d_loading = false;
            }
        },
        async update() {
            if (this.d_loading) {
                return;
            }
            try {
                this.d_loading = true;
                await this.$store.dispatch('cities/update', {
                    guid: this.city.guid,
                    data: this.d_city,
                });
                this.$emit('close');
            } catch (e) {
                console.error(e);
                this.d_errors = e.data;
            } finally {
                this.d_loading = false;
            }
        },
        async remove() {
            if (this.d_loading) {
                return;
            }
            try {
                this.d_loading = true;
                await this.$store.dispatch('cities/remove', this.city.guid);
                this.$emit('close');
            } catch (e) {
                console.error(e);
                this.d_errors = e.data;
            }
            this.d_loading = false;
        },
    },
};
</script>

<style scoped>

</style>
