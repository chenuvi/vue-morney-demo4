<template>
  <Layout>
    interval:{{interval}}
    <Tabs :dataSource="recordTypeList" :value.sync="interval" class-prefix="interval"></Tabs>
    type:{{type}}
    <Tabs :dataSource="typeList" :value.sync="type" class-prefix="type"></Tabs>
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

