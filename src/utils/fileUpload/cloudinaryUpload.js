import axios from 'axios';

const cloudinaryURL = 'https://api.cloudinary.com/v1_1/';
const cloudName = 'aikdbiwqh';

export default async (files, showPercent = undefined) => {
  const test = [];
  try {
    if (files.length === 0) {
      return [];
    }
    const fileRes = await Promise.all(
      files.map(
        async (fileObj, index) =>
          // eslint-disable-next-line no-async-promise-executor
          new Promise(async resolve => {
            if (typeof fileObj === 'string') {
              resolve(fileObj);
            } else {
              const unsignedUploadPreset = 'lk0jidis';
              const url = `${cloudinaryURL}${cloudName}/${fileObj.type}/upload`;
              const fd = new FormData();
              fd.append('upload_preset', unsignedUploadPreset);
              fd.append('tags', 'browser_upload');
              fd.append('file', fileObj.file);
              try {
                const response = await axios.post(url, fd, {
                  onUploadProgress: progressEvent => {
                    if (showPercent !== undefined) {
                      const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
                      test[index] = percentComplete;
                      const total = test.reduce((a, b) => a + b, 0) / files.length;
                      showPercent(total);
                    }
                  },
                });
                if (response.status === 200) {
                  resolve(JSON.stringify({ id: response.data.public_id, type: fileObj.type }));
                }
                resolve(null);
              } catch (err) {
                resolve(JSON.stringify({ status: '400' }));
              }
            }
          }),
      ),
    );
    if (showPercent !== undefined) {
      showPercent(100);
    }
    return fileRes;
  } catch (err) {
    return null;
  }
};
