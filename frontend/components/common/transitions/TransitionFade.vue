<template>
    <transition name="fade"
                enter-active-class="enter-active"
                leave-active-class="leave-active"
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @leave="leave"
                @after-leave="afterLeave"
    >
        <slot />
    </transition>
</template>

<script>
export default {
    name: 'TransitionFade',
    props: {
        speed: {
            type: String,
            default: '0.2s',
        },
        translateX: {
            type: String,
            default: '0',
        },
        translateY: {
            type: String,
            default: '0',
        },
        scaleX: {
            type: String,
            default: '1',
        },
        scaleY: {
            type: String,
            default: '1',
        },
    },
    methods: {
        /**
         * @param {HTMLElement} element
         */
        beforeEnter(element) {
            element.style.transition = `all ${this.speed} ease-in`;
            element.style.opacity = '0';
            element.style.transform = `translate(${this.translateX}, ${this.translateY}) scale(${this.scaleX}, ${this.scaleY})`;
        },
        enter(element) {
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translate(0, 0) scale(1, 1)';
            });
        },
        /**
         * @param {HTMLElement} element
         */
        afterEnter(element) {
            element.style.transition = 'none';
            element.style.transform = 'none';
        },
        /**
         * @param {HTMLElement} element
         */
        beforeLeave(element) {
            element.style.transition = `all ${this.speed} ease-in`;
        },
        /**
         * @param {HTMLElement} element
         */
        leave(element) {
            requestAnimationFrame(() => {
                element.style.opacity = '0';
                element.style.transform = `translate(${this.translateX}, ${this.translateY}) scale(${this.scaleX}, ${this.scaleY})`;
            });
        },
        /**
         * @param {HTMLElement} element
         */
        afterLeave(element) {
            element.style.transition = 'none';
            element.style.transform = 'none';
            this.$emit('afterLeave');
        },
    },
};
</script>

<style scoped>
/*.enter-active,*/
/*.leave-active {*/
/*    transition: opacity 5s;*/
/*}*/
</style>
