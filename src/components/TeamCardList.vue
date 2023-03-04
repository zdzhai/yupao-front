<template>
  <div id="teamCardList">
    <!--  把这一部分抽出成为父组件，在需要的页面引入。-->
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :title="team.name"
        :thumb="png"
    >
      <template #tags>
        <van-tag plain mark type="danger"  style="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button type="primary" plain size="small" v-if="team.userId !== currentUser?.id && !team.hasJoin"
                    @click="preJoinTeam(team)">
          加入队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" plain size="small"
                    @click="doUpdateTeam(team.id)">
          更新队伍</van-button>
        <van-button  plain size="small" v-if="team.userId !== currentUser?.id && team.hasJoin"
                     @click="doQuitTeam(team.id)">
          退出队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" plain size="small"
                    @click="doDeleteTeam(team.id)">
          解散队伍</van-button>
        <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button
                    @confirm="doJoinTeam" @cancel="doJoinCancel">
          <van-field v-model="password" placeholder="请输入密码"/>
        </van-dialog>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../moduls/team";
import {teamStatusEnum} from "../constants/teamEnum";
import png from '../assets/vue.svg';
import myAxios from "../plugins/myAxios.js";
import {useRoute, useRouter} from "vue-router";
import {inject, onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";

const router = useRouter();
const route = useRoute();
interface TeamCardListProps{
  teamList : TeamType[];
}
//props能拿到父组件传递过来的属性
const props =  defineProps<TeamCardListProps>()

const currentUser = ref({})
/*
页面加载时获取当前用户
 */
onMounted(async () => {
   currentUser.value = await getCurrentUser();
})
/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam =  (id: number) => {
 router.push({
   path: '/team/update',
   query: {
     id,
   }
 })
}
/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit',{
    teamId: id,
  }).finally((response) =>{
    return response?.data;
  })
  if (res.data?.code === 0){
    console.log('操作成功');
    location.reload();
  } else {
    console.log('操作失败' + (res.description ? `，${res.description}`:''));

  }
}
/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete',{
    id: id,
  }).finally((response) =>{
    return response?.data;
  })
  if (res.data?.code === 0){
    console.log('操作成功');
    location.reload();
  } else {
    console.log('操作失败' + (res.description ? `，${res.description}`:''));

  }
}

let showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);
/**
 * 点击确定向后台发请求加入队伍
 * @returns {Promise<void>}
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value){
    return;
  }
  const res = await myAxios.post('/team/join',{
    password: password.value,
    teamId: joinTeamId.value,
  });
  if (res.data?.code === 0){
    console.log('加入成功');
    doJoinCancel();
  } else {
    console.log('加入失败'+ (res.data?.description ? `,${res.data.description}` : ''));
    doJoinCancel();
  }
}
/**
 * 取消时清空输入框和队伍Id
 */
const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 判断是不是解密房间，是的话弹出密码输入框
 * @param team
 */
const preJoinTeam = (team : TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0){
    doJoinTeam();
  } else {
    showPasswordDialog.value = true;
  }
}
</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>