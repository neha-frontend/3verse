import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { LOGIN_MODAL, RESET_PASSWORD_MODAL } from '../../../constants/modalTypeConstant';
import {
  hideCustomModal,
  resetForgotPasswordErrorMsg,
  resetPasswordAction,
  showCustomModal
} from '../../../store/sagaActions';
import { RenderIf } from '../../../utils';
import { resetPasswordValidatior } from '../../../validations/forgot_password';
import { PrimaryButton } from '../../button';
import { CustomInput } from '../../formikComponent';
import CustomModal from '../CustomModal';

const ResetPasswordModal = () => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);
  const { isLoading: resetPasswordLoading, errorMsg: resetPasswordErrorMsg } = useSelector(
    (state) => state.auth.forgotPassword
  );

  const [params] = useSearchParams();
  const resetPasswordParmas = {
    mode: params.get('mode'),
    oobCode: params.get('oobCode'),
    apiKey: params.get('apiKey')
  };
  const initalResetPasswordValues = {
    password: '',
    confirmPassword: ''
  };

  const openLoginModal = () => dispatch(showCustomModal({ customModalType: LOGIN_MODAL }));
  const closeModal = () => dispatch(hideCustomModal());

  const handleSubmit = (data) => {
    dispatch(resetPasswordAction({ data, dispatch, openLoginModal }));
  };

  return (
    <CustomModal
      showModal={customModalType === RESET_PASSWORD_MODAL}
      closeModal={closeModal}
      showCloseButton={true}
      mainClassName="authModal">
      <div className="auth-modal-content-container">
        <h2 className="auth-title">Reset Password</h2>

        <Formik
          initialValues={initalResetPasswordValues}
          validationSchema={resetPasswordValidatior}
          onSubmit={(values) => {
            const apiRequiredValues = { ...values };
            delete apiRequiredValues.confirmPassword;
            apiRequiredValues.obb = resetPasswordParmas.oobCode;
            handleSubmit(apiRequiredValues);
          }}>
          <Form>
            <Field
              type="password"
              placeholder="Password"
              name="password"
              component={CustomInput}
              onChange={() => dispatch(resetForgotPasswordErrorMsg())}
              showEyeIcon
              withOutLabel
            />

            <Field
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              component={CustomInput}
              onChange={() => dispatch(resetForgotPasswordErrorMsg())}
              showEyeIcon
              withOutLabel
            />

            <RenderIf isTrue={resetPasswordErrorMsg}>
              <p className="invalid-feedback text-center">{resetPasswordErrorMsg}</p>
            </RenderIf>

            <PrimaryButton
              text="Update"
              primaryClassName="auth-btn"
              type="submit"
              disabled={resetPasswordLoading}
            />
          </Form>
        </Formik>
      </div>
    </CustomModal>
  );
};

export default ResetPasswordModal;
