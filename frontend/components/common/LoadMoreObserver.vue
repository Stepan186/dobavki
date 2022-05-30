<template>
    <v-intersection-observer v-if="d_canFetchMore"
                             @observe="handleObserve"
    />
</template>
<script>

export default {
    name: 'LoadMoreObserver',
    props: {
        fetch: {
            type: Function,
            default: null,
            required: true,
        },
        value: {
            type: Array,
            default() {
                return [];
            },
            required: true,
        },
        chunk: {
            type: Number,
            default: 30,
        },
        immediate: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            d_canFetchMore: this.immediate,
            d_fetching: false,
            d_items: this.value,
        };
    },
    methods: {
        async handleObserve() {
            if (this.d_fetching) { return; }
            this.$emit('fetch');
            this.d_fetching = true;
            const res = await this.fetch();
            // await new Promise(resolve => setTimeout(resolve, 20000));
            this.d_items.push(...res);
            // noinspection JSUnresolvedVariable
            this.d_canFetchMore = Array.isArray(res) && res.length === this.chunk;
            this.$nextTick(() => {
                this.d_fetching = false;
                this.$emit('fetched');
            });
            this.$emit('input', this.d_items);
        },
        reset() {
            this.d_fetching = false;
            this.d_canFetchMore = true;
            this.d_items = [];
            this.$emit('input', this.d_items);
        },
    },
};
</script>

<style scoped>

</style>
