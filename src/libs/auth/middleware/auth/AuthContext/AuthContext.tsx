import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SKIP_AUTH } from '../../../../../utils/env';
import {
  Children,
  SchoolClass,
  UserCore,
  logoutGet,
  usersChildrenGet,
  usersMeGet,
  usersMeTokenPut,
} from '../../../__generated__';
import apiClient from '../../../helpers/apiClient';
import {
  AuthConfig,
  AuthState,
  CurrentUser,
  SSOClickAction,
  SSOClickActionCaller,
  SSOClickEventHandler,
} from './AuthTypes';
import { PasswordLoginOnSubmit, CodeLoginOnSubmit } from './PasswordLogin';

enum UserType {
  Student = 1,
  Teacher = 2,
}
export const isTeacher = (user_type: number) => user_type === UserType.Teacher;
export const isStudent = (user_type: number) => user_type === UserType.Student;

type Props = { children: ReactNode };
export const authConfig: AuthConfig = {
  referrerApplicationCode: 1,
  loginPageUrl: '/login',
  noAuthPageUrl: ['login'],
};

const initialAuthState: AuthState = {
  uuid: null,
  lastTimestamp: null,
};

type UuidToUser = { [key: string]: UserCore };
export type PlatformMethods = {
  initPlatformMethods: () => void;
  redirectLocal: (path: string) => void;
  getRequestParams: () => URLSearchParams;
  getRequestPathname: () => string;
  hasRequestParams: () => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pathname?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
  SSOLoginAppleOnClick?: SSOClickAction | undefined;
  SSOLoginGoogleOnClick?: SSOClickAction | undefined;
  SSOLoginMicrosoftOnClick?: SSOClickAction | undefined;
};
export type PlatformMethodsLoader = (platformMethods: PlatformMethods) => void;
type AuthProvider = ({ children }: Props) => JSX.Element;
type AuthProviderLoader = (loader: PlatformMethodsLoader) => AuthProvider;

export const AuthContext = createContext<AuthState>(initialAuthState);
export const loadAuthProvider: AuthProviderLoader = (
  loader: PlatformMethodsLoader,
) => {
  const AuthProvider: ({ children }: Props) => JSX.Element = ({
    children,
  }: Props) => {
    const [uuid, setUuid] = useState('');
    const [currentUser, setCurrentUser] = useState<CurrentUser>();
    const [childrenList, setChildrenList] = useState<Children[]>([]);
    const [schoolClassList, setSchoolClassList] = useState<SchoolClass[]>([]);
    const [childrens, setChildrens] = useState<UserCore[]>([]);
    const [uuidToUser, setUuidToUser] = useState<UuidToUser>({});
    const [lastTimestamp, setLastTimestamp] = useState(0);
    const [redirectPath, setRedirectPath] = useState<string | null | undefined>(
      '',
    );
    const [intervalId, setIntervalId] = useState<number>(0);
    const [nextRedirectUrl, setNextRedirectUrl] = useState<string>('');
    const [loginMethod, setLoginMethodState] = useState<string>('');

    /**********************
     * 環境依存メソッド（ナビゲーション関係）
     ***********************/
    const platformMethods: PlatformMethods = {
      initPlatformMethods: () => {},
      redirectLocal: (_path) => {},
      getRequestParams: () => new URLSearchParams({}),
      getRequestPathname: () => '',
      hasRequestParams: () => false,
    };
    loader(platformMethods);
    const redirect = (path: string) => {
      if (path.match(/^http/)) {
        window.location.href = path;
      } else {
        platformMethods.redirectLocal(path);
      }
    };
    platformMethods.initPlatformMethods();

    /**********************
     * 状態による分岐処理
     ***********************/
    useEffect(() => {
      console.log('check');
      if (platformMethods.hasRequestParams()) {
        const query = platformMethods.getRequestParams();
        if (query.get('redirectUrl')) {
          const redirectUrl = query.get('redirectUrl');
          if (redirectUrl) {
            setNextRedirectUrl(redirectUrl);
            query.delete('redirectUrl');
            let newPath = platformMethods.getRequestPathname();
            if (query.size > 0) {
              newPath += '?' + query.toString();
            }
            redirect(newPath);
          }
        }
      }
    }, []);

    useEffect(() => {
      // 未認証ならログイン画面へ
      console.log(SKIP_AUTH);
      if (SKIP_AUTH) return;
      if (!uuid) {
        init();
      } else {
        triggerUpdateToken();
      }
    }, [uuid]);

    /* vue / react共通コード */
    /**********************
     * セッションストレージ処理
     ***********************/
    const storageSessionKey = 'mk-session-key';
    const getCachedSessionKey = () => {
      return sessionStorage.getItem(storageSessionKey);
    };
    const setCachedSessionKey = (_key: string) => {
      console.log(['setKey', _key]);
      sessionStorage.setItem(storageSessionKey, _key);
    };
    const storageLoginMethod = 'mk-login-method';
    const getCachedLoginMethod = () => {
      return sessionStorage.getItem(storageLoginMethod);
    };
    const setCachedLoginMethod = (_loginMethod: string) => {
      console.log(['setLoginMethod', _loginMethod]);
      sessionStorage.setItem(storageLoginMethod, _loginMethod);
    };
    const setLoginMethod = (_loginMethod: string) => {
      setLoginMethodState(_loginMethod);
      setCachedLoginMethod(_loginMethod);
    };

    // 初期化
    const init = () => {
      console.log('init');

      const _loginMethod = getCachedLoginMethod();
      console.log(_loginMethod);
      if (_loginMethod != null) {
        setLoginMethod(_loginMethod);
      }

      const _key = getCachedSessionKey();
      console.log(_key);
      if (_key != null && _key != '') {
        apiClient.setCsrfVerifyToken(_key);
        loadAuthData();
        return true;
      }
      if (authConfig.checkNoAuthMode) {
        if (authConfig.checkNoAuthMode()) {
          return true;
        }
      }
      return notLoggedIn();
    };

    /**********************
     * 内部処理用主要メソッド類
     ***********************/
    const notLoggedIn = () => {
      // パスのチェック
      console.log(platformMethods.getRequestPathname());
      setLoginMethod('');
      if (authConfig.noAuthPageUrl.includes(platformMethods.getRequestPathname())) {
        console.log('pass');
        return true; // そのままページ処理
      }
      let url = authConfig.loginPageUrl!;
      if (url.match(/\.redirectUrl=/)) {
        redirect(url);
        return false;
      }
      if (url.match(/\?/)) {
        url += '&';
      } else {
        url += '?';
      }
      if (authConfig.referrerApplicationCode == 0) {
        url += 'redirectUrl=' + encodeURI(platformMethods.getRequestPathname());
      } else {
        url += 'redirectUrl=' + encodeURI(window.location.pathname); // TODO 要検証
      }
      console.log(url);
      redirect(url);
      return false;
    };

    const authenticated = (_uuid?: string | null) => {
      if (_uuid) {
        setLastTimestamp(new Date().getTime());
        // ログイン後処理
        postLogin();
      } else if (authConfig.checkNoAuthMode && authConfig.checkNoAuthMode()) {
        return;
      } else {
        console.log('login error');
        // 認証状態の更新
        notLoggedIn();
      }
    };

    type SchoolClassesAndUsers = {
      schoolClassList: SchoolClass[];
      childrens: UserCore[];
      uuidToUser: UuidToUser;
    };

    const loadAuthData = async () => {
      // ユーザ情報の取得
      const loginUser = await updateProfile();
      if (!loginUser) {
        notLoggedIn();
        return null;
      }
      setLastTimestamp(new Date().getTime());
      triggerUpdateToken();
      if (!isTeacher(loginUser.user_type)) return loginUser;
      await usersChildrenGet({
        referrer_application: authConfig.referrerApplicationCode,
      }).then((res) => {
        console.log(res);
        if (res.data.children) {
          console.log('setChildren');
          setChildrenList(res.data.children);
          const data = res.data.children.reduce<SchoolClassesAndUsers>(
            (acc: SchoolClassesAndUsers, child: Children) => {
              acc.schoolClassList.push(child.school_class);
              acc.childrens = acc.childrens.concat(child.user);
              child.user.forEach((user) => {
                acc.uuidToUser[user.user_uuid] = user;
              });
              return acc;
            },
            {
              schoolClassList: [],
              childrens: [],
              uuidToUser: {},
            },
          );
          setSchoolClassList(data.schoolClassList);
          setChildrens(data.childrens);
          setUuidToUser(data.uuidToUser);
        }
      });
      return loginUser;
    };
    const getNextPageUrl = (loginUser: CurrentUser) => {
      if (redirectPath) {
        console.log(redirectPath);
        return redirectPath;
      } else {
        if (!redirectPath) {
          if (nextRedirectUrl) {
            const ret = nextRedirectUrl;
            setNextRedirectUrl('');
            return ret;
          }
        }

        if (authConfig.mainPageUrlMethod) {
          const mainPagePath = authConfig.mainPageUrlMethod(loginUser);
          console.log(mainPagePath);
          if (mainPagePath) {
            return mainPagePath;
          }
        }
        if (authConfig.mainPageUrl) {
          const mainPagePath = authConfig.mainPageUrl;
          console.log(mainPagePath);
          if (mainPagePath) {
            return mainPagePath;
          }
        }
      }
      return null;
    }

    const postLogin = async () => {
      console.log(this);
      const loginUser = await loadAuthData();
      if (!loginUser) {
        return notLoggedIn();
      }
      console.log('redirect');
      const nextPageUrl = getNextPageUrl(loginUser);
      if (nextPageUrl) {
        redirect(nextPageUrl); // Vueの場合は対応しない
      }
    };


    /**********************
     * トークンの定期更新処理
     ***********************/
    const triggerUpdateToken = () => {
      console.log(['clear', intervalId]);
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (uuid) {
        // 30秒ごとにトークン更新時間を超過しているかチェック
        const _intervalId = setInterval(updateToken, 30000);
        setIntervalId(Number(_intervalId));
      }
    };
    const updateToken = () => {
      if (uuid) {
        const now = new Date().getTime();
        if ((lastTimestamp > 0) && (lastTimestamp < now - 250000)) {
          // 5分弱ごとチェック
          // 認証状態の更新
          console.log(['updateToken', uuid, currentUser]);
          setLastTimestamp(now);
          usersMeTokenPut({
            referrer_application: authConfig.referrerApplicationCode,
          }).then((res) => {
            const _key = apiClient.csrfVerifyToken;
            setCachedSessionKey(_key!);
            console.log(res);
          });
        }
      }
    };

    /**********************
     * イベントハンドリングメソッド
     ***********************/
    // ユーザ情報の更新
    const updateProfile = async () => {
      const _key = apiClient.csrfVerifyToken;
      setCachedSessionKey(_key!);
      const response = await usersMeGet({
        referrer_application: authConfig.referrerApplicationCode,
      }).catch((e) => {
        console.log(e);
        return null;
      });
      if (!response) {
        return null;
      }
      const loginUser = response.data;
      if (loginUser == null) {
        return null;
      }
      console.log(loginUser);
      setUuid(loginUser.user_uuid);
      setCurrentUser(loginUser);
      console.log(uuid);
      console.log(currentUser);
      return loginUser;
    };

    // ログアウト処理
    const processLogout = () => {
      return logoutGet().then((res) => {
        // 画面遷移はしない
        setUuid('');
        setCachedSessionKey('');
        setCurrentUser(undefined);
        setLastTimestamp(0);
        setSchoolClassList([]);
        setChildrens([]);
        setUuidToUser({});
        setLoginMethod('');
        return res;
      });
    };
    // パスワードログイン処理
    const PasswordLoginSubmit = (
      email: string,
      password: string,
      _redirectPath: string | null | undefined,
    ) => {
      setRedirectPath(_redirectPath);
      return PasswordLoginOnSubmit(email, password)
        .then(({ data }) => {
          setLoginMethod('password');
          authenticated(data.user_uuid);
          return 200;
        })
        .catch((res) => {
          console.log(res);
          if (!res.response) {
            return 500;
          }
          return res.response.status;
          // 400					リクエストパラメータに、不足、形式違いなどの問題がある
          // 401					トークン、ログインID、パスワードのいずれかに間違いがある、アカウントロック状態
          // 403					アクセス権がない
          // 404					存在しないURLにアクセス、データが存在しない
          // 500					不明なエラー
        });
    };
    // パスワードログイン処理
    const CodeLoginSubmit = (
      code: string,
      _redirectPath: string | null | undefined,
    ) => {
      setRedirectPath(_redirectPath);
      return CodeLoginOnSubmit(code)
        .then(({ data }) => {
          setLoginMethod('code');
          authenticated(data.user_uuid);
          return 200;
        })
        .catch((res) => {
          console.log(res);
          if (!res.response) {
            return 500;
          }
          return res.response.status;
          // 400					リクエストパラメータに、不足、形式違いなどの問題がある
          // 401					トークン、ログインID、コードのいずれかに間違いがある、アカウントロック状態
          // 403					アクセス権がない
          // 404					存在しないURLにアクセス、データが存在しない
          // 500					不明なエラー
        });
    };

    // SSO 後処理（APIハンドリングはほぼ共通？）
    const SSOLoginClick: SSOClickActionCaller = (
      method: string,
      action: SSOClickAction | undefined,
    ) => {
      console.log(method);
      if (action !== undefined) {
        return action()
          .then(({ data }) => {
            setLoginMethod(method);
            authenticated(data.user_uuid);
            return 200;
          })
          .catch((res) => {
            console.log(res);
            if (!res.response) {
              return 500;
            }
            return res.response.status as number;
            // 400					リクエストパラメータに、不足、形式違いなどの問題がある
            // 401					トークン、ログインID、パスワードのいずれかに間違いがある、アカウントロック状態
            // 403					アクセス権がない
            // 404					存在しないURLにアクセス、データが存在しない
            // 500					不明なエラー
          });
      }
      return new Promise((res, _rej) => {
        res(500);
      });
    };
    // SSO 関係の拡張
    const SSOLoginGoogleClick: SSOClickEventHandler = () => {
      return SSOLoginClick('google', platformMethods.SSOLoginGoogleOnClick);
    };

    const SSOLoginMicrosoftClick: SSOClickEventHandler = () => {
      return SSOLoginClick(
        'microsoft',
        platformMethods.SSOLoginMicrosoftOnClick,
      );
    };

    const SSOLoginAppleClick: SSOClickEventHandler = () => {
      return SSOLoginClick('apple', platformMethods.SSOLoginAppleOnClick);
    };

    /**********************
     * アクセサーメソッド
     ***********************/
    const getCurrentUser = () => {
        console.log('getCurrentUser');
        console.log(uuid);
      return currentUser;
    };

    const getUserFromUuid = (uuid: string) => {
      if (uuid in uuidToUser) {
        return uuidToUser[uuid];
      }
      return null;
    };

    const isLoggedIn = () => {
      if (currentUser) {
        return true;
      }
      return true;
    };

    const getSchoolClassList = (
      grade: number | null = null,
      class_name: string | null = null,
    ) => {
      if (grade === null && class_name === null) {
        return schoolClassList;
      }
      return schoolClassList.reduce<SchoolClass[]>((acc, school_class) => {
        if (!school_class.grade || !school_class.class_name) return acc;
        if (school_class.grade != grade) return acc;
        if (class_name != null && school_class.class_name != class_name)
          return acc;
        acc.push(school_class);
        return acc;
      }, []);
    };

    const getChildrenList = () => {
      return childrenList;
    };

    const getChildrens = (
      grade: number | null = null,
      class_name: string | null = null,
    ) => {
      if (grade === null) {
        return childrens;
      }
      return childrens.reduce<UserCore[]>((acc, user) => {
        if (!user.grade || !user.class_name) return acc;
        if (user.grade != grade) return acc;
        if (class_name != null && user.class_name != class_name) return acc;
        acc.push(user);
        return acc;
      }, []);
    };

    const isLoginBySSO = () => {
      if (loginMethod == 'google') return true;
      if (loginMethod == 'microsoft') return true;
      if (loginMethod == 'apple') return true;
      return false;
    };

    const isLoginByPassword = () => {
      if (loginMethod == 'password') return true;
      return false;
    };

    const isLoginByCode = () => {
      if (loginMethod == 'qr') return true;
      if (loginMethod == 'code') return true;
      return false;
    };

    const data: AuthState = {
      uuid,
      lastTimestamp,
      isLoggedIn,
      isTeacher: currentUser && (() => isTeacher(currentUser.user_type)),
      isStudent: currentUser && (() => isStudent(currentUser.user_type)),
      getCurrentUser,
      getUserFromUuid,
      getChildrenList,
      getSchoolClassList,
      getChildrens,
      PasswordLoginSubmit,
      CodeLoginSubmit,
      SSOLoginGoogleClick,
      SSOLoginMicrosoftClick,
      SSOLoginAppleClick,
      processLogout,
      updateProfile,
      isLoginBySSO,
      isLoginByPassword,
      isLoginByCode,
    };
    /* vue / react共通コード 終了 */
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
  };
  return AuthProvider;
};

export const useAuthContext = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
