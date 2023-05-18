import { NO_DATA_SVG } from '../../assets/images';
import { RenderIf } from '../../utils';

import './NoDataFound.css';

const NoDataFound = ({
  text = 'No data found',
  className = '',
  textClassName = '',
  style = {},
  withImage = true
}) => (
  <div className={`mt-3 no-data-found-label flex-column ${className}`} style={style}>
    <RenderIf isTrue={withImage}>
      <img src={NO_DATA_SVG} alt="no-data" className="no-data-found-img" />
    </RenderIf>
    <div className={`${textClassName} ${!withImage ? 'fs-18' : ''}`}>{text}</div>
  </div>
);

export default NoDataFound;
