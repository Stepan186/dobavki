<template>
    <transition-collapse>
        <v-notify v-if="c_show"
                  type="error"
                  @close="d_clickedClose = true"
        >
            <ul class="form-errors__list">
                <li v-for="(error, idx) in c_errors"
                    :key="idx"
                    class="form-errors__item"
                >
                    {{ error }}
                </li>
            </ul>
        </v-notify>
    </transition-collapse>
</template>

<script>

export default {
    name: 'FormErrors',
    props: {
        errors: {
            type: [Object, Array],
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            d_clickedClose: false,
        };
    },
    computed: {
        c_show() {
            return this.errors && Object.keys(this.errors).length > 0 && !this.d_clickedClose;
        },
        c_errors() {
            let res = [];
            if (Array.isArray(this.errors)) {
                res = this.errors;
            } else if (typeof (this.errors) === 'object') {
                res = [this.errors.message].flat();
            } else {
                res = [this.errors];
            }
            return res.flat();
        },
    },
    watch: {
        errors() {
            this.d_clickedClose = false;
        },
    },
};
</script>

<style scoped
       lang="scss"
>
.form-errors__list {
    margin-bottom: 0;
    list-style: none;
    padding: 0 25px 0 0;

    li {
        margin-bottom: 0;
    }
}

.form-errors__item + .form-errors__item {
    margin-top: 5px;
}
</style>
