<template>
    <div class="counter">
        <div class="counter__btn"
             @click="decrement"
        >
            -
        </div>
        {{ c_value }}
        <div class="counter__btn"
             @click="increment"
        >
            +
        </div>
    </div>
</template>

<script>
export default {
    name: 'VCounter',
    props: {
        value: {
            type: Number,
            required: true,
        },
    },
    computed: {
        c_value: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
    },
    methods: {
        increment() {
            this.c_value++;
        },
        decrement() {
            if (this.c_value > 1) {
                this.c_value--;
            }
        },
    },
};
</script>

<style lang="scss">
.counter {
  border: 1px solid $gray;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  font-size: 16px;
  font-weight: bold;
  border-radius: 15px;
  width: 77px;
  align-items: center;
  background: $light;
  overflow: hidden;
  gap: 5px;

  .counter__btn {
    text-align: center;

    &:hover {
      cursor: pointer;
      background: $primary;
      color: $light;
    }
  }

}
</style>
