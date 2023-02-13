<template>
  <van-button type="primary" onclick="onSubmit">创建队伍</van-button>
  <TeamCardList :teamList="teamList"/>
</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";

const router = useRouter();

const onSubmit = () => {
  router.push({
    path: '/team/add'
  })
}
const teamList = ref([]);
onMounted(async () => {
  const teamListData = await myAxios.get('/team/list')
      .then(function (response) {
        console.log('/team/list success');
        return response?.data;
      })
      .catch(function (error) {
        console.log('/team/list fail', error);
      })
console.log('userListData'+ teamListData.data[0]);
  if (teamListData.data.length > 0) {
    teamList.value = teamListData.data;
    console.log(teamList.value);
  }
})
</script>

<style scoped>

</style>