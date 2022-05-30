<template>
    <div class="contacts">
        <div class="container">
            <address-item class="mb-5" />
            <address-item />
        </div>
    </div>
</template>

<script>
import AddressItem from '../components/site/contacts/AddressItem.vue';
export default {
    name: 'VContacts',
    components: { AddressItem },
    data() {
        return {
            activeNames: ['1'],
        };
    },
};
</script>

<style lang="scss">
.contacts {
  padding: 50px 0;
}
</style>
