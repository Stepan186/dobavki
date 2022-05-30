<template>
    <div class="admin-topbar">
        <slot name="title" />
        <div class="admin-topbar__actions">
            <slot name="search" />
            <slot name="button" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminTopBar',
};
</script>
<style lang="scss">
.admin-topbar {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .admin-topbar__actions {
    display: flex;
    gap: 20px;
  }
}
</style>
