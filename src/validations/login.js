import * as Yup from 'yup';

import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from '../constants/validationMessages';

export const loginValidatior = Yup.object().shape({
  email: Yup.string().required(EMAIL_REQUIRED),
  password: Yup.string().required(PASSWORD_REQUIRED)
});
