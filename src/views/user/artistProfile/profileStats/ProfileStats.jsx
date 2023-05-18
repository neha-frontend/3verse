import { RenderIf } from '../../../../utils';

import './profileStats.css';

const ProfileStats = ({ userStat = {}, rentedNft = false, onRent = 0, mainClassName = '' }) => (
  <div className={`row gmech_detail_body ${mainClassName}`}>
    <div className="col-md-6 col-12 p-0">
      <div className="gmech_head">Account statistics</div>
      <RenderIf isTrue={!rentedNft}>
        <div className="game_stat">
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">Level</div>
            <div className="stat_detail">{userStat?.gameData?.level || 'N/A'}</div>
          </div>
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">EXP</div>
            <div className="stat_detail">{userStat?.gameData?.exp || 'N/A'}</div>
          </div>
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">Matches Won</div>
            <div className="stat_detail">{userStat?.gameData?.matchesWon || 'N/A'}</div>
          </div>
          {/* <div className="d-flex game_stat_content_div">
            <div className="stat_head">Affinity</div>
            <div className="stat_detail">Ruby</div>
          </div>
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">Armor - Head :</div>
            <div className="stat_detail">Head</div>
          </div>
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">Armor - Shoulder :</div>
            <div className="stat_detail">Shoulder</div>
          </div>
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">Armor - Arm :</div>
            <div className="stat_detail">Arm</div>
          </div>
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">Skins</div>
            <div className="stat_detail">Sandstone</div>
          </div> */}
        </div>
      </RenderIf>
      <RenderIf isTrue={rentedNft}>
        <div className="game_stat">
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">Level</div>
            <div className="stat_detail">{userStat?.gameData?.level || 'N/A'}</div>
          </div>
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">EXP</div>
            <div className="stat_detail">{userStat?.gameData?.exp || 'N/A'}</div>
          </div>
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">Matches Won</div>
            <div className="stat_detail">{userStat?.gameData?.matchesWon || 'N/A'}</div>
          </div>
        </div>
      </RenderIf>
    </div>
    <div className="col-md-6 col-12 mt-md-0 mt-5 p-0">
      <div className="gmech_head">My Collections</div>
      <RenderIf isTrue={!rentedNft}>
        <div className="game_stat collection_game_stat">
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">Total Mechpods</div>
            <div className="stat_detail">{userStat?.collection?.totalMech}</div>
          </div>
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">Total G-Mech</div>
            <div className="stat_detail">{userStat?.collection?.totalGmech}</div>
          </div>
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">NFTs on Sale</div>
            <div className="stat_detail">{userStat?.collection?.onsale}</div>
          </div>
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">NFTs on Rent</div>
            <div className="stat_detail">{userStat?.collection?.onrent}</div>
          </div>
        </div>
      </RenderIf>
      <RenderIf isTrue={rentedNft}>
        <div className="game_stat">
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">Total Rented NFTs</div>
            <div className="stat_detail">{onRent}</div>
          </div>
          <div className="d-flex game_stat_content_div">
            <div className="stat_head">Total EXP contributed</div>
            <div className="stat_detail">N/A</div>
          </div>
        </div>
      </RenderIf>
    </div>
  </div>
);

export default ProfileStats;
