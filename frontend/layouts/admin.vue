<template>
    <div class="admin-layout">
        <admin-navbar />
        <Nuxt class="admin-layout__content" />
    </div>
</template>

<script>
import AdminNavbar from '../components/admin/AdminNavbar.vue';
export default {
    name: 'AdminLayout',
    components: { AdminNavbar },
};
</script>

<style lang="scss" scoped>
.admin-layout {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;

  .admin-layout__content {
      overflow: auto;
      padding: 20px 30px;
  }
}
</style>
