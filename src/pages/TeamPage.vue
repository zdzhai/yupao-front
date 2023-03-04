<template>
  <van-search
      v-model="searchText"
      show-action
      placeholder="搜索队伍"
      @search="onSearch"
  />
  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab title="公开" name="public"/>
    <van-tab title="加密" name="encryption"/>
  </van-tabs>
  <van-button class="add-button" icon="plus" type="primary" @click="toAddTeam"/>
  <TeamCardList :teamList="teamList"/>
  <van-empty v-if="teamList?.length < 1" description="数据为空"/>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";


const router = useRouter();

const toAddTeam = () => {
  router.push({
    path: '/team/add'
  })
}
const searchText = ref('');

const listTeam = async (val = '',status?: number) => {
  const teamListData = await myAxios.get('/team/list',{
    params: {
      searchText: val,
      status,
    }
  })
      .then( (response) => {
        console.log('/team/list success');
        return response?.data;
      })
      .catch(function (error) {
        console.log('/team/list fail', error);
      })
  // console.log('userListData'+ teamListData.data[0]);
  if (teamListData?.code === 0) {
    teamList.value = teamListData.data;
  }
}

const teamList = ref([]);
onMounted( () => {
  listTeam();
})

const value = ref('');
const onSearch = (val) => {
  listTeam(val);

};
const active = ref('public');
/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  if (name === 'public'){
    listTeam(searchText.value,0);
  } else {
    listTeam(searchText.value,2);
  }
}
</script>

<style scoped>

</style>