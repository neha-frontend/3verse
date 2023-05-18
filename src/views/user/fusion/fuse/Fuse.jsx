import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConvertApi from 'convertapi-js';

import { FUSE_ICON_PNG } from '../../../../assets/images';
import {
  FuseDetailsModal,
  FusionCard,
  FusionOtherTnCModal,
  FusionTnCModal,
  PrimaryButton,
  Spinner
} from '../../../../components';
import {
  REACT_APP_CONVERT_API_SECRET_KEY,
  REACT_APP_PINATA_URL
} from '../../../../config/envConfig';
import { FUSE_TNC_MODAL } from '../../../../constants/modalTypeConstant';
import axiosMain from '../../../../http/axios/axios_main';
import { FusionLayout } from '../../../../layout';
import { setFuseUrl, showCustomModal, setFuseStart, showModal } from '../../../../store/sagaActions';
import { RenderIf } from '../../../../utils';

import '../fusion.css';

const Fuse = () => {
  let convertApi = ConvertApi.auth(REACT_APP_CONVERT_API_SECRET_KEY);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fusionAnimation, setFusionAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pfpUrl, setPFPUrl] = useState('');
  const { selectedPFPnft, selectedMech } = useSelector((state) => state.fusion);
  const openTnCModal = () => dispatch(showCustomModal({ customModalType: FUSE_TNC_MODAL }));
  const showFusionAnimation = () => setFusionAnimation(true);
  useEffect(() => {
    const redirectToSuccess = () => navigate('/fusion/fuse-success');
    if (fusionAnimation) setTimeout(redirectToSuccess, 1000);
  }, [fusionAnimation]);
  if (!selectedMech) {
    navigate('/fusion');
  }
  const handleFuse = async () => {
    setIsLoading(true);
    dispatch(setFuseStart());
    const res = await axiosMain.post(
      '/nft/fuse',
      {
        mechUrl: `${REACT_APP_PINATA_URL}/QmPoUnphhekLZ8KiD8qg5puzQfRuHf5yfGN5zj4JnXJ7Po`,
        // profileUrl: selectedPFPnft?.image_url
        profileUrl: pfpUrl
      },
      {
        responseType: 'blob'
      }
    );

    const url = URL.createObjectURL(res.data);
    let metadata = {
      type: 'image/jpeg'
    };
    dispatch(setFuseUrl({ url, fuseFile: [new File([res.data], 'test.jpg', metadata)] }));
    setIsLoading(false);
  };

  useEffect(async () => {
    let response = await axios.get(selectedPFPnft.image_url, {
      responseType: 'blob'
    });

    if (
      response.data.type === 'image/webp' ||
      response.data.type === 'image/gif' ||
      response.data.type === 'image/webm'
    ) {
      setIsLoading(true);
      let params = convertApi.createParams();
      params.add('file', new URL(selectedPFPnft?.image_url));
      try {
        let result = await convertApi.convert('gif', 'jpg', params);
        setPFPUrl(result.files[0].Url);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        dispatch(
          showModal({           
            message: error?.message,
            notifyType: 0,
            showPrimaryButton: false,
            showCloseButton: true
          })
        );
      }
    } else setPFPUrl(selectedPFPnft?.image_url);
  }, [selectedPFPnft?.image_url]);

  return (
    <div className={` ${isLoading ? 'hidesection' : ''} `}>
      <FusionLayout
        bodyClassName="fusion-body-container fusion-fuse-body-container"
        heading="Fusion"
        formStepArray={['100%', '100%', !fusionAnimation ? '50%' : '100%', '0%']}>
        <RenderIf isTrue={isLoading}>
          <Spinner className="global-spinner" />
        </RenderIf>
        <RenderIf isTrue={!fusionAnimation}>
          <div className="fuse-container w-100">
            <FusionCard
              className="fusion-card-container pe-none fuse-card"
              img={selectedPFPnft?.image_url}
              alt="fusion-pfp"
              value="5200"
            />

            <div className="fuse-icon-container">
              <img src={FUSE_ICON_PNG} alt="fuse-icon" />
            </div>

            <FusionCard
              className="fusion-card-container pe-none select-mech-fusion-card fuse-card"
              img={selectedMech?.previewImage}
              alt="fusion-pfp"
              value="5200"
              name={selectedMech?.title}
              isActive
            />
            {/* <div>{selectedMech?.title}</div> */}
          </div>
          <div className="w-100 d-flex justify-content-center">
            <PrimaryButton
              text="Fuse"
              primaryClassName="fusion-next-btn"
              handleClick={openTnCModal}
              disabled={pfpUrl === ""}
            />
          </div>

          <div className="fuse-desc">
            <h2 className="fuse-desc-heading">Fusion</h2>
            <p className="fuse-desc-text">
              ATTENTION: While the Department of Mechanized Research (DMR) has made much progress in
              the understanding of this advanced technology, it cannot ensure that all fusion
              procedures will be safe for public use. As such, DMR urges caution when using this
              experimental technology. Although fusion is currently irreversible, DMR is optimistic
              that it is on the brink of unlocking this feature within the mechs.
            </p>
          </div>
        </RenderIf>

        <RenderIf isTrue={fusionAnimation}>{/* fuse animation comes here */}</RenderIf>
      </FusionLayout>

      <FusionTnCModal />

      <FusionOtherTnCModal />

      <FuseDetailsModal        
        handleSubmit={() => {
          showFusionAnimation();
          handleFuse();
        }}
      />
    </div>
  );
};

export default Fuse;
