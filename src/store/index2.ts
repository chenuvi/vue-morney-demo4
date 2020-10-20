import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

let store = {
    // tag store
    tagList: tagListModel.fetch(),
    createTag: function (name: string) {
        const message = tagListModel.create(name);
        if (message === 'duplicated') {
            window.alert('标签名重复了');
        } else if (message === 'success') {
            window.alert('添加成功');
        }
    },
    removeTag: (id: string) => {
        return tagListModel.remove(id);
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name);
    },
    findTag: (id: string) => {
        return store.tagList.filter(t => t.id === id)[0];
    },

    // record store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => {
        return recordListModel.create(record);
    }
};

export default store