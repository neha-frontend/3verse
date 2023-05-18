import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { FORGOT_PASSWORD_MODAL, LOGIN_MODAL } from '../../../constants/modalTypeConstant';
import {
  forgotPasswordAction,
  hideCustomModal,
  resetForgotPasswordErrorMsg,
  showCustomModal
} from '../../../store/sagaActions';
import { RenderIf } from '../../../utils';
import { forgotPasswordValidatior } from '../../../validations/forgot_password';
import { PrimaryButton } from '../../button';
import { CustomInput } from '../../formikComponent';
import CustomModal from '../CustomModal';

const ForgotPasswordModal = () => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);
  const { isLoading: forgotPasswordLoading, errorMsg: forgotPasswordErrorMsg } = useSelector(
    (state) => state.auth.forgotPassword
  );

  const initalForgotPasswordValue = {
    email: ''
  };

  const closeModal = () => {
    dispatch(resetForgotPasswordErrorMsg());
    dispatch(hideCustomModal());
  };
  const openLoginModal = () => {
    dispatch(resetForgotPasswordErrorMsg());
    dispatch(showCustomModal({ customModalType: LOGIN_MODAL }));
  };

  const handleSubmit = (data) => dispatch(forgotPasswordAction({ data, dispatch, openLoginModal }));
  return (
    <CustomModal
      showModal={customModalType === FORGOT_PASSWORD_MODAL}
      closeModal={closeModal}
      showCloseButton
      mainClassName="authModal">
      <div className="auth-modal-content-container">
        <h2 className="auth-title">Forgot Password</h2>
        <h5 className="auth-sub-title text-center">Enter your registered email ID</h5>
        <Formik
          initialValues={initalForgotPasswordValue}
          validationSchema={forgotPasswordValidatior}
          onSubmit={(values) => handleSubmit({ email: values.email.toLowerCase() })}>
          <Form>
            <Field
              type="email"
              placeholder="Email"
              name="email"
              component={CustomInput}
              onChange={() => dispatch(resetForgotPasswordErrorMsg())}
              withOutLabel
            />

            <RenderIf isTrue={forgotPasswordErrorMsg}>
              <p className="invalid-feedback text-center">{forgotPasswordErrorMsg}</p>
            </RenderIf>
            <PrimaryButton
              className="auth-btn mb-4"
              type="submit"
              text="Submit"
              disabled={forgotPasswordLoading}
            />
          </Form>
        </Formik>
      </div>
    </CustomModal>
  );
};

export default ForgotPasswordModal;
