export default {
    create(from) {
        return {
            id: null,
            name: null,
            image: null,
            ...from,
        };
    },
};
