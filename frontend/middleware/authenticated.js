export default function({ store, redirect, error }) {
    if (!store.getters['auth/isAuthenticated']) {
        store.dispatch('auth/logout');
        error({
            statusCode: 401,
            message: 'Кажется, вы не авторизовались. Пожалуйста войдите в свою учетную запись.',
        });
    }
}
