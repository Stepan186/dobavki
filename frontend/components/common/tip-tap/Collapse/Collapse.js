import { mergeAttributes, Node } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import TiptapCollapse from '@/components/common/tip-tap/Collapse/TiptapCollapse';

export default Node.create({
    name: 'collapse',

    group: 'block',
    draggable: true,

    content: 'inline*',
    // atom: true,

    addAttributes() {
        return {
            header: {
                default: 'Заголовок',
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'tiptap-collapse',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['tiptap-collapse', mergeAttributes(HTMLAttributes), 0];
    },

    addNodeView() {
        return VueNodeViewRenderer(TiptapCollapse);
    },

    addCommands() {
        return {
            collapse: () => ({ commands }) => {
                return commands.toggleNode('collapse', 'collapse');
            },
        };
    },
});

// import { Node } from 'tiptap';
// import TiptapCollapse from '@/components/common/tip-tap/Collapse/TiptapCollapse';
//
// export default class Collapse extends Node {
//     get name() {
//         return 'collapse';
//     }
//
//     get schema() {
//         return {
//             attrs: {
//                 header: {
//                     default: 'header',
//                 },
//                 body: {
//                     default: 'body',
//                 },
//             },
//             // inclusive: true,
//             group: 'block',
//             atom: true,
//             content: 'block*',
//             defining: true,
//             marks: '_',
//             draggable: true,
//             selectable: true,
//             parseDOM: [{
//                 tag: 'v-collapse',
//                 getAttrs: (dom) => {
//                     try {
//                         return {
//                             header: dom.children[0].innerHTML,
//                             body: dom.children[1].innerHTML,
//                         };
//                     } catch (e) {
//                         return {
//                             header: 'Заголовок',
//                             body: 'Содержимое',
//                         };
//                     }
//                 },
//             }],
//             toDOM: (node) => {
//                 console.log(node);
//                 const n = document.createElement('v-collapse');
//                 n.innerHTML = `<div slot="default">${node.attrs.header}</div><div slot="body">${node.attrs.body}</div>`;
//                 return n;
//             },
//         };
//     }
//
//     commands({ type }) {
//         return attrs => (state, dispatch) => {
//             const { selection } = state;
//             const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
//             const node = type.create(attrs);
//             const transaction = state.tr.insert(position, node);
//             dispatch(transaction);
//         };
//     }
//
//     get view() {
//         return TiptapCollapse;
//     }
// }
