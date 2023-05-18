import axios from 'axios';
import { REACT_APP_PINATA_API_KEY, REACT_APP_PINATA_SECRET_KEY } from '../../config/envConfig';

const pinFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  try {
    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    data.append('file', file[0]);

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    const metadata = JSON.stringify({
      name: 'testname',
      keyvalues: {
        exampleKey: 'exampleValue'
      }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
      customPinPolicy: {
        regions: [
          {
            id: 'FRA1',
            desiredReplicationCount: 1
          },
          {
            id: 'NYC1',
            desiredReplicationCount: 2
          }
        ]
      }
    });
    data.append('pinataOptions', pinataOptions);
    const response = await axios.post(url, data, {
      maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: REACT_APP_PINATA_SECRET_KEY
      }
    });
    return response.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

export default pinFileToIPFS;
