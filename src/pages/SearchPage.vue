<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag :show="show"
               closeable size="medium" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="right">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 16px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from 'vue';

const router = useRouter();

const searchText = ref('');
  //搜索标签
  const onSearch = (val) => {
    tagList.value = originTagList.map(parentTag => {
      const tempChildren = [...parentTag.children];
      const tempParentTag = {...parentTag};
      tempParentTag.children = tempChildren.filter(item =>
        item.text.includes(searchText.value));
      return tempParentTag;
    });
    // console.log(originTagList.flatMap(parentTag => parentTag.children))
  }
  const onCancel = () => searchText.value = '';

  const show = ref(true);
  //默认的close方法是将所有选中的标签都删除
  // const close = () => {
  //   show.value = false;
  // };

  //已选中标签
  const activeIds = ref([]);
  const activeIndex = ref(0);
  //标签列表
  const originTagList = [
    {
      text: '性别',
      children: [
        { text: '男', id: '男' },
        { text: '女', id: '女' },
      ],
    },
    {
      text: '年级',
      children: [
        { text: '大一', id: '大一' },
        { text: '大二', id: '大二' },
      ],
    },
  ];
  //删除标签
  const doClose = (tag) => {
    activeIds.value = activeIds.value.filter(item =>{
      return item !== tag;
    })
  }
  let tagList = ref(originTagList);

  const doSearchResult = () => {
    router.push({
      path: '/user/list',
      query: {
        tags:activeIds.value
      }
    })
  }
</script>

<style scoped>

</style>