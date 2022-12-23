import { millisecondsToBriefText } from './update';

test('millisecondsToBriefText 함수', () => {
  expect(millisecondsToBriefText(-5 * 1000)).toBe('조금');
  expect(millisecondsToBriefText(0)).toBe('조금');
  expect(millisecondsToBriefText(5 * 1000)).toBe('조금');
  expect(millisecondsToBriefText(60 * 1000 - 1)).toBe('조금');

  expect(millisecondsToBriefText(1 * 60 * 1000)).toBe('1분');
  expect(millisecondsToBriefText(1766123)).toBe('29분');
  expect(millisecondsToBriefText(60 * 60 * 1000 - 1)).toBe('59분');

  expect(millisecondsToBriefText(1 * 60 * 60 * 1000)).toBe('1시간');
  expect(millisecondsToBriefText(75123456)).toBe('20시간');
  expect(millisecondsToBriefText(24 * 60 * 60 * 1000 - 1)).toBe('23시간');

  expect(millisecondsToBriefText(24 * 60 * 60 * 1000)).toBe('1일');
  expect(millisecondsToBriefText(425600000)).toBe('4일');
  expect(millisecondsToBriefText(7 * 24 * 60 * 60 * 1000 - 1)).toBe('6일');

  expect(millisecondsToBriefText(7 * 24 * 60 * 60 * 1000)).toBe('1주');
  expect(millisecondsToBriefText(1809600000)).toBe('2주');
  expect(millisecondsToBriefText(30 * 24 * 60 * 60 * 1000)).toBe('4주');

  expect(millisecondsToBriefText(31 * 24 * 60 * 60 * 1000)).toBe('1개월');
  expect(millisecondsToBriefText(13150080000)).toBe('5개월');
  expect(millisecondsToBriefText(365 * 24 * 60 * 60 * 1000)).toBe('11개월');

  expect(millisecondsToBriefText(365.5 * 24 * 60 * 60 * 1000)).toBe('1년');
  expect(millisecondsToBriefText(157896000000)).toBe('5년');
  expect(millisecondsToBriefText(15789600000000)).toBe('500년');
});
