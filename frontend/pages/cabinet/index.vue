<template>
    <div class="cabinet">
        <h3>Мой профиль</h3>
        <form class="cabinet__profile">
            <v-input label="Имя" />
            <v-input label="Фамилия" />
            <!-- <v-input label="Телефон" /> -->
            <v-masked-input label="Телефон"
                            mask="+7(###)###-##-##"
                            placeholder="+7(___)___-__-__"
            />
            <v-input label="Email" />
            <v-button class="cabinet__profile-btn">
                Сохранить
            </v-button>
        </form>
    </div>
</template>

<script>
import VButton from '../../components/common/form/VButton.vue';
import VInput from '../../components/common/form/VInput.vue';
export default {
    name: 'Cabinet',
    components: { VInput, VButton },
    layout: 'cabinet',
};
</script>

<style lang="scss">
.cabinet {
    .cabinet__profile {
        padding-top: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }
    .cabinet__profile-btn {
        width: min-content;
    }
}
</style>
