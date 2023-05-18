/* eslint-disable no-unsafe-optional-chaining */
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FusionCard, NoDataFound, PrimaryButton, Spinner } from '../../../components';
import axiosMain from '../../../http/axios/axios_main';
import { FusionLayout } from '../../../layout';
import {
  // getCurrentUserProfileAction,
  getPFPNFT,
  getUserNftListAction,
  resetNftListFail,
  setFuseUrl,
  setSelectMech,
  setSelectPFPnft
} from '../../../store/sagaActions';
import { generateURL, RenderIf } from '../../../utils';
import './fusion.css';

const Fusion = () => {
  const dispatch = useDispatch();
  const { account, active } = useWeb3React();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [UpdatedProfile, setUpdatedProfile] = useState([]);
  const [cardLoading, setCardLoading] = useState(true);
  const profile = useSelector((state) => state?.profile?.currentUserProfile?.data);
  const nftData = useSelector((state) => state.nft.profileNftList.nftData?.list);
  const { isLoading: nftLoading } = useSelector((state) => state.nft.profileNftList);
  const { pfpnft, isLoading } = useSelector((state) => state.fusion);
  const [cardList, setCardList] = useState([]);

  const getupdatedProfile = async () => {
    const profileres = await axiosMain.get(`/profile/${profile._id}`);
    setUpdatedProfile(profileres.data);
  };

  useEffect(() => {
    if (screen === 'SELECT_PFP_NFT') getupdatedProfile();
  }, [profile._id]);

  let screen = '';
  switch (pathname) {
    case '/fusion':
      screen = 'SELECT_PFP_NFT';
      break;
    case '/fusion/select-mech':
      screen = 'SELECT_MECH';
      break;
    default:
      screen = '';
  }

  useEffect(() => {
    dispatch(resetNftListFail());
    dispatch(setFuseUrl({ url: '' }));
  }, []);

  useEffect(() => {
    if (screen === 'SELECT_PFP_NFT') {
      if (account) dispatch(getPFPNFT({ account: account }));
    } else {
      dispatch(
        getUserNftListAction({
          page: 1,
          limit: 9,
          URL: generateURL({
            page: 1,
            limit: 9,
            nftType: 'mech',
            'multipleOwners.userId': profile?._id,
            removeNull: true
            // freshMinted: false
          }),
          isNew: true
        })
      );
    }
  }, [screen, account]);

  useEffect(() => {
    // if (pfpnft.length) {
    if (screen === 'SELECT_PFP_NFT') {
      if (UpdatedProfile.data) {
        const temp = [];
        if (UpdatedProfile?.data?.pfpFused.length) {
          for (const item of pfpnft) {
            if (!UpdatedProfile?.data?.pfpFused.includes(item.id.toString())) {
              temp.push({
                ...item,
                isSelected: false,
                isActive: false
              });
            }
          }
          setCardLoading(false);
          setCardList(temp);
        } else {
          setCardLoading(false);
          setCardList(pfpnft?.map((item) => ({ ...item, isSelected: false, isActive: false })));
        }
      }
    }
    if (screen === 'SELECT_MECH') {
      setCardList(nftData?.map((item) => ({ ...item, isSelected: false, isActive: false })));
    }
    // }
  }, [pfpnft, nftData, UpdatedProfile]);

  const { selectedPFPnft } = useSelector((state) => state.fusion);

  const handleCardClick = (data) =>
    setCardList((prev) =>
      prev.map((item) => {
        if (screen === 'SELECT_PFP_NFT') {
          if (item.id === data.id) {
            return { ...data, isSelected: true, isActive: true };
          }
        }
        if (screen === 'SELECT_MECH') {
          if (item._id === data._id) {
            return { ...data, isSelected: true, isActive: true };
          }
        }
        return { ...item, isSelected: true, isActive: false };
      })
    );

  const handleSubmit = () => {
    if (screen === 'SELECT_PFP_NFT') {
      // store selected data to redux
      dispatch(setSelectPFPnft({ ...cardList?.find((card) => card.isActive && card.isSelected) }));
      // navigate to choose Mech NFT page
      navigate('/fusion/select-mech');
    }

    if (screen === 'SELECT_MECH') {
      // store selected data to redux
      dispatch(setSelectMech({ ...cardList?.find((card) => card.isActive && card.isSelected) }));
      // navigate to choose Mech NFT page
      navigate('/fusion/fuse');
    }
  };

  useEffect(() => {
    if (!screen) navigate('/');
    // redirect to home page of fusion if route state is not present
    if (!selectedPFPnft && screen === 'SELECT_MECH') navigate('/fusion');
  }, [screen, selectedPFPnft]);

  if (!screen) return null;
  if (!selectedPFPnft && screen === 'SELECT_MECH') return null;
  if (isLoading || nftLoading) {
    <Spinner className="global-spinner" />;
  }

  useEffect(() => {
    if (isLoading || nftLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading, nftLoading]);

  return (
    <>
      {/* <div className={` ${isLoading ? 'hidesection' : ''}`}> */}
      <div>
        <FusionLayout
          // bodyClassName={` ${isLoading ? 'hidesection' : ''} fusion-body-container`}
          bodyClassName="fusion-body-container"
          heading={
            screen === 'SELECT_PFP_NFT'
              ? 'Choose the PFP NFT from the list below'
              : screen == 'SELECT_MECH'
              ? 'Select the Mech pod'
              : ''
          }
          formStepArray={
            screen === 'SELECT_PFP_NFT'
              ? ['50%', '0%', '0%', '0%']
              : screen == 'SELECT_MECH'
              ? ['100%', '50%', '0%', '0%']
              : []
          }>
          <RenderIf isTrue={active}>
            <RenderIf
              isTrue={
                (screen === 'SELECT_PFP_NFT' && cardLoading) ||
                (screen === 'SELECT_PFP_NFT' && isLoading) ||
                (screen === 'SELECT_MECH' && nftLoading)
              }>
              <Spinner className="fusion_spinner" />
            </RenderIf>
            <RenderIf isTrue={cardList?.length > 0}>
              {cardList?.map((card) => (
                <FusionCard
                  name={card?.name || card?.title}
                  key={card?.image_url || card?.previewImage}
                  className={`fusion-card-container ${
                    screen === 'SELECT_MECH' ? ' select-mech-fusion-card' : ''
                  }`}
                  img={card?.image_url || card?.previewImage}
                  alt="fusion-pfp"
                  value={card?.value}
                  isActive={card?.isActive}
                  isSelected={card?.isSelected}
                  onClick={() => handleCardClick(card)}
                />
              ))}
            </RenderIf>
            <RenderIf
              isTrue={
                cardList?.length === 0 &&
                ((screen === 'SELECT_PFP_NFT' && !cardLoading) ||
                  (screen === 'SELECT_MECH' && !nftLoading && nftData?.length === 0))
              }>
              <NoDataFound text="No data found" />
            </RenderIf>
          </RenderIf>
        </FusionLayout>
        <div className="w-100 d-flex justify-content-center">
          <PrimaryButton
            text={account ? 'Next' : 'Connect Wallet'}
            primaryClassName="fusion-next-btn"
            handleClick={() => {
              if (account) {
                handleSubmit();
              } else {
                navigate('/select-wallet', { state: { from: 'fusion' } });
              }
            }}
            disabled={
              account
                ? cardList?.filter((card) => card.isActive && card.isSelected).length === 0
                : false
            }
          />
        </div>
      </div>
    </>
  );
};

export default Fusion;
