import { format, parse, parseISO, addMinutes } from 'date-fns';
export let tzOffset = -new Date().getTimezoneOffset();
export const setTzOffset = (offset: number) => {
  if ((offset >= -24 * 60) && (offset <= 24 * 60)) {
    tzOffset = offset;
  }
}
// ref: https://date-fns.org/docs/parse

// ex: 2021-01-01T00:00:00+00:00
export const parseDateTimeWithTimeZone = (date: string) =>
  parse(date, "yyyy-MM-dd'T'HH:mm:ssxxx", 0);

export const parseDateTime = (date: string) =>
  parse(date, "yyyy-MM-dd'T'HH:mm:ss", 0);

export const parseDate = (date: string) => parse(date, 'yyyy-MM-dd', 0);

export const formatToDate = (date: Date, delimiter = '-') =>
  format(new Date(date), ['yyyy', 'MM', 'dd'].join(delimiter));

export const formatToDateDisplay = (date: Date) => formatToDate(date, '/');

export const formatToDateDisplayShort = (date: Date) =>
  format(new Date(date), 'MM/dd');

export const formatToDateTimeDisplay = (date: Date) =>
  format(new Date(date), 'M月d日HH時mm分');

export const formatToDateTimeDisplayShort = (date: Date) =>
  format(new Date(date), 'MM/dd　HH：mm');

export const formatToDateTimeDisplayLong = (date: Date) =>
  format(new Date(date), 'yyyy/MM/dd　HH：mm');

export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = `${minutes % 60}`.padStart(2, '0');
  return `${hours}：${restMinutes}`;
};

export const recentPastOf = (month: number, day: number) => {
  const today = new Date();
  const yearToday = today.getFullYear();
  const monthToday = today.getMonth();
  const dayToday = today.getDate();
  return new Date(
    monthToday + 1 >= month && dayToday >= day ? yearToday : yearToday - 1,
    month - 1,
    day,
  );
};

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isIsoDateString = (value: any): boolean => {
    return value && typeof value === 'string' && isoDateFormat.test(value);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleDates = (body: any) => {
    if (body === null || body === undefined || typeof body !== 'object')
    return body;

    for (const key of Object.keys(body)) {
        const value = body[key];
        if (isIsoDateString(value)) {
            body[key] = addMinutes(parseISO(value), tzOffset);
            console.log([key, value, body[key], parseISO(value)]);
            // body[key] = parseISO(value); // date-fns conversion
            // body[key] = luxon.DateTime.fromISO(value); // Luxon conversion
            // body[key] = moment(value).toDate(); // Moment.js conversion
        } else if (typeof value === 'object') {
            handleDates(value);
        }
    }
}

