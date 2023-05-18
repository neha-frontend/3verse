import { useDispatch, useSelector } from 'react-redux';

import { updateAccountSettingAction } from '../../../store/sagaActions';

function SettingOption({ title = '', text = '', id = '', currentUserSetting = {}, email = '' }) {
  const dispatch = useDispatch();
  const { editAccountSettingLoading: isLoading } = useSelector(
    (state) => state.profile.currentUserProfile
  );

  const handleToggle = () => {
    const apiData = {};    
    apiData[id] = !currentUserSetting[id];    
    dispatch(
      updateAccountSettingAction({
        data: { ...currentUserSetting, ...apiData },
        originalSetting: { ...currentUserSetting },
        type:
          id === 'collectionVisiblity' || id === 'profileVisiblity'
            ? 'privacySettings'
            : 'notificationSetting',
        email
      })
    );
  };

  return (
    <div className="d-flex justify-content-between align-items-start setting-option-container mb-3">
      <div className="setting-text-tile-container">
        <p className="setting-title">{title}</p>
        <p className="setting-text">{text}</p>
      </div>
      <label className="switch">
        <input
          type="checkbox"
          checked={currentUserSetting[id]}
          onClick={handleToggle}
          disabled={isLoading}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default SettingOption;
