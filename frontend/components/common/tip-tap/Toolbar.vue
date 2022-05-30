<template>
    <div class="toolbar"
         :editor="editor"
    >
        <div>
            <button type="button"
                    class="toolbar__button"
                    @click="editor.commands.undo"
            >
                <i class="icon-long-arrow-left" />
            </button>

            <button type="button"
                    class="toolbar__button"
                    @click="editor.commands.redo"
            >
                <i class="icon-long-arrow-right" />
            </button>

            <button type="button"
                    class="toolbar__button"
                    :class="{ 'is-active': editor.isActive.bold() }"
                    @click="editor.commands.bold"
            >
                <i class="icon-bold" />
            </button>

            <button type="button"
                    class="toolbar__button"
                    :class="{ 'is-active': editor.isActive.italic() }"
                    @click="editor.commands.italic"
            >
                <i class="icon-italic" />
            </button>

            <button type="button"
                    class="toolbar__button"
                    :class="{ 'is-active': editor.isActive.strike() }"
                    @click="editor.commands.strike"
            >
                <i class="icon-strikethrough" />
            </button>

            <button type="button"
                    class="toolbar__button"
                    :class="{ 'is-active': editor.isActive.underline() }"
                    @click="editor.commands.underline"
            >
                <i class="icon-underline" />
            </button>

            <button type="button"
                    class="toolbar__button"
                    :class="{ 'is-active': editor.isActive.code() }"
                    @click="editor.commands.code"
            >
                <i class="icon-code" />
            </button>

            <button type="button"
                    class="toolbar__button"
                    :class="{ 'is-active': editor.isActive.paragraph() }"
                    @click="editor.commands.paragraph"
            >
                <i class="icon-paragraph" />
            </button>

            <button type="button"
                    class="toolbar__button font-weight-bold"
                    :class="{ 'is-active': editor.isActive.heading({ level: 1 }) }"
                    @click="editor.commands.heading({ level: 1 })"
            >
                H1
            </button>

            <button type="button"
                    class="toolbar__button font-weight-bold"
                    :class="{ 'is-active': editor.isActive.heading({ level: 2 }) }"
                    @click="editor.commands.heading({ level: 2 })"
            >
                H2
            </button>

            <button type="button"
                    class="toolbar__button font-weight-bold"
                    :class="{ 'is-active': editor.isActive.heading({ level: 3 }) }"
                    @click="editor.commands.heading({ level: 3 })"
            >
                H3
            </button>

            <button type="button"
                    class="toolbar__button font-weight-bold"
                    :class="{ 'is-active': editor.isActive.heading({ level: 4 }) }"
                    @click="editor.commands.heading({ level: 4 })"
            >
                H4
            </button>

            <button type="button"
                    class="toolbar__button font-weight-bold"
                    :class="{ 'is-active': editor.isActive.heading({ level: 5 }) }"
                    @click="editor.commands.heading({ level: 5 })"
            >
                H5
            </button>

            <button type="button"
                    class="toolbar__button"
                    :class="{ 'is-active': editor.isActive.bullet_list() }"
                    @click="editor.commands.bullet_list"
            >
                <i class="icon-list-bullet" />
            </button>

            <button type="button"
                    class="toolbar__button"
                    :class="{ 'is-active': editor.isActive.ordered_list() }"
                    @click="editor.commands.ordered_list"
            >
                <i class="icon-list-number" />
            </button>

            <button type="button"
                    class="toolbar__button"
                    :class="{ 'is-active': editor.isActive.blockquote() }"
                    @click="editor.commands.blockquote"
            >
                <i class="icon-quote" />
            </button>

            <button type="button"
                    class="toolbar__button"
                    :class="{ 'is-active': editor.isActive.collapse() }"
                    @click="editor.commands.collapse"
            >
                <i class="icon-down-open" />
            </button>

            <!-- <image-button :editor="editor" /> -->
            <!-- <link-button :editor="editor" /> -->
            <!-- <embed-button :editor="editor" /> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'Toolbar',
    props: {
        editor: {
            default: null,
            type: Object,
        },
    },
};
</script>

<style scoped lang="scss">
.toolbar {
    display: flex;
    overflow: auto;
    background: #ececec;
    height: 40px;
    border-radius: 20px 20px 0 0;
}

.toolbar__button {
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
