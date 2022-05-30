<template>
    <button class="button"
            :class="c_class"
            :type="type"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: 'VButton',
    props: {
        schema: {
            type: String,
            default: 'primary',
        },
        type: {
            type: String,
            default: null,
        },
        outline: {
            type: Boolean,
            default: false,
        },
        square: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        c_class() {
            const res = ['button_' + this.schema];
            if (this.outline) {
                res.push('button_outline');
            }
            return res.join(' ');
        },
    },
};
</script>

<style lang="scss">

.button {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    padding: 12px 25px;
    border: none;
    position: relative;
    min-height: 46px;
    border-radius: 5px;

    &:focus {
        outline: none;
    }
}

.button__icon {
    line-height: 16px;
    font-size: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 5px;
}

.button_primary {
    background: $primary;
    color: white;

    &:hover {
        background: mix(black, $primary, 10%);
    }
}
.button_secondary {
    background: $secondary;
}

.button_danger {
    background: $danger;
    color: white;
}

.button_light {
    background: $light;
    color: $dark;

    &:hover {
        background: mix(black, $light, 10%);
    }
}

.button_primary.button_outline {
    background: transparent;
    color: $dark;
    border: 1px solid $primary;

    &:hover {
        background: rgba(black, 0.05);
    }
}

.button_light.button_outline {
    background: transparent;
    color: $dark;
    border: 1px solid $light;

    &:hover {
        background: rgba(black, 0.05);
    }
}

.button_h40 {
    height: 40px;
    padding: 10px 25px;
}
</style>
