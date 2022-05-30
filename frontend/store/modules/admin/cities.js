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
    remove(state, guid) {
        const index = state.items.findIndex(item => item.guid === guid);
        if (index >= 0) {
            state.items.splice(index, 1);
        }
    },
};

export const getters = {
    whereGuid: state => guid => state.items.find(item => item.guid === guid),
    whereSlug: state => slug => state.items.find(item => item.slug === slug),
};

export const actions = {
    async fetch(ctx) {
        const res = await this.$api.cities.fetch();
        ctx.commit('updateState', {
            items: res,
        });
    },
    async store(context, data) {
        const res = await this.$api.cities.store(data);
        context.commit('add', res);
    },
    async update(context, { guid, data }) {
        const res = await this.$api.cities.update(guid, data);
        context.commit('update', {
            guid,
            data: res,
        });
    },
    async remove(context, guid) {
        await this.$api.cities.delete(guid);
        context.commit('remove', guid);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
