<template>
    <transition-group class="transition-list"
                      name="list-complete"
                      tag="p"
    >
        <slot />
    </transition-group>
</template>

<script>
export default {
    name: 'TransitionList',
};
</script>

<style lang="scss">
.list-complete-item {
    transition: all 1s;
    //display: inline-block;
    margin-right: 10px;
}

.list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active до версии 2.1.8 */
{
    opacity: 0;
    transform: translateY(30px);
}

.list-complete-leave-active {
    position: absolute;
}

.transition-list > * {
    transition: all 1s;
    //display: inline-block;
    margin-right: 10px;
}
</style>
