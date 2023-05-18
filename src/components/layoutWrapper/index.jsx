import { Outlet } from 'react-router-dom';

import { GuestRoutesLayout, UserRoutesLayout } from '../../layout';

function LayoutWrapper({ isAuthenticated = false, userRole = null }) {
  if (isAuthenticated && userRole) {
    return (
      <UserRoutesLayout userRole={userRole}>
        <Outlet />
      </UserRoutesLayout>
    );
  }
  return (
    <GuestRoutesLayout>
      <Outlet />
    </GuestRoutesLayout>
  );
}

export default LayoutWrapper;
