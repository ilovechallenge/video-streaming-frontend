export const APP_ID = 1;

export const LEARNING_HISTORY_API_URL = process.env.REACT_APP_API_BASE_URL;
export const LEARNING_HISTORY_API_KEY =
  process.env.REACT_APP_LEARNING_HISTORY_API_KEY;
export const CHARACTER_RECOGNITION_API_URL =
  process.env.REACT_APP_CHARACTER_RECOGNITION_API_URL || '';
export const DICTIONARY_API_URL =
  process.env.REACT_APP_DICTIONARY_API_URL || '';

export const SKIP_AUTH = process.env.REACT_APP_SKIP_AUTH === 'true';
export const SKIP_HISTORY = process.env.REACT_APP_SKIP_HISTORY === 'true';
export const PUBLIC_URL = process.env.PUBLIC_URL || '';
