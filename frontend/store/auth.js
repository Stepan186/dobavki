// import UserFactory from "assets/js/factories/UserFactory";

export const state = () => {
    return {
        user: null,
        token: null,
    };
};

export const mutations = {
    updateState(state, data) {
        Object.assign(state, data);
        if ('token' in data) {
            this.$axios.setToken(data.token, 'JWT');
            if (data.token) {
                this.$cookies.set('jwt', data.token, {
                    maxAge: 31536000, // 1 year
                    path: '/',
                });
            } else {
                this.$cookies.remove('jwt');
            }
        }
    },
};

export const getters = {
    // isEmployee: state => true,
    // isAuthenticated: state => true,
    isEmployee: state => state.user && state.user.isEmployee,
    isAuthenticated: state => state.token && state.user,
    homePage: (state, getters) => {
        return getters.isEmployee ? '/admin' : '/cabinet';
    },
};

export const actions = {
    async login({
        commit,
        dispatch,
        $axios,
    }, data) {
        const res = await this.$api.auth.login(data);
        commit('updateState', res);
        await dispatch('initUserRelatedData', false, {
            root: true,
        });
    },
    async register({
        commit,
        dispatch,
        $axios,
    }, data) {
        const res = await this.$api.auth.register(data);
        commit('updateState', res);
        await dispatch('initUserRelatedData', false, {
            root: true,
        });
    },
    async confirmEmail({
        commit,
        dispatch,
        $axios,
    }, data) {
        const res = await this.$api.auth.confirmEmail(data);
        commit('updateState', res);
    },
    logout({ commit }) {
        commit('updateState', {
            token: null,
            user: null,
        });
    },
    async update(context, data) {
        const res = await this.$api.auth.update(data);
        context.commit('updateUser', res);
    },
    async init({
        dispatch,
        commit,
        rootGetters,
    }) {
        let user = null;
        let token = null;
        token = this.$cookies.get('jwt');
        this.$axios.setToken(token, 'JWT');
        if (token) {
            try {
                user = await this.$api.auth.fetch();
            } catch (e) {
                token = null;
                this.$axios.setToken(null, 'JWT');
            }
        }
        commit('updateState', {
            token,
            user,
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
