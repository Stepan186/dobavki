export default {
    async login(params) {
        return await this.$axios.post('login', params);
    },
    async register(params) {
        return await this.$axios.post('register', params);
    },
    async confirmEmail(params) {
        return await this.$axios.post('email-confirmation', params);
    },
    async resetPassword(params) {
        return await this.$axios.post('reset-password', params);
    },
    async fetch() {
        return await this.$axios.get('profile', {
            preventAuthError: true,
        });
    },
    async update(params) {
        return await this.$axios.put('profile', params);
    },
    async destroyAccount(params) {
        return await this.$axios.delete('profile');
    },
};
