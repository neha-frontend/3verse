/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_IMG } from '../../../assets/images';

function NotificationCard({
  notification_img = '',
  notification_msg = '',
  notification_time = '',
  notificationType = '',
  nftId = '',
  receiverId = '',
  notification_status = '',
  notification_image = '',
  generatorId = ''
}) {
  return (
    <div className="notification-content d-flex align-items-center  justify-content-between">
      <div className="d-flex align-items-lg-center align-items-start notification-img-msg-container">
        <img src={notification_image || LOGO_IMG} alt="img" className="notification-img" />
        <div>
          <p className={`notification-msg mb-0 ${notification_status ? '' : 'notification-read'}`}>
            {notification_msg}
            {notificationType === 'NFT' && !notification_msg.includes('successfully rented') ? (
              <Link to={`/nft-detail/${nftId}/${receiverId}`} className="text-primary">
                {' Click Here'}
              </Link>
            ) : (
              <Link to={`/nft-detail/${nftId}/${generatorId}`} className="text-primary">
                {' Click Here'}
              </Link>
            )}
          </p>
          <p className="notification-time d-lg-none d-block mt-1">{notification_time}</p>
        </div>
      </div>
      <p className="notification-time d-lg-flex d-none">{notification_time}</p>
    </div>
  );
}

export default NotificationCard;
