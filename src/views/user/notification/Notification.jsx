import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment/moment';

import socketConfig from '../../../SocketConfig';
import { SubHeaderLayout } from '../../../layout';
import NotificationCard from './NotificationCard';
import { NOTIFICATION_IMG_1 } from '../../../assets/images';
import { getNotification } from '../../../store/sagaActions';
import { RenderIf } from '../../../utils';
import { Spinner } from '../../../components';

import './notification.css';

const Notification = () => {
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profile.currentUserProfile);
  const { totalPages, totalItem, notificationDetail, unReadCount } = useSelector(
    (state) => state.notification
  );
  
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }   

  const onMarked = () => {
    const socket = socketConfig(data?._id);
    socket.emit('mark-all-read', {
      userId: data?._id
    });
  };

  const fetchMoreData = () => {
    const socket = socketConfig(data?._id);
    socket.emit('send_notification', {
      userId: data?._id,
      page: pageNo,
      limit: 10
    });
    setPageNo((prev) => prev + 1);
  };

  useEffect(() => {
    const socket = socketConfig(data?._id);
    socket.on('notification', (notfication) => {
      dispatch(
        getNotification({
          totalPages: notfication?.list?.totalPage,
          totalItem: notfication?.list?.totalItem,
          unReadCount: notfication?.unReadCount,
          notificationDetail: notfication?.list?.list,
          getUniqueListBy
        })
      );
    });
    setPageNo((prev) => prev + 1);
  }, []);

  return (
    <SubHeaderLayout mainClassName="Wrapper-container notification-wrapper-container">
      <div>
        <div className="notification-header d-flex align-items-center justify-content-between mt-sm-4 mt-2 mb-sm-5 mb-4">
          <h2 className="notification-header-title mb-0">Notifications</h2>
          <RenderIf isTrue={unReadCount}>
            <button className="notification-header-mark-btn d-sm-flex d-none" onClick={onMarked}>
              Mark all as read
            </button>
          </RenderIf>
        </div>
        <RenderIf isTrue={totalItem === null}>
          <Spinner className="global-spinner" />
        </RenderIf>
        <RenderIf isTrue={notificationDetail?.length > 0}>
          <InfiniteScroll
            className="overflow-hidden"
            dataLength={notificationDetail?.length || 0}
            next={fetchMoreData}
            hasMore={pageNo < totalPages}
            loader={<Spinner />}>
            {notificationDetail?.map((notification) => (
              <NotificationCard
                key={notification?._id}
                receiverId={notification?.receiverId}
                generatorId={notification?.generatorId}
                notification_img={NOTIFICATION_IMG_1}
                notification_msg={notification?.description}
                notificationType={notification?.itemType}
                nftId={notification?.itemId}
                notification_time={
                  notification?.createdAt
                    ? moment(notification?.createdAt).startOf('min').fromNow()
                    : null
                }
                notification_status={notification?.isRead}
                notification_image={notification?.image}
                // mark_all_read={markAsRead}
              />
            ))}
          </InfiniteScroll>
        </RenderIf>
        <RenderIf isTrue={totalItem !== null && !notificationDetail?.length}>
          <div className="no-data-found-label border-0">No Notification Found</div>
        </RenderIf>
      </div>
    </SubHeaderLayout>
  );
};

export default Notification;
