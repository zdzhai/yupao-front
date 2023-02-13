<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamData.name"
          name="name"
          label="队伍名称"
          placeholder="请输入队伍名称"
          :rules="[{ required: true, message: '请输入队伍名称' }]"
      />
      <van-field
          v-model="addTeamData.description"
          rows="3"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请输入队伍描述"
      />
      <van-field name="stepper" label="队伍人数">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
        </template>
      </van-field>
      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私密</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-if="Number (addTeamData.status) === 2"
          v-model="addTeamData.password"
          type="password"
          name="password"
          label="请输入密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请输入密码' }]"
      />
      <van-field
          v-model="result"
          is-link
          readonly
          name="calendar"
          label="过期时间"
          placeholder="点击选择日期"
          @click="showCalendar = true"
      />
      <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from 'vue';
import myAxios from "../plugins/myAxios.js";
import {Toast} from "vant";

const router = useRouter();
const initFormData = {
  "name": "",
  "description": "",
  "expireTime": new Date(2024, 1, 1).getTime(),
  "maxNum": 3,
  "password": "",
  "status": 0
}
const addTeamData = ref({...initFormData});
const result = ref('');
const showCalendar = ref(false);
const onConfirm = (date) => {
  result.value = `${date.getMonth() + 1}/${date.getDate()}`;
  showCalendar.value = false;
}

const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  //todo 前端参数校验
  const res = await myAxios.post('/team/add', postData);
  if (res.data.code === 0 && res.data.data) {
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    Toast.fail("登录失败");
  }
}
</script>

<style scoped>

</style>