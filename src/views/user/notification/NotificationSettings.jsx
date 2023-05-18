import { useSelector } from 'react-redux';
import { SubHeaderLayout } from '../../../layout';
import SettingOption from './SettingOption';

import './notification.css';
import { NoDataFound } from '../../../components';

function NotificationSettings() {
  const { data: currentUser } = useSelector((state) => state.profile.currentUserProfile);

  if (!currentUser?.notificationSetting)
    return <NoDataFound text="Server issue, please try again" />;

  return (
    <SubHeaderLayout mainClassName="Wrapper-container">
      <div className="notification-container">
        <div className="notification-header d-flex align-items-center justify-content-between mt-4 mb-5">
          <h2 className="notification-header-title mb-0">Notifications Settings</h2>
        </div>

        <SettingOption
          title="OutBid"
          text="When someone outbidded your bid"
          id="Outbid"
          email={currentUser?.email}
          currentUserSetting={currentUser?.notificationSetting}
        />
        <SettingOption
          title="Bid Detail"
          text="When you bid on NFT"
          id="bidDetail"
          email={currentUser?.email}
          currentUserSetting={currentUser?.notificationSetting}
        />
        <SettingOption
          title="NFT Bought"
          text="When you bought an NFT"
          id="itemBought"
          email={currentUser?.email}
          currentUserSetting={currentUser?.notificationSetting}
        />
        <SettingOption
          title="NFT Sold"
          text="When you sell your NFT"
          id="itemSold"
          email={currentUser?.email}
          currentUserSetting={currentUser?.notificationSetting}
        />

        <div className="notification-header d-flex align-items-center justify-content-between my-5">
          <h2 className="notification-header-title mb-0">Privacy Settings</h2>
        </div>

        <SettingOption
          title="Collection"
          text="Anyone can see your collections."
          id="collectionVisiblity"
          email={currentUser?.email}
          currentUserSetting={currentUser?.privacySettings}
        />
        <SettingOption
          title="Profile"
          text="Anyone can visit your profile."
          id="profileVisiblity"
          email={currentUser?.email}
          currentUserSetting={currentUser?.privacySettings}
        />
      </div>
    </SubHeaderLayout>
  );
}

export default NotificationSettings;
