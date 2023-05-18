export default async (file, callback) => {
  try {
    // eslint-disable-next-line no-undef
    const bucket = await new AWS.S3({ params: { Bucket: 'contestee' } });
    const date = await new Date();
    const key = `${date.getDate()}${date.getMonth()}${date.getFullYear()}${date.getTime()}-${
      file.name
    }`;
    const params = { Key: key, ContentType: file.type, Body: file };
    await bucket.upload(params, (err, data) => {
      callback(err, data);
    });
    return true;
  } catch (err) {
    return false;
  }
};
