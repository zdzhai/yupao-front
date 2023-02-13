<template>
<!--  把这一部分抽出成为父组件，在需要的页面引入。-->
  <van-card
      v-for="(user,index) in props.userList"
      :key="index"
      :desc="user.profile"
      :title="`${user.username} (${user.planetCode})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain mark type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
</template>

<script setup lang="ts">
import {UserType} from "../moduls/user";

interface UserCardListProps{
  userList : UserType[];
}
//props能拿到父组件传递过来的属性
const props =  defineProps<UserCardListProps>()
</script>

<style scoped>

</style>