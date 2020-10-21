import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';

Vue.use(Vuex)  // 把 store 绑到 Vue.prototype.$store = $store 上

const store =  new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      return state.recordList;
    },
    createRecord(state,record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      state.recordList.push(record2);
      // this.saveRecords();
    },
    saveRecords() {
      window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
    }
  }
})

export default store