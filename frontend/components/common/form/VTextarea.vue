<template>
    <div class="textarea">
        <textarea v-model="c_value"
                  class="textarea__textarea"
                  :class="c_inputClass"
                  :disabled="disabled"
                  :rows="rows"
                  :required="required"
        />
        <label class="textarea__label">
            {{ label }}
        </label>
    </div>
</template>

<script>

export default {
    name: 'VTextarea',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [Number, String, Boolean],
            default: null,
        },
        step: {
            type: Number,
            default: undefined,
        },
        rows: {
            type: [Number, String],
            default: 3,
        },
        type: {
            type: String,
            default: 'text',
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
        c_inputClass() {
            const res = [];
            if (this.c_value) { res.push('textarea__textarea_filled'); }
            if (this.error) { res.push('textarea__textarea_error'); }
            return res.join(' ');
        },
    },
};
</script>

<style lang="scss">
@import "../../../assets/sass/mixins/scroll";

.textarea {
    background: none;
    font-size: 14px;
    position: relative;
    padding-top: 5px;
}

.textarea__textarea {
    border: none;
    background: none;
    outline: none !important;
    border-bottom: 1px solid $light;
    color: $dark;
    appearance: none;
    font: $base-font;
    width: 100%;
    padding: 0;
    margin-top: 10px;
    min-height: 30px;

    @include styled-scroll;

    &:focus {
        border-bottom: 2px solid $primary;
        margin-bottom: -1px;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
        font: $base-font !important;
    }
}

.textarea__label {
    margin-bottom: 0;
    display: inline-flex;
    white-space: nowrap;
    width: 100%;
    color: $gray;
    position: absolute;
    left: 0;
    top: 10px;
    transition: all .1s linear;
    cursor: text;
    pointer-events: none;
}

.textarea__textarea:focus, .textarea__textarea_filled {
    & + .textarea__label {
        font-size: 12px;
        top: -4px;
    }
}

.textarea__textarea_error {
    border-bottom: 2px solid $danger;
    margin-bottom: -1px;
}
</style>
