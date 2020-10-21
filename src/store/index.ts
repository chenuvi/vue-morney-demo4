import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex)  // 把 store 绑到 Vue.prototype.$store = $store 上

const store =  new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
  },
  mutations: {
    // record
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
    },

    // tag
    fetchTag(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      return state.tagList;
    },
    // findTag(id: string) {
    //   return this.tagList.filter(t => t.id === id)[0];
    // },
    createTag(state,name: string) {
      // this.data = [{id:'1', name:'1'}, {id:'2', name:'2'}]
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
        return 'duplicated';
      } else {
        const id = createId().toString();
        state.tagList.push({id, name: name});
        store.commit('saveTag')
        return 'success';
      }
    },
    // updateTag(id: string, name: string) {
    //   const idList = this.tagList.map(item => item.id);
    //   if (idList.indexOf(id) >= 0) {
    //     const names = this.tagList.map(item => item.name);
    //     if (names.indexOf(name) >= 0) {
    //       return 'duplicated';
    //     } else {
    //       const tag = this.tagList.filter(item => item.id === id)[0];
    //       tag.name = name;
    //       this.saveTag();
    //       return 'success';
    //     }
    //   } else {
    //     return 'not found';
    //   }
    // },
    // removeTag(id: string) {
    //   let index = -1;
    //   for (let i = 0; i < this.tagList.length; i++) {
    //     if (this.tagList[i].id === id) {
    //       index = i;
    //       break;
    //     }
    //   }
    //   this.tagList.splice(index, 1);
    //   this.saveTag();
    //   return true;
    // },
    saveTag() {
      window.localStorage.setItem('tagList', JSON.stringify(this.tagList));
    }
  }
})

export default store