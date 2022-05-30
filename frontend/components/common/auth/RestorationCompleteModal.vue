<template>
    <v-modal title="Восстановление пароля"
             @close="$emit('close')"
    >
        <p class="mb-4">
            Мы отправили ваш новый пароль на электронную почту
            <span class="link link_primary">{{ email }}</span>
        </p>
        <v-button schema="primary"
                  @click.native="$emit('goto', {component: 'signin'})"
        >
            Войти
        </v-button>
    </v-modal>
</template>

<script>
export default {
    name: 'RestorationCompleteModal',
    props: {
        email: {
            type: String,
            required: true,
        },
    },

};
</script>

<style scoped>

</style>
