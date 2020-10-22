<template>
  <Layout>
    <Tabs :dataSource="typeList" :value.sync="type" class-prefix="type"></Tabs>
    <Tabs :dataSource="recordTypeList" :value.sync="interval" class-prefix="interval"></Tabs>
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