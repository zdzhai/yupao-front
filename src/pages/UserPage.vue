<template>
  <template v-if="user">
    <div class="avatarStyle" >
      <van-image
          round
          width="6rem"
          height="6rem"
          fit="cover"
          position="contain"
          :src="user?.avatarUrl"
      />
    </div>
      <van-cell title="当前用户" :value="user?.username"/>
      <van-cell title="修改信息" is-link to="/user/update"/>
      <van-cell title="我创建的队伍" is-link to="/team/create"/>
      <van-cell title="我加入的队伍" is-link to="/team/join"/>

  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

const user = ref();
//钩子函数就是每次加载页面会执行的操作
onMounted(async () => {
  const currentUser = await getCurrentUser();
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