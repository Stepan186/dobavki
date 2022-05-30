<template>
    <v-overlay title="Редактирование категории"
               @close="$emit('close')"
    >
        <form @submit.prevent="update">
            <div class="mb-4">
                <div class="h3">
                    Общая информация
                </div>
                <attach-area-component v-model="d_category.image"
                                       label="Выберите или перетащите изображение"
                                       sub-label="Формат файла .jpg, .png до 1 МБ"
                                       :error="d_errors.imageId"
                                       :accept="['.jpg', 'jpeg', '.png']"
                />
                <div class="row">
                    <div class="col-12 col-md-6">
                        <v-input v-model="d_category.name"
                                 class="mb-3"
                                 label="Название"
                                 :error="d_errors.name"
                        />
                    </div>
                    <div class="col-12 col-md-6">
                        <v-input v-model="d_category.slug"
                                 class="mb-3"
                                 label="Slug"
                                 :error="d_errors.slug"
                        />
                    </div>
                    <div class="col-12">
                        <v-switch v-model="d_category.isPopular"
                                  label="Выводить в популярных"
                        />
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <h3>SEO</h3>
                <v-input v-model="d_category.metaTitle"
                         class="mb-3"
                         label="Meta title"
                         :error="d_errors.metaTitle"
                />
                <v-textarea v-model="d_category.metaDescription"
                            label="Meta description"
                            :error="d_errors.metaDescription"
                />
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
            </div>
            <loading-component v-else />
        </form>
    </v-overlay>
</template>

<script>
import VSwitch from '../../common/form/VSwitch.vue';
import CategoryFactory from '~/assets/js/factories/CategoryFactory';
import slugify from '~/assets/js/filters/slugify';

export default {
    name: 'CategoryEditor',
    components: { VSwitch },
    props: {
        category: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            d_category: CategoryFactory.create(this.category),
            d_loading: false,
            d_showDelete: false,
            d_errors: {},
        };
    },
    watch: {
        'd_category.name'(val) {
            this.d_category.slug = slugify(val);
        },
    },
    methods: {
        // async store() {
        //     if (this.d_loading) {
        //         return;
        //     }
        //     this.d_loading = true;
        //     try {
        //         const res = await this.$store.dispatch('categories/store', this.d_category);
        //         this.$emit('store', res);
        //     } catch (e) {
        //         this.d_errors = e.data;
        //     }
        //     this.d_loading = false;
        // },
        async update() {
            if (this.d_loading) {
                return;
            }
            try {
                this.d_loading = true;
                await this.$store.dispatch('categories/update', {
                    guid: this.category.guid,
                    data: this.d_category,
                });
                this.$emit('close');
            } catch (e) {
                this.d_errors = e.data;
            } finally {
                this.d_loading = false;
            }
        },
        async remove() {
            if (this.d_loading) {
                return;
            }
            this.d_loading = true;
            try {
                await this.$store.dispatch('categories/remove', this.category.slug);
                this.$emit('remove', this.d_category);
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
