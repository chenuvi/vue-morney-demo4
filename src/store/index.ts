import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);  // 把 store 绑到 Vue.prototype.$store = $store 上

type  rootState = {
    recordList: RecordItem[]
    tagList: Tag[]
    currentTag?: Tag
}
const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined
    } as rootState,
    mutations: {
        // record
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
            return state.recordList;
        },
        createRecord(state, record: RecordItem) {
            const record2: RecordItem = clone(record);
            record2.createdAt = new Date();
            state.recordList.push(record2);
            store.commit('saveRecord');
        },
        saveRecord(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        },

        // tag
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
        },
        setCurrentTag(state, id: string) {
            state.currentTag =  state.tagList.filter(t => t.id === id)[0];
        },
        createTag(state, name: string) {
            // this.data = [{id:'1', name:'1'}, {id:'2', name:'2'}]
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签名重复了');
            } else {
                const id = createId().toString();
                state.tagList.push({id, name: name});
                store.commit('saveTag');
                window.alert('添加成功');
            }

        },
        updateTag(state, payload: { id: string, name: string }) {
            const {id, name} = payload;
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复了');
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTag');
                }
            }
        },
        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                state.tagList.splice(index, 1);
                store.commit('saveTag');
                router.back();
            } else {
                window.alert('删除失败');
            }
        },
        saveTag(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        }
    }
});

export default store;