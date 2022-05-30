export default function({ store, error }) {
    if (!store.getters['auth/isAuthenticated'] || !store.getters['auth/isEmployee']) {
        error({
            statusCode: 403,
            message: 'Недостаточно прав.',
        });
    }
}
