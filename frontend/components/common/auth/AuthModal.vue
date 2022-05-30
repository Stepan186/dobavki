<template>
    <component :is="c_component"
               v-bind="d_data"
               @close="$emit('close')"
               @goto="onGoTo"
    />
</template>

<script>
import SignInModal from '~/components/common/auth/SignInModal';
import SignUpModal from '~/components/common/auth/SignUpModal';
import RestorationCompleteModal from '~/components/common/auth/RestorationCompleteModal';
import RestorationModal from '~/components/common/auth/RestorationModal';

export default {
    name: 'AuthModal',
    data() {
        return {
            d_state: 'login',
            d_data: {},
        };
    },
    computed: {
        c_component() {
            switch (this.d_state) {
            case 'signup':
                return SignUpModal;
            case 'signin':
                return SignInModal;
            case 'restoration':
                return RestorationModal;
            case 'restoration-complete':
                return RestorationCompleteModal;
            default:
                return SignInModal;
            }
        },
    },
    methods: {
        onGoTo({ component, data = {} }) {
            this.d_state = component;
            this.d_data = data;
        },
    },
};
</script>

<style scoped>

</style>
