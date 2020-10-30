<template>
  <Layout>
    <Tabs :dataSource="typeList" :value.sync="type" class-prefix="type"></Tabs>
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h4 class="title">{{beautify(group.title)}}</h4>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span>标签：{{tagString(item.tags)}}</span>
            <span class="staticsNotes">备注：{{item.notes}}</span>
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
  import dayjs from 'dayjs';

  console.log(dayjs());
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

    get groupedList() {
      const {recordList} = this;
      if(recordList.length === 0){return []}
      const newList = recordList.filter(r => r.type === this.type).sort((a,b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
      const result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}]
      for(let i=1;i<newList.length;i++){
        const current =  newList[i]
        const last = result[result.length -1]
       if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
         last.items.push(current)
       } else{
         result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]})
       }

      }
      console.log(result);
      return result
    }

    tagString(tags: Tag[]) {
      const tagList = [];
      for (let i = 0; i < tags.length; i++) {
        tagList.push(tags[i].name);
      }
      return tags.length === 0 ? '无' : tagList.join(',');
    }

    beautify(time: string) {
      const day = dayjs(time);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else {
        return time;
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep {
    .type-tabs-item {
      background: #C4C4C4;
      height: 48px;

      &.selected {
        background: white;

        &::after {
          display: none;
        }
      }
    }
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item;
  }

  .record {
    background: white;
    @extend %item;

    .staticsNotes {
      margin-right: auto;
      margin-left: 16px;
      color: #999;
    }
  }

</style>