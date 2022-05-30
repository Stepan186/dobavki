<template>
    <transition name="notify"
                @after-leave="handleAfterLeave"
    >
        <div v-if="d_show"
             class="notify"
             :class="c_class"
        >
            <div class="notify__content">
                <slot />
            </div>

            <div v-if="confirm"
                 class="notify__controls"
            >
                <v-button schema="light"
                          @click.native="agree"
                >
                    Подтверждаю
                </v-button>
                <v-button class="text-light"
                          schema="light"
                          :outline="true"
                          @click.native="cancel"
                >
                    Отмена
                </v-button>
            </div>
            <button v-else
                    class="notify__close"
                    type="button"
                    @click="close"
            >
                &times;
            </button>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'VNotify',
    props: {
        schema: {
            type: String,
            default: 'primary',
        },
        confirm: {
            type: Boolean,
            default: false,
        },
        fixed: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            d_show: !this.fixed,
        };
    },
    computed: {
        c_class() {
            const res = ['notify_' + this.schema];
            if (this.fixed) {
                res.push('notify_fixed');
            }
            if (this.confirm) {
                res.push('notify_confirm');
            }
            return res;
        },
    },
    mounted() {
        this.d_show = true;
    },
    methods: {
        cancel() {
            this.$emit('cancel');
        },
        agree() {
            this.$emit('confirm');
        },
        close() {
            this.d_show = false;
        },
        handleAfterLeave() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss">
.notify {
    border: 2px solid $gray;
    position: relative;
}

.notify__content {
    padding: 15px 30px;
    align-items: flex-start;

    @include media-breakpoint-down(md) {
        padding: 15px;
    }
}

.notify__close {
    border: none;
    font-size: 30px;
    font-weight: 100;
    background: none;
    position: absolute;
    top: 15px;
    right: 15px;

    &:focus {
        outline: none;
    }

    &:hover {
        color: $danger;
    }
}

.notify_confirm {
    border: none;
    background: $primary;
    display: grid;
    grid-template-columns: auto 310px;

    .notify__content {
        font-size: 18px;
        color: white;
        padding-top: 25px;

        @include media-breakpoint-down(md) {
            grid-template-columns: 1fr;
            grid-auto-flow: row;
            grid-gap: 15px;
        }
    }

    .notify__btn-confirm {
        background: $light;
        border: none;
    }

    .notify__btn-cancel {
        background: none;
        border: 1px solid white;
        color: white;
    }

    .notify__controls {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;
        padding: 15px;

        button {
            font-size: 14px;
            padding: 10px 30px;
            position: relative;

            @include media-breakpoint-down(md) {
                padding: 10px 15px;
            }
        }
    }
}

.notify_error {
    border: 2px solid $danger;
}

.notify_warning {
    border-color: $warning;
}

.notify_info {
    border-color: $gray;
}

.notify_success {
    border-color: $primary;
}

.notify_fixed {
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    width: 1140px;
    top: 15px;
    z-index: 5;

    @include media-breakpoint-down(lg) {
        width: 930px;
    }

    @include media-breakpoint-down(md) {
        width: calc(100% - 30px);
    }
}

.notify-enter-active, .notify-leave-active {
    transition: opacity .3s, transform .3s ease-in;
}

.notify-enter, .notify-leave-to {
    opacity: 0;
    transform: translateY(-15px);
}
</style>
