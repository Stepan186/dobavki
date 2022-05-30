<template>
    <div class="pagination">
        <loading-component v-if="loading" />
        <template v-else>
            <div v-if="d_page !== c_pages[c_pages.length - 1]"
                 role="button"
                 class="link link_underlined pagination__more"
                 @click="more"
            >
                Показать еще
            </div>
            <div class="pagination__items">
                <nuxt-link class="icon-arrow-left pagination__item"
                           :to="c_prevLink"
                           :class="{pagination__item_disabled: !c_prevLink}"
                           @click.native="goToPage(d_page - 1)"
                />
                <nuxt-link v-for="(page, idx) in c_pages"
                           :key="page"
                           class="pagination__item"
                           :class="{'pagination__item_active':d_page === page}"
                           :to="c_links[idx]"
                           @click.native="goToPage(page)"
                >
                    {{ page + 1 }}
                </nuxt-link>
                <nuxt-link class="icon-arrow-right pagination__item"
                           :to="c_nextLink"
                           :class="{pagination__item_disabled: !c_nextLink}"
                           @click.native="goToPage(d_page + 1)"
                />
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'VPagination',
    props: {
        items: {
            type: Array,
            required: true,
        },
        offset: {
            type: [Number, String],
            default: 0,
        },
        limit: {
            type: [Number, String],
            default: 30,
        },
        count: {
            type: Number,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        fetch: {
            type: Function,
            required: true,
        },
        scrollAnchor: {
            type: null,
            default: null,
        },
    },
    fetch() {
        this.d_page = Math.floor(this.offset / this.limit);
    },
    data() {
        return {
            d_page: 0,
        };
    },
    computed: {
        c_pages() {
            const res = [];
            const count = 4;
            const pagesBefore = 1;
            for (let i = this.d_page + count - pagesBefore; res.length <= count && i >= 0; i--) {
                if (i * this.limit <= this.count) {
                    res.splice(0, 0, i);
                }
            }
            return res;
        },
        c_links() {
            return this.c_pages.map((page) => {
                return {
                    query: {
                        ...this.$route.query,
                        limit: this.limit,
                        offset: this.limit * page,
                    },
                };
            });
        },
        c_prevLink() {
            const idx = this.c_pages.indexOf(this.d_page - 1);
            return this.c_links[idx] || '';
        },
        c_nextLink() {
            const idx = this.c_pages.indexOf(this.d_page + 1);
            return this.c_links[idx] || '';
        },
    },
    methods: {
        more() {
            this.goToPage(this.d_page + 1, false);
        },
        async goToPage(page, clear = true) {
            this.d_page = page;
            this.$emit('update:loading', true);
            if (clear) {
                this.$emit('update:items', []);
                if (this.scrollAnchor) {
                    this.scrollAnchor.scrollIntoView();
                }
            }
            const offset = page * this.limit;
            this.$emit('update:offset', offset);
            const res = await this.fetch({
                ...this.$route.query,
                offset,
                limit: this.limit,
            });
            this.$router.push({
                query: {
                    ...this.$route.query,
                    offset,
                    limit: this.limit,
                },
            });
            this.$emit('update:count', res[1]);
            this.$emit('update:items', this.items.concat(res[0]));
            this.$emit('update:loading', false);
        },
    },
};
</script>

<style lang="scss">
@import "assets/sass/variables";

.pagination {
    display: flex;
    align-items: center;

    @include media-breakpoint-down(md) {
        display: block;
    }
}

.pagination__more {
    @include media-breakpoint-down(md) {
        width: 100%;
        background: $primary;
        border: none;
        color: white;
        padding: 11px;
        margin-bottom: 15px;
        text-align: center;

        &:hover {
            color: white;
        }
    }
}

.pagination__items {
    display: flex;
    margin-left: auto;
}

.pagination__item {
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border: 1px solid $light;
    cursor: pointer;
    color: $dark;

    &:hover {
        background: mix(black, white, 10%);
        text-decoration: none;
    }

    &.pagination__item_active {
        border-bottom: 2px solid $primary;
        color: $primary;
        pointer-events: none;
    }

    &.pagination__item_disabled {
        color: rgba($dark, 0.2);
        pointer-events: none;
    }
}

.pagination__item + .pagination__item {
    border-left: none;
}

</style>
