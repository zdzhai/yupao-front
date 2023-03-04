<template>
  <div id="teamPage">
    <van-search v-model="searchText" show-action placeholder="搜索队伍" @search="onSearch"/>
    <TeamCardList :teamList="teamList"/>
    <van-button class="add-button" icon="plus" type="primary" @click="toAddTeam"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";

const router = useRouter();
const searchText = ref('');

const toAddTeam = () => {
  router.push({
    path: '/team/add'
  })
}

const teamList = ref([]);
const listTeam = async (val = '') => {
  const teamListData = await myAxios.get('/team/list/my/create',{
    params: {
      searchText: val,
    }
  })
      .then(function (response) {
        console.log('/team/list success');
        return response?.data;
      })
      .catch(function (error) {
        console.log('/team/list fail', error);
      })
  console.log('userListData'+ teamListData.data[0]);
  if (teamListData?.code === 0) {
    teamList.value = teamListData.data;
    console.log(teamList.value);
  }
}

onMounted( () => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);

};

</script>

<style scoped>

</style>