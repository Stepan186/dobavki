<template>
    <v-modal title="Сообщение"
             @close="$emit('close')"
    >
        <div class="mb-3">
            {{ feedback.body }}
        </div>
        <div>
            <span class="font-weight-bold">Дата: </span> {{ formatDateTime(feedback.createdAt) }}
        </div>
        <div>
            <span class="font-weight-bold">Автор: </span> {{ feedback.name }}
        </div>
        <div>
            <span class="font-weight-bold">Телефон: </span> {{ feedback.phone }}
        </div>
        <template v-if="!feedback.answered"
                  #footer
        >
            <span role="button"
                  class="link link_primary"
                  @click="markResolved"
            >
                Пометить отвеченным
            </span>
        </template>
    </v-modal>
</template>

<script>
import { formatDateTime } from 'assets/js/filters/dayjs';

export default {
    name: 'FeedbackModal',
    props: {
        feedback: {
            type: Object,
            required: true,
        },
    },
    methods: {
        formatDateTime,
        async markResolved() {
            await this.$api.feedback.markResolved(this.feedback.id);
            this.$emit('update', {
                ...this.feedback,
                answered: true,
            }, this.feedback);
            this.$emit('close');
        },
    },
};
</script>

<style scoped>

</style>
