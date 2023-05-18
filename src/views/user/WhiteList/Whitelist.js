/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { AlertMessageModal, CustomInput, NoDataFound, Spinner } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, whiteListUser } from '../../../store/sagaActions';
import { useWeb3React } from '@web3-react/core';
import getWeb3 from '../../../getWeb3';
import WAValidator from 'wallet-address-validator';
import { useMechContract } from '../../../hooks';
import axiosMain from '../../../http/axios/axios_main';
import { WHITELIST_MSG, WALLET_VALIDATOR } from '../../../constants/modalConstant';
import { REQUIRED } from '../../../constants/validationMessages';
import { COPIES_REGEX } from '../../../constants/regexConstants';
import { useNavigate } from 'react-router-dom';
import { SubHeaderLayout } from '../../../layout';
import { RenderIf } from '../../../utils';

import './whitelist.css';

const Whitelist = () => {
  const navigate = useNavigate();
  const createInitialValue = {
    address: '',
    canmint: ''
  };
  const [isLoading, setLoading] = useState(false);
  const mechcontract = useMechContract();
  const handleError = (er) => {
    console.error(er);
    const errMsg = er?.message?.split(':');
    setLoading(false);
    dispatch(
      showModal({
        message: er?.message
          ?.split('error')[1]
          ?.split('message')[1]
          // eslint-disable-next-line no-useless-escape
          ?.split(`\"`)[2]
          .includes('missing role')
          ? "Your wallet doesn't have role to whilelist"
          : // eslint-disable-next-line no-useless-escape
            er?.message?.split('error')[1]?.split('message')[1]?.split(`\"`)[2] || er?.response?.data?.err || errMsg,
        notifyType: 0,
        showPrimaryButton: false,
        showCloseButton: true
      })
    );
  };
  const { account, active } = useWeb3React();
  const validation = Yup.object().shape({
    address: Yup.string()
      .typeError('Enter a valid Value.')
      // .test('price-check', WALLET_VALIDATOR, (value) => {
      //   const addresses = value.split(',').map((item) => item.trim());
      //   addresses.map((data) => {    
      //     console.log(WAValidator.validate(data, 'ETH'));      
      //     if (WAValidator.validate(data, 'ETH')) {
      //       console.log(data);
      //       return data;
      //     }
      //   });
      // })
      .required(REQUIRED),
    canmint: Yup.string().required(REQUIRED)
  });
  const dispatch = useDispatch();
  const handleSubmitData = async (values, resetForm) => {
    try {
      setLoading(true);
      const web3 = await getWeb3();
      const response = await mechcontract;
      const gasPrice = await web3.eth.getGasPrice();
      const { data } = await axiosMain.post(`/whitelist`, {
        walletAddress: values.address.split(',').map((item) => item.trim()),
        canBeMinted: parseInt(values.canmint)
      });
      const res = await axiosMain.get(`/whitelist/${data.data.walletAddress}`);
      const estimateGas = await response.methods
        .setMerkelRoot(res.data.data.root)
        .estimateGas({ from: account });
      response.methods
        .setMerkelRoot(res.data.data.root)
        .send({ from: account, gasPrice, gas: estimateGas })
        .then(() => {
          dispatch(
            showModal({
              message: WHITELIST_MSG,
              notifyType: 1,
              showPrimaryButton: false,
              showCloseButton: true
            })
          );
          resetForm();
          setLoading(false);
        })
        .catch((err) => {
          resetForm();
          handleError(err);
        });
    } catch (error) {
      resetForm();
      handleError(error);
    }
  };
  const handlemintInput = (e, setFieldValue) => {
    const reg = COPIES_REGEX;
    if (reg.test(e.target.value)) {
      setFieldValue('canmint', parseInt(e.target.value));
    } else {
      setFieldValue('canmint', 0);
    }
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]); 
  
  return (
    <SubHeaderLayout>
      <RenderIf isTrue={isLoading}>
        <Spinner className="global-spinner" />
      </RenderIf>
      <div className={`mt-3 ${isLoading ? 'hidesection' : ''}`}>
        {!active ? (
          <>
            <NoDataFound withImage={false} text="Wallet Not Connected!" />
            <button
              onClick={() => navigate('/select-wallet')}
              className="mint-btn connect_wallet_mint_btn mx-auto d-flex align-items-center justify-content-center">
              Connect Wallet
            </button>
          </>
        ) : (
          <Formik
            initialValues={createInitialValue}
            enableReinitialize={true}
            validationSchema={validation}
            onSubmit={(values, { resetForm }) => {
              handleSubmitData(values, resetForm);
            }}>
            {({ setFieldValue, errors, touched, values }) => (            
                <Form>
                  <div className="mint-container whitelist-container">
                    <h2 className="whitelist-title">Whitelist Address</h2>
                    <div className="form-group mt-3">
                      <label className="mint-form-label">Enter Wallet Address</label>
                      <Field
                        component={CustomInput}
                        type="text"
                        value={values.address}
                        inputClassName="form-control mint-form-control"
                        name="address"
                      />
                    </div>
                    <div className="form-group ">
                      <label className="mint-form-label">Enter No of NFT's Minted</label>
                      <input
                        value={values.canmint}
                        type="text"
                        step="any"
                        min={0}
                        onChange={(e) => {
                          handlemintInput(e, setFieldValue);
                        }}
                        placeholder=" NFT's Can Mint"
                        className="form-control mint-form-control"
                        name="canmint"
                      />
                      {errors.canmint && touched.canmint && (
                        <div className="invalid-feedback mt-2">{errors.canmint}</div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="mint-btn mx-auto d-flex align-items-center justify-content-center">
                      WhiteList Address
                    </button>
                  </div>
                </Form>          
            )}
          </Formik>
        )}
        <AlertMessageModal />
      </div>
    </SubHeaderLayout>
  );
};

export default Whitelist;
