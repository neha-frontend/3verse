import { v4 as uuid } from 'uuid';

import {
  FUSE_DETAILS__MODAL,
  FUSE_OTHER_TNC__MODAL,
  FUSE_PROCESS__MODAL,
  FUSE_SUCCESS__MODAL,
  FUSE_TNC_MODAL
} from '../../../constants/modalTypeConstant';

const fusionModalPara = [
  {
    id: uuid(),
    para: 'Upon fusion, this ERC1155 mech pod will be sent to a burn address and your newly fused G-mech will come in the form of an ERC721 token.',
    className: 'modalText',
    customModalType: FUSE_TNC_MODAL
  },

  //other Tnc modal
  {
    id: uuid(),
    para: 'The fusion process requires access to view your wallet for NFTs that are eligible for this experimental synthesis.',
    className: 'modalText',
    customModalType: FUSE_OTHER_TNC__MODAL
  },

  //fuse details modal
  {
    id: uuid(),
    para: 'For maintaining the stability of fusion tech, the Department of Mechanized Research requires a one-time transaction fee for each use. Confirming this transaction will bring your mech to life, powered by the NFT you have chosen. A new world awaits!',
    className: 'modalText',
    customModalType: FUSE_DETAILS__MODAL
  },

  //fuse process modal
  {
    id: uuid(),
    para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper rhoncus est, eu venenatis odio ultricies nec. Donec aliquam leo in sollicitudin vestibulum. Sed aliquet semper sem eget pulvinar. Quisque sodales sit amet odio nec sagittis. Morbi finibus, tortor ac scelerisque iaculis, ipsum eros iaculis sapien, eu consequat nunc diam sit amet dolor.Morbi non porta lacus. Donec eu aliquet risus. Phasellus iaculis iaculis sapien, a dignissim felis malesuada in. Suspendisse potenti. Donec condimentum neque quis lacus rhoncus feugiat. Nam lacinia aliquam quam vel facilisis. Vestibulum dignissim justo sit amet tempor aliquam.',
    className: 'modalText',
    customModalType: FUSE_PROCESS__MODAL
  },

  //fuse success modal
  {
    id: uuid(),
    para: 'Congratulations! Your G-mech is now ready to enter the arenas. Good luck, General!',
    className: 'modalText',
    customModalType: FUSE_SUCCESS__MODAL
  }
];

export default fusionModalPara;
