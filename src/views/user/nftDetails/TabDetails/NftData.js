import { useState } from 'react';

import { TrimWallet } from '../../../../components';
import { RenderIf } from '../../../../utils';

const NftData = ({ nftData = '', currentUser = '', nftOwnerId = '' }) => {

  const armorData = [
    {
      title: 'Properties',
      id: 1,
      body: () => {
        return (
          <>
            {nftData?.nft?.nftType === 'skin' ||
            (nftData?.nft?.nftType === 'armor' && nftOwnerId !== currentUser) ? (
              <div className="accordian_body">
                <div className="row">
                  <div className="col attribute_body">
                    <div className="attribute_title">Origin</div>
                    <div className="attribute_desc">{nftData?.nft?.origin || 'N/A'}</div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col attribute_body">
                    <div className="attribute_title">Description</div>
                    <div className="attribute_desc">{nftData?.nft?.description || 'N/A'}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="accordian_body">
                <div className="row">
                  <div className="col attribute_body">
                    <div className="attribute_title">Affinity</div>
                    <div className="attribute_desc">
                      {nftData?.nft?.nftType === 'g-mech'
                        ? nftData?.nft?.gmech?.affinity || 'N/A'
                        : nftData?.nft?.ability?.affinity || 'N/A'}
                    </div>
                  </div>
                  <div className="col attribute_body">
                    <div className="attribute_title">Origin</div>
                    <div className="attribute_desc">{nftData?.nft?.origin || 'N/A'}</div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col attribute_body">
                    <div className="attribute_title">Description</div>
                    <div className="attribute_desc">{nftData?.nft?.description || 'N/A'}</div>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      }
    },
    {
      title: 'Details',
      id: 2,
      body: () => {
        const [detailtab, setDetailTab] = useState('game');
        return (
          <>
            <RenderIf isTrue={nftData?.nft?.nftType === 'g-mech'}>
              <div className="accordian_body position-relative">
                <div className="details_tab">
                  <button
                    onClick={() => setDetailTab('general')}
                    className={`details_tab_btn ${detailtab === 'general' ? 'active' : ''}`}>
                    General
                  </button>
                  <button
                    onClick={() => setDetailTab('game')}
                    className={`details_tab_btn ${detailtab === 'game' ? 'active' : ''}`}>
                    Game
                  </button>
                </div>
                {detailtab === 'general' ? (
                  <>
                    <div className="row">
                      <div className="col attribute_body">
                        <div className="attribute_title">Contract Address</div>
                        <div className="attribute_desc">
                          {nftData?.nft?.nftAddress ? TrimWallet(nftData?.nft?.nftAddress) : 'N/A'}
                        </div>
                      </div>
                      <div className="col attribute_body">
                        <div className="attribute_title">Token Standard</div>
                        <div className="attribute_desc">
                          {nftData?.nft?.nftType === 'g-mech' ? 'ERC 721' : 'ERC 1155'}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col attribute_body">
                        <div className="attribute_title">Token Id</div>
                        <div className="attribute_desc">{nftData?.nft?.tokenId || 'N/A'}</div>
                      </div>
                      <div className="col attribute_body">
                        <div className="attribute_title">Blockchain</div>
                        <div className="attribute_desc">Polygon</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="row">
                    <div className="col attribute_body">
                      <div className="attribute_title">Armor</div>
                      <div className="attribute_desc mt-3">Head: {nftData?.nft?.gmech?.head}</div>
                      {/* <div className="attribute_desc mt-3">
                        Shoulder: {nftData?.nft?.gmech?.shoulder}
                      </div> */}
                      <div className="attribute_desc mt-3">Arm: {nftData?.nft?.gmech?.arm}</div>
                    </div>
                    <div className="col">
                      <div className="attribute_body">
                        <div className="attribute_title">Type</div>
                        <div className="attribute_desc">{nftData?.nft?.gmech?.gmechType}</div>
                      </div>
                      <div className="attribute_body mt-2">
                        <div className="attribute_title">Skin</div>
                        <div className="attribute_desc">{nftData?.nft?.gmech?.skin}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </RenderIf>
            <RenderIf isTrue={nftData?.nft?.nftType !== 'g-mech'}>
              <div className="accordian_body">
                <div className="row">
                  <div className="col attribute_body">
                    <div className="attribute_title">Contract Address</div>
                    <div className="attribute_desc">
                      {nftData?.nft?.nftAddress ? TrimWallet(nftData?.nft?.nftAddress) : 'N/A'}
                    </div>
                  </div>
                  <div className="col attribute_body">
                    <div className="attribute_title">Token Standard</div>
                    <div className="attribute_desc">
                      {nftData?.nft?.nftType === 'g-mech' ? 'ERC 721' : 'ERC 1155'}
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col attribute_body">
                    <div className="attribute_title">Token Id</div>
                    <div className="attribute_desc">{nftData?.nft?.tokenId || 'N/A'}</div>
                  </div>
                  <div className="col attribute_body">
                    <div className="attribute_title">Blockchain</div>
                    <div className="attribute_desc">Polygon</div>
                  </div>
                </div>
              </div>
            </RenderIf>
          </>
        );
      }
    }
  ];

  return armorData;
};

export default NftData;
