import { millisecondsToBriefText } from './update';

test('millisecondsToBriefText 함수', () => {
  expect(millisecondsToBriefText(5000)).toBe('조금');
  expect(millisecondsToBriefText(0)).toBe('조금');
  expect(millisecondsToBriefText(-5000)).toBe('조금');
});
