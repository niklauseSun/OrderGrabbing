import {upload} from './ajax';

const uploadAction = {
  uploadImage: async (params: any) => {
    return upload('/api/file-handle/upload-file', params);
  },
};

export default uploadAction;
