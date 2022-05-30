<template>
    <div>
        <v-search v-model="d_searchQuery"
                  class="mb-3"
                  @input="debouncedReset"
        />

        <div class="users-table table">
            <div class="users-table__header table__head">
                <div>ФИО</div>
                <div>Телефон</div>
                <div>E-Mail</div>
                <div>Дата регистрации</div>
                <div />
            </div>
            <div v-for="user in d_items"
                 :key="user.id"
                 class="users-table__row table__row"
            >
                <div class="users-table__row-name">
                    {{ fullName(user) }}
                </div>
                <div>{{ user.phone }}</div>
                <div>{{ user.email || '-' }}</div>
                <div>{{ formatDateTime(user.createdAt) }}</div>
                <div class="text-right">
                    <span v-if="can('users.update')"
                          class="icon-edit link"
                          role="button"
                          @click="d_showEditor = user"
                    />
                </div>
            </div>
        </div>
        <v-pagination v-show="d_count || d_loading"
                      ref="pagination"
                      class="mt-5"
                      :items.sync="d_items"
                      :loading.sync="d_loading"
                      :offset.sync="d_offset"
                      :limit.sync="d_limit"
                      :count.sync="d_count"
                      :fetch="fetch"
        />
        <user-editor v-if="d_showEditor"
                     :user="d_showEditor"
                     @close="d_showEditor = false"
                     @store="onStore"
                     @update="onUpdate"
                     @remove="onRemove"
        />
    </div>
</template>
<script>
import debounce from 'lodash.debounce';
import { formatDateTime } from 'assets/js/filters/dayjs';
import UsesPermissions from 'assets/js/mixins/UsesPermissions';
import fullName from '~/assets/js/filters/fullName';
import UsesPagination from '~/assets/js/mixins/UsesPagination';

export default {
    name: 'UsersTable',
    mixins: [UsesPermissions, UsesPagination],
    async fetch() {
        this.d_loading = true;
        const res = await this.fetch({
            limit: this.d_limit,
            offset: this.d_offset,
        });
        this.d_items = res.results;
        this.d_count = res.count;
        this.d_loading = false;
    },
    data() {
        return {
            d_showEditor: null,
            d_loading: false,
            d_searchQuery: null,
        };
    },
    methods: {
        fullName,
        formatDateTime,
        async fetch({ limit, offset }) {
            return await this.$api.users.fetch({
                limit,
                offset,
                search: this.d_searchQuery || undefined,
            });
        },
        onUpdate(user) {
            const idx = this.d_items.findIndex(item => item.id === user.id);
            if (idx >= 0) {
                this.d_items.splice(idx, 1, user);
            }
            this.d_showEditor = false;
        },
        onStore(user) {
            this.d_items.splice(0, 0, user);
            this.d_showEditor = false;
        },
        onRemove(user) {
            const idx = this.d_items.findIndex(item => item.id === user.id);
            if (idx >= 0) {
                this.d_items.splice(idx, 1);
            }
            this.d_showEditor = false;
        },
        debouncedReset: debounce(function(val) {
            this.$refs.pagination.goToPage(0);
        }, 500),
    },
};
</script>

<style lang="scss">
@import "assets/sass/variables";

.users-table__header, .users-table__row {
    display: grid;
    grid-template-columns: auto 150px 150px 150px 50px;
    grid-gap: 15px;
}

.users-table__header {
    @include media-breakpoint-down(md) {
        display: none;
    }
}

.users-table__row {
    @include media-breakpoint-down(md) {
        grid-template-columns: 1fr;
        grid-gap: 5px;
    }
}

.users-table__row-name {
    @include media-breakpoint-down(md) {
        font-weight: bold;
    }
}
</style>
