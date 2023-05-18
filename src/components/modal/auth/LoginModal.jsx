import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  FORGOT_PASSWORD_MODAL,
  LOGIN_MODAL,
  SIGN_UP_MODAL
} from '../../../constants/modalTypeConstant';
import {
  hideCustomModal,
  loginAction,
  resetLoginErrorMsg,
  showCustomModal
} from '../../../store/sagaActions';
import { RenderIf } from '../../../utils';
import { loginValidatior } from '../../../validations/login';
import { PrimaryButton } from '../../button';
import { CustomInput } from '../../formikComponent';
import CustomModal from '../CustomModal';

const LoginModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customModalType } = useSelector((state) => state.modal);
  const { isLoading: loginLoading, errorMsg: loginErrorMsg } = useSelector(
    (state) => state.auth.login
  );

  const initalLoginValues = {
    email: '',
    password: ''
  };

  const closeModal = () => {
    dispatch(resetLoginErrorMsg());
    dispatch(hideCustomModal());
  };
  const openForgotPasswordModal = () => {
    dispatch(resetLoginErrorMsg());
    dispatch(showCustomModal({ customModalType: FORGOT_PASSWORD_MODAL }));
  };
  const openSignUpModal = () => {
    dispatch(resetLoginErrorMsg());
    dispatch(showCustomModal({ customModalType: SIGN_UP_MODAL }));
  };

  const handleSubmit = (data) => dispatch(loginAction({ data, navigate }));

  return (
    <CustomModal
      showModal={customModalType === LOGIN_MODAL}
      closeModal={closeModal}
      showCloseButton={true}
      mainClassName="authModal">
      <div className="auth-modal-content-container">
        <h2 className="auth-title">Welcome! Let&apos;s get started !</h2>
        <Formik
          initialValues={initalLoginValues}
          validationSchema={loginValidatior}
          onSubmit={(values) =>
            handleSubmit((values = { ...values, email: values.email.toLowerCase() }))
          }>
          <Form>
            <Field
              type="text"
              placeholder="Email"
              name="email"
              component={CustomInput}
              onChange={() => dispatch(resetLoginErrorMsg())}
              withOutLabel
            />

            <Field
              type="password"
              placeholder="Password"
              name="password"
              component={CustomInput}
              onChange={() => dispatch(resetLoginErrorMsg())}
              showEyeIcon
              withOutLabel
            />

            <div className="forgot-password" onClick={openForgotPasswordModal}>
              Forgot Password?
            </div>

            <RenderIf isTrue={loginErrorMsg}>
              <p className="invalid-feedback text-center">{loginErrorMsg}</p>
            </RenderIf>
            <PrimaryButton
              type="submit"
              className="auth-btn mb-4 mt-4"
              text="Login"
              disabled={loginLoading}
            />

            <div className="new-user d-flex align-items-center justify-content-center mb-0">
              New User?
              <div className="sign-up-link ms-2 " onClick={openSignUpModal}>
                Sign Up
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </CustomModal>
  );
};

export default LoginModal;
