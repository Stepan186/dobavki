<template>
    <transition name="modal"
                @after-leave="handleAfterLeave"
    >
        <div v-if="d_show"
             class="modal"
             @mousedown.self="close"
        >
            <div class="modal__container"
                 :style="[sizeStyle]"
            >
                <button v-if="closable"
                        class="modal__close-button"
                        type="button"
                        @click="close"
                >
                    &times;
                </button>
                <div class="modal__body">
                    <h2 v-if="title"
                        class="modal__title"
                    >
                        {{ title }}
                    </h2>
                    <slot />
                    <div v-if="$slots.footer"
                         class="modal__footer"
                    >
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
    name: 'VModal',
    props: {
        title: {
            type: String,
            default: null,
        },
        width: {
            type: String,
            default: null,
        },
        height: {
            type: String,
            default: null,
        },
        closable: {
            type: Boolean,
            default: true,
        },
        overflow: {
            type: String,
            default: 'hidden',
        },
    },
    data() {
        return {
            d_show: false,
        };
    },
    computed: {
        sizeStyle() {
            return {
                width: this.width,
                height: this.height,
                overflow: this.overflow,
            };
        },
    },
    mounted() {
        document.body.appendChild(this.$el);
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = scrollBarWidth + 'px';
        document.documentElement.classList.toggle('modal-opened', true);
        this.d_show = true;
        this.$emit('open');
    },
    destroyed() {
        if (this.$el.parentElement) {
            this.$el.parentElement.removeChild(this.$el);
        }
        if (document.getElementsByClassName('modal').length === 0) {
            document.documentElement.classList.toggle('modal-opened', false);
            document.body.style.paddingRight = '0';
        }
    },
    methods: {
        handleAfterLeave() {
            if (document.getElementsByClassName('modal').length === 0) {
                document.documentElement.classList.toggle('modal-opened', false);
                document.body.style.paddingRight = '0';
            }
            this.$emit('close');
        },
        close() {
            if (this.closable) {
                this.d_show = false;
            }
        },
    },
};
</script>

<style lang="scss">
@import "assets/sass/variables";

.modal-opened {
    overflow-y: hidden;

    .sticky-menu__content {
        padding-right: 14px;
    }
}

.modal {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(42, 24, 24, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal__container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    max-height: 90%;
    min-width: 300px;
    position: relative;
    margin: 0 auto;
    background-color: white;
    width: 580px;
    max-width: 95%;
    color: $dark;
    padding: 50px 80px;

    @include media-breakpoint-down(md) {
        width: 100% !important;
        height: 100% !important;
        max-height: 100%;
        max-width: 100%;
        padding: 15px;
    }
}

.modal__close-button {
    position: absolute;
    outline: none;
    font-weight: 100;
    cursor: pointer;
    line-height: 18px;
    padding: 0;
    width: 46px;
    height: 46px;
    right: 0;
    top: 0;
    opacity: 1;
    transition: all .15s ease-in;
    flex-shrink: 0;
    background: $light;
    border: none;
    font-size: 30px;
    color: $dark;

    &:hover {
        background: mix(black, $light, 10%);
    }

    &:focus {
        outline: none;
    }

    @include media-breakpoint-down(md) {
        transform: none;
        z-index: 1;
    }
}

.modal__title {
    margin-bottom: 15px;

    @include media-breakpoint-down(md) {
        border-bottom: 1px solid $light;
        font-size: 16px;
        line-height: 16px;
        margin: -15px -15px 15px -15px;
        padding: 15px;
    }
}

.modal__footer {
    min-height: 60px;
    background: $light;
    margin: 0 -80px;
    padding: 0 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    margin-bottom: -50px;
    margin-top: 50px;
}

.modal-enter-active, .modal-leave-active {
    transition: opacity .3s;
}

.modal-enter, .modal-leave-to {
    opacity: 0;
}
</style>
