<template>
  <van-cell title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24"/>
    </template>
  </van-cell>
  <UserCardList :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.js";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const loading = ref(true);
const userList = ref([]);
//之前是异步调用，现在写一个监听器watchEffect，监听isMatchMode的状态
// onMounted(() =>{
// })
const loadDate = async () => {
  loading.value = true;
  let userListData;
  //心动模式
  if (isMatchMode.value){
    const num = 10;
    userListData = await myAxios.get('/user/match',{
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match success');
          return response?.data;
        })
        .catch(function (error) {
          console.log('/user/match fail', error);
        })
    if (userListData.data.length > 0){
      // console.log((userListData.data));
      userListData.data.forEach(user => {
        if (user.tags) {
          //把json字符串转为json数组
          user.tags = JSON.parse(user.tags);
        }
      })
      userList.value = userListData.data;
    }
  } else {
    //普通模式
    //等待异步方法执行完成
    userListData = await myAxios.get('/user/recommend',{
      params: {
        pageNum: 1,
        pageSize: 8,
      },
    })
        .then(function (response) {
          console.log('/user/recommend success');
          return response?.data;
        })
        .catch(function (error) {
          console.log('/user/recommend fail', error);
        })
    if (userListData.data.records.length > 0){
      console.log(typeof(userListData.data));
      userListData.data.records.forEach(user => {
        if (user.tags) {
          //把json字符串转为json数组
          user.tags = JSON.parse(user.tags);
        }
      })
      userList.value = userListData.data.records;
    }
  }
  loading.value = false;
}
const { tags } = route.query;

const isMatchMode = ref(false);
watchEffect(() => {
  loadDate();
})
</script>

<style scoped>

</style>