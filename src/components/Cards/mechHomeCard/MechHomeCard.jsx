import { Link } from 'react-router-dom';

import { STANDARD_MECH_CARD } from '../../../assets/images';

const MechHomeCard = ({
  redirectTo = '/',
  img = STANDARD_MECH_CARD,
  createdBy = '',
  nftName = '',
  nftType = ''
}) => {
  return (
    <Link to={redirectTo} className="col-xl-3 col-md-4 col-sm-6 col-12 w-100" state={'home'}>
      <div className="image_box">
        <div className="relative img_container">
          <div className="mech-img-container">
            <img src={img} alt="recently-added" className="card_img" />
          </div>
          <div className="details">
            <div>
              <div className="nft_name"> {nftName} </div>
              <div className="creator_name">{createdBy}</div>
            </div>
            <div className="mech_box text-capitalize">{nftType}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MechHomeCard;
