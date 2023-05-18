import * as Yup from 'yup';

import { EMAIL_REGEX } from '../constants/regexConstants';
import { REQUIRED, EMAIL_ERROR } from '../constants/validationMessages';

export const footerValidator = Yup.object().shape({
  email: Yup.string().trim().matches(EMAIL_REGEX, EMAIL_ERROR).required(REQUIRED)
});
