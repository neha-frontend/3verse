import axios from 'axios';
import { REACT_APP_PINATA_API_KEY, REACT_APP_PINATA_SECRET_KEY } from '../../config/envConfig';

const pinJSONToIPFS = async (data) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  try {
    const response = await axios.post(
      url,
      {
        ...data
      },
      {
        headers: {
          pinata_api_key: REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: REACT_APP_PINATA_SECRET_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export default pinJSONToIPFS;
