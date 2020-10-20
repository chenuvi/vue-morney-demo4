import recordListModel from '@/models/recordListModel';

export default {
    // record store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => {
        return recordListModel.create(record);
    }
}