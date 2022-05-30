export const state = () => {
    return {
        items: [],
    };
};

export const mutations = {
    updateState(state, data) {
        if (!state) {
            state = {};
        }
        Object.assign(state, data);
    },
};

export const getters = {
    rootCategories: (state, getters) => getters.whereParentId(null),
    whereParentId: state => id => state.items.filter(item => item.parent === id),
    whereId: state => id => state.items.find(item => item.id === id),
    whereSlug: state => slug => state.items.find(item => item.slug === slug),
};

export const actions = {
    async fetch({ commit }) {
        const res = await this.$api.categories.fetch({
            limit: 999,
        });
        commit('updateState', {
            items: res,
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
