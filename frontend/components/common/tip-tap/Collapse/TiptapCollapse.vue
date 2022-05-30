<template>
    <node-view-wrapper>
        <div class="tiptap-collapse"
             :class="{'tiptap-collapse_editable': c_editable}"
        >
            <div ref="header"
                 class="tiptap-collapse__btn"
                 contenteditable="false"
                 role="button"
                 :class="[d_active ? 'tiptap-collapse_open' : '' ]"
                 @click="d_active = !d_active"
            >
                <div v-if="c_editable"
                     class="w-100"
                >
                    <div class="tiptap-collapse__hint">
                        Сворачиваемое содержимое
                    </div>
                    <v-input :value="d_header"
                             class="w-100 mr-3"
                             @click.native.stop
                             @input="updateAttributes({header: arguments[0]})"
                    />
                </div>
                <div v-else
                     v-html="d_header"
                />
                <span class="tiptap-collapse__icon" />
            </div>
            <div v-show="d_active"
                 class="tiptap-collapse__content"
            >
                <node-view-content />
            </div>
        </div>
    </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2';

export default {
    name: 'TiptapCollapse',
    components: {
        NodeViewWrapper,
        NodeViewContent,
    },
    props: nodeViewProps,
    data() {
        return {
            d_header: this.node.attrs.header,
            d_active: false,
        };
    },
    computed: {
        c_editable() {
            return this.editor.view.editable;
        },
    },
};
</script>

<style lang="scss">
.tiptap-collapse {
    white-space: nowrap;
    background: white;
    border-radius: 20px;
    margin: 10px 0;
    border: 1px solid #eaeaea;

    &:hover {
        background: linear-gradient(180deg, $light, white 50px);
    }
}

.tiptap-collapse__btn {
    font-weight: bold;
    display: flex;
    align-items: baseline;
    text-align: left;
    outline: none;
    position: relative;
    overflow: hidden;
    z-index: 5;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 0;
    padding: 20px;
}

.tiptap-collapse__content {
    color: $dark;
    padding: 0 20px 20px;
}

.tiptap-collapse_open {
    .tiptap-collapse__icon {
        transform: rotate(350grad);
    }
}

.tiptap-collapse__icon {
    display: block;
    width: 10px;
    margin-right: 3px;
    height: 10px;
    border-top: 3px solid $secondary;
    border-right: 3px solid $secondary;
    position: relative;
    transform: rotate(150grad);
    transition: transform .2s, border-color .2s;
}

.tiptap-collapse_editable {
    background: #f3f3f3;
}

.tiptap-collapse__hint {
    background: #dadada;
    color: #989898;
    padding: 0 15px;
    border-radius: 30px;
    font-size: 12px;
    display: inline-block;
    margin-bottom: 10px;
    font-weight: 100;
}
</style>
