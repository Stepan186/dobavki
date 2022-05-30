<template>
    <div>
        <v-input v-model="value.position"
                 class="mb-3"
                 label="Должность"
                 :error="errors.position"
        />
        <loading-component v-if="!d_permissions" />
        <template v-else>
            <div v-for="(permission, idx) in d_permissions"
                 :key="idx"
            >
                <v-checkbox v-model="value.permissions"
                            :checkbox-value="permission"
                            :true-value="undefined"
                            :false-value="undefined"
                            track-by="id"
                            :label="permission.name"
                />
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'EmployeeFieldsEditor',
    props: {
        value: {
            type: Object,
            default: null,
        },
        errors: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            d_permissions: [],
        };
    },
    async mounted() {
        this.d_permissions = (await this.$api.permissions.fetch({ limit: 999 })).results;
    },
};
</script>

<style scoped>

</style>
