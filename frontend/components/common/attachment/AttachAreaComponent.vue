<template>
    <div class="attach-area"
         :class="{ 'attach-area_multiple': maxCount > 1, 'attach-area_error': c_error }"
    >
        <input ref="input"
               type="file"
               name="files[]"
               style="display: none"
               :multiple="maxCount > 1"
               :accept="accept"
               @change="inputChanged"
        >
        <div v-if="d_value.length"
             class="attach-area__items"
             :style="c_areaStyle"
        >
            <div v-for="(file, i) in d_value"
                 :key="i"
                 class="attach-area__item"
                 :class="{ 'attach-area__item_dragging': d_draggedFile === file }"
                 @dragstart.prevent
                 @mousedown="onStartDragging(file)"
                 @mouseenter="onItemMouseEnter(file)"
            >
                <template v-if="file">
                    <loading-component v-if="file.loading"
                                       class="attach-area__loading"
                    />
                    <attachment v-else
                                class="attach-area__attachment"
                                :attachment="file"
                    />

                    <div class="attach-area__controls">
                        <i role="button"
                           class="icon-times attach-area__delete"
                           @click="removeAttachment(i)"
                        />
                        <i v-if="!file.loading"
                           role="button"
                           class="icon-edit attach-area__edit"
                           @click="d_edit = file"
                        />
                    </div>
                </template>
            </div>
        </div>

        <div v-if="c_canAttachMore"
             class="attach-area__attach"
             :class="{ 'attach-area__attach_hover': d_hover }"
             role="button"
             @dragover.prevent.stop="d_hover = true"
             @dragleave="d_hover = false"
             @drop.prevent="onDrop"
             @click="onClick"
        >
            <i class="attach-area__attach-icon icon-upload" />
            <div class="attach-area__attach-title">
                {{ label }}
            </div>
            <div class="attach-area__attach-sub-title">
                {{ subLabel }}
            </div>
        </div>

        <v-modal v-if="d_edit"
                 title="Редактирование файла"
                 @close="d_edit = false"
        >
            <v-input v-model="d_edit.name"
                     label="Название"
                     class="mb-3"
            />
            <v-button type="button"
                      @click.native="saveAttachmentChanges"
            >
                Сохранить
            </v-button>
        </v-modal>
    </div>
</template>

<script>
import axios from 'axios';
import VInput from '../form/VInput';
import Attachment from '~/components/common/attachment/Attachment';
import LoadingComponent from '~/components/common/LoadingComponent';
import VModal from '~/components/common/VModal';
import VButton from '~/components/common/form/VButton';

export default {
    name: 'AttachAreaComponent',
    components: {
        VButton,
        VInput,
        VModal,
        LoadingComponent,
        Attachment,
    },
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
            default: 'Загрузите или перетащите изображения',
        },
        subLabel: {
            type: String,
            default: 'Не более 10 шт., формат файлов .jpg, .png до 1 МБ',
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
        thumbnailWidth: {
            type: String,
            default: '100px',
        },
        thumbnailHeight: {
            type: String,
            default: '100px',
        },
        allowEmbed: {
            type: Boolean,
            default: false,
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
        c_areaStyle() {
            return {
                minHeight: parseInt(this.thumbnailHeight) + 'px',
                minWidth: parseInt(this.thumbnailWidth) + 'px',
            };
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
        onDrop(event) {
            const dt = event.dataTransfer;
            this.handleFiles(dt.files);
            return false;
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
        async handleEmbedBtnClick() {
            const url = window.prompt('Код для встраивания:');
            if (url) {
                const attachFile = {
                    id: null,
                    loading: true,
                };
                this.d_value.push(attachFile);
                const res = await this.uploadFile(url, true);
                const index = this.d_value.indexOf(attachFile);
                if (index >= 0) {
                    this.d_value.splice(index, 1, res);
                }

                this.$emit('input', this.c_value);
            }
        },
        /* removeFile(file) {
            const index = this.d_value.indexOf(file);

            if (index < 0) {
                return;
            }

            this.d_value.splice(index, 1);
            if (!file.loading) {
                this.$emit("input", this.c_value);
                this.$emit("remove", file);
            }
        }, */
        async saveAttachmentChanges() {
            const attachment = this.d_edit;
            attachment.loading = true;
            await this.http.put(`${this.route}/${attachment.id}`, attachment);
            this.d_edit = false;
            attachment.loading = false;
        },
        onItemMouseEnter(item) {
            if (this.d_draggedFile && this.d_draggedFile !== item) {
                const a = this.d_value.indexOf(this.d_draggedFile);
                const b = this.d_value.indexOf(item);
                this.d_value.splice(a, 1);
                this.d_value.splice(b, 0, this.d_draggedFile);
                this.$emit('input', this.d_value);
            }
        },
        onStartDragging(item) {
            this.d_draggedFile = item;
            document.body.addEventListener(
                'mouseup',
                () => {
                    this.d_draggedFile = null;
                },
                {
                    once: true,
                },
            );
        },
    },
};
</script>

<style lang="scss">

.attach-area {
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
    margin-bottom: 1rem;
    position: relative;
    flex-shrink: 0;
    //box-shadow: $card-shadow;
}

.attach-area_multiple {
    width: 100%;
}

.attach-area__attach {
    background: none;
    border: 1px dashed $gray;
    cursor: pointer;
    padding: 15px;
    height: 130px;
    width: 100%;
    color: $dark;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    * {
        pointer-events: none;
    }

    &:hover,
    &.attach-area__attach_hover {
        background: #0000000a;
    }
}

.attach-area__attach-icon {
    color: $primary;
    margin-bottom: 5px;
}

.attach-area__attach-sub-title {
    color: $gray;
}

.attach-area__items {
    position: relative;
    display: grid;
    justify-content: flex-start;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
    box-sizing: content-box;
    margin-bottom: 30px;
}

.attach-area__item {
    position: relative;
    height: 135px;
    transition: transform 0.1s ease-in;

    &:hover {
        .attach-area__controls {
            display: flex;
        }
    }

    &.attach-area__item_dragging {
        transform: scale(1.1);
        z-index: 1;
        cursor: move !important;
    }
}

.attach-area__attachment {
    width: 100%;
    height: 100%;
}

.attach-area__loading {
    position: absolute;
    top: 0;
    margin: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 46px;
    height: 46px;
}

.attach-area__controls {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    flex-direction: column;

    i {
        background: $light;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
        color: $gray;
        cursor: pointer;

        &:hover {
            background: #e7e7e7;
        }
    }

    .attach-area__delete {
        font-size: 12px;
        border-bottom: 1px solid $gray;
    }
}

.attach-area_error {
    .attach-area__attach {
        border-color: $danger;
        border-width: 2px;
    }
}
</style>
