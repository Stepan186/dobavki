export default {
    create(from) {
        return {
            guid: undefined,
            name: undefined,
            parent: null,
            slug: undefined,
            image: undefined,
            metaTitle: undefined,
            metaDescription: undefined,
            isPopular: undefined,
            ordering: 0,
            ...JSON.parse(JSON.stringify(from)),
        };
    },
};
