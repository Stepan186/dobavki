<template>
    <span ref="anchor">
        <slot />
    </span>
</template>

<script>
export default {
    name: 'VIntersectionObserver',
    data() {
        return {
            d_observer: null,
        };
    },
    mounted() {
        const options = {
            rootMargin: '8px',
            threshold: 1.0,
        };
        this.d_observer = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) { this.$emit('observe'); }
        }, options);
        this.d_observer.observe(this.$refs.anchor);
    },
    destroyed() {
        this.d_observer.disconnect();
    },
};
</script>

<style scoped>

</style>
