export default {
    create(from) {
        return {
            guid: undefined,
            name: undefined,
            slug: undefined,
            ...JSON.parse(JSON.stringify(from)),
        };
    },
};
