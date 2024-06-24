import { loginPost } from '../../../__generated__';
import { authConfig } from './AuthContext';

export const PasswordLoginOnSubmit = async (
  email: string,
  password: string,
) => {
  return loginPost({
    account_id: email,
    password,
    referrer_application: authConfig.referrerApplicationCode,
  });
};
export const CodeLoginOnSubmit = async (code: string) => {
  return loginPost({
    authentication_code: code,
    referrer_application: authConfig.referrerApplicationCode,
  });
};
