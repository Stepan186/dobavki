const route = 'product-variants';
// function normalizeParams(params) {
//     params = JSON.parse(JSON.stringify(params));
//     if (params.permissions) {
//         params.permissionIds = params.permissions.map(item => item.id);
//         delete params.permissions;
//     }
//     return params;
// }

export default {
    async syncCategories() {
        return await this.$axios.post(`${route}/syncCategories1C`);
    },
    async syncProducts() {
        return await this.$axios.post(`${route}/syncProducts1C`);
    },
};
