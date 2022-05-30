<template>
    <div class="dropdown"
         :class="{dropdown_open: d_open}"
         @mouseleave="handleMouseLeave"
    >
        <div class="dropdown__toggle"
             :class="c_toggleClass"
             @mouseenter="handleMouseEnter"
             @click="handleClick"
             @contextmenu.prevent="handleContextMenu"
        >
            <slot />
        </div>
        <transition name="dropdown">
            <div v-if="d_open"
                 ref="body"
                 class="dropdown__body"
                 :style="c_bodyStyle"
            >
                <slot name="body"
                      :toggle="toggle"
                />
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'VDropdown',
    props: {
        width: {
            type: String,
            default: 'auto',
        },
        padding: {
            type: [String],
            default: '15px',
        },
        hoverOpen: {
            type: Boolean,
            default: false,
        },
        contextMenu: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        caret: {
            type: Boolean,
            default: false,
        },
        right: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            d_open: false,
            d_position: null,
        };
    },
    computed: {
        c_toggleClass() {
            return this.caret ? 'dropdown__toggle_caret' : null;
        },
        c_bodyStyle() {
            const res = {
                width: this.width,
                padding: this.padding,
                ...this.d_position,
            };
            if (this.right) {
                res.left = 'auto';
                res.right = '0';
            }
            return res;
        },
    },
    methods: {
        handleClick() {
            if (!this.disabled && !this.contextMenu) {
                this.toggle();
            }
        },
        handleContextMenu() {
            if (!this.disabled && this.contextMenu) {
                this.toggle();
            }
        },
        toggle(event, val) {
            this.d_open = val !== undefined ? val : !this.d_open;

            this.$emit('toggle', this.d_open, this.$el);

            if (!this.d_open) {
                this.$emit('close');
            } else {
                this.updatePosition();
                this.$emit('open');
            }

            setTimeout(() => {
                if (this.d_open) {
                    document.body.addEventListener('click', this.handleBodyClick);
                } else {
                    document.body.removeEventListener('click', this.handleBodyClick);
                }
            }, 50);
        },
        handleBodyClick(event) {
            if (!event.path.includes(this.$el)) { this.toggle(false); }
        },
        updatePosition() {
            this.$nextTick(() => {
                const el = this.$refs.body;
                const rect = el.getBoundingClientRect();
                const parentRect = el.offsetParent.getBoundingClientRect();

                const posX = (parentRect.x + rect.width);
                const left = posX < window.innerWidth ? 0 : (window.innerWidth - posX + 'px');
                const toTop = (parentRect.y + parentRect.height + rect.height) < window.innerHeight;

                this.d_position = {
                    top: toTop ? '100%' : 'auto',
                    bottom: toTop ? 'auto' : '100%',
                    left,
                };
            });
        },
        handleMouseEnter() {
            if (this.hoverOpen) { this.toggle(null, true); }
        },
        handleMouseLeave() {
            if (this.hoverOpen) { this.toggle(null, false); }
        },
    },
};
</script>

<style lang="scss">
@import "assets/sass/mixins/scroll";

.dropdown {
    display: inline-block;
    position: relative;
    text-align: left;
}

.dropdown__toggle {
    display: inline;
}

.dropdown__toggle_caret {
    &:after {
        content: "";
        transition: transform .2s ease-in;
        display: inline-block;
        border: 4px solid transparent;
        border-top: 6px solid $primary;
        margin-bottom: -2px;
        transform-origin: 4px 3px;
        margin-left: 5px;
    }
}

.dropdown_open {
    .dropdown__toggle_caret:after {
        transform: rotate(180deg);
    }
}

.dropdown__body {
    flex-direction: column;
    background: white;
    position: absolute;
    z-index: 2;
    max-height: 400px;
    overflow: visible;
    border-radius: 0;
    font-size: initial;
    border: 1px solid $light;

    @include styled-scroll;
}

.dropdown__body > ul {
    padding: 0;
    margin: 0;
    list-style: none;
    margin: -15px;

    [role="button"] {
        padding: 12px 15px;
        line-height: 1.2;
        display: block;
        color: $dark !important;

        &:hover {
            color: $secondary;
            background: #f2f2f2;
            text-decoration: none;
        }
    }

    &.small {
        font-size: 14px;

        [role="button"] {
            padding: 6px 15px;
        }
    }
}

.dropdown_open {
    z-index: 5;
}

.dropdown-enter-active, .dropdown-leave-active {
    transition: opacity .3s, transform .3s;
    pointer-events: none;
}

.dropdown-enter, .dropdown-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>
