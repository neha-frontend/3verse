import { DEAFULT_PROFILE_PIC } from '../../assets/images';

const ProfileImage = ({ img = null, className = '' }) => (
  <img
    src={img || DEAFULT_PROFILE_PIC}
    className={`rounded-circle ${className}`}
    alt="Profile-Img"
  />
);

export default ProfileImage;
