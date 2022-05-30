const route = 'products';

// function normalizeParams(params) {
//     params = JSON.parse(JSON.stringify(params));
//     if (params.image) {
//         params.image = params.image.id;
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
        // params = normalizeParams(params);
        return await this.$axios.post(`${route}`, params);
    },
    async update(id, params) {
        // params = normalizeParams(params);
        return await this.$axios.put(`${route}/${id}`, params);
    },
    async delete(id) {
        return await this.$axios.delete(`${route}/${id}`);
    },
};
