import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

import {
  AlertMessageModal,
  FusionCard,
  FusionSuccessModal,
  PrimaryButton,
  Spinner
} from '../../../../components';
import { REACT_APP_PINATA_URL } from '../../../../config/envConfig';
import { afinity, colour } from '../../../../constants/constants';

import getWeb3 from '../../../../getWeb3';
import { useEmechContract } from '../../../../hooks';
import { FusionLayout } from '../../../../layout';
import { putNftMetadata, showModal } from '../../../../store/sagaActions';
import pinFileToIPFS from '../../../../utils/pinToIpfs/pinFileToIpfs';

import { RenderIf } from '../../../../utils';

import '../fusion.css';

const FuseSuccess = () => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const [Loading, setLoading] = useState(false);
  const Gmechcontract = useEmechContract();
  const navigate = useNavigate();

  const { fuseUrl, selectedMech, fuseImage, isLoading, selectedPFPnft } = useSelector(
    (state) => state.fusion
  );

  const { _id: userid } = useSelector((state) => state.profile.currentUserProfile?.data);

  if (!selectedMech) {
    navigate('/fusion');
  }

  const handleError = (er) => {
    console.log(er);
    setLoading(false);
    const errMsg = er?.message?.split(':');
    dispatch(
      showModal({
        // eslint-disable-next-line no-useless-escape
        message: er?.message?.split('error')[1]?.split('message')[1]?.split(`\"`)[2] || errMsg,
        notifyType: 0,
        showPrimaryButton: false,
        showCloseButton: true
      })
    );
    // setTimeout(() => {
    //   navigate("/");
    // }, 3000);
  };
  function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const handleSubmit = async () => {
    try {
      setLoading(true);

      //Preview Image
      const ipfsimghash = await pinFileToIPFS(fuseImage);
      const fuseipfsurl = `${REACT_APP_PINATA_URL}/${ipfsimghash}`;

      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };

      //Compressed Image
      const compressedFile = await imageCompression(fuseImage[0], options);
      const mediaImage = await pinFileToIPFS([compressedFile]);
      const mediaImageHash = `${REACT_APP_PINATA_URL}/${mediaImage}`;
      const Gmechcontractinstance = await Gmechcontract;

      const web3 = await getWeb3();
      const gasPrice = await web3.eth.getGasPrice();

      const estimateGas = await Gmechcontractinstance.methods
        .mintEMech(account, selectedMech?.tokenId)
        .estimateGas({ from: account });
      Gmechcontractinstance.methods
        .mintEMech(account, selectedMech?.tokenId)
        .send({ from: account, gasPrice, gas: estimateGas })
        .then((hash) => {
          const tokenId = hash?.events?.EMechMinted?.returnValues[1];
          const metaData = {
            title: `G-Mech #${tokenId}`,
            name: `G-Mech #${tokenId}`,
            image: fuseipfsurl,
            color: colour[randomNumber(1, 5) - 1],
            origin: selectedPFPnft?.collection?.name,
            pfpId: selectedPFPnft?.id?.toString(),
            description: selectedMech.description,
            previewImage: mediaImageHash,
            mediaUrl: fuseipfsurl,
            mechId: selectedMech?._id,
            nftType: 'g-mech',
            gmech: {
              skin: colour[randomNumber(1, 5) - 1],
              head: 'Recruit',
              arm: 'Recruit',
              affinity: afinity[randomNumber(1, 3) - 1],
              gmechType: 'rent',
              openSeaImage: selectedPFPnft?.image_url
            },
            attributes: [
              { trait_type: 'Type', value: 'G-Mech' },
              { trait_type: 'Skin', value: colour[randomNumber(1, 5) - 1] },
              { trait_type: 'Head', value: 'Recruit' },
              { trait_type: 'Arm', value: 'Recruit' },
              { trait_type: 'Affinity', value: afinity[randomNumber(1, 3) - 1] },
              { trait_type: 'Origin', value: selectedPFPnft?.collection?.name }
            ]
          };
          setTimeout(() => {
            dispatch(
              putNftMetadata({
                data: metaData,
                id: userid,
                tokenId: tokenId
              })
            );
            setLoading(false);
          }, 3000);
        })
        .catch((err) => {
          handleError(err);
        });
    } catch (error) {
      handleError(error);
    }
  };

  if (Loading) {
    <Spinner className="global-spinner" />;
  }

  useEffect(() => {
    if (isLoading || Loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading, Loading]);

  return (
    <>
      <RenderIf isTrue={Loading || isLoading || fuseUrl === ''}>
        <Spinner className="fusion_spinner" />
      </RenderIf>
      <div className={` ${Loading ? 'hidesection' : ''} `}>
        <FusionLayout
          bodyClassName="fusion-body-container fusion-fuse-body-container"
          heading="Fused NFT Preview"
          formStepArray={['100%', '100%', '100%', '100%']}>
          <RenderIf isTrue={fuseUrl !== ''}>
            <div className="fuse-container w-100 flex-column mt-3">
              <FusionCard
                className="fusion-card-container pe-none "
                img={fuseUrl}
                alt="fusion-pfp"
                value="5200"
              />
            </div>
          </RenderIf>
        </FusionLayout>
        <PrimaryButton
          text="Continue"
          handleClick={handleSubmit}
          primaryClassName="fusion-next-btn mx-auto"
          disabled={Loading || isLoading || fuseUrl === ''}
        />
        <FusionSuccessModal />
        <AlertMessageModal />
      </div>
    </>
  );
};

export default FuseSuccess;
