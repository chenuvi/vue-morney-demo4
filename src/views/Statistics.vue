<template>
  <Layout>
    <Tabs :dataSource="typeList" :value.sync="type" class-prefix="type"></Tabs>
    <Tabs :dataSource="recordTypeList" :value.sync="interval" class-prefix="interval"></Tabs>
    <ol>
      <!--      <li v-for="(group,index) in result" :key="index">-->
      <!--        <h3 class="title">{{group.title}}</h3>-->
      <!--        <ol>-->
      <!--          <li v-for="item in group.items" :key="item.id">-->
      <!--            <span>tags: {{item.tags}}</span> ||-->
      <!--            <span>notes: {{item.notes}}</span> ||-->
      <!--            <span>amount: ￥{{item.amount}}</span>-->
      <!--          </li>-->
      <!--        </ol>-->
      <!--      </li>-->
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{group.title}}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span>标签：{{tagString(item.tags)}}</span>|
            <span class="notes">备注：{{item.notes}}</span>|
            <span>金额：￥{{item.amount}} </span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/views/Tabs.vue';
  import typeList from '@/constants/recordTypeList';
  import recordTypeList from '@/constants/intervalList';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    type = '-';
    interval = 'day';
    typeList = typeList;
    recordTypeList = recordTypeList;

    beforeCreate() {
      return this.$store.commit('fetchRecords');
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      type HashTableValue = { title: string, items: RecordList[] }

      const hashTable: { [key: string]: HashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createdAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }

    tagString(tags: Tag[]) {
      const tagList = [];
      for (let i = 0; i < tags.length; i++) {
        tagList.push(tags[i].name);
      }
      return tags.length === 0 ? '无' : tagList.join(',');
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .type-tabs-item {
    background: white;

    &.selected {
      background: #C4C4C4;

      &::after {
        display: none;
      }
    }
  }

  ::v-deep .interval-tabs-item {
    height: 48px;
  }
</style>