<template>
  <UserCardList :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.js";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();

const userList = ref([]);
//异步调用
onMounted(async () => {
  // Make a request for a user with a given ID
  //等待异步方法执行完成
  const userListData = await myAxios.get('/user/recommend',{
    params: {
      pageNum: 1,
      pageSize: 8,
    },
    //序列化参数
    // paramsSerializer: (params: any) => {
    //   return qs.stringify(params, { indices: false })
    // },
    //axios版本升级导致，0.x升级为1.x
  })
      .then(function (response) {
        console.log('/user/recommend success');
        return response?.data;
      })
      .catch(function (error) {
        console.log('/user/recommend fail', error);
      })
  // console.log('userListData'+userListData);
  if (userListData.data.records.length > 0){
    console.log(typeof(userListData.data));
    userListData.data.records.forEach(user => {
      if (user.tags) {
        //把json字符串转为json数组
        user.tags = JSON.parse(user.tags);
      }
    })
    // console.log(userListData.data.records[0].tags);
    // console.log(userListData.data.records);
    userList.value = userListData.data.records;
  }
})
const { tags } = route.query;

</script>

<style scoped>

</style>