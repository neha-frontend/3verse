import { put } from 'redux-saga/effects';
import { FUSE_SUCCESS__MODAL } from '../../../constants/modalTypeConstant';
import { errorHandler } from '../../../utils';
import {
  putNftMetadataFail,
  putNftMetadataStart,
  putNftMetadataSuccess,
  showCustomModal,
  showModal
} from '../../sagaActions';

//send nft metadata
export function* putNftMetadataSaga(action) {
  yield put(putNftMetadataStart());
  const { data, id, tokenId } = action.payload;
  yield errorHandler({
    endpoint: `nft/gmechJson/${tokenId}`,
    successHandler: yield function* (response) {
      yield put(putNftMetadataSuccess(response.data));
       yield put(
        showCustomModal({
          customModalType: FUSE_SUCCESS__MODAL,
          redirectURL: `/profile/${id}/gmech`
        })
      );
    },
    failHandler: yield function* (response) {
      yield put(putNftMetadataFail(response));
      yield put(
        showModal({
          message: response,
          notifyType: 2,
          showPrimaryButton: false,
          showCloseButton: true
        })
      );
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'put'
  });
}
