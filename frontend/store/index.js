import auth from '~/plugins/api/user/auth';

export const state = () => ({
    contacts: [],
});

export const mutations = {
    updateState(state, data) {
        if (!state) {
            state = {};
        }
        Object.assign(state, data);
    },
};

export const actions = {
    async nuxtServerInit(store, ctx) {
        await store.dispatch('init', ctx);
    },
    async nuxtClientInit(store, ctx) {
        await store.dispatch('init', ctx);
    },
    async init({
        getters,
        state,
        commit,
        dispatch,
    }, ctx) {
        this.$api.register({ auth });
        await dispatch('auth/init');
        await dispatch('initUserRelatedData', process.client);
    },
    async initUserRelatedData({ getters, dispatch }, preserveState) {
        if (getters['auth/isEmployee']) {
            await dispatch('initAdmin', preserveState);
        } else {
            await dispatch('initUser', preserveState);
        }
    },
    async initUser({ dispatch }, preserveState) {
        this.$api.register(await import('~/plugins/api/user/index'));
        loadStoreModules.apply(this, [await import('~/store/modules/user/index'), preserveState]);
        if (!preserveState) {
            await Promise.all([
                dispatch('categories/fetch'),
                dispatch('cities/fetch'),
            ]);
            // инициализация state пользователя
            // await Promise.all([dispatch(...), dispatch(...)]);
        }
    },
    async initAdmin({ dispatch }, preserveState) {
        this.$api.register(await import('~/plugins/api/admin/index'));
        loadStoreModules.apply(this, [await import('~/store/modules/admin/index'), preserveState]);
        if (!preserveState) {
            await Promise.all([
                dispatch('categories/fetch'),
            ]);
            // инициализация state админа
            // await Promise.all([dispatch(...), dispatch(...)]);
        }
    },
};

function loadStoreModules(modules, preserveState) {
    for (const key of Object.keys(modules)) {
        if (this.hasModule(key)) {
            this.unregisterModule(key);
        }
        this.registerModule(key, modules[key], {
            preserveState,
        });
    }
}
