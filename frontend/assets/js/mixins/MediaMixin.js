export default {
    data() {
        return {
            d_isMobile: false,
        };
    },
    mounted() {
        this.d_isMobile = window.innerWidth < 768;
    },
};
