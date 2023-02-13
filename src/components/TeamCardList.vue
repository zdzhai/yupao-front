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
        <van-button type="primary" plain size="small" @click="doJoinTeam(team.id)">加入队伍</van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../moduls/team";
import {teamStatusEnum} from "../constants/teamEnum";
import png from '../assets/vue.svg';
import myAxios from "../plugins/myAxios.js";

interface TeamCardListProps{
  teamList : TeamType[];
}
//props能拿到父组件传递过来的属性
const props =  defineProps<TeamCardListProps>()

const doJoinTeam = async (id: number) => {
  const res = await myAxios.post('/team/join',{
    teamId: id
  })
      .then(function (response) {
        console.log('/team/list success');
        return response?.data;
      })
      .catch(function (error) {
        console.log('/team/list fail', error);
      })
  if (res.data == 0) {
    console.log(res);
  }
}
</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>