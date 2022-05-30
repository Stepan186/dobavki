const route = 'cities';

export default {
    async fetch(params) {
        return await this.$axios.get(`${route}`, { params });
    },
    async fetchOne(guid, params) {
        return await this.$axios.get(`${route}/${guid}`, { params });
    },
    async store(params) {
        return await this.$axios.post(`${route}`, params);
    },
    async update(guid, params) {
        return await this.$axios.patch(`${route}/${guid}`, params);
    },
    async delete(guid) {
        return await this.$axios.delete(`${route}/${guid}`);
    },
};
