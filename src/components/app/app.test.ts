// import { describe, expect, test } from '@jest/globals';
import App from './app';

describe('App:', () => {
  const appTest = new App();
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be start defined', () => {
    expect(appTest.start).toBeDefined();
  });

  test('should be initLocalStorage with empty data', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    getItemSpy.mockReturnValue(null).mockReturnValue(null);
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    appTest.initLocalStorage();
    expect(getItemSpy.mock.calls).toHaveLength(2);
    expect(getItemSpy.mock.calls[0][0]).toEqual('currentLevelNumber');
    expect(getItemSpy.mock.calls[1][0]).toEqual('checkedLevelsArray');
    expect(setItemSpy.mock.calls).toHaveLength(2);
  });

  test('should be initLocalStorage with currentLevelNumber', () => {
    const returned = '1';
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    getItemSpy.mockReturnValueOnce(returned).mockReturnValue(null);
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    appTest.initLocalStorage();
    expect(setItemSpy.mock.calls).toHaveLength(1);
  });
});
