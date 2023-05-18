import { FUSION_PFP_PNG } from '../../../assets/images';
import { RenderIf } from '../../../utils';

import './fusionCard.css';

const FusionCard = ({
  className = '',
  name = '',
  img = FUSION_PFP_PNG,
  isActive = false,
  isSelected = false,
  onClick = () => {}
}) => (
  <div
    className={`cp ${className} ${isActive ? 'active' : isSelected ? 'opacity-50' : ''}`}
    onClick={onClick}>
    <img src={img} className="fusionImg" alt='fusion-image'/>
    <RenderIf isTrue={isActive}>
      <div className="fusion-card-value">{name}</div>
    </RenderIf>
  </div>
);

export default FusionCard;
