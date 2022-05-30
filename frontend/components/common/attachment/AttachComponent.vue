<template>
    <div class="attach">
        <input ref="input"
               type="file"
               style="display: none"
               :accept="accept"
               @change="inputChanged"
        >
        <template v-if="d_value.length">
            <div v-for="(attach, idx) in d_value"
                 :key="idx"
                 class="d-flex align-items-center"
            >
                <i class="icon-attach text-primary mr-2" />
                <span class="attach__filename">{{ attach.name }}</span>
                <i class="icon-times attach__remove ml-1"
                   role="button"
                   @click="removeAttachment(idx)"
                />
            </div>
        </template>
        <span v-if="c_canAttachMore"
              role="button"
              class="d-flex align-items-center"
              @click="onClick"
        ><i class="icon-attach text-primary mr-2" /> Прикрепить изображение</span>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AttachComponent',
    components: {},
    props: {
        route: {
            type: String,
            default() {
                return this.$config.apiHost + '/upload';
            },
        },
        http: {
            type: [Object, Function],
            default() {
                return axios;
            },
        },
        value: {
            type: [Object, Array],
            default: null,
        },
        maxCount: {
            type: Number,
            default: 1,
        },
        label: {
            type: String,
            default: 'Прикрепить изображения',
        },
        accept: {
            type: Array,
            default() {
                return ['*.*'];
            },
        },
        params: {
            type: Object,
            default() {
                return {};
            },
        },
        allowAlt: {
            type: Boolean,
            default: false,
        },
        error: {
            type: [String, Boolean, Array],
            default: false,
        },
    },
    data() {
        return {
            d_value: this.value ? [].concat(this.value) : [],
            d_hover: false,
            d_edit: null,
            d_draggedFile: null,
        };
    },
    computed: {
        c_error() {
            if (Array.isArray(this.error)) {
                return this.error.length;
            } else {
                return this.error;
            }
        },
        c_canAttachMore() {
            return (this.maxCount > 1 && this.d_value.length < this.maxCount) || !this.d_value.length;
        },
        c_value() {
            if (this.maxCount > 1) {
                return this.d_value;
            } else {
                return this.d_value[0] || null;
            }
        },
    },
    watch: {
        value(val) {
            if (!val) {
                this.d_value = [];
                return;
            }

            this.d_value = Array.isArray(val) ? val : [].concat(val);
        },
    },
    methods: {
        removeAttachment(idx) {
            this.d_value.splice(idx, 1);
            this.$emit('input', this.d_value);
        },
        inputChanged(event) {
            const inputFiles = event.target.files;
            this.handleFiles(inputFiles);
            event.target.value = '';
        },
        handleFiles(files) {
            for (let i = 0; i < files.length && this.d_value.length < this.maxCount; i++) {
                const file = files[i];

                if (!this.accept.includes('*.*')) {
                    const fileExtension = file.name.split('.').pop();
                    if (!this.accept.includes('.' + fileExtension)) {
                        continue;
                    }
                }

                const attachment = {
                    loading: true,
                    error: false,
                };
                this.d_value.push(attachment);

                this.uploadFile(file)
                    .then((res) => {
                        const index = this.d_value.indexOf(attachment);
                        if (index >= 0) {
                            this.d_value.splice(index, 1, res);
                        }
                        this.$emit('input', this.c_value);
                    })
                    .catch((err) => {
                        attachment.error = err;
                    });
            }
        },
        onClick() {
            this.$refs.input.click();
        },
        async uploadFile(data, isEmbed) {
            const formData = new FormData();
            if (isEmbed) {
                formData.append('embed', data);
            } else {
                formData.append('file', data);
            }
            for (const param in this.params) {
                formData.append(param, this.params[param]);
            }

            return (await this.http.post(this.route, formData, { humps: false })).data;
        },
        async saveAttachmentChanges() {
            const attachment = this.d_edit;
            attachment.loading = true;
            await this.http.put(`${this.route}/${attachment.id}`, attachment);
            this.d_edit = false;
            attachment.loading = false;
        },
    },
};
</script>

<style lang="scss">

.attach {
    font-size: 14px;
    line-height: 14px;
}

.attach__remove {
    vertical-align: middle;
    font-size: 10px;
    line-height: 10px;

    &:hover {
        color: $danger;
    }
}

.attach__filename {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}
</style>
