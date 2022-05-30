<template>
    <transition name="overlay"
                @after-leave="handleAfterLeave"
    >
        <div v-if="d_show"
             class="overlay"
             @mousedown.self="close"
        >
            <div class="overlay__container"
                 :style="[sizeStyle]"
            >
                <button v-if="closable"
                        class="overlay__close-button"
                        type="button"
                        @click="close"
                >
                    &times;
                </button>
                <div class="overlay__body">
                    <h2 v-if="title"
                        class="overlay__title"
                    >
                        {{ title }}
                    </h2>
                    <slot />
                    <div v-if="$slots.footer"
                         class="overlay__footer"
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
    name: 'VOverlay',
    props: {
        title: {
            type: String,
            default: null,
        },
        width: {
            type: String,
            default: null,
        },
        closable: {
            type: Boolean,
            default: true,
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
            };
        },
    },
    mounted() {
        document.body.appendChild(this.$el);
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = scrollBarWidth + 'px';
        document.documentElement.classList.toggle('overlay-opened', true);
        this.d_show = true;

        document.body.addEventListener('keyup', this.onEscListener, {
            once: true,
        });

        this.$emit('open');
    },
    destroyed() {
        if (this.$el.parentElement) {
            this.$el.parentElement.removeChild(this.$el);
        }
        if (document.getElementsByClassName('overlay').length === 0) {
            document.documentElement.classList.toggle('overlay-opened', false);
            document.body.style.paddingRight = '0';
        }

        document.body.removeEventListener('keyup', this.onEscListener);
    },
    methods: {
        handleAfterLeave() {
            if (document.getElementsByClassName('overlay').length === 0) {
                document.documentElement.classList.toggle('overlay-opened', false);
                document.body.style.paddingRight = '0';
            }
            this.$emit('close');
        },
        close() {
            if (this.closable) {
                // добавляем небольшую задержку, чтобы успели сработать все обработчики событий внутренних элементов
                setTimeout(() => {
                    this.d_show = false;
                }, 30);
            }
        },
        onEscListener(e) {
            if (e.key === 'Escape') {
                this.d_show = false;
            }
        },
    },
};
</script>

<style lang="scss">
@import "assets/sass/variables";

.overlay-opened {
    overflow-y: hidden;

    .sticky-menu__content {
        padding-right: 14px;
    }
}

.overlay {
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

.overlay__container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    background-color: #F6F6F6;
    max-width: 100%;
    color: $dark;
    padding: 50px 80px;
    overflow-y: auto;
    max-height: none;
    height: 100%;
    margin-left: auto;
    width: 910px;

    @include media-breakpoint-down(md) {
        width: 100% !important;
        height: 100% !important;
        max-height: 100%;
        max-width: 100%;
        padding: 15px;
    }
}

.overlay__close-button {
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

.overlay__title {
    margin-bottom: 15px;

    @include media-breakpoint-down(md) {
        border-bottom: 1px solid $light;
        font-size: 16px;
        line-height: 16px;
        margin: -15px -15px 15px -15px;
        padding: 15px;
    }
}

.overlay__footer {
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

.overlay-enter-active, .overlay-leave-active {
    transition: opacity .5s;

    .overlay__container {
        transition: transform .5s;
    }
}

.overlay-enter, .overlay-leave-to {
    opacity: 0;

    .overlay__container {
        transform: translateX(50%);
    }
}
</style>
