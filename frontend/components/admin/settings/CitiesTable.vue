<template>
    <div class="cities-table">
        <city-card v-for="item in c_cities"
                   :key="item.guid"
                   :city="item"
                   @edit="$emit('edit', arguments[0])"
        />
    </div>
</template>

<script>
export default {
    name: 'CitiesTable',
    computed: {
        c_cities() {
            return this.$store.state.cities.items;
        },
    },
};
</script>

<style lang="scss">
.cities-table {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

}
</style>
