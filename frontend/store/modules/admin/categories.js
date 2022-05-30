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
    add(state, item) {
        state.items.push(item);
    },
    update(state, { guid, data }) {
        const updatingItem = state.items.find(item => item.guid === guid);
        if (updatingItem) {
            Object.assign(updatingItem, data);
        }
    },
    remove(state, slug) {
        const index = state.items.findIndex(item => item.slug === slug);
        if (index >= 0) {
            state.items.splice(index, 1);
        }
    },
};

export const getters = {
    rootCategories: (state, getters) => getters.whereParentId(null),
    whereParentId: state => guid => state.items.filter(item => item.parent === guid),
    whereId: state => id => state.items.find(item => item.id === id),
    whereSlug: state => slug => state.items.find(item => item.slug === slug),
    popular: state => state.items.filter(i => i.isPopular),
};

export const actions = {
    async fetch(ctx, data) {
        const res = await this.$api.categories.fetch({
            limit: 999,
        });
        ctx.commit('updateState', {
            items: res,
        });
    },
    async store(context, data) {
        const res = await this.$api.categories.store(data);
        context.commit('add', res);
    },
    async update(context, { guid, data }) {
        const res = await this.$api.categories.update(guid, data);
        context.commit('update', {
            guid,
            data: res,
        });
    },
    async remove(context, slug) {
        await this.$api.categories.delete(slug);
        context.commit('remove', slug);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
