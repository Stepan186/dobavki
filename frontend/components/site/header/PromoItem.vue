<template>
    <div class="promo-item">
        <img
            :src="promo.image.url"
            alt=""
        >
        <div v-if="editable"
             class="promo-item__controls"
        >
            <div class="promo-item__edit"
                 @click="$emit('edit')"
            >
                <i class="icon-edit-square" />
            </div>
            <div class="promo-item__remove"
                 @click="$emit('remove')"
            >
                <i class="icon-delete" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PromoItem',
    props: {
        promo: {
            type: Object,
            default: null,
        },
        editable: {
            default: false,
            type: Boolean,
        },
    },
};
</script>

<style lang="scss">
.promo-item {
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
      .promo-item__controls {
          top: 0;
      }
  }
}
.promo-item__controls {
    position: absolute;
    top: -50px;
    right: 0;
    font-size: 30px;
    display: flex;
    transition: top .3s ease;
    .promo-item__edit, .promo-item__remove {
        padding: 10px;
        background: rgba($light, 0.9);
        &:hover{
            color: $primary;
            cursor: pointer;
        }
    }
}
</style>
