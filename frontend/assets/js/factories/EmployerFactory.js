export default {
    create(from) {
        return {
            id: null,
            firstName: null,
            lastName: null,
            middleName: null,
            email: null,
            phone: null,
            position: null,
            permissions: null,
            updatedAt: null,
            createdAt: null,
            ...from,
        };
    },
};
