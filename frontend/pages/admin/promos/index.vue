<template>
    <div v-if="$fetchState.pending"
         class="loading-wrapper"
    >
        <loading-component />
    </div>
    <div v-else>
        <admin-top-bar>
            <template slot="title">
                <h1 class="h3 mb-0">
                    Промо
                </h1>
            </template>
            <template slot="search">
                <v-search />
            </template>
            <template slot="button">
                <v-button @click.native="d_showEditor = true">
                    Новое промо
                </v-button>
            </template>
        </admin-top-bar>
        <div class="admin-promo__grid">
            <promo-item v-for="(item, idx) in d_promos"
                        :key="idx"
                        :promo="item"
                        :editable="true"
                        @edit="d_showEditor = item"
            />
        </div>
        <promo-editor v-if="d_showEditor"
                      :promo="d_showEditor"
                      @close="d_showEditor = false"
                      @store="$fetch"
                      @update="update"
        />
    </div>
</template>

<script>
import LoadingComponent from '../../../components/common/LoadingComponent.vue';
import PromoItem from '../../../components/site/header/PromoItem.vue';

export default {
    name: 'AdminPromos',
    components: { LoadingComponent, PromoItem },
    layout: 'admin',
    async fetch() {
        this.d_promos = await this.$api.promos.fetch();
    },
    // middleware: ['authenticated', 'employee'],
    data() {
        return {
            d_showEditor: false,
            d_promos: [],
        };
    },
    methods: {
        update(data) {
            const idx = this.d_promos.findIndex(i => i.id === data.id);
            if (idx) {
                this.d_promos[idx] = data;
            }
        },
    },
};
</script>

<style lang="scss">
.admin-promo__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px
}
</style>
