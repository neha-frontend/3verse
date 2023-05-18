import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// TODO:  Remove below eslint disable after get current user profile api is working properly
// eslint-disable-next-line no-unused-vars
import { FallbackSpinner, Footer, LogoutModal, UserHeader, UserSidebar } from '../components';
import SetTokenHeader from '../hoc/SetTokenHeader/SetTokenHeader';
import axiosMain from '../http/axios/axios_main';
import { getCurrentUserProfileAction, logoutAction } from '../store/sagaActions';

import './index.css';

function UserRouteLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showHeaderDropdown, setShowHeaderDropdown] = useState(false);

  const { isLoading: getCurrentUserProfileLoding, data: userDetails } = useSelector(
    (state) => state.profile.currentUserProfile
  );

  const toggleHeaderDropdown = () => setShowHeaderDropdown((prev) => !prev);

  useEffect(() => {
    dispatch(getCurrentUserProfileAction());
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      dispatch(logoutAction({ forceLogout: true, navigate }));
    }
    dispatch(getCurrentUserProfileAction());
  }, [localStorage.getItem('authToken')]);

  if (getCurrentUserProfileLoding || userDetails === null) return <FallbackSpinner />;

  return (
    <div className="main_body">
      {/* top-header */}
      <UserHeader
        toggleHeaderDropdown={toggleHeaderDropdown}
        showHeaderDropdown={showHeaderDropdown}
      />

      <section id="section">
        <div className="d-flex">
          {/* <!-- side-nav-start --> */}
          <UserSidebar
            showHeaderDropdown={showHeaderDropdown}
            toggleHeaderDropdown={toggleHeaderDropdown}
          />
          {/* <!-- side-nav-end --> */}

          {/* <!-- main-start --> */}
          <div className="children_body p-0" id="textCanvas">
            {children}
          </div>
          {/* <!-- main-end --> */}
        </div>
        {/* Footer start */}
        <Footer />
        {/* footer end */}
      </section>
      <LogoutModal />
    </div>
  );
}

export default SetTokenHeader(UserRouteLayout, axiosMain);
