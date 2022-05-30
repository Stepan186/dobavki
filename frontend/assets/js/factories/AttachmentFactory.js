export default {
    create(from) {
        return {
            id: null,
            name: null,
            type: null,
            original: null,
            disk: null,
            variants: null,
            createdAt: null,
            ...from,
        };
    },
};
