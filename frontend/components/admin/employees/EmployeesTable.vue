<template>
    <div>
        <div class="employees-table table">
            <div class="employees-table__header table__head">
                <div>ФИО</div>
                <div>Телефон</div>
                <div>E-Mail</div>
                <div>Должность</div>
                <div />
            </div>
            <div v-for="user in d_items"
                 :key="user.id"
                 class="employees-table__row table__row"
            >
                <div>{{ fullName(user) }}</div>
                <div>{{ user.phone }}</div>
                <div>{{ user.email || '-' }}</div>
                <div>{{ user.position }}</div>
                <div class="text-right">
                    <span class="icon-edit link"
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
                     :is-employee="true"
                     @close="d_showEditor = false"
                     @update="onUpdate"
                     @store="onStore"
                     @remove="onRemove"
        />
    </div>
</template>
<script>
import fullName from 'assets/js/filters/fullName';
import UsesPagination from 'assets/js/mixins/UsesPagination';

export default {
    name: 'EmployeesTable',
    mixins: [UsesPagination],
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
        };
    },
    methods: {
        async fetch({ limit, offset }) {
            return await this.$api.employees.fetch({
                limit,
                offset,
            });
        },
        fullName,
        onUpdate(user) {
            const idx = this.d_items.findIndex(item => item.id === user.id);
            if (idx >= 0) {
                if (user.isEmployee) {
                    this.d_items.splice(idx, 1, user);
                } else {
                    this.d_items.splice(idx, 1);
                }
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
    },
};
</script>

<style lang="scss">
.employees-table__header, .employees-table__row {
    display: grid;
    grid-template-columns: auto 150px 150px 150px 50px;
    grid-gap: 15px;
}

.employees-table__header {
    @include media-breakpoint-down(md) {
        display: none;
    }
}

.employees-table__row {
    @include media-breakpoint-down(md) {
        grid-template-columns: 1fr;
        grid-gap: 5px;
    }
}
</style>
