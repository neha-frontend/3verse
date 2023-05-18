/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router';
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

import { SubHeaderLayout } from '../../../layout';
import getWeb3 from '../../../getWeb3';
import pinFileToIPFS from '../../../utils/pinToIpfs/pinFileToIpfs';
import pinJSONToIPFS from '../../../utils/pinToIpfs/pinJsonToIpfs';
import { axios } from '../../../http';
import {
  AlertMessageModal,
  CustomDropdown,
  CustomInput,
  CustomTextArea,
  NoDataFound,
  Spinner
} from '../../../components';
import {
  getOtherUserProfileAction,
  getUserFreshMintedNFT,
  showModal
} from '../../../store/sagaActions';
import PutOnMarketplace from './PutOnMarketplace';
import { COPIES_REGEX } from '../../../constants/regexConstants';
import { proNFTCreateValidation } from '../../../validations/mintvalidator';
import {
  CONNECT_WALLET_MSG,
  IMAGE_ERROR,
  IMAGE_TYPE_ERROR,
  MINTLIMIT,
  MINT_SUCCESS_MSG
} from '../../../constants/modalConstant';
import { useMechContract } from '../../../hooks';
import {
  REACT_APP_DEFAULT_MECHPOD_PREVIEW_IMAGE,
  REACT_APP_PINATA_URL,
  REACT_APP_DEFAULT_MECHPOD_ORIGINAL_IMAGE
} from '../../../config/envConfig';
import { RenderIf } from '../../../utils';

import './mint.css';

const Mint = () => {
  const { data: currentUserProfileData } = useSelector((state) => state.profile.currentUserProfile);
  const isGeneral = currentUserProfileData.userType === 'General';
  const generalNftPreview = isGeneral ? REACT_APP_DEFAULT_MECHPOD_PREVIEW_IMAGE : '';
  const [PreviewImage, setPreviewImage] = useState(generalNftPreview);
  const [TabSelected, setTabSelected] = useState('mint');
  const [NFTtypeField, setNFTtypeField] = useState([]);
  const [mint, setMint] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [NFTtype, setNFTtype] = useState('');
  const navigate = useNavigate();
  const PropertiesData = [
    { value: 'mech', label: 'Mech' },
    { value: 'ability', label: 'Abilities' },
    { value: 'skin', label: 'Skin' },
    { value: 'armor', label: 'Armor' }
  ];
  const { data: otherUserProfileData } = useSelector((state) => state.profile.otherUserProfile);
  useEffect(() => {
    if (TabSelected === 'nft')
      dispatch(getUserFreshMintedNFT({ owner: currentUserProfileData?._id }));
  }, [TabSelected]);
  const mechcontract = useMechContract();
  const { account, active } = useWeb3React();
  const createInitialValue = {
    title: '',
    description: '',
    previewImage: '',
    mediaUrl: '',
    numberOfCopies: '',
    nftType: '',
    origin: '',
    skin: '',
    properties: '',
    armor: '',
    ability: {
      affinity: '',
      energyCost: '',
      abilityType: ''
    }
  };

  const generalInitialValue = {
    title: 'Mech Pods',
    description: 'The fusion process will require the use of this mech pod + a PFP you own.',
    previewImage: REACT_APP_DEFAULT_MECHPOD_PREVIEW_IMAGE,
    mediaUrl: REACT_APP_DEFAULT_MECHPOD_ORIGINAL_IMAGE,
    numberOfCopies: '',
    nftType: 'mech',
    origin: '',
    properties: ''
  };

  useEffect(() => {
    if (NFTtype === 'ability') {
      setNFTtypeField([
        {
          name: 'ability.affinity',
          label: 'Affinity',
          data: [
            { value: 'ruby', label: 'Ruby' },
            { value: 'ion', label: 'Ion' },
            { value: 'volt', label: 'Volt' }
          ]
        },
        { name: 'ability.energyCost', label: 'Energy cost', type: 'number' },
        {
          name: 'ability.abilityType',
          label: 'Affinity Type',
          data: [
            { value: 'attack', label: 'Attack' },
            { value: 'buff', label: 'Buff' },
            { value: 'debuff', label: 'Debuff' },
            { value: 'support', label: 'Support' },
            { value: 'power', label: 'Power' }
          ]
        }
      ]);
    }
    if (NFTtype === 'mech') {
      setNFTtypeField([]);
    }
    if (NFTtype === 'armor') {
      setNFTtypeField([
        {
          name: 'armor',
          label: 'Armor type',
          data: [
            { value: 'head', label: 'Head' },
            { value: 'shoulder', label: 'Sholuder' },
            { value: 'arm', label: 'Arm' }
          ]
        }
      ]);
    }
    if (NFTtype === 'skin') {
      setNFTtypeField([
        {
          name: 'skin',
          label: 'Skin Subtype',
          data: [
            { value: 'SaintStone', label: 'Saint Stone' },
            { value: 'Onyx', label: 'Onyx' },
            { value: 'pearl', label: 'Pearl' },
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
            { value: 'yellow', label: 'Yellow' }
          ]
        }
      ]);
    }
  }, [NFTtype]);
  const imageRef = useRef(null);
  const handleUpload = async (e) => {
    e.preventDefault();
    imageRef.current.click();
  };
  const onChangeImgUpload = async (e, setFieldValue) => {
    const fileHash = e.target.files;
    if (fileHash[0]) {
      setLoading(true);
      if (!fileHash[0].type.includes('image')) {
        setLoading(false);
        return dispatch(
          showModal({
            // eslint-disable-next-line no-useless-escape
            message: IMAGE_TYPE_ERROR,
            notifyType: 0,
            showPrimaryButton: false,
            showCloseButton: true
          })
        );
      }
      if (fileHash[0].size / 1024 / 1024 > 10) {
        setLoading(false);
        return dispatch(
          showModal({
            // eslint-disable-next-line no-useless-escape
            message: IMAGE_ERROR,
            notifyType: 0,
            showPrimaryButton: false,
            showCloseButton: true
          })
        );
      }
      const previewurl = URL.createObjectURL(fileHash[0]);
      setPreviewImage(previewurl);
      const ipfsimghash = await pinFileToIPFS(fileHash);
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      const compressedFile = await imageCompression(fileHash[0], options);
      const ipfscompresshash = await pinFileToIPFS([compressedFile]);
      if (ipfscompresshash)
        setFieldValue('previewImage', `${REACT_APP_PINATA_URL}/${ipfscompresshash}`);
      if (ipfsimghash) setFieldValue('mediaUrl', `${REACT_APP_PINATA_URL}/${ipfsimghash}`);
      setLoading(false);
    }
  };
  const handleError = (er) => {
    setLoading(false);
    console.error(er);
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
  };
  const handleSubmitData = async (values, resetForm) => {
    try {
      if (!account) {
        return dispatch(
          showModal({
            message: CONNECT_WALLET_MSG,
            notifyType: 2,
            showPrimaryButton: false,
            showCloseButton: true,
            redirectURL: '/select-wallet'
          })
        );
      }
      // if (currentUserProfileData?.userType === 'Cadet') {
      //   return dispatch(
      //     showModal({
      //       message: "Cadet can't mint NFT",
      //       notifyType: 2,
      //       showPrimaryButton: false,
      //       showCloseButton: true
      //     })
      //   );
      // }
      setLoading(true);
      const ability = [
        { trait_type: 'Type', value: 'Ability' },
        { trait_type: 'Affinity', value: values?.ability?.affinity },
        { trait_type: 'Energy Cost', value: values?.ability?.energyCost },
        { trait_type: 'Affinity Type', value: values?.ability?.abilityType }
      ];
      const skin = [
        { trait_type: 'Type', value: 'Skin' },
        { trait_type: 'Skin SubType', value: values?.skin }
      ];
      const armor = [
        { trait_type: 'Type', value: 'Armor' },
        { trait_type: 'Armor Type', value: values?.armor }
      ];
      const nftDetails = isGeneral
        ? {
            ...generalInitialValue,
            image: REACT_APP_DEFAULT_MECHPOD_ORIGINAL_IMAGE,
            name: 'Mech Pods',
            attributes: [{ trait_type: 'Type', value: 'Mech Pod' }]
          }
        : {
            ...values,
            image: values?.mediaUrl,
            name: values?.title,
            attributes:
              values?.nftType === 'mech'
                ? [{ trait_type: 'Type', value: 'Mech Pod' }]
                : values?.nftType === 'armor'
                ? armor
                : values?.nftType === 'skin'
                ? skin
                : ability
          };
      const ipfsinfo = await pinJSONToIPFS(nftDetails);

      // const { data: whitelistdata } = await axios.post(`/whitelist`, {
      //   walletAddress: account
      // });
      // if (values?.numberOfCopies > otherUserProfileData?.isWhitelisted?.canBeMinted) {
      //   setLoading(false);
      //   return dispatch(
      //     showModal({
      //       message: MINTLIMIT,
      //       notifyType: 0,
      //       showPrimaryButton: false,
      //       showCloseButton: true
      //     })
      //   );
      // }
      const { data } = await axios.get(`/whitelist/${account}`);
      const web3 = await getWeb3();
      const response = await mechcontract;
      const gasPrice = await web3.eth.getGasPrice();
     
      const estimateGas = await response.methods
        .mintMechIndividually(
          account,
          values.numberOfCopies,
          `${REACT_APP_PINATA_URL}/${ipfsinfo.IpfsHash}`,
          data.data.proof
          // data.data.leaf
        )
        .estimateGas({ from: account });
      response.methods
        .mintMechIndividually(
          account,
          values.numberOfCopies,
          `${REACT_APP_PINATA_URL}/${ipfsinfo.IpfsHash}`,
          data.data.proof
          // data.data.leaf
        )
        .send({ from: account, gasPrice, gas: estimateGas })
        .then(() => {
          setLoading(false);
          resetForm();
          setPreviewImage('');
          dispatch(
            showModal({
              message: MINT_SUCCESS_MSG,
              notifyType: 1,
              showPrimaryButton: false,
              showCloseButton: true,
              redirectURL: isGeneral
                ? `/profile/${currentUserProfileData?._id}/mech`
                : `/profile/${currentUserProfileData?._id}/${NFTtype}`
            })
          );
          setMint(!mint);
        })
        .catch((err) => {
          handleError(err);
        });
    } catch (error) {
      handleError(error);
    }
  };
  const handleCopiesInput = (e, setFieldValue) => {
    const reg = COPIES_REGEX;
    if (reg.test(e.target.value)) {
      setFieldValue('numberOfCopies', parseInt(e.target.value));
    } else {
      setFieldValue('numberOfCopies', 0);
    }
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(getOtherUserProfileAction({ userId: currentUserProfileData?._id }));
  }, [mint]);

  return (
    <SubHeaderLayout
      mainClassName={`Wrapper-container mint-wrapper-container ${isLoading ? 'hidesection' : ''}`}>
      <div className="mint-container">
        {isLoading && <Spinner className="global-spinner" />}
        <h2 className="mint-title">Mint NFT</h2>
        {!active ? (
          <>
            <NoDataFound withImage={false} text="Wallet Not Connected!" />
            <Link to="/select-wallet" state={{ from: 'mint' }}>
              <button
                // onClick={() => navigate('/select-wallet')}
                className="mint-btn connect_wallet_mint_btn mx-auto d-flex align-items-center justify-content-center">
                Connect Wallet
              </button>
            </Link>
          </>
        ) : (
          <Tabs onSelect={(k) => setTabSelected(k)} defaultActiveKey="mint" className="mint-tabs">
            <Tab eventKey="mint" title="Mint">
              <Formik
                initialValues={isGeneral ? generalInitialValue : createInitialValue}
                enableReinitialize={true}
                validationSchema={() =>
                  proNFTCreateValidation({
                    NFTtype,
                    maxCopies: otherUserProfileData?.isWhitelisted?.canBeMinted,
                    isAdmin: currentUserProfileData?.userType === 'Admin'
                  })
                }
                onSubmit={(values, { resetForm }) => {
                  handleSubmitData(values, resetForm);
                }}>
                {({ values, errors, handleChange, touched, setFieldValue }) => (
                  <Form>
                    <div className="form-group ">
                      <label className="mint-form-label">Enter Name of NFT</label>
                      <Field
                        name="title"
                        component={CustomInput}
                        type="text"
                        inputClassName="mint-form-control "
                        placeholder="Enter Name of NFT"
                        disabled={isGeneral}
                      />
                    </div>
                    <div className="form-group mint-textarea-form-group">
                      <label className="mint-form-label">Enter Description</label>
                      <Field
                        type="text"
                        component={CustomTextArea}
                        name="description"
                        className="form-control mint-form-control"
                        placeholder="Type here..."
                        rows="4"
                        disabled={isGeneral}
                      />
                    </div>
                    <RenderIf isTrue={!isGeneral}>
                      <div className="d-flex align-items-center justify-content-between upload-img-container">
                        <p className="upload-img-text mb-0">Select and Upload image</p>
                        <div className="position-relative upload-container cp">
                          <button
                            type="button"
                            onClick={handleUpload}
                            className="upload-img-btn d-flex align-items-center justify-content-center">
                            Upload image
                          </button>
                          <input
                            type="file"
                            name="previewImage"
                            accept="image/png,image/jpg,image/jpeg"
                            ref={imageRef}
                            className="upload-file"
                            onChange={(e) => onChangeImgUpload(e, setFieldValue)}
                            disabled={isGeneral}
                          />
                          {errors.previewImage && touched.previewImage && (
                            <div className="invalid-feedback">{errors.previewImage}</div>
                          )}
                        </div>
                      </div>
                    </RenderIf>
                    <div className="d-flex justify-content-between ">
                      <div className="properties-wrapper form-group">
                        <label className="mint-form-label mb-4">Properties</label>
                        <div className=" d-flex justify-content-between align-items-center flex-wrap">
                          <p className="propertiest-label">Type</p>
                          <div className="dropdown-wrapper">
                            <Field
                              name="nftType"
                              placeholder="Select Type"
                              component={CustomDropdown}
                              styleData="width256"
                              data={PropertiesData}
                              selectclass="mintdropdown"
                              handleChange={(e) => {
                                setNFTtype(e.target.value);
                              }}
                              disabled={isGeneral}
                            />
                          </div>
                        </div>
                        {NFTtypeField?.map((element) => {
                          return (
                            <div
                              key={element.name}
                              className=" d-flex justify-content-between align-items-center flex-wrap">
                              <p className="propertiest-label">{element.label}</p>
                              <div className="dropdown-wrapper">
                                <Field
                                  name={element.name}
                                  component={
                                    element.type === 'number' ? CustomInput : CustomDropdown
                                  }
                                  data={element.data}
                                  placeholder={element.label}
                                  inputClassName="mint-form-control borderwhite "
                                  styleData="width256"
                                  selectclass="mintdropdown "
                                  type="number"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="preview-container">
                        <img
                          className={`nftPreviewimage ${PreviewImage ? 'd-block' : 'd-none'}`}
                          src={PreviewImage}
                          alt="nft-preview"
                        />
                      </div>
                    </div>

                    <div className="form-group mt-4">
                      <label className="mint-form-label">Enter number of copies to be minted</label>
                      <input
                        type="text"
                        name="numberOfCopies"
                        className="form-control mint-form-control mb-4"
                        min={0}
                        value={values.numberOfCopies}
                        onChange={(e) => {
                          handleCopiesInput(e, setFieldValue);
                        }}
                        step="any"
                        placeholder="Enter number of copies"
                      />
                      {errors.numberOfCopies && touched.numberOfCopies && (
                        <div className="invalid-feedback">{errors.numberOfCopies}</div>
                      )}
                    </div>
                    <div className="d-flex justify-content-between ">
                      {/* <div className="properties-wrapper form-group">
                      <label className="mint-form-label mb-4">Properties</label>
                      <div className=" d-flex justify-content-between align-items-center flex-wrap mb-4">
                        <p className="propertiest-label">Type</p>
                        <div className="dropdown-wrapper">
                          <Field
                            name="nftType"
                            placeholder="Select Type"
                            component={CustomDropdown}
                            styleData="width256"
                            data={PropertiesData}
                            selectclass="mintdropdown"
                            handleChange={(e) => {
                              setNFTtype(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      {NFTtypeField?.map((element) => {
                        return (
                          <div
                            key={element.name}
                            className=" d-flex justify-content-between align-items-center flex-wrap">
                            <p className="propertiest-label">{element.label}</p>
                            <div className="dropdown-wrapper">
                              <Field
                                name={element.name}
                                component={element.type === 'number' ? CustomInput : CustomDropdown}
                                data={element.data}
                                placeholder={element.label}
                                inputClassName="mint-form-control "
                                styleData="width256"
                                selectclass="mintdropdown "
                                type="number"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div> */}
                      {/* <div className="preview-container">
                      <img
                        className={`nftPreviewimage ${PreviewImage ? 'd-block' : 'd-none'}`}
                        src={PreviewImage}
                      />
                    </div> */}
                    </div>
                    <button
                      type="submit"
                      className="mint-btn mx-auto d-flex align-items-center justify-content-center">
                      Mint NFT
                    </button>
                  </Form>
                )}
              </Formik>
            </Tab>
            <Tab eventKey="nft" title="List NFT for Sale">
              <PutOnMarketplace
                setLoading={(val) => setLoading(val)}
                Loading={isLoading}
                TabSelected={TabSelected}
              />
            </Tab>
          </Tabs>
        )}

        <AlertMessageModal />
      </div>
    </SubHeaderLayout>
  );
};

export default Mint;
