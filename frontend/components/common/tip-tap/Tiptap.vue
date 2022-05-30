<template>
    <div class="tiptap"
         :class="{'tiptap_editable': editable}"
    >
        <float-menu v-if="editor && editable"
                    :editor="editor"
        />
        <editor-content class="tiptap__content"
                        :editor="editor"
        />
    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';

export default {
    name: 'Tiptap',
    components: {
        EditorContent,
    },
    props: {
        value: {
            default: null,
            type: String,
        },
        editable: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            editor: null,
            d_html: null,
        };
    },
    watch: {
        value(value) {
            if (this.editor.getHTML() === value) {
                return;
            }

            this.editor.commands.setContent(this.value, false);
        },
    },
    mounted() {
        this.editor = new Editor({
            editable: this.editable,
            extensions: [
                StarterKit,
            ],
            content: this.value,
            onUpdate: () => {
                this.$emit('input', this.editor.getHTML());
            },
        });
    },
    beforeDestroy() {
        if (this.editor) {
            this.editor.destroy();
        }
    },
    methods: {},
};
</script>

<style lang="scss">
.tiptap {

    &.tiptap_editable {
        border-bottom: 1px solid $light;
    }

    .ProseMirror {
        outline: none !important;
        min-height: 100px;

        p + p {
            margin-top: 0.5em;
        }
    }
}
</style>
