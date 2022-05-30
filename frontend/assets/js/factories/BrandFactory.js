export default {
    create(from) {
        return {
            guid: null,
            name: null,
            image: null,
            ...from,
        };
    },
};
