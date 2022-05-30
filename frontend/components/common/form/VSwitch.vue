<template>
    <div class="switch">
        <label class="switch__label">
            <input v-model="c_value"
                   class="switch__input"
                   type="checkbox"
                   :value="switchValue"
                   :disabled="disabled"
            >
            <i />
            {{ label }}
            <slot />
        </label>
    </div>
</template>

<script>
export default {
    name: 'VSwitch',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [Object, String, Number, Boolean],
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        switchValue: {
            type: [Object, String, Number, Boolean],
            default: true,
        },
        trackBy: {
            type: String,
            default: undefined,
        },
    },
    data() {
        return {};
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
                        item[this.trackBy] === this.switchValue[this.trackBy],
                );
                if (index >= 0) {
                    valueClone.splice(index, 1);
                    valueClone.push(this.switchValue);
                }
            } else if (
                valueClone &&
                valueClone[this.trackBy] === this.switchValue[this.trackBy]
            ) {
                valueClone = this.switchValue;
            }

            this.$emit('input', valueClone);
        }
    },
};
</script>

<style lang="scss" scoped>
.switch__label {
    margin-bottom: 0;
    align-items: center;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    line-height: 1;
}

.switch {
    display: inline-block;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

.switch i {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: $gray;
    border-radius: 23px;
    vertical-align: text-bottom;
    transition: all 0.3s linear;
    cursor: pointer;
}

.switch i::before {
    content: "";
    position: absolute;
    left: 0;
    width: 36px;
    height: 16px;
    background-color: $gray;
    border-radius: 11px;
    transform: translate3d(2px, 2px, 0) scale3d(1, 1, 1);
    transition: all 0.25s linear;
}

.switch i::after {
    content: "";
    position: absolute;
    left: 0;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 11px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);
    transform: translate3d(2px, 2px, 0);
    transition: all 0.2s ease-in-out;
}

.switch:active i::after {
    width: 28px;
    transform: translate3d(2px, 2px, 0);
}

.switch:active input:checked + i::after {
    transform: translate3d(10px, 2px, 0);
}

.switch input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.switch input:checked + i {
    background-color: $primary;
}

.switch input:checked + i::before {
    transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0);
}

.switch input:checked + i::after {
    transform: translate3d(22px, 2px, 0);
}
</style>
