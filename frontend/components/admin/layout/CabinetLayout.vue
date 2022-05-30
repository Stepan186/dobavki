<template>
    <div class="container cabinet">
        <v-breadcrumb v-if="breadcrumbs"
                      class="cabinet-layout__breadcrumb"
                      :breadcrumbs="breadcrumbs"
        />
        <h1 v-if="title"
            class="cabinet-layout__title"
        >
            {{ title }}
        </h1>
        <slot v-else-if="this.$slots.title"
              name="title"
        />
        <div class="cabinet-layout__actions">
            <slot name="actions" />
        </div>
        <component :is="c_sidebar"
                   class="cabinet-layout__sidebar"
        />
        <div class="cabinet-layout__page">
            <slot name="default" />
        </div>
    </div>
</template>

<script>
import AdminSidebar from '~/components/admin/layout/AdminSidebar';

export default {
    name: 'CabinetLayout',
    props: {
        title: {
            type: String,
            default: null,
        },
        breadcrumbs: {
            type: Array,
            default: null,
        },
    },
    computed: {
        c_sidebar() {
            return this.$store.getters['auth/isEmployee'] ? AdminSidebar : null;
        },
    },
};
</script>

<style lang="scss" scoped>
.cabinet {
    display: flex;
    flex-wrap: wrap;

    @include media-breakpoint-down(md) {
        flex-direction: column;
    }
}

.cabinet-layout__title {
    width: 50%;
    margin-bottom: 20px;
    font-size: 24px;
    line-height: 24px;

    @include media-breakpoint-down(lg) {
        font-size: 18px;
        line-height: 24px;
    }

    @include media-breakpoint-down(md) {
        width: 100%;
        order: 2;
    }
}

.cabinet-layout__actions {
    width: 50%;
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    grid-gap: 15px;

    @include media-breakpoint-down(md) {
        text-align: left;
        width: 100%;
        order: 4;

        ::v-deep {
            * {
                background: $primary;
                color: white;
                padding: 11px;
                text-align: center;
                display: block;
                width: 100%;
            }

            .link__icon {
                display: none;
            }
        }
    }
}

.cabinet-layout__breadcrumb {
    width: 100%;
    margin-bottom: 45px;

    @include media-breakpoint-down(md) {
        margin-bottom: 20px;
    }
}

.cabinet-layout__sidebar {
    width: 270px;

    @include media-breakpoint-down(lg) {
        width: 170px;
    }

    @include media-breakpoint-down(md) {
        width: 100%;
        margin-bottom: 15px;
        order: 3;
    }
}

.cabinet-layout__page {
    width: calc(100% - 270px);

    @include media-breakpoint-down(lg) {
        width: calc(100% - 170px);
    }

    @include media-breakpoint-down(md) {
        width: 100%;
        order: 5;
    }
}

</style>
