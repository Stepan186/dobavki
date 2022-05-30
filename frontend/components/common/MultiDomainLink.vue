<template>
    <nuxt-link v-if="c_sameDomain"
               :to="to"
    >
        <slot />
    </nuxt-link>
    <a v-else
       :href="c_href"
    >
        <slot />
    </a>
</template>

<script>
export default {
    name: 'MultiDomainLink',
    props: {
        to: {
            type: [Object, String],
            required: true,
        },
        domain: {
            type: String,
            default() {
                return this.$config.frontendHost;
            },
        },
    },
    fetch() {
        if (process.server) {
            const req = this.$nuxt.context.req;
            let scheme = req.headers['x-forwarded-proto'];
            if (!scheme) {
                scheme = req.socket.encrypted ? 'https' : 'http';
            }
            const host = req.headers.host;
            this.d_currentHost = scheme + '://' + host;
        } else {
            this.d_currentHost = document.location.origin;
        }
    },
    data() {
        return {
            d_currentHost: null,
        };
    },
    computed: {
        c_href() {
            return this.domain + this.to;
        },
        c_sameDomain() {
            // return this.d_currentHost === this.domain.replace(/(^\w+:|^)\/\//, "");
            return this.d_currentHost === this.domain;
        },
    },
};
</script>
