<template>
    <div
        class="city-card"
    >
        <span>{{ city.name }}</span>
        <i class="icon-edit city-card__icon"
           @click="$emit('edit', city)"
        />
    </div>
</template>

<script>
export default {
    name: 'CityCard',
    props: {
        city: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.city-card {
    padding: 10px;
    border-radius: 15px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .city-card__icon {
      font-size: 20px;
      &:hover {
          color: $primary;
          cursor: pointer;
      }
  }
</style>
