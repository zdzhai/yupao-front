<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="'请输入${editUser.editName}'"
      />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import {markRaw, onMounted, ref} from 'vue';
import myAxios from "../plugins/myAxios.js";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user.ts";

const router = useRouter();
const route = useRoute();
/**
 * 获取请求参数
 */
const editUser = ref({
  editKey:route.query.editKey,
  currentValue:route.query.currentValue,
  editName:route.query.editName,
})

console.log(route);
console.log(route.query);

// const currentUser =  getCurrentUser();

  const onSubmit = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser){
      console.log('用户未登录');
      return;
    }
    const res =  await myAxios.post("/user/update",{
      //[]可以动态获取变量名
      'id' : currentUser.id,
      [editUser.value.editKey as string]:editUser.value.currentValue,
    })
    console.log("更新响应的结果",res);
    if (res.data.code === 0 && res.data.data > 0){
      router.back();
      Toast.success("修改成功");

    } else {
      console.log("修改失败");
    }
  };

</script>

<style scoped>

</style>