<template>
    <div class="radio"
         :class="`radio_${position}`"
    >
        <label class="radio__label">
            <input v-model="c_value"
                   class="radio__input"
                   type="radio"
                   :value="radioValue"
            >
            <span class="radio__icon" />
            {{ label }}
            <slot />
        </label>
    </div>
</template>

<script>

export default {
    name: 'VRadio',
    props: {
        value: {
            type: [Object, String, Number, Boolean],
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
        radioValue: {
            type: [Object, String, Number, Boolean],
            default: null,
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
};
</script>

<style lang="scss" scoped>

.radio:hover {
    .radio__icon:after {
        border: 1px solid $primary;
    }
}

.radio__input {
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
}

.radio__label {
    display: flex;
    margin-bottom: 0;
    cursor: pointer;
    align-items: center;
    line-height: 1;
}

.radio__icon {
    position: relative;
    transition: all .1s ease-in;
    margin-right: 10px;

    &::before {
        content: '';
        position: absolute;
        display: block;
        background: white;
        width: 12px;
        height: 12px;
        top: 4px;
        left: 4px;
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s;
    }

    &::after {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid $light;
        transition: all .1s ease-in;
    }
}

.radio__input:checked + .radio__icon::before {
    opacity: 1;
}

.radio__input:checked + .radio__icon::after {
    background: $primary;
}

.radio__input:active {
    & + .radio__icon {
        &:after {
            box-shadow: 0 0 0 rgba(15, 40, 94, 0.18);
        }
    }
}

.radio_left {
    .radio__icon {
        order: 2;
    }
}

.radio_bottom {
    .radio__label {
        grid-auto-flow: dense;
        grid-gap: 0;
    }
}
</style>
