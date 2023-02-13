<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账户"
          placeholder="请输入账户"
          :rules="[{ required: true, message: '请输入账户' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请输入密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup>
import { ref } from 'vue';
import myAxios from "../plugins/myAxios.js";
import {Toast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter();

const userAccount = ref('');
  const userPassword = ref('');
  const onSubmit = async () => {
    console.log('用户登录');
    const res = await myAxios.post('/user/login',{
      userAccount:userAccount.value,
      userPassword:userPassword.value,
    })
    if (res.data.code === 0) {
      // Toast.success("登录成功");
      router.replace('/');
    } else {
      Toast.fail("登录失败");
    }
  };



</script>

<style scoped>

</style>