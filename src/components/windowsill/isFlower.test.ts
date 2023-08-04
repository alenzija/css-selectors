import isFlower from './isFlower';

describe('function isFlower:', () => {
  test('should return true', () => {
    const flower = {
      name: 'floral',
      url: './floral',
      class: null,
    };
    const res = isFlower(flower);
    expect(res).toBeTruthy();
  });

  test('should return false', () => {
    const notFlower = {
      name: 'name',
      id: null,
      flowers: [],
    };
    const res = isFlower(notFlower);
    expect(res).toBeFalsy();
  });
});
