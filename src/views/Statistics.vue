<template>
  <Layout>
    <Tabs :dataSource="typeList" :value.sync="type" class-prefix="type"></Tabs>
    <Tabs :dataSource="intervalList" :value.sync="interval" class-prefix="interval"></Tabs>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/views/Tabs.vue';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  intervalList = [
    {text: '按天', value: 'day'},
    {text: '按周', value: 'week'},
    {text: '按月', value: 'month'},
  ];
  typeList = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'},
  ];
}
</script>

