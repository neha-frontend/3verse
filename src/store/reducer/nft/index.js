import { combineReducers } from '@reduxjs/toolkit';
import { FreshMintedNFTReducer } from './freshMintedNFt';
import { favouriteNftReducer } from './favouriteNftSlice';
import { marketplaceNftReducer } from './marketplaceNftSlice';
import { nftCollectionReducer } from './nftCollectionSlice';
import { nftDetailsReducer } from './nftDetailsSlice';
import { profileNftReducer } from './profileNftSlice';
import { userNftOnSaleAndRentNftReducer } from './userNftOnSaleAndRentSlice';
import { putNftOnRentReducer } from './putNftOnRentSlice';

const nftRootReducer = combineReducers({
  nftDetail: nftDetailsReducer,
  marketplaceNftList: marketplaceNftReducer,
  nftCollection: nftCollectionReducer,
  freshMinted: FreshMintedNFTReducer,
  profileNftList: profileNftReducer,
  userNFtOnSaleAndRent: userNftOnSaleAndRentNftReducer,
  favouriteNft: favouriteNftReducer,
  putNftOnRent: putNftOnRentReducer
});
export default nftRootReducer;
