export default {
    create(from) {
        return {
            id: null,
            userId: null,
            name: null,
            phone: null,
            body: null,
            answered: null,
            createdAt: null,
            ...from,
        };
    },
};
