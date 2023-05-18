import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { VERIFY_OTP_MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal } from '../../../store/sagaActions';
import { PrimaryButton } from '../../button';
import CustomModal from '../CustomModal';

const VerifyOTPModal = () => {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const { customModalType } = useSelector((state) => state.modal);
  const verifyEmailParmas = {
    mode: params.get('mode'),
    oobCode: params.get('oobCode'),
    apiKey: params.get('apiKey')
  };

  const closeModal = () => dispatch(hideCustomModal());

  const handleVerify = () =>
    (window.location.href = `https://verse-dev-ad3d7.firebaseapp.com/__/auth/action?mode=${verifyEmailParmas.mode}&oobCode=${verifyEmailParmas.oobCode}&apiKey=${verifyEmailParmas.apiKey}`);

  return (
    <CustomModal
      showModal={customModalType === VERIFY_OTP_MODAL}
      closeModal={closeModal}
      showCloseButton={true}
      mainClassName="authModal">
      <div className="auth-modal-content-container">
        <h2 className="auth-title">Verify Email</h2>
        <h5 className="auth-sub-title text-center">
          Click on verify button below to verify the email.
        </h5>
        <PrimaryButton
          type="submit"
          className="auth-btn mb-4"
          text="Verify"
          handleClick={handleVerify}
        />
      </div>
    </CustomModal>
  );
};

export default VerifyOTPModal;
