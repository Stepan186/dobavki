export default {
    create(from) {
        return {
            id: undefined,
            firstName: undefined,
            lastName: undefined,
            middleName: undefined,
            email: undefined,
            phone: undefined,
            updatedAt: undefined,
            createdAt: undefined,
            ...from,
        };
    },
};
