<template>
  <van-nav-bar
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
  <template #right>
    <van-icon name="search" size="18" />
  </template>
 </van-nav-bar>
<!--  这里是之前使用vant3组件库中tabber组件用监听器来监听点击的图标并转向对应页面-->
<!--  <van-tabbar v-model="active" @change="onChange">-->
<!--    <van-tabbar-item  name="index" icon="home-o">首页</van-tabbar-item>-->
<!--    <van-tabbar-item  name="team" icon="search">队伍</van-tabbar-item>-->
<!--    <van-tabbar-itemname="user" icon="friends-o">个人</van-tabbar-item>-->
<!--  </van-tabbar>-->
  <div id="content" >
<!--    这是之前使用v-if用active属性去引入不同页面，页面的地址不变，改变的是引入的组件内容-->
<!--    后来采用路由模式是直接更换页面的链接-->
<!--    <template v-if="active === 'index'">-->
<!--      <Index></Index>-->
<!--    </template>-->
<!--    <template v-if="active === 'team'">-->
<!--      <Team></Team>-->
<!--    </template>-->
    <router-view/>
  </div>
    <p></p>
      <!--使用 router-link 组件进行导航 -->
      <!--通过传递 `to` 来指定链接 -->
      <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
<!--    这里是router-link搭配router-view的使用，后来改为vant3组件中tabber的路由模式-->
<!--  ，可直接搭配router-view在页面中的任意位置使用-->
<!--      <router-link to="/">Go to Home</router-link>-->
<!--      <router-link to="/team">Go to Team</router-link>-->
    <van-tabbar route @change="onChange">
      <van-tabbar-item to="/" name="index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/team" name="team" icon="search">队伍</van-tabbar-item>
      <van-tabbar-item to="/user" name="user" icon="friends-o">个人</van-tabbar-item>
    </van-tabbar>


</template>

<!--setup是vue3的语法糖，可以直接将变量暴露给页面-->
<script setup lang="ts">
import {useRouter} from "vue-router";
  const router = useRouter();

const onClickLeft = () =>
    router.back();
const onClickRight = () =>
    router.push('./search');

// const active = ref("index");
const onChange =  (index : string) =>
  console.log(`标签 ${index}`);
// Toast(`标签 ${index}`);

</script>

<style scoped>
#content{
  padding-bottom: 50px;
}
</style>