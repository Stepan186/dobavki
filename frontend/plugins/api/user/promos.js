const route = 'promos';

// function normalizeParams(params) {
//     params = JSON.parse(JSON.stringify(params));
//     if (params.permissions) {
//         params.permissionIds = params.permissions.map(item => item.id);
//         delete params.permissions;
//     }
//     return params;
// }

export default {
    async fetch(params) {
        return await this.$axios.get(`${route}`, { params });
    },
    async fetchOne(id, params) {
        return await this.$axios.get(`${route}/${id}`, { params });
    },
    async store(params) {
        return await this.$axios.post(`${route}`, params);
    },
    async update(id, params) {
        return await this.$axios.put(`${route}/${id}`, params);
    },
    async delete(id) {
        return await this.$axios.delete(`${route}/${id}`);
    },
};
