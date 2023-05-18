import moment from 'moment';
import { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CLOCK_ICON, NFT_IMG } from '../../../../assets/images';
import { NoDataFound, Spinner } from '../../../../components';
import { getUserBidsAction } from '../../../../store/sagaActions';
import { RenderIf } from '../../../../utils';
// import { generateURL } from '../../../../utils';

import './bidTab.css';

const BidTab = ({ userStat = {} }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getUserBidsAction({
        userId: userStat?._id
        // URL: generateURL({
        // })
      })
    );
  }, []);

  const { currentBidsList, isLoading } = useSelector((state) => state.profile.userBids);
  const [count, setcount] = useState(0);
  const [currentBid, setCurrentBid] = useState([]);
  const [previousBid, setPreviousBid] = useState([]);

  const Renderer = ({ hours, minutes, seconds, days, completed, startdate }) => {
    if (completed) {
      if (startdate) {
        setcount(count + 1);
      }
      return <div>Auction Closed </div>;
    }
    if (days) {
      return <div>{`${days}d: ${hours}h: ${minutes}m: ${seconds}s`}</div>;
    }
    if (days === 0 && hours > 0) {
      return (
        <>
          <div></div>
          {`${hours}h: ${minutes}m: ${seconds}s`}
        </>
      );
    }
    if (days === 0 && hours === 0) {
      return (
        <>
          <div>{`${minutes}m: ${seconds}s`} </div>
        </>
      );
    }
    return null;
  };

  useEffect(() => {
    const userCurrentBid = currentBidsList?.filter((data) => {
      if (data?.status !== 'Auction ended') return data;
    });

    setCurrentBid(userCurrentBid);
    const userPreviousBid = currentBidsList?.filter((data) => {
      if (data?.status === 'Auction ended') return data;
    });

    setPreviousBid(userPreviousBid);
  }, [currentBidsList]);

  return (
    <>
      <div className="cd_head">Current Bids</div>
      <div className="res-table bid_table mt-4">
        <table className="table table-borderless bid_table">
          <thead>
            <tr className="bid_thead">
              <th scope="col" className="w-15">
                NFT name
              </th>
              <th scope="col" className="w-15">
                Min Price
              </th>
              <th scope="col" className="w-15">
                Max Price
              </th>
              <th scope="col" className="w-15">
                My Bid
              </th>
              <th scope="col" className="w-25">
                Time Left to Finish Auction
              </th>
            </tr>
          </thead>
          <tbody className="bid_tb">
            <RenderIf isTrue={isLoading}>
              <tr className="mt-5">
                <td colSpan={5} className="p_100">
                  <Spinner />
                </td>
              </tr>
            </RenderIf>
            <RenderIf isTrue={currentBid?.length === 0}>
              <tr className="mt-5">
                <td colSpan={5}>
                  <NoDataFound text="No current bid found" />
                </td>
              </tr>
            </RenderIf>
            <RenderIf isTrue={!isLoading && currentBid?.length > 0}>
              {currentBid?.map((data) => (
                <tr key={data?._id}>
                  <td>
                    <Link
                      to={`/nft-detail/${data?.itemId}/${
                        data?.multipleOwner.includes(data?.currentOwner)
                          ? data?.currentOwner
                          : data?.multipleOwner[0]?.userId
                      }`}
                      className="bid_nft d-flex">
                      <img src={data?.previewImage || NFT_IMG} alt="nft" className="bid_nft_img" />
                      <div className="bid_nft_name">{data?.title}</div>
                    </Link>
                  </td>
                  <td className="bid_price">{data?.minPrice} EVE</td>
                  <td className="bid_price">{data?.highestBid[0]?.price} EVE</td>
                  <td className="bid_price">{data?.userBid[0]?.price} EVE</td>
                  <td>
                    <div className="bid_time d-flex">
                      <img src={CLOCK_ICON} alt="clock" className="pe-2" />
                      <Countdown
                        date={new Date(data?.auctionEndDate).toUTCString()}
                        renderer={(props) => <Renderer {...props} startdate={false} />}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </RenderIf>
          </tbody>
        </table>
      </div>
      <div className="cd_head">Previous Bids</div>
      <div className="res-table bid_table mt-4">
        <table className="table table-borderless bid_table">
          <thead>
            <tr className="bid_thead">
              <th scope="col" className="w-15">
                NFT name
              </th>
              <th scope="col" className="w-15">
                Min Price
              </th>
              <th scope="col" className="w-15">
                My Bid
              </th>
              <th scope="col" className="w-15">
                Date
              </th>
              <th scope="col" className="w-25">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bid_tb">
            <RenderIf isTrue={isLoading}>
              <tr className="mt-5">
                <td colSpan={5} className="p_100">
                  <Spinner />
                </td>
              </tr>
            </RenderIf>
            <RenderIf isTrue={previousBid?.length === 0}>
              <tr className="mt-5">
                <td colSpan={5}>
                  <NoDataFound text="No current bid found" />
                </td>
              </tr>
            </RenderIf>
            <RenderIf isTrue={!isLoading && previousBid?.length > 0}>
              {previousBid?.map((data) => (
                <tr key={data?._id}>
                  <td>
                    <Link
                      to={`/nft-detail/${data?.itemId}/${
                        data?.multipleOwner.includes(data?.currentOwner)
                          ? data?.currentOwner
                          : data?.multipleOwner[0]?.userId
                      }`}
                      className="bid_nft d-flex">
                      <img src={data?.previewImage || NFT_IMG} alt="nft" className="bid_nft_img" />
                      <div className="bid_nft_name">{data?.title}</div>
                    </Link>
                  </td>
                  <td className="bid_price">{data?.minPrice} EVE</td>
                  <td className="bid_price">{data?.userBid[0]?.price} EVE</td>
                  <td className="bid_price">{moment(data?.auctionEndDate).format('DD/MM/YYYY')}</td>
                  <td
                    className={`${
                      data?.highestBid[0]?.userId === userStat?._id ? 'bid_accepted' : 'bid_lost'
                    }`}>
                    {data?.highestBid[0]?.userId === userStat?._id ? 'Accepted' : 'Lost'}
                  </td>
                </tr>
              ))}
            </RenderIf>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BidTab;
