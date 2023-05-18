import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { LOGIN_MODAL, SIGN_UP_MODAL } from '../../../constants/modalTypeConstant';
import {
  hideCustomModal,
  registerAction,
  resetRegisterErrorMsg,
  showCustomModal
} from '../../../store/sagaActions';
import { RenderIf } from '../../../utils';
import { signUpValidatior } from '../../../validations/sign_up';
import { PrimaryButton } from '../../button';
import { CustomCheckbox, CustomDateInputLog, CustomInput } from '../../formikComponent';
import CustomModal from '../CustomModal';

const SignUpModal = () => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);
  const { isLoading: registerUserLoading, errorMsg: registerUserErrorMsg } = useSelector(
    (state) => state.auth.register
  );

  const initalSignUpValues = {
    email: '',
    username: '',
    password: '',
    dob: '',
    TnC: false,
    newsletterUpdates: false
  };

  const closeModal = () => {
    dispatch(resetRegisterErrorMsg());
    dispatch(hideCustomModal());
  };
  const openLoginModal = () => {
    dispatch(resetRegisterErrorMsg());
    dispatch(showCustomModal({ customModalType: LOGIN_MODAL }));
  };

  const handleSubmit = (data) => dispatch(registerAction({ data, dispatch, openLoginModal }));

  return (
    <CustomModal
      showModal={customModalType === SIGN_UP_MODAL}
      closeModal={closeModal}
      showCloseButton={true}
      mainClassName="authModal signUpModal">
      <div className="auth-modal-content-container">
        <h2 className="auth-title">Sign Up</h2>
        <Formik
          initialValues={initalSignUpValues}
          validationSchema={signUpValidatior}
          onSubmit={(values) => {
            const apiRequiredValues = { ...values, email: values.email.toLowerCase() };
            delete apiRequiredValues.TnC;
            handleSubmit(apiRequiredValues);
          }}>
          <Form>
            <Field
              type="email"
              placeholder="Email"
              name="email"
              component={CustomInput}
              onChange={() => dispatch(resetRegisterErrorMsg())}
              withOutLabel
            />
            <Field
              type="text"
              placeholder="Username"
              name="username"
              component={CustomInput}
              onChange={() => dispatch(resetRegisterErrorMsg())}
              withOutLabel
            />
            <Field
              type="password"
              placeholder="Password"
              name="password"
              component={CustomInput}
              onChange={() => dispatch(resetRegisterErrorMsg())}
              showEyeIcon
              withOutLabel
            />

            <Field
              placeholder="Date of Birth"
              name="dob"
              component={CustomDateInputLog}
              withOutLabel
              showMonth
              showYear
            />

            <Field
              name="TnC"
              id="TnC"
              component={CustomCheckbox}
              label={
                <div>
                  <span>I have read and accept the </span>
                  <Link to="/terms-and-condition" onClick={closeModal} className="signup_terms">
                    terms and conditions
                  </Link>
                </div>
              }
              onChange={() => dispatch(resetRegisterErrorMsg())}
            />

            <Field
              name="newsletterUpdates"
              id="newsletterUpdates"
              component={CustomCheckbox}
              mainClassName="form-check d-flex align-items-center mb-3"
              label="I am happy to receive latest updates/newsletters."
              onChange={() => dispatch(resetRegisterErrorMsg())}
            />

            <RenderIf isTrue={registerUserErrorMsg}>
              <p className="invalid-feedback text-center">{registerUserErrorMsg}</p>
            </RenderIf>

            <PrimaryButton
              type="submit"
              className="auth-btn mb-4"
              text="Sign Up"
              disabled={registerUserLoading}
            />

            <div className="new-user d-flex align-items-center justify-content-center mb-0">
              Existing user?{' '}
              <div className="sign-udiv-link ms-2" onClick={openLoginModal}>
                Login
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </CustomModal>
  );
};

export default SignUpModal;
