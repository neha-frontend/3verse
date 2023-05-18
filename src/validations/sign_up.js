import * as Yup from 'yup';

import { PASSWORD_REGEX, USERNAME_REGEX, EMAIL_REGEX } from '../constants/regexConstants';
import {
  REQUIRED,
  EMAIL_ERROR,
  VALID_DATE,
  PASSWORD_ERROR,
  TNC_REQUIRED,
  VALID_USERNAME
} from '../constants/validationMessages';

export const signUpValidatior = Yup.object().shape({
  username: Yup.string().matches(USERNAME_REGEX, VALID_USERNAME).required(REQUIRED),
  email: Yup.string()
    .trim()
    .max(32, 'cannot be more than 32 characters')
    .matches(EMAIL_REGEX, EMAIL_ERROR)
    .required(REQUIRED),
  password: Yup.string().trim().matches(PASSWORD_REGEX, PASSWORD_ERROR).required(REQUIRED),
  dob: Yup.date().typeError(VALID_DATE).required(REQUIRED),
  TnC: Yup.string().equals(['true'], TNC_REQUIRED).required(TNC_REQUIRED),
  newsletterUpdates: Yup.string().equals(['true', 'false'], TNC_REQUIRED).required(TNC_REQUIRED)
});
