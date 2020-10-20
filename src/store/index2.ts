import tagStore from '@/store/tagStore';
import recordStore from '@/store/recordStore';

let store = {
    ...tagStore,
    ...recordStore
};

export default store