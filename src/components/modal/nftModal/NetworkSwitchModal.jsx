import { useDispatch, useSelector } from 'react-redux';

import { WALLET_NETWORK_SWITCH_MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal } from '../../../store/sagaActions';
import { PrimaryButton } from '../../button';
import CustomModal from '../CustomModal';

const NetworkSwitchModal = () => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);

  const hideModal = () => dispatch(hideCustomModal());

  const onChangeNetworkClick = async () => {
    hideModal();
    if (sessionStorage.getItem('connectedWallet') === 'metamask') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: '0x13881'
            }
          ]
        });
      } catch (error) {
        if (error.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x13881',
                chainName: 'Polygon - Testnet',
                nativeCurrency: {
                  name: 'Polygon',
                  symbol: 'Matic',
                  decimals: 18
                },
                rpcUrls: [process.env.REACT_APP_RPCURLS],
                blockExplorerUrls: [process.env.REACT_APP_BLOCKCHAIN_ENDPOINT]
              }
            ]
          });
        }
      }
    }
  };

  return (
    <CustomModal
      showModal={customModalType === WALLET_NETWORK_SWITCH_MODAL}
      showCloseButton={false}
      closeModal={hideModal}
      mainClassName="px-4 successModal network_switch">
      <div className="success-modal-content-container text-center">
        <div className="wrongnetworkdiv font-2 py-4 px-2">
          <p>Please change the network to Polygon</p>
        </div>
        <PrimaryButton
          text="Switch to polygon"
          className="fw-bold mt-2 mx-auto my-3 network_switch_btn"
          handleClick={onChangeNetworkClick}
        />
      </div>
    </CustomModal>
  );
};

export default NetworkSwitchModal;
