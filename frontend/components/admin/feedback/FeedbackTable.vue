<template>
    <div>
        <div class="feedbacks-table table">
            <div class="feedbacks-table__header table__head">
                <div>Дата</div>
                <div>Пользователь</div>
                <div>Телефон</div>
                <div>
                    Сообщение
                </div>
            </div>

            <div v-for="feedback in d_items"
                 :key="feedback.id"
                 class="feedbacks-table__row table__row"
                 :class="{'feedbacks-table__row_new': !feedback.answered}"
                 @click="d_showModal = feedback"
            >
                <div>{{ formatDateTime(feedback.createdAt) }}</div>
                <div>{{ feedback.name }}</div>
                <div>{{ feedback.phone }}</div>
                <div>{{ limitText(feedback.body, 150) }}</div>
            </div>
        </div>
        <v-pagination v-show="d_count || d_loading"
                      ref="pagination"
                      class="mt-5"
                      :items.sync="d_items"
                      :loading.sync="d_loading"
                      :offset.sync="d_offset"
                      :limit.sync="d_limit"
                      :count.sync="d_count"
                      :fetch="fetch"
        />
        <feedback-modal v-if="d_showModal"
                        :feedback="d_showModal"
                        @close="d_showModal = false"
                        @update="onUpdate"
        />
    </div>
</template>
<script>
import { formatDateTime } from 'assets/js/filters/dayjs';
import UsesPagination from 'assets/js/mixins/UsesPagination';
import limitText from 'assets/js/filters/limitText';

export default {
    name: 'FeedbacksTable',
    mixins: [UsesPagination],
    async fetch() {
        this.d_loading = true;
        const res = await this.fetch({
            limit: this.d_limit,
            offset: this.d_offset,
        });
        this.d_items = res.results;
        this.d_count = res.count;
        this.d_loading = false;
    },
    data() {
        return {
            d_showModal: false,
        };
    },
    methods: {
        formatDateTime,
        async fetch({ limit, offset }) {
            return await this.$api.feedback.fetch({
                limit,
                offset,
            });
        },
        limitText,
        onUpdate(val, old) {
            const idx = this.d_items.findIndex(item => item.id === old.id);
            if (idx >= 0) {
                this.d_items.splice(idx, 1, val);
            }
        },
    },
};
</script>

<style lang="scss">
@import "../../../assets/sass/variables";

.feedbacks-table__header, .feedbacks-table__row {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 150px 170px 170px auto;
}

.feedbacks-table__header {
    @include media-breakpoint-down(md) {
        display: none;
    }
}

.feedbacks-table__row {
    @include media-breakpoint-down(md) {
        grid-template-columns: 1fr;
        grid-gap: 5px;
    }
}

.feedbacks-table__row_new {
    background: $danger !important;
    cursor: pointer;
    color: white;
}
</style>
