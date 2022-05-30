<template>
    <div class="checkbox"
         :class="`checkbox_${position}`"
    >
        <label class="checkbox__label">
            <input v-model="c_value"
                   class="checkbox__input"
                   type="checkbox"
                   :disabled="disabled"
                   :value="checkboxValue"
                   :true-value="trueValue"
                   :false-value="falseValue"
                   :required="required"
            >
            <span class="checkbox__icon" />
            {{ label }}
            <slot />
        </label>
    </div>
</template>

<script>
export default {
    name: 'VCheckbox',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [Object, String, Number, Boolean, Array],
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        position: {
            type: String,
            default: 'right',
        },
        trueValue: {
            type: [Object, String, Number, Boolean, Array],
            default: true,
        },
        falseValue: {
            type: [Object, String, Number, Boolean, Array],
            default: false,
        },
        checkboxValue: {
            type: [Object, String, Number, Boolean, Array],
            default: undefined,
        },
        trackBy: {
            type: String,
            default: undefined,
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
    },
    mounted() {
        if (this.trackBy) {
            let valueClone = JSON.parse(JSON.stringify(this.value));
            if (Array.isArray(valueClone)) {
                const index = valueClone.findIndex(
                    item =>
                        item[this.trackBy] === this.checkboxValue[this.trackBy],
                );
                if (index >= 0) {
                    valueClone.splice(index, 1);
                    valueClone.push(this.checkboxValue);
                }
            } else if (
                valueClone &&
                valueClone[this.trackBy] === this.checkboxValue[this.trackBy]
            ) {
                valueClone = this.checkboxValue;
            }

            this.$emit('input', valueClone);
        }
    },
};
</script>

<style lang="scss" scoped>
.checkbox:hover {
    .checkbox__icon:after {
        border: 1px solid $primary;
    }
}

.checkbox__input {
    opacity: 0;
    pointer-events: none;
    position: absolute;
}

.checkbox__label {
    display: flex;
    margin-bottom: 0;
    cursor: pointer;
    align-items: center;
    line-height: 1;
}

.checkbox__icon {
    position: relative;
    transition: all .1s ease-in;
    margin-right: 10px;

    &::before {
        content: '\e95e';
        position: absolute;
        display: block;
        width: 20px;
        height: 20px;
        opacity: 0;
        transition: opacity 0.2s;
        font-family: "1creator" !important;
        font-style: normal !important;
        font-weight: normal !important;
        font-variant: normal !important;
        text-transform: none !important;
        speak: none;
        -webkit-font-smoothing: antialiased;
        color: white;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
    }

    &::after {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        border: 1px solid $light;
        background: white;
        transition: all 0.1s ease-in;
    }
}

.checkbox__input:checked + .checkbox__icon::before {
    opacity: 1;
    background: $primary;
}

.checkbox__input:active {

    & + .checkbox__icon {
        &:after {
            box-shadow: 0 0 0 rgba(15, 40, 94, 0.18);
        }
    }
}

.checkbox_left {
    .checkbox__icon {
        order: 2;
    }
}

.checkbox_bottom {
    .checkbox__label {
        grid-auto-flow: dense;
        grid-gap: 0;
    }
}
</style>
