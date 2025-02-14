/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import type { BodyType } from '../helpers/apiClient/instance';
import { apiClientInstance } from '../helpers/apiClient/instance';
import type {
  CsvDictionariesJapaneseLearningHistoriesCsvGetParams,
  CsvDictionariesKanjiLearningHistoriesCsvGetParams,
  CsvKanjiSkillLearningHistoriesCsvGetParams,
  CsvKanjiSkillTestLearningHistoriesCsvGetParams,
  CsvMovieLearningHistoriesCsvGetParams,
  CsvRomajiSkillLearningHistoriesCsvGetParams,
  DictionariesJapaneseLearningHistoriesGetParams,
  DictionariesKanjiLearningHistoriesGetParams,
  EXCELCBTCbtLearningHistoriesExcelGetParams,
  HealthCheckResponse,
  KanjiSkillLearningHistoriesGetParams,
  KanjiSkillTestLearningHistoriesGetParams,
  LibsDomainModelInterfaceAuthCheckOnetimeCodeResponse,
  LibsDomainModelInterfaceAuthIssueAccountRequest,
  LibsDomainModelInterfaceAuthIssueAccountResponse,
  LibsDomainModelInterfaceAuthLoginRequest,
  LibsDomainModelInterfaceAuthLoginResponse,
  LibsDomainModelInterfaceAuthLogoutResponse,
  LibsDomainModelInterfaceAuthSSOLoginWithAppleRequest,
  LibsDomainModelInterfaceAuthSSOLoginWithAppleResponse,
  LibsDomainModelInterfaceAuthSSOLoginWithGoogleRequest,
  LibsDomainModelInterfaceAuthSSOLoginWithGoogleResponse,
  LibsDomainModelInterfaceAuthSSOLoginWithMicrosoftRequest,
  LibsDomainModelInterfaceAuthSSOLoginWithMicrosoftResponse,
  LibsDomainModelInterfaceAuthUpdateAccountRequest,
  LibsDomainModelInterfaceAuthUpdateAccountResponse,
  LibsDomainModelInterfaceCbtGetCBTCategoriesResponse,
  LibsDomainModelInterfaceContentsGetPaperContentsResponse,
  LibsDomainModelInterfaceDictionaryGetJapaneseDictionaryLearningHistoriesResponse,
  LibsDomainModelInterfaceDictionaryGetKanjiDictionaryLearningHistoriesResponse,
  LibsDomainModelInterfaceKanjiGetKanjiSkillLearningHistoriesResponse,
  LibsDomainModelInterfaceKanjiGetKanjiSkillTestLearningHistoriesResponse,
  LibsDomainModelInterfaceKanjiRegisterNewWrittenKanjiRequest,
  LibsDomainModelInterfaceKanjiRegisterNewWrittenKanjiResponse,
  LibsDomainModelInterfaceMailIssueMailSendCodeResponse,
  LibsDomainModelInterfaceMailSendMailRequest,
  LibsDomainModelInterfaceMailSendMailResponse,
  LibsDomainModelInterfaceMailSendResetPasswordURLRequest,
  LibsDomainModelInterfaceMailSendResetPasswordURLResponse,
  LibsDomainModelInterfaceNoticeGetNoticeResponse,
  LibsDomainModelInterfaceRomajiGetRomajiSkillLearningHistoriesResponse,
  LibsDomainModelInterfaceSchoolGetMunicipalitiesResponse,
  LibsDomainModelInterfaceSchoolGetSchoolClassResponse,
  LibsDomainModelInterfaceSchoolGetSchoolNameListResponse,
  LibsDomainModelInterfaceToppageGetToppageForChildrenResponse,
  LibsDomainModelInterfaceToppageGetToppageForTeachersResponse,
  LibsDomainModelInterfaceUserGetChildrenListResponse,
  LibsDomainModelInterfaceUserGetLastLoginDateResponse,
  LibsDomainModelInterfaceUserGetMyInfoResponse,
  LibsDomainModelInterfaceUserResetPasswordRequest,
  LibsDomainModelInterfaceUserResetPasswordResponse,
  LibsDomainModelInterfaceUserUpdatePasswordRequest,
  LibsDomainModelInterfaceUserUpdatePasswordResponse,
  LibsDomainModelInterfaceUserUpdateProfileRequest,
  LibsDomainModelInterfaceUserUpdateProfileResponse,
  LibsDomainModelInterfaceUserUpdateThemeColorRequest,
  LibsDomainModelInterfaceUserUpdateThemeColorResponse,
  LibsDomainModelInterfaceUserUpdateTokenRequest,
  LibsDomainModelInterfaceUserUpdateTokenResponse,
  LibsDomainModelInterfaceWordGetWordsLookedUpRandomResponse,
  LibsDomainModelInterfaceWordGetWordsLookedUpRankingResponse,
  MunicipalitiesGetParams,
  MunicipalitiesSchoolsGetParams,
  RomajiSkillLearningHistoriesGetParams,
  SchoolClassesGetParams,
  UsersChildrenGetParams,
  UsersMeGetParams,
  WordsLookedUpRankingGetParams,
} from './DashboardAPI.schemas';

/**
 * @summary ヘルスチェック
 */
export const get = () => {
  return apiClientInstance<HealthCheckResponse>({ url: `/`, method: 'get' });
};

/**
 * @summary ログイン
 */
export const loginPost = (
  libsDomainModelInterfaceAuthLoginRequest: BodyType<LibsDomainModelInterfaceAuthLoginRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceAuthLoginResponse>({
    url: `/login`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: libsDomainModelInterfaceAuthLoginRequest,
  });
};

/**
 * @summary Ssoログイン（Google）
 */
export const sSOGoogleLoginSsoGooglePost = (
  libsDomainModelInterfaceAuthSSOLoginWithGoogleRequest: BodyType<LibsDomainModelInterfaceAuthSSOLoginWithGoogleRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceAuthSSOLoginWithGoogleResponse>(
    {
      url: `/login/sso/google`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: libsDomainModelInterfaceAuthSSOLoginWithGoogleRequest,
    },
  );
};

/**
 * @summary Ssoログイン（Apple）
 */
export const sSOAppleLoginSsoApplePost = (
  libsDomainModelInterfaceAuthSSOLoginWithAppleRequest: BodyType<LibsDomainModelInterfaceAuthSSOLoginWithAppleRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceAuthSSOLoginWithAppleResponse>(
    {
      url: `/login/sso/apple`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: libsDomainModelInterfaceAuthSSOLoginWithAppleRequest,
    },
  );
};

/**
 * @summary Ssoログイン（Microsoft）
 */
export const sSOMicrosoftLoginSsoMicrosoftPost = (
  libsDomainModelInterfaceAuthSSOLoginWithMicrosoftRequest: BodyType<LibsDomainModelInterfaceAuthSSOLoginWithMicrosoftRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceAuthSSOLoginWithMicrosoftResponse>(
    {
      url: `/login/sso/microsoft`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: libsDomainModelInterfaceAuthSSOLoginWithMicrosoftRequest,
    },
  );
};

/**
 * @summary ログアウト
 */
export const logoutGet = () => {
  return apiClientInstance<LibsDomainModelInterfaceAuthLogoutResponse>({
    url: `/logout`,
    method: 'get',
  });
};

/**
 * @summary 解除コード使用ユーザ解除コード有効期限更新
 */
export const releaseCodeAccountPut = (
  libsDomainModelInterfaceAuthUpdateAccountRequest: BodyType<LibsDomainModelInterfaceAuthUpdateAccountRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceAuthUpdateAccountResponse>({
    url: `/release-code/account`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: libsDomainModelInterfaceAuthUpdateAccountRequest,
  });
};

/**
 * @summary 解除コード使用ユーザアカウント発行
 */
export const releaseCodeAccountPost = (
  libsDomainModelInterfaceAuthIssueAccountRequest: BodyType<LibsDomainModelInterfaceAuthIssueAccountRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceAuthIssueAccountResponse>({
    url: `/release-code/account`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: libsDomainModelInterfaceAuthIssueAccountRequest,
  });
};

/**
 * @summary ワンタイムコードチェック
 */
export const onetimeCodeOnetimeCodeGet = (onetimeCode: string) => {
  return apiClientInstance<LibsDomainModelInterfaceAuthCheckOnetimeCodeResponse>(
    { url: `/onetime-code/${onetimeCode}`, method: 'get' },
  );
};

/**
 * @summary 児童リスト取得
 */
export const usersChildrenGet = (params: UsersChildrenGetParams) => {
  return apiClientInstance<LibsDomainModelInterfaceUserGetChildrenListResponse>(
    { url: `/users/children`, method: 'get', params },
  );
};

/**
 * @summary ユーザー情報取得
 */
export const usersMeGet = (params: UsersMeGetParams) => {
  return apiClientInstance<LibsDomainModelInterfaceUserGetMyInfoResponse>({
    url: `/users/me`,
    method: 'get',
    params,
  });
};

/**
 * @summary セッション更新
 */
export const usersMeTokenPut = (
  libsDomainModelInterfaceUserUpdateTokenRequest: BodyType<LibsDomainModelInterfaceUserUpdateTokenRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceUserUpdateTokenResponse>({
    url: `/users/me/token`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: libsDomainModelInterfaceUserUpdateTokenRequest,
  });
};

/**
 * @summary プロフィール変更
 */
export const usersMeProfilePut = (
  libsDomainModelInterfaceUserUpdateProfileRequest: BodyType<LibsDomainModelInterfaceUserUpdateProfileRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceUserUpdateProfileResponse>({
    url: `/users/me/profile`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: libsDomainModelInterfaceUserUpdateProfileRequest,
  });
};

/**
 * @summary 表示設定変更
 */
export const usersMeThemeColorPut = (
  libsDomainModelInterfaceUserUpdateThemeColorRequest: BodyType<LibsDomainModelInterfaceUserUpdateThemeColorRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceUserUpdateThemeColorResponse>(
    {
      url: `/users/me/theme-color`,
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      data: libsDomainModelInterfaceUserUpdateThemeColorRequest,
    },
  );
};

/**
 * @summary パスワード変更
 */
export const usersMePasswordPost = (
  libsDomainModelInterfaceUserUpdatePasswordRequest: BodyType<LibsDomainModelInterfaceUserUpdatePasswordRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceUserUpdatePasswordResponse>({
    url: `/users/me/password`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: libsDomainModelInterfaceUserUpdatePasswordRequest,
  });
};

/**
 * @summary パスワード再設定
 */
export const usersMePasswordResetPost = (
  libsDomainModelInterfaceUserResetPasswordRequest: BodyType<LibsDomainModelInterfaceUserResetPasswordRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceUserResetPasswordResponse>({
    url: `/users/me/password/reset`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: libsDomainModelInterfaceUserResetPasswordRequest,
  });
};

/**
 * @summary 最終ログイン日時取得
 */
export const usersUserUuidLastLoginDateGet = (userUuid: string) => {
  return apiClientInstance<LibsDomainModelInterfaceUserGetLastLoginDateResponse>(
    { url: `/users/${userUuid}/last-login-date`, method: 'get' },
  );
};

/**
 * @summary クラス情報取得
 */
export const schoolClassesGet = (params: SchoolClassesGetParams) => {
  return apiClientInstance<LibsDomainModelInterfaceSchoolGetSchoolClassResponse>(
    { url: `/school/classes`, method: 'get', params },
  );
};

/**
 * @summary 学校市区町村取得
 */
export const municipalitiesGet = (params: MunicipalitiesGetParams) => {
  return apiClientInstance<LibsDomainModelInterfaceSchoolGetMunicipalitiesResponse>(
    { url: `/municipalities`, method: 'get', params },
  );
};

/**
 * @summary 学校名取得
 */
export const municipalitiesSchoolsGet = (
  params?: MunicipalitiesSchoolsGetParams,
) => {
  return apiClientInstance<LibsDomainModelInterfaceSchoolGetSchoolNameListResponse>(
    { url: `/municipalities/schools`, method: 'get', params },
  );
};

/**
 * @summary お知らせ情報取得
 */
export const noticesGet = () => {
  return apiClientInstance<LibsDomainModelInterfaceNoticeGetNoticeResponse>({
    url: `/notices`,
    method: 'get',
  });
};

/**
 * @summary メール送信
 */
export const mailSendPost = (
  libsDomainModelInterfaceMailSendMailRequest: BodyType<LibsDomainModelInterfaceMailSendMailRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceMailSendMailResponse>({
    url: `/mail/send`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: libsDomainModelInterfaceMailSendMailRequest,
  });
};

/**
 * @summary メール送信コード発行
 */
export const mailMailSendCodeGet = () => {
  return apiClientInstance<LibsDomainModelInterfaceMailIssueMailSendCodeResponse>(
    { url: `/mail/mail-send-code`, method: 'get' },
  );
};

/**
 * @summary パスワード再設定用Url送信
 */
export const uRLMailResetPasswordUrlSendPost = (
  libsDomainModelInterfaceMailSendResetPasswordURLRequest: BodyType<LibsDomainModelInterfaceMailSendResetPasswordURLRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceMailSendResetPasswordURLResponse>(
    {
      url: `/mail/reset-password-url/send`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: libsDomainModelInterfaceMailSendResetPasswordURLRequest,
    },
  );
};

/**
 * @summary 児童用総合トップ表示用データ取得
 */
export const toppageChildrenGet = () => {
  return apiClientInstance<LibsDomainModelInterfaceToppageGetToppageForChildrenResponse>(
    { url: `/toppage/children`, method: 'get' },
  );
};

/**
 * @summary 教師用総合トップ表示用データ取得
 */
export const toppageTeachersGet = () => {
  return apiClientInstance<LibsDomainModelInterfaceToppageGetToppageForTeachersResponse>(
    { url: `/toppage/teachers`, method: 'get' },
  );
};

/**
 * @summary 児童・教師用学習履歴データ取得（ローマ字スキル）
 */
export const romajiSkillLearningHistoriesGet = (
  params: RomajiSkillLearningHistoriesGetParams,
) => {
  return apiClientInstance<LibsDomainModelInterfaceRomajiGetRomajiSkillLearningHistoriesResponse>(
    { url: `/romaji-skill/learning-histories`, method: 'get', params },
  );
};

/**
 * @summary 学習履歴Csvファイル取得（ローマ字スキル）
 */
export const csvRomajiSkillLearningHistoriesCsvGet = (
  params: CsvRomajiSkillLearningHistoriesCsvGetParams,
) => {
  return apiClientInstance<null>({
    url: `/romaji-skill/learning-histories/csv`,
    method: 'get',
    params,
  });
};

/**
 * @summary 児童・教師用学習履歴データ取得（漢字スキル）
 */
export const kanjiSkillLearningHistoriesGet = (
  params: KanjiSkillLearningHistoriesGetParams,
) => {
  return apiClientInstance<LibsDomainModelInterfaceKanjiGetKanjiSkillLearningHistoriesResponse>(
    { url: `/kanji-skill/learning-histories`, method: 'get', params },
  );
};

/**
 * @summary 児童・教師用学習履歴データ取得（漢字スキルテスト・プレテスト）
 */
export const kanjiSkillTestLearningHistoriesGet = (
  params: KanjiSkillTestLearningHistoriesGetParams,
) => {
  return apiClientInstance<LibsDomainModelInterfaceKanjiGetKanjiSkillTestLearningHistoriesResponse>(
    { url: `/kanji-skill/test/learning-histories`, method: 'get', params },
  );
};

/**
 * @summary 学習履歴Csvファイル取得（漢字スキル）
 */
export const csvKanjiSkillLearningHistoriesCsvGet = (
  params: CsvKanjiSkillLearningHistoriesCsvGetParams,
) => {
  return apiClientInstance<null>({
    url: `/kanji-skill/learning-histories/csv`,
    method: 'get',
    params,
  });
};

/**
 * @summary 学習履歴Csvファイル取得（漢字スキル プレテスト・テスト）
 */
export const csvKanjiSkillTestLearningHistoriesCsvGet = (
  params?: CsvKanjiSkillTestLearningHistoriesCsvGetParams,
) => {
  return apiClientInstance<null>({
    url: `/kanji-skill/test/learning-histories/csv`,
    method: 'get',
    params,
  });
};

/**
 * @summary 新規に書いた漢字登録
 */
export const kanjiSkillWrittenNewPost = (
  libsDomainModelInterfaceKanjiRegisterNewWrittenKanjiRequest: BodyType<LibsDomainModelInterfaceKanjiRegisterNewWrittenKanjiRequest>,
) => {
  return apiClientInstance<LibsDomainModelInterfaceKanjiRegisterNewWrittenKanjiResponse>(
    {
      url: `/kanji-skill/written/new`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: libsDomainModelInterfaceKanjiRegisterNewWrittenKanjiRequest,
    },
  );
};

/**
 * @summary 児童・教師用学習履歴データ取得（国語辞典）
 */
export const dictionariesJapaneseLearningHistoriesGet = (
  params: DictionariesJapaneseLearningHistoriesGetParams,
) => {
  return apiClientInstance<LibsDomainModelInterfaceDictionaryGetJapaneseDictionaryLearningHistoriesResponse>(
    { url: `/dictionaries/japanese/learning-histories`, method: 'get', params },
  );
};

/**
 * @summary 学習履歴Csvファイル取得（国語辞典）
 */
export const csvDictionariesJapaneseLearningHistoriesCsvGet = (
  params?: CsvDictionariesJapaneseLearningHistoriesCsvGetParams,
) => {
  return apiClientInstance<null>({
    url: `/dictionaries/japanese/learning-histories/csv`,
    method: 'get',
    params,
  });
};

/**
 * @summary 児童・教師用学習履歴データ取得（漢字辞典）
 */
export const dictionariesKanjiLearningHistoriesGet = (
  params?: DictionariesKanjiLearningHistoriesGetParams,
) => {
  return apiClientInstance<LibsDomainModelInterfaceDictionaryGetKanjiDictionaryLearningHistoriesResponse>(
    { url: `/dictionaries/kanji/learning-histories`, method: 'get', params },
  );
};

/**
 * @summary 学習履歴Csvファイル取得（漢字辞典）
 */
export const csvDictionariesKanjiLearningHistoriesCsvGet = (
  params?: CsvDictionariesKanjiLearningHistoriesCsvGetParams,
) => {
  return apiClientInstance<null>({
    url: `/dictionaries/kanji/learning-histories/csv`,
    method: 'get',
    params,
  });
};

/**
 * @summary みんなの調べた言葉取得（ランキング）
 */
export const wordsLookedUpRankingGet = (
  params: WordsLookedUpRankingGetParams,
) => {
  return apiClientInstance<LibsDomainModelInterfaceWordGetWordsLookedUpRankingResponse>(
    { url: `/words-looked-up/ranking`, method: 'get', params },
  );
};

/**
 * @summary みんなの調べた言葉取得（ランダム）
 */
export const wordsLookedUpRandomGet = () => {
  return apiClientInstance<LibsDomainModelInterfaceWordGetWordsLookedUpRandomResponse>(
    { url: `/words-looked-up/random`, method: 'get' },
  );
};

/**
 * @summary 学習履歴Csvファイル取得（映像資料）
 */
export const csvMovieLearningHistoriesCsvGet = (
  params: CsvMovieLearningHistoriesCsvGetParams,
) => {
  return apiClientInstance<null>({
    url: `/movie/learning-histories/csv`,
    method: 'get',
    params,
  });
};

/**
 * @summary 学習履歴Excelファイル取得（形成評価Cbt）
 */
export const eXCELCBTCbtLearningHistoriesExcelGet = (
  params?: EXCELCBTCbtLearningHistoriesExcelGetParams,
) => {
  return apiClientInstance<null>({
    url: `/cbt/learning-histories/excel`,
    method: 'get',
    params,
  });
};

/**
 * @summary Cbt種別リスト取得
 */
export const cBTCbtCategoriesGet = () => {
  return apiClientInstance<LibsDomainModelInterfaceCbtGetCBTCategoriesResponse>(
    { url: `/cbt/categories`, method: 'get' },
  );
};

/**
 * @summary Cbt種別リスト更新
 */
export const cBTCbtCategoriesPut = () => {
  return apiClientInstance<null>({ url: `/cbt/categories`, method: 'put' });
};

/**
 * @summary 紙付録コンテンツ情報取得
 */
export const contentsPaperGet = () => {
  return apiClientInstance<LibsDomainModelInterfaceContentsGetPaperContentsResponse>(
    { url: `/contents/paper`, method: 'get' },
  );
};

export type GetResult = NonNullable<Awaited<ReturnType<typeof get>>>;
export type LoginPostResult = NonNullable<
  Awaited<ReturnType<typeof loginPost>>
>;
export type SSOGoogleLoginSsoGooglePostResult = NonNullable<
  Awaited<ReturnType<typeof sSOGoogleLoginSsoGooglePost>>
>;
export type SSOAppleLoginSsoApplePostResult = NonNullable<
  Awaited<ReturnType<typeof sSOAppleLoginSsoApplePost>>
>;
export type SSOMicrosoftLoginSsoMicrosoftPostResult = NonNullable<
  Awaited<ReturnType<typeof sSOMicrosoftLoginSsoMicrosoftPost>>
>;
export type LogoutGetResult = NonNullable<
  Awaited<ReturnType<typeof logoutGet>>
>;
export type ReleaseCodeAccountPutResult = NonNullable<
  Awaited<ReturnType<typeof releaseCodeAccountPut>>
>;
export type ReleaseCodeAccountPostResult = NonNullable<
  Awaited<ReturnType<typeof releaseCodeAccountPost>>
>;
export type OnetimeCodeOnetimeCodeGetResult = NonNullable<
  Awaited<ReturnType<typeof onetimeCodeOnetimeCodeGet>>
>;
export type UsersChildrenGetResult = NonNullable<
  Awaited<ReturnType<typeof usersChildrenGet>>
>;
export type UsersMeGetResult = NonNullable<
  Awaited<ReturnType<typeof usersMeGet>>
>;
export type UsersMeTokenPutResult = NonNullable<
  Awaited<ReturnType<typeof usersMeTokenPut>>
>;
export type UsersMeProfilePutResult = NonNullable<
  Awaited<ReturnType<typeof usersMeProfilePut>>
>;
export type UsersMeThemeColorPutResult = NonNullable<
  Awaited<ReturnType<typeof usersMeThemeColorPut>>
>;
export type UsersMePasswordPostResult = NonNullable<
  Awaited<ReturnType<typeof usersMePasswordPost>>
>;
export type UsersMePasswordResetPostResult = NonNullable<
  Awaited<ReturnType<typeof usersMePasswordResetPost>>
>;
export type UsersUserUuidLastLoginDateGetResult = NonNullable<
  Awaited<ReturnType<typeof usersUserUuidLastLoginDateGet>>
>;
export type SchoolClassesGetResult = NonNullable<
  Awaited<ReturnType<typeof schoolClassesGet>>
>;
export type MunicipalitiesGetResult = NonNullable<
  Awaited<ReturnType<typeof municipalitiesGet>>
>;
export type MunicipalitiesSchoolsGetResult = NonNullable<
  Awaited<ReturnType<typeof municipalitiesSchoolsGet>>
>;
export type NoticesGetResult = NonNullable<
  Awaited<ReturnType<typeof noticesGet>>
>;
export type MailSendPostResult = NonNullable<
  Awaited<ReturnType<typeof mailSendPost>>
>;
export type MailMailSendCodeGetResult = NonNullable<
  Awaited<ReturnType<typeof mailMailSendCodeGet>>
>;
export type URLMailResetPasswordUrlSendPostResult = NonNullable<
  Awaited<ReturnType<typeof uRLMailResetPasswordUrlSendPost>>
>;
export type ToppageChildrenGetResult = NonNullable<
  Awaited<ReturnType<typeof toppageChildrenGet>>
>;
export type ToppageTeachersGetResult = NonNullable<
  Awaited<ReturnType<typeof toppageTeachersGet>>
>;
export type RomajiSkillLearningHistoriesGetResult = NonNullable<
  Awaited<ReturnType<typeof romajiSkillLearningHistoriesGet>>
>;
export type CsvRomajiSkillLearningHistoriesCsvGetResult = NonNullable<
  Awaited<ReturnType<typeof csvRomajiSkillLearningHistoriesCsvGet>>
>;
export type KanjiSkillLearningHistoriesGetResult = NonNullable<
  Awaited<ReturnType<typeof kanjiSkillLearningHistoriesGet>>
>;
export type KanjiSkillTestLearningHistoriesGetResult = NonNullable<
  Awaited<ReturnType<typeof kanjiSkillTestLearningHistoriesGet>>
>;
export type CsvKanjiSkillLearningHistoriesCsvGetResult = NonNullable<
  Awaited<ReturnType<typeof csvKanjiSkillLearningHistoriesCsvGet>>
>;
export type CsvKanjiSkillTestLearningHistoriesCsvGetResult = NonNullable<
  Awaited<ReturnType<typeof csvKanjiSkillTestLearningHistoriesCsvGet>>
>;
export type KanjiSkillWrittenNewPostResult = NonNullable<
  Awaited<ReturnType<typeof kanjiSkillWrittenNewPost>>
>;
export type DictionariesJapaneseLearningHistoriesGetResult = NonNullable<
  Awaited<ReturnType<typeof dictionariesJapaneseLearningHistoriesGet>>
>;
export type CsvDictionariesJapaneseLearningHistoriesCsvGetResult = NonNullable<
  Awaited<ReturnType<typeof csvDictionariesJapaneseLearningHistoriesCsvGet>>
>;
export type DictionariesKanjiLearningHistoriesGetResult = NonNullable<
  Awaited<ReturnType<typeof dictionariesKanjiLearningHistoriesGet>>
>;
export type CsvDictionariesKanjiLearningHistoriesCsvGetResult = NonNullable<
  Awaited<ReturnType<typeof csvDictionariesKanjiLearningHistoriesCsvGet>>
>;
export type WordsLookedUpRankingGetResult = NonNullable<
  Awaited<ReturnType<typeof wordsLookedUpRankingGet>>
>;
export type WordsLookedUpRandomGetResult = NonNullable<
  Awaited<ReturnType<typeof wordsLookedUpRandomGet>>
>;
export type CsvMovieLearningHistoriesCsvGetResult = NonNullable<
  Awaited<ReturnType<typeof csvMovieLearningHistoriesCsvGet>>
>;
export type EXCELCBTCbtLearningHistoriesExcelGetResult = NonNullable<
  Awaited<ReturnType<typeof eXCELCBTCbtLearningHistoriesExcelGet>>
>;
export type CBTCbtCategoriesGetResult = NonNullable<
  Awaited<ReturnType<typeof cBTCbtCategoriesGet>>
>;
export type CBTCbtCategoriesPutResult = NonNullable<
  Awaited<ReturnType<typeof cBTCbtCategoriesPut>>
>;
export type ContentsPaperGetResult = NonNullable<
  Awaited<ReturnType<typeof contentsPaperGet>>
>;
