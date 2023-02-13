<template>
  <UserCardList :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.js";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();

const userList = ref([]);
//异步调用
onMounted(async () => {
  // Make a request for a user with a given ID
  //等待异步方法执行完成
  const userListData = await myAxios.get('/user/search/tags',{
    params: {
      tagNameList: tags
    },
    //序列化参数
    // paramsSerializer: (params: any) => {
    //   return qs.stringify(params, { indices: false })
    // },
    //axios版本升级导致，0.x升级为1.x
    paramsSerializer: {
      serialize:function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
  })
      .then(function (response) {
        console.log('/user/search/tags success');
        return response?.data;
      })
      .catch(function (error) {
        console.log('/user/search/tags fail', error);
      })
  console.log(userListData);
  if (userListData.data.length > 0){
    console.log(typeof(userListData.data[0].tags));
    userListData.data.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    console.log(typeof(userListData.data[0].tags));
    // console.log(userListData.data[1].tags);
    userList.value = userListData.data;
  }
})

// const mockUser = {
//   id: 2,
//   username: '东',
//   userAccount: 'zzd',
//   profile: '全栈攻城狮',
//   avatarUrl: 'http://cdn.chuanxz.com/me/me.jpg',
//   gender: '男',
//   phone: '11111',
//   email: '11111@qq.com',
//   planetCode: '123',
//   tags: ['java', 'C'],
//   createTime: new Date(),
// };
const { tags } = route.query;

</script>

<style scoped>

</style>