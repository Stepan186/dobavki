<template>
    <div class="masked-input"
         :class="unstyled ? 'masked-input_unstyled' : null"
    >
        <the-mask v-model="c_value"
                  class="masked-input__input masked-input__input_filled"
                  :class="c_inputClass"
                  :placeholder="placeholder"
                  :mask="mask"
        />
        <label v-if="label"
               class="masked-input__label"
        >
            {{ label }}
        </label>
    </div>
</template>

<script>
import { TheMask } from 'vue-the-mask';

export default {
    name: 'VMaskedInput',
    components: {
        TheMask,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            default: null,
        },
        placeholder: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: undefined,
        },
        error: {
            type: [String, Boolean, Array],
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        mask: {
            type: [Object, String],
            required: true,
        },
        unstyled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            rawVal: null,
        };
    },
    computed: {
        c_error() {
            if (Array.isArray(this.error)) {
                return this.error.length;
            } else {
                return this.error;
            }
        },
        c_inputClass() {
            const res = [];
            if (this.c_error) { res.push('masked-input__input_error'); }
            return res.join(' ');
        },
        c_value: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', `7${val}`);
            },
        },
    },
    methods: {
        focus() {
            this.$refs.input.focus();
        },
    },
};
</script>

<style lang="scss">
.masked-input {
    background: none;
    font-size: 14px;
    position: relative;
    padding-top: 20px;
}

.masked-input__input {
    border: 1px solid $gray;
    background: $light;
    outline: none !important;
    color: $dark;
    appearance: none;
    font: $base-font;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    padding: 10px;

    &::placeholder {
        font-size: 14px;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
        font: $base-font !important;
    }
}

.masked-input__label {
    display: inline-flex;
    white-space: nowrap;
    width: 100%;
    color: $dark;
    position: absolute;
    left: 0;
    top: -5px;
    transition: all .1s linear;
    cursor: text;
    pointer-events: none;
    font-size: 14px;
    font-weight: bold;
}

// .masked-input__input:focus, .masked-input__input_filled, {
//     & + .masked-input__label {
//         font-size: 12px;
//         top: -4px;
//     }
// }

.masked-input__input_error {
    border-bottom: 2px solid $danger;
    height: 41px;
    margin-bottom: -1px;
}

.masked-input_unstyled {
    display: inline-block;
    font-size: inherit;
    padding: 0;

    .masked-input__input {
        height: auto;
        border-bottom: none;
        width: auto;
        font: inherit;
    }
}
</style>
