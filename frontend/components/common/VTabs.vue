<template>
    <div class="tabs"
         :class="c_class"
    >
        <div>
            <div v-if="$slots.title"
                 class="tabs__title"
            >
                <slot name="title" />
            </div>

            <v-select v-if="minimizeMobile"
                      v-model="d_tab"
                      class="tabs__select"
                      :options="tabs"
                      :allow-empty="false"
            />

            <ul class="tabs__head">
                <li v-for="(tab, idx) in tabs"
                    :key="idx"
                    class="tabs__item"
                    :class="{tabs__item_active: d_tab === tab}"
                    @click="d_tab = tab"
                >
                    <slot name="tab"
                          :tab="tab"
                    >
                        {{ tab }}
                    </slot>
                </li>
            </ul>
        </div>

        <template v-if="lazy">
            <slot :name="d_tab" />
        </template>
        <template v-else>
            <div v-for="tab in tabs"
                 v-show="tab === d_tab"
                 :key="tab"
            >
                <slot :name="tab" />
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'VTabs',
    props: {
        value: {
            type: String,
            default: null,
        },
        tabs: {
            type: Array,
            default() {
                return [];
            },
        },
        minimizeMobile: {
            type: Boolean,
            default: false,
        },
        noContent: {
            type: Boolean,
            default: false,
        },
        lazy: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            d_tab: this.value || this.tabs[0],
        };
    },
    computed: {
        c_class() {
            const res = [];
            if (this.minimizeMobile) {
                res.push('tabs_mobile-minimize');
            }
            if (this.noContent) {
                res.push('tabs_no-content');
            }
            return res.join(' ');
        },
    },
    watch: {
        d_tab(val) {
            if (this.value !== val) {
                this.$emit('input', val);
            }
        },
        value(val) {
            if (this.d_tab !== val) {
                this.d_tab = val;
            }
        },
    },
};
</script>

<style lang="scss">
@import "assets/sass/variables";

.tabs {
    //display: grid;
    //grid-auto-flow: column;
    //grid-auto-columns: 0.4fr 1fr;
    //overflow: hidden;
    //height: 100%;
}

.tabs__select {
    margin-bottom: 15px;
}

.tabs_mobile-minimize {
    @include media-breakpoint-up(lg) {
        .tabs__select {
            display: none;
        }
    }

    @include media-breakpoint-down(md) {
        .tabs__head {
            display: none;
        }
    }
}

.tabs_no-content {
    .tabs__head {
        margin-bottom: 0;
    }
}

.tabs__head {
    display: flex;
    list-style: none;
    padding: 0;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid $light;
    height: 46px;
    white-space: nowrap;
    overflow-x: auto;
    box-sizing: content-box;
}

.tabs__title {
    display: block;
    font-size: 32px;
    line-height: 36px;
    font-weight: 500;
    margin: 30px 0 15px 30px;

    @include media-breakpoint-down(md) {
        margin: 0 0 15px;
    }
}

.tabs__item {
    list-style: none;
    text-align: left;
    cursor: pointer;
    color: $dark;
    padding-right: 15px;
    display: flex;

    &.tabs__item_active {
        border-bottom: 2px solid $primary;
    }
}
</style>
