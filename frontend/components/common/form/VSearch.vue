<template>
    <div class="search"
         :class="c_class"
    >
        <input ref="input"
               v-model.trim="c_value"
               class="search__input"
               type="text"
               :placeholder="placeholder"
        >
        <div class="search__controls">
            <i v-if="c_value"
               class="search__control search__control_times icon-times"
               role="button"
               @click="clear"
            />
            <loading-component v-if="loading"
                               class="search__control"
                               :size="16"
            />
            <i v-else
               ref="searchBtn"
               role="button"
               class="search__control icon-search"
            />
        </div>
    </div>
</template>

<script>

export default {
    name: 'VSearch',
    props: {
        value: {
            type: [String],
            default: null,
        },
        placeholder: {
            type: String,
            default: 'Поиск',
        },
        loading: {
            type: Boolean,
            default: false,
        },
        schema: {
            type: String,
            default: 'white',
        },
    },
    data() {
        return {
            d_minimize: false,
        };
    },
    computed: {
        c_value: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
        c_class() {
            const res = [`search_${this.schema}`];
            if (this.d_minimize) {
                res.push('search_minimize');
            }
            return res.join(' ');
        },
    },
    methods: {
        minimize() {
            this.d_minimize = true;
            this.$refs.searchBtn.addEventListener('click', () => {
                this.d_minimize = !this.d_minimize;
            });
        },
        clear() {
            this.c_value = null;
            this.$refs.input.focus();
        },
    },
};
</script>

<style lang="scss">

.search {
    position: relative;
    text-align: right;
    min-width: 300px;

    .search__input {
        height: 46px;
        width: 100%;
        border: 1px solid $light;
        font-size: 14px;
        color: $dark;
        padding: 10px 15px;
        transition: width .1s ease-in;

        &::placeholder {
            color: $gray;
            font-size: 14px;
        }

        &:focus {
            border: 2px solid $primary;
            outline: none;
            padding-left: 14px;
        }
    }

    .search__controls {
        display: inline-flex;
        right: 2px;
        top: 2px;
        margin: 0;
        position: absolute;
    }

    .search__control {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
    }

    .search__control_times {
        &:hover {
            color: $danger;
        }
    }

    &.search_minimize {
        .search__input {
            width: 46px;
        }
    }

    &.search_gray {
        .search__input, .search__control {
            background: $light;
        }
    }

    &.search_transparent {
        .search__input {
            padding: 0;
            border: none;
            border-bottom: 1px solid $light;

            &:focus {
                box-shadow: 0 2px $primary;
            }
        }

        .search__input, .search__control {
            background: none;
        }
    }
}
</style>
