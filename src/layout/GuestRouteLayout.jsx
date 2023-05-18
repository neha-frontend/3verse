import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

import {
  AlertMessageModal,
  Footer,
  ForgotPasswordModal,
  GuestHeader,
  GuestSidebar,
  LoginModal,
  ResetPasswordModal,
  SignUpModal,
  VerifyOTPModal
} from '../components';
import { RESET_PASSWORD_MODAL, VERIFY_OTP_MODAL } from '../constants/modalTypeConstant';
import SetTokenHeader from '../hoc/SetTokenHeader/SetTokenHeader';
import axiosMain from '../http/axios/axios_main';
import { showCustomModal } from '../store/sagaActions';

import './index.css';

function GuestRouteLayout({ children }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const resetPasswordParmas = {
    mode: params.get('mode'),
    oobCode: params.get('oobCode'),
    apiKey: params.get('apiKey')
  };
  const [checkSidebar, setCheckIsSidebar] = useState(false);
  const toggleSidebar = (data) => {
    setCheckIsSidebar(data);
  };

  useEffect(() => {
    if (
      pathname === '/' &&
      resetPasswordParmas.mode &&
      resetPasswordParmas.oobCode &&
      resetPasswordParmas.apiKey
    ) {
      if (resetPasswordParmas.mode === 'resetPassword')
        setTimeout(
          () => dispatch(showCustomModal({ customModalType: RESET_PASSWORD_MODAL })),
          1000
        );
      else if (resetPasswordParmas.mode === 'verifyEmail')
        setTimeout(() => dispatch(showCustomModal({ customModalType: VERIFY_OTP_MODAL })), 1000);
    }
  }, [pathname]);

  return (
    <>
      <div className="main_body">
        <GuestHeader toggleSidebar={toggleSidebar} sidebar={checkSidebar} />

        <section id="section">
          <div className="d-flex position-relative">
            {/* <!-- side-nav-start --> */}
            <GuestSidebar sidebar={checkSidebar} toggleSidebar={toggleSidebar} />
            {/* <!-- side-nav-end --> */}

            {/* <!-- main-start --> */}
            <div className="children_body  p-0">{children}</div>
          </div>

          <Footer />
        </section>
      </div>

      {/* Modals */}
      <LoginModal />
      <SignUpModal />
      <ForgotPasswordModal />

      <ResetPasswordModal />
      <VerifyOTPModal />

      <AlertMessageModal />
    </>
  );
}

// export default GuestRouteLayout;
export default SetTokenHeader(GuestRouteLayout, axiosMain);
