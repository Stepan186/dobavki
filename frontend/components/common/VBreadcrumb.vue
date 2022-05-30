<template>
    <ul class="breadcrumb">
        <li v-for="(item, idx) in breadcrumbs"
            :key="idx"
            class="breadcrumb__item"
        >
            <component :is="item.url ? 'nuxt-link' : 'span'"
                       :to="item.url"
            >
                {{ item.name }}
            </component>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'VBreadcrumb',
    props: {
        breadcrumbs: {
            type: Array,
            default: null,
        },
    },
};
</script>

<style lang="scss">
.breadcrumb {
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    font-size: 14px;
    white-space: nowrap;
    overflow-x: auto;

    @include media-breakpoint-down(md) {
        font-size: 12px;
    }
}

.breadcrumb__item * {
    color: $gray;
}

.breadcrumb__item:first-child {
    list-style: none;
}

.breadcrumb__item + .breadcrumb__item {
    margin-left: 30px;

    &::marker {
        color: $gray;
    }
}
</style>
