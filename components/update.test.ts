import { millisecondsToBriefTime } from './update';

test('millisecondsToBriefText 함수', () => {
  expect(millisecondsToBriefTime(-5 * 1000)).toBe('조금');
  expect(millisecondsToBriefTime(0)).toBe('조금');
  expect(millisecondsToBriefTime(5 * 1000)).toBe('조금');
  expect(millisecondsToBriefTime(60 * 1000 - 1)).toBe('조금');

  expect(millisecondsToBriefTime(1 * 60 * 1000)).toBe('1분');
  expect(millisecondsToBriefTime(1766123)).toBe('29분');
  expect(millisecondsToBriefTime(60 * 60 * 1000 - 1)).toBe('59분');

  expect(millisecondsToBriefTime(1 * 60 * 60 * 1000)).toBe('1시간');
  expect(millisecondsToBriefTime(75123456)).toBe('20시간');
  expect(millisecondsToBriefTime(24 * 60 * 60 * 1000 - 1)).toBe('23시간');

  expect(millisecondsToBriefTime(24 * 60 * 60 * 1000)).toBe('1일');
  expect(millisecondsToBriefTime(425600000)).toBe('4일');
  expect(millisecondsToBriefTime(7 * 24 * 60 * 60 * 1000 - 1)).toBe('6일');

  expect(millisecondsToBriefTime(7 * 24 * 60 * 60 * 1000)).toBe('1주');
  expect(millisecondsToBriefTime(1809600000)).toBe('2주');
  expect(millisecondsToBriefTime(30 * 24 * 60 * 60 * 1000)).toBe('4주');

  expect(millisecondsToBriefTime(31 * 24 * 60 * 60 * 1000)).toBe('1개월');
  expect(millisecondsToBriefTime(13150080000)).toBe('5개월');
  expect(millisecondsToBriefTime(365 * 24 * 60 * 60 * 1000)).toBe('11개월');

  expect(millisecondsToBriefTime(365.5 * 24 * 60 * 60 * 1000)).toBe('1년');
  expect(millisecondsToBriefTime(157896000000)).toBe('5년');
  expect(millisecondsToBriefTime(15789600000000)).toBe('500년');
});
