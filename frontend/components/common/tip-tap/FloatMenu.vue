<template>
    <floating-menu class="float-menu"
                   :editor="editor"
    >
        <button :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
                class="float-menu__button"
                @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
            H1
        </button>
        <button :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
                class="float-menu__button"
                @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
            H2
        </button>
        <button :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
                class="float-menu__button"
                @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
            H3
        </button>
        <button :class="{ 'is-active': editor.isActive('bulletList') }"
                class="float-menu__button"
                @click="editor.chain().focus().toggleBulletList().run()"
        >
            <i class="icon-list-bullet" />
        </button>
    </floating-menu>
</template>

<script>
import { FloatingMenu } from '@tiptap/vue-2';

export default {
    name: 'FloatMenu',
    components: {
        FloatingMenu,
    },
    props: {
        editor: {
            required: true,
            type: Object,
        },
    },
};
</script>

<style scoped lang="scss">
.float-menu {
    display: flex;
    overflow: auto;
    background: #ececec;
    height: 40px;
}

.float-menu__button {
    width: 38px;
    border: none;
    border-bottom: 0;
    background: none;
    color: #797979;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.is-active {
        background: #dedede;
    }

    i {
        display: flex;
        align-items: center;
    }

    &:active {
        outline: none;
    }

    &:hover {
        background: $primary;
        color: $light;
    }
}
</style>
