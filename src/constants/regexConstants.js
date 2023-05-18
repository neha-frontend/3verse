export const CANNOT_EMPTY_REGEX = /[^\s+$]/;
export const ONLY_CONTAN_ALPHABET_AND_SPACES_REGEX = /^[a-zA-Z ]*$/;
export const USERNAME_REGEX = /^[^<>$=]+$/;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*)[A-Za-z\d"!#$%&'()*+,-./:;<=>?@^_`{|}~]{8,32}$/;
export const EMAIL_REGEX = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
export const NUMBER_REGEX = /^[0-9]{10}$/;
export const PRICE_REGEX = /^\d*(\.\d{0,4})?$/;
export const COPIES_REGEX = /^\d*\.?\d{1}$/;
