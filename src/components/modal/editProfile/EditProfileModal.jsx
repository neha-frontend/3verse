import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import CustomModal from '../CustomModal';
import { EDIT } from '../../../assets/images';
import { EDIT_PROFILE_MODAL } from '../../../constants/modalTypeConstant';
import {
  editUserProfileAction,
  hideCustomModal,
  showModal,
  uploadUserProfilePicAction
} from '../../../store/sagaActions';
import { editProfileValidatior } from '../../../validations/edit_profile';
import { PrimaryButton } from '../../button';
import ProfileImage from '../../profileImage/ProfileImage';
import AlertMessageModal from '../AlertMessageModal';
import { CustomInput, CustomTextArea } from '../../formikComponent';
import { FILE_SIZE_MSG, INVALID_FORMAT_MSG } from '../../../constants/modalConstant';
import { RenderIf } from '../../../utils';
import Spinner from '../../spinner';

const EditProfileModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);
  const {
    data: currentUserProfile,
    editProfileLoading,
    uploadProfilePicLoading
  } = useSelector((state) => state.profile.currentUserProfile);

  const initalEditProfileValues = {
    email: currentUserProfile?.email ?? '',
    discordId: currentUserProfile?.discordId ?? '',
    bio: currentUserProfile?.bio ?? ''
  };

  const closeModal = () => dispatch(hideCustomModal());
  const handleProfileImg = (e) => {
    const maxProfileSize = parseInt(process.env.REACT_APP_IMAGE_UPLOAD_LIMIT); // 5mb;

    if (e.target.files.length) {
      const imageFileList = {
        id: 2,
        file: e.target.files[0],
        size: e.target.files[0].size,
        type: e.target.files[0].type.includes('image') ? 'image' : 'video'
      };

      if (imageFileList.type !== 'image') {
        dispatch(
          showModal({
            message: INVALID_FORMAT_MSG,
            notifyType: 2,
            showPrimaryButton: true,
            showCloseButton: true,
            title: ''
          })
        );
      } else if (imageFileList.size > maxProfileSize) {
        dispatch(
          showModal({
            message: FILE_SIZE_MSG,
            notifyType: 2,
            showPrimaryButton: true,
            showCloseButton: true,
            title: ''
          })
        );
      } else if (imageFileList.size <= maxProfileSize && imageFileList.type === 'image') {
        const bodyFormData = new FormData();

        bodyFormData.append('profilePic', imageFileList.file);
        dispatch(uploadUserProfilePicAction({ data: bodyFormData }));
      }
    }
    e.target.value = '';
  };

  const handleSubmit = ({ data, isEmailChanged }) =>
    dispatch(editUserProfileAction({ data, isEmailChanged, dispatch, navigate }));

  return (
    <>
      <CustomModal
        showModal={customModalType === EDIT_PROFILE_MODAL}
        closeModal={closeModal}
        showCloseButton={true}
        mainClassName="edit-profile-modal pe-0">
        <Formik
          initialValues={initalEditProfileValues}
          validationSchema={editProfileValidatior}
          onSubmit={(values) => {
            const apiValues = { ...values, email: values.email.toLowerCase() };
            let isEmailChanged = true;
            if (apiValues.email === currentUserProfile?.email) isEmailChanged = false;
            handleSubmit({ data: { ...apiValues }, isEmailChanged });
          }}>
          {({ isValid, dirty }) => (
            <Form>
              <div className="profile-img-container position-relative mx-auto mb-4">
                <ProfileImage
                  img={currentUserProfile?.profilePic?.link ?? null}
                  className={`profile-img ${uploadProfilePicLoading ? 'opacity-50' : ''}`}
                  isLoading={uploadProfilePicLoading}
                />

                <RenderIf isTrue={uploadProfilePicLoading}>
                  <Spinner className="profile-image-spinner" />
                </RenderIf>
                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={(e) => handleProfileImg(e)}
                  id="edit-profile-pic"
                  disabled={uploadProfilePicLoading}
                />
                <label
                  className="edit d-flex align-items-center justify-content-center cp"
                  htmlFor="edit-profile-pic">
                  <img src={EDIT} className="edit-img" alt='edit-icon'/>
                </label>
              </div>

              <Field
                type="email"
                placeholder="Enter Your Email ID"
                name="email"
                label="Email ID"
                component={CustomInput}
              />

              <Field
                type="text"
                placeholder="Enter Your discord ID"
                name="discordId"
                label="Discord ID"
                component={CustomInput}
              />

              <Field
                type="text"
                placeholder="Type here..."
                rows="3"
                name="bio"
                label="Bio"
                component={CustomTextArea}
              />

              <PrimaryButton
                type="submit"
                className="update-btn w-100 d-flex align-items-center justify-content-center"
                text="Update"
                disabled={editProfileLoading || !(isValid && dirty)}
              />
            </Form>
          )}
        </Formik>
      </CustomModal>

      <AlertMessageModal />
    </>
  );
};

export default EditProfileModal;
