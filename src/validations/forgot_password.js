import * as Yup from 'yup';
import { PASSWORD_REGEX } from '../constants/regexConstants';

import {
  REQUIRED,
  EMAIL_ERROR,
  PASSWORD_ERROR,
  CONFIRM_PASSWORD_ERROR
} from '../constants/validationMessages';

export const forgotPasswordValidatior = Yup.object().shape({
  email: Yup.string()
    .trim()
    .matches(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/, EMAIL_ERROR)
    .required(REQUIRED)
});

export const resetPasswordValidatior = Yup.object().shape({
  password: Yup.string().trim().matches(PASSWORD_REGEX, PASSWORD_ERROR).required(REQUIRED),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password'), null], CONFIRM_PASSWORD_ERROR)
    .required(REQUIRED)
});
