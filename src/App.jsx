import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { adminRoutes, commonRoute, guestRoutes, userRoutes } from './routes/mainRoutes/mainRoutes';
import {
  authenticationValidatorAction,
  showCustomModal
} from './store/sagaActions';
import { LayoutWrapper, FallbackSpinner, NetworkSwitchModal, TrimWallet } from './components';
import { useEagerConnect, useInactiveListener } from './hooks';
import { useWeb3React } from '@web3-react/core';
import { WALLET_NETWORK_SWITCH_MODAL, INVALID_WALLET_MODAL, WALLET_REGISTER_MODAL } from './constants/modalTypeConstant';
import ScrollToTop from './components/scroolToTop/ScrollToTop';
import InvalidWallet from './components/modal/auth/InvalidWallet';
import { REACT_APP_POLYGON_CHAIN } from './config/envConfig';
import WalletRegister from './components/modal/WalletRegister';

function App() {
  let routes = [];
  const { active, chainId, error, account, deactivate } = useWeb3React();
  const dispatch = useDispatch();
  const triedEager = useEagerConnect();
  const { authToken, roleType } = useSelector((state) => state.auth.login);
  const { data } = useSelector((state) => state.profile.currentUserProfile);

  useInactiveListener(!triedEager);
  if (authToken && (roleType === 'Cadet' || roleType === 'General' || roleType === 'User'))
    routes = commonRoute.concat(userRoutes);
  else if (authToken && roleType === 'Admin')
    routes = commonRoute.concat(userRoutes.concat(adminRoutes));
  else routes = commonRoute.concat(guestRoutes);

  const mainContent = routes.map((route) =>
    route.component ? (
      <Route
        key={route.name}
        path={route.path}
        exact={route.exact}
        name={route.name}
        element={<route.component />}
      />
    ) : (
      route.redirectRoute && <Route path="*" key={route.name} element={<Navigate to="/" />} />
    )
  );

  useEffect(() => {
    // Remove lodader from index.html
    const loaderEle = document.getElementById('root-loader');
    loaderEle.remove();

    // create device ID
    if (!localStorage.getItem('deviceId')) {
      const tempId = navigator.userAgent + Math.floor(Math.random() * 10000000000000000);
      localStorage.setItem('deviceId', tempId.slice(tempId.lastIndexOf(')') + 1).trim(' '));
    }

    dispatch(authenticationValidatorAction());
  }, []);

  useEffect(() => {
    if (active || error) {
      if (![parseInt(REACT_APP_POLYGON_CHAIN)].includes(chainId) || error) {
        if (sessionStorage.getItem('connectedWallet') === 'walletconnect') {
          if (error?.toString()?.includes('supported')) {
            alert('please switch to polygon testnet');
          }
        } else {
          if (error?.toString()?.includes('supported')) {
            dispatch(showCustomModal({ customModalType: WALLET_NETWORK_SWITCH_MODAL }));
          }
        }
      }
      //  else {
      //   dispatch(hideCustomModal());
      // }
    }
    // else {
    //   dispatch(hideCustomModal());
    // }
  }, [error, chainId, active]);

  useEffect(() => {
    if (account) {
      if (data !== null && data?.walletAddress === '') {       
         dispatch(showCustomModal({ customModalType: WALLET_REGISTER_MODAL }));
      } else if (data !== null && data?.walletAddress !== account) {
        dispatch(showCustomModal({ customModalType: INVALID_WALLET_MODAL }));
        deactivate();
      }
    }
  }, [account,data]);

  return (
    <Suspense fallback={<FallbackSpinner />}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={<LayoutWrapper isAuthenticated={!!authToken} userRole={roleType} />}>
            {mainContent}
          </Route>
        </Routes>
      </Router>
      <InvalidWallet wallet={TrimWallet(data?.walletAddress)} />
      <WalletRegister />
      <NetworkSwitchModal />
    </Suspense>
  );
}

export default App;
