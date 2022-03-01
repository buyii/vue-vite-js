<template>
    <div :class="item.name">
        {{item.name}}
    </div>
</template>

<script setup>
    const props = defineProps({
        item: {
            type: Object,
            required: true
        }
    })
    const { item } = props
    // 函数
    const log = (e)=> {
        console.log(e)
        console.log(item.name)
    }
    defineExpose({
        log
    })
</script>

<style>

</style>
