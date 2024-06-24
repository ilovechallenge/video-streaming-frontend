import Cookies from 'js-cookie';

const _tagProcessor = (values: string[]) => {
  let processed = '';
  for (const value of values) {
    const splitted = value.split('《');
    if (splitted.length === 1) {
      processed += splitted[0];
    } else {
      const kanji = splitted[0];
      const rubyChunk = splitted[1];
      const evened = rubyChunk.replaceAll(' ', '　');
      const rubies = evened.split('　');
      if (kanji.length === rubies.length) {
        const qty = rubies.length;
        for (let index = 0; index < qty; index++) {
          processed += `<ruby>${kanji[index]}<rt class="optional">${rubies[index]}</rtstyle=></ruby>`;
        }
      } else {
        processed += `<ruby>${kanji}<rt class="optional">${rubies.join()}</rt></ruby>`;
      }
    }
  }
  return processed;
};

export const convertRuby = (val: string) => {
  const boxes = [];
  const splitted = val.split('〓');
  for (const element of splitted) {
    const twoStaged = element.split('》');
    for (const element of twoStaged) {
      boxes.push(element);
    }
  }
  return _tagProcessor(boxes);
};

export const get2byteLength = (str: string) => {
  let count = 0;

  for (let i = 0, len = str.length; i < len; i++) {
    let c = str.charCodeAt(i);

    if (!str[i].match(/\r?\n/g)) {
      if (c >= 0x0 && c <= 0x7f) {
        count += 0.5;
      } else {
        count += 1;
      }
    }
  }

  return count;
};

export const getAuthCookies = () => {
  let csrf_access_token = Cookies.get('csrf_access_token');
  let access_token_cookie = Cookies.get('access_token_cookie');

  return {
    csrf_access_token: csrf_access_token,
    access_token_cookie: access_token_cookie,
  };
};

export const getCsrfToken = () => {
  let csrf_token_header = Cookies.get('X-CSRF-TOKEN');
  return csrf_token_header;
};
