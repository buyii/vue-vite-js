<template>
    <div v-for="item in arr" >
        <Test :ref="(el)=>setItemRef(el,item)" :item="item" ></Test>
    </div>
    <div>
        <HelloWorld msg="message" />
    </div>
    <div>
        <el-button type="primary" @click="cli" >点击</el-button>
    </div>
</template>


<script setup>
    import * as request from '@/utils/request'
    import dayjs from 'dayjs'
    let cli = async ()=>{
        ElMessage.success("xiaoxi")
        itemRefs.G.log(1)
        let url ='http://test.livejx.cn/fns/common/selectCityPermissions'
        let result = await request.Get(url,{token:localStorage.getItem('token'),username:localStorage.getItem('username')})
        console.log(result)
        let a = getEntryDays('2022-03-03')
        console.log(a)
    }
    let getEntryDays = (entryDate)=> {
      const now = dayjs()
      return +(now.diff(dayjs(entryDate), 'day')) + 1
    }
    let arr = [
        {name: 'A', id: 1},
        {name: 'B', id: 2},
        {name: 'C', id: 3},
        {name: 'D', id: 4},
        {name: 'E', id: 5},
        {name: 'F', id: 6},
        {name: 'G', id: 7},
        ]
    let itemRefs = {}
    let setItemRef = (el,item) => {
      if (el) {
        itemRefs[item.name] = el
      }
    }
</script>

<style>

</style>
