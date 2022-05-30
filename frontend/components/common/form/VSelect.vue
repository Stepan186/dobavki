<template>
    <vue-multiselect ref="select"
                     v-bind="$props"
                     class="select"
                     :class="c_class"
                     :disabled="disabled"
                     @input="$emit('input', arguments[0])"
                     @tag="$emit('tag', arguments[0])"
                     @search-change="onSearchChange"
                     @open="$emit('open')"
                     @close="$emit('close')"
    >
        <template v-for="(_, scopedSlotName) in $scopedSlots"
                  v-slot:[scopedSlotName]="slotData"
        >
            <slot :name="scopedSlotName"
                  v-bind="slotData"
            />
        </template>
        <template #noOptions>
            Список пуст
        </template>
        <template #noResult>
            Поиск не дал результатов
        </template>
    </vue-multiselect>
</template>

<script>
import VueMultiselect from 'vue-multiselect/src/Multiselect.vue';

export default {
    name: 'VSelect',
    components: { VueMultiselect },
    props: {
        required: {
            type: Boolean,
            default: false,
        },
        searchable: {
            type: Boolean,
            default: false,
        },
        allowEmpty: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [Boolean, Object, String, Number, Array],
            default: null,
        },
        placeholder: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        options: {
            type: Array,
            default() {
                return [];
            },
        },
        trackBy: {
            type: String,
            default: null,
        },
        taggable: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        hideSelected: {
            type: Boolean,
            default: false,
        },
        clearOnSelect: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        internalSearch: {
            type: Boolean,
            default: true,
        },
        schema: {
            type: String,
            default: null,
        },
        error: {
            type: [String, Boolean, Array],
            default: false,
        },
    },
    data() {
        return {};
    },
    computed: {
        c_error() {
            if (Array.isArray(this.error)) {
                return this.error.length;
            } else {
                return this.error;
            }
        },
        c_value: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
        c_class() {
            const res = [];
            if (this.taggable) {
                res.push('multiselect_taggable');
            }
            if (this.c_error) {
                res.push('multiselect_error');
            }
            if (this.schema) {
                res.push('multiselect_' + this.schema);
            }
            return res.join(' ');
        },
    },
    methods: {
        onSearchChange(val) {
            this.$emit('search-change', val);
        },
        setSearchValue(val) {
            this.$refs.select.search = val;
        },
    },
};
</script>

<style lang="scss">
@import "../../../assets/sass/variables";
@import "../../../assets/sass/mixins/scroll";

.select.multiselect {
    background: $primary;
    display: block;
    position: relative;
    box-sizing: border-box;
    padding: 0 20px ;

    &.multiselect_filled {
        background: $light;

        .multiselect__tags {
            padding-left: 15px;
        }
    }

    &.multiselect--active {
        border-bottom: 2px solid $primary;
        .multiselect__select {
            transform: rotate(0);
            &::before {
                transform: rotate(180deg);
            }
        }

        .multiselect__input {
            display: inline-block !important;
            position: static;
            width: auto;
        }

        &.multiselect--above {
            .multiselect__content-wrapper {
                border: 1px solid $gray;
                border-bottom: none;
                margin-top: 0;
                margin-bottom: 0;
            }
        }
    }

    &.multiselect_error {
        border-bottom: 2px solid $danger;
    }

    &.multiselect_taggable {
        height: auto;

        .multiselect__tags {
            min-height: 52px;
        }

        .multiselect__select {
            display: none;
        }
    }

    .multiselect__select {
        height: 46px;
        text-align: right;
        padding: 0;
        width: 8px;

        &:before {
            border-width: 5px 4px 0 4px;
            // border-color: $light transparent transparent transparent;
            right: 20px;
            top: 50%;
        }
    }

    .multiselect__tags {
        padding-left: 0;
        min-height: 46px;
        background: none;
        border: none;
        padding-top: 0;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        border-radius: 0;
    }

    .multiselect__input {
        padding: 0;
        min-width: 0;
        background: none;
        margin-bottom: 0;
        height: 40px;
        display: none;
        width: auto !important;

        &::placeholder {
            color: $primary;
            font-size: 14px;
            white-space: pre-line !important;
            width: auto;
        }
    }

    .multiselect__option {
        white-space: normal;
    }

    .multiselect__placeholder {
        //display: none;
        color: $light;
        font-size: 14px;
        //margin-top: 8px;
        min-height: 46px;
        margin: 0;
        display: flex;
        align-items: center;
    }

    .multiselect__single {
        font: $base-font;
        padding-left: 0;
        margin-bottom: 0;
        background: none;
    }

    .multiselect__option--highlight {
        background: $light;
        color: $dark;

        &:after {
            content: none;
        }
    }

    .multiselect__content-wrapper {
        border: 1px solid $light;
        border-top: none;
        margin-top: 2px;
        border-radius: 0;

        @include styled-scroll;
    }

    .multiselect__tag {
        background: $light;
        border-radius: 0;
        color: $dark;
        font-size: 12px;
        margin: 5px 10px 5px 0;
        display: inline-flex;
        align-items: center;
        flex-direction: row-reverse;
        padding: 10px 10px 10px 6px;
    }

    .multiselect__tag-icon {
        position: static;
        margin: 0;
        height: 22px;

        &:hover {
            background: none;

            &:after {
                color: $danger;
            }
        }

        &:after {
            font-size: 25px;
            font-weight: 100;
        }
    }
}
</style>
