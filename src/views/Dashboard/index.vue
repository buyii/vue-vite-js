<template>
  <div ref="containerRef" >
    <div class="divclass" v-for="item in list" :key="item.id" >{{ item.name }}</div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue';

const container = useTemplateRef('containerRef')

const list = ref([
    { name: '张三', id: 1 },
    { name: '李四', id: 2 },
    { name: '王五', id: 3 },
    { name: '赵六', id: 4 },
    { name: '刘琦', id: 5 },
    { name: '孙权', id: 6 },
    { name: '曹操', id: 7 },
])

const insatance = useSortable(container,list,{
    animation: 600,
    onUpdate:(e)=>{
        console.log(e,'这是父组件')
    }
})

</script>

<style scoped>
.divclass{
    background: #409eff;
    color: #fff;
    width: 200px;
    margin-bottom: 10px;
    text-align: center;
    user-select: none;
}
</style>