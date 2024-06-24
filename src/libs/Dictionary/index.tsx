import { APP_ID, DICTIONARY_API_URL } from '../../utils/env';

export * from './Container';

export type EntryDetailRequest = {
  id: number;
  useruuid: string;
  mode: 'esjp';
  referrer_application: number;
  invoker: 'app';
  discard_zoom: 'discard';
};
export type EntryDetailResponse = {
  code: string;
  // 辞書エントリHTML
  arg1: string;
  arg2: { page: number };
  arg3: string;
  arg4: string;
};

export const getEntryDetail = async (id: number, useruuid: string) => {
  const req: EntryDetailRequest = {
    id,
    useruuid,
    mode: 'esjp',
    referrer_application: APP_ID,
    invoker: 'app',
    discard_zoom: 'discard',
  };
  const query = Object.entries(req)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  const res = await fetch(`${DICTIONARY_API_URL}/show_detail/?${query}`);
  return res.json();
};
