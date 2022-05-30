const route = 'permissions';

let cached = null;

export default {
    async fetch(params) {
        if (!cached) {
            cached = await this.$axios.get(`${route}`, { params });
        }
        return cached;
    },
};
