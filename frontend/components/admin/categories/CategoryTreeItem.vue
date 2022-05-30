<template>
    <div class="category-tree-item">
        <div class="category-tree-item__info link link_primary"
             role="button"
             :data-open="d_showChildren && (c_children.length ? true : false)"
             @click="d_showChildren = !d_showChildren"
        >
            <span :class="{'category-tree-item__toggle_disabled': !c_children.length }"
                  class="category-tree-item__toggle"
            />
            <span>{{ category.name }} {{ `${c_children.length ? '(' +c_children.length + ')' : ''}` }}</span>
            <span class="category-tree-item__updated">{{ `Последнее обновление: ${formatDateTime(category.updateAt)}` }}</span>
            <span class="category-tree-item__edit icon-edit link"
                  role="button"
                  @click.stop="d_showEditor = true"
            />
        </div>
        <transition-collapse>
            <div v-show="d_showChildren"
                 class="category-tree-item__children"
            >
                <category-tree-item v-for="child in c_children"
                                    :key="child.id"
                                    :category="child"
                />
            </div>
        </transition-collapse>

        <category-editor v-if="d_showEditor"
                         :category="category"
                         @close="d_showEditor = false"
        />
    </div>
</template>

<script>
import { formatDateTime } from '../../../assets/js/filters/dayjs';
export default {
    name: 'CategoryTreeItem',
    props: {
        category: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            d_showEditor: false,
            d_showChildren: false,
        };
    },
    computed: {
        c_children() {
            return this.$store.getters['categories/whereParentId'](this.category.guid);
        },
    },
    methods: {
        formatDateTime,
    },
};
</script>

<style lang="scss">

.category-tree-item__info {
    padding: 7px;
    display: grid;
    grid-template-columns: 30px 1fr 1fr 40px;
    justify-content: space-between;
    align-items: center;
    color: $dark;
    border: 1px solid rgb(224, 224, 224);
    border-radius: 15px;
    margin-top: 15px;
}
.category-tree-item__toggle {
    position: relative;
    &:before {
        content: "";
        transition: transform .2s ease-in;
        border: 4px solid transparent;
        border-top: 6px solid $primary;
        transform-origin: 4px 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
    }
    &_disabled {
        &::before{
            border-top: 6px solid $gray;
        }
    }
}

.category-tree-item__edit {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        color: $primary;
    }
}

[data-open=true] {
    .category-tree-item__toggle:before {
        transform: rotateX(180deg);
    }
}

.category-tree-item__children {
    padding-left: 2rem;

}
.category-tree-item__updated {
    font-size: 13px;
    color: $gray;
    text-align: right;

}
</style>
