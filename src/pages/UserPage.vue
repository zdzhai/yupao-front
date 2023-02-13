<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username"
              @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号"  to="/user/edit" :value="user.userAccount" />
    <van-cell title="头像" is-link to="/user/edit"
              @click="toEdit('avatarUrl','头像',user.avatarUrl)">
      <img style="height: 50px" :src="user.avatarUrl"/>

    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender"
              @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone"
              @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email"
              @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="星球编号"  :value="user.planetCode" />
    <van-cell title="注册时间"  :value="user.createTime" />
  </template>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user.ts";

const user = ref();
//todo 钩子函数就是每次加载页面会执行的操作
onMounted(async () => {
  const currentUser = await getCurrentUser();
  console.log('当前用户'+currentUser.userAccount);
  console.log('当前用户'+currentUser.createTime);
  if (currentUser){
    user.value = currentUser;
    // Toast.fail('获取用户信息成功');
  } else {
    // Toast.fail('获取用户信息失败');
  }
})
const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path:'/user/edit',
    query:{
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>

<style scoped>

</style>