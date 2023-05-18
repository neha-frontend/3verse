import { useNavigate } from 'react-router-dom';

import { BACK_ICON } from '../../assets/images';

import '../index.css';

const SubHeaderLayout = ({
  children,
  mainClassName = '',
  headerClassName = '',
  headerText = ''
}) => {
  const navigate = useNavigate();
  return (
    <div className={`sub-header-conatainer ${mainClassName}`}>
      <p className={`sub-header-title d-flex align-items-center ${headerClassName}`}>
        {headerText && (
          <img
            src={BACK_ICON}
            alt="backIcon"
            onClick={() => navigate(-1)}
            className="cp back_icon"
          />
        )}
        {headerText}
      </p>
      {children}
    </div>
  );
};

export default SubHeaderLayout;
