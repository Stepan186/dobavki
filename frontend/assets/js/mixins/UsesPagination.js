export default {
    async fetch() {
        const page = +(this.$route.query.page || 1);
        try {
            this.d_loading = true;
            const res = await this.fetch({
                limit: +this.d_limit,
                offset: +((page - 1) * this.d_limit),
            });
            this.d_items = res[0];
            this.d_count = res[1];
        } catch (e) {
            console.error(e);
        } finally {
            this.d_loading = false;
        }
    },
    data() {
        return {
            d_offset: 0,
            d_limit: 10,
            d_count: 0,
            d_loading: false,
            d_items: [],
        };
    },
};
