export default {
    methods: {
        throw(code, message) {
            if (process.server) {
                this.$nuxt.context.res.statusCode = code;
            }
            throw new Error(message);
        },
    },
};
