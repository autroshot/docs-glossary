import { millisecondsToBriefReadableTime } from './update';

test('millisecondsToBriefText 함수', () => {
  expect(millisecondsToBriefReadableTime(-5 * 1000)).toBe('조금');
  expect(millisecondsToBriefReadableTime(0)).toBe('조금');
  expect(millisecondsToBriefReadableTime(5 * 1000)).toBe('조금');
  expect(millisecondsToBriefReadableTime(60 * 1000 - 1)).toBe('조금');

  expect(millisecondsToBriefReadableTime(1 * 60 * 1000)).toBe('1분');
  expect(millisecondsToBriefReadableTime(1766123)).toBe('29분');
  expect(millisecondsToBriefReadableTime(60 * 60 * 1000 - 1)).toBe('59분');

  expect(millisecondsToBriefReadableTime(1 * 60 * 60 * 1000)).toBe('1시간');
  expect(millisecondsToBriefReadableTime(75123456)).toBe('20시간');
  expect(millisecondsToBriefReadableTime(24 * 60 * 60 * 1000 - 1)).toBe(
    '23시간'
  );

  expect(millisecondsToBriefReadableTime(24 * 60 * 60 * 1000)).toBe('1일');
  expect(millisecondsToBriefReadableTime(425600000)).toBe('4일');
  expect(millisecondsToBriefReadableTime(7 * 24 * 60 * 60 * 1000 - 1)).toBe(
    '6일'
  );

  expect(millisecondsToBriefReadableTime(7 * 24 * 60 * 60 * 1000)).toBe('1주');
  expect(millisecondsToBriefReadableTime(1809600000)).toBe('2주');
  expect(millisecondsToBriefReadableTime(30 * 24 * 60 * 60 * 1000)).toBe('4주');

  expect(millisecondsToBriefReadableTime(31 * 24 * 60 * 60 * 1000)).toBe(
    '1개월'
  );
  expect(millisecondsToBriefReadableTime(13150080000)).toBe('5개월');
  expect(millisecondsToBriefReadableTime(365 * 24 * 60 * 60 * 1000)).toBe(
    '11개월'
  );

  expect(millisecondsToBriefReadableTime(365.5 * 24 * 60 * 60 * 1000)).toBe(
    '1년'
  );
  expect(millisecondsToBriefReadableTime(157896000000)).toBe('5년');
  expect(millisecondsToBriefReadableTime(15789600000000)).toBe('500년');
});
