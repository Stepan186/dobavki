<template>
    <div class="admin-settings">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h3>
                Города
            </h3>
            <v-button @click.native="d_showCityEditor = true">
                Добавить город
            </v-button>
        </div>
        <cities-table @edit="onEdit" />
        <city-editor v-if="d_showCityEditor"
                     :city="d_cityEditing"
                     @close="onClose"
        />
    </div>
</template>

<script>
export default {
    name: 'AdminSettingsPage',
    layout: 'admin',
    data() {
        return {
            d_showCityEditor: false,
            d_cityEditing: null,
        };
    },
    methods: {
        onEdit(city) {
            this.d_cityEditing = city;
            this.d_showCityEditor = true;
        },
        onClose() {
            this.d_cityEditing = null;
            this.d_showCityEditor = false;
        },
    },
};
</script>

<style>

</style>
