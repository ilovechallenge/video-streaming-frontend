import { AxiosResponse } from 'axios';
import {
  Children,
  LibsDomainModelInterfaceAuthLoginResponse,
  LibsDomainModelInterfaceAuthLogoutResponse,
  LibsDomainModelInterfaceUserGetMyInfoResponse,
  SchoolClass,
  UserCore,
} from '../../../__generated__';

export type UserType = 1 | 2;
export type LoginSubmitEvent = (
  email: string,
  password: string,
  redirectPath?: string | null | undefined,
) => Promise<number | undefined>;
export type CodeLoginEvent = (
  code: string,
  redirectPath?: string | null | undefined,
) => Promise<number | undefined>;
export type GetBooleanStatus = () => boolean;
export type GetLoginUser = () => CurrentUser | undefined | null; 
export type GetUserFromUuid = (uuid: string) => UserCore | null;
export type GetChildrenList = () => Children[] | null;
export type GetSchoolClassList = (
  grade?: number | null,
  class_name?: string | null,
) => SchoolClass[] | null;
export type GetChildrens = (
  grade?: number | null,
  class_name?: string | null,
) => UserCore[] | null;
export type Logout = () => Promise<
  AxiosResponse<LibsDomainModelInterfaceAuthLogoutResponse>
>;
export type UpdateProfile = () => void;
export type SetNoAuthMode = (flag: boolean) => void;
export type BooleanMethod = () => boolean;
export type SSOClickResponse = AxiosResponse<
  LibsDomainModelInterfaceAuthLoginResponse,
  unknown
>;
export type SSOClickAction = () => Promise<SSOClickResponse>;
export type SSOClickActionCaller = (
  method: string,
  action: SSOClickAction | undefined,
) => Promise<number>;
export type SSOClickEventHandler = () => Promise<number>;

// AuthContext外にもエクスポート
export type LoginClickEvent = () => Promise<number | undefined>;
export type CurrentUser = LibsDomainModelInterfaceUserGetMyInfoResponse;
export type AuthConfig = {
  referrerApplicationCode: number;
  loginPageUrl?: string;
  mainPageUrl?: string;
  mainPageUrlMethod?: (user: CurrentUser) => string;
  checkNoAuthMode?: () => boolean;
  noAuthPageUrl: string[];
};

export type AuthState = {
  uuid: string | null | undefined;
  lastTimestamp: number | null | undefined;
  isLoggedIn?: GetBooleanStatus | undefined;
  isTeacher?: GetBooleanStatus | undefined;
  isStudent?: GetBooleanStatus | undefined;
  getCurrentUser?: GetLoginUser | undefined;
  getUserFromUuid?: GetUserFromUuid | undefined;
  getChildrenList?: GetChildrenList | undefined;
  getSchoolClassList?: GetSchoolClassList | undefined;
  getChildrens?: GetChildrens | undefined;
  PasswordLoginSubmit?: LoginSubmitEvent | null | undefined;
  CodeLoginSubmit?: CodeLoginEvent | null | undefined;
  SSOLoginGoogleClick?: LoginClickEvent | undefined;
  SSOLoginMicrosoftClick?: LoginClickEvent | undefined;
  SSOLoginAppleClick?: LoginClickEvent | undefined;
  processLogout?: Logout;
  updateProfile?: UpdateProfile;
  isLoginBySSO?: BooleanMethod;
  isLoginByPassword?: BooleanMethod;
  isLoginByCode?: BooleanMethod;
};
