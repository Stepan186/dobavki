<template>
    <div class="attachment">
        <div v-if="c_isEmbed"
             class="attachment__content"
             v-html="attachment.url"
        />
        <div v-else-if="c_thumbnail"
             class="attachment__content"
        >
            <img :src="c_thumbnail"
                 :alt="attachment.name"
                 :class="{'attachment__image_cover': cover}"
            >
        </div>
        <div v-else
             class="attachment__content attachment__content_extension"
        >
            <img :src="c_icon"
                 class="attachment__icon"
                 :alt="attachment.name"
            >
            <div class="attachment__name link link_gray"
                 role="link"
                 @click="download"
            >
                {{ attachment.name }}
            </div>
        </div>
    </div>
</template>

<script>
import downloadFile from '@/assets/js/utils/downloadFile';

export default {
    name: 'Attachment',
    props: {
        attachment: {
            type: Object,
            default: null,
            required: true,
        },
        best: {
            type: Boolean,
            default: false,
        },
        cover: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        c_isEmbed() {
            return this.attachment.type === 'embed';
        },
        c_extension() {
            const arr = this.attachment.url.split('.');
            return arr[arr.length - 1];
        },
        c_thumbnail() {
            if (this.attachment.sizes && this.attachment.sizes.length) {
                const compareFnc = this.best
                    ? (b, a) => a.width - b.width
                    : (a, b) => a.width - b.width;
                return Array.from(this.attachment.sizes)
                    .sort(compareFnc)[0].url;
            } else {
                return null;
            }
        },
        c_icon() {
            return `/file-formats/${this.c_extension}.svg`;
        },
    },
    methods: {
        download() {
            downloadFile(this.attachment.url, this.attachment.name);
        },
    },
};
</script>

<style lang="scss">
@import "assets/sass/variables";

.attachment {
    border: 1px solid $light;
    position: relative;
    user-select: none;
}

.attachment__content {
    width: 100%;
    height: 100%;
    display: flex;

    img {
        word-break: break-all;
        font-size: 12px;
        line-height: 14px;
        object-fit: contain;
        width: 100%;
        max-height: 100%;
    }

    iframe {
        width: 100%;
        height: 100%;
    }
}

.attachment__content_extension {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.attachment__icon {
    width: 60px !important;
}

.attachment__name {
    text-align: center;
    font-size: 12px;
    line-height: 14px;
    padding: 0 15px;
    word-break: break-all;
    margin-top: 5px;
}

.attachment__image_cover {
    object-fit: cover;
}
</style>
