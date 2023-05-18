import { createAction } from '@reduxjs/toolkit';

export const forgotPasswordAction = createAction('FORGOT_PASSWORD_ACTION');
export const refreshTokenAction = createAction('REFRESH_TOKEN_ACTION');

export const loginAction = createAction('LOGIN_ACTION');
export const logoutAction = createAction('LOGOUT_ACTION');
export const authenticationValidatorAction = createAction('AUTHENTICATION_VALIDATOR_ACTION');

export const registerAction = createAction('REGISTER_ACTION');
export const resetPasswordAction = createAction('REST_PASSWORD_ACTION');
