import EventEmitter from '../../dom-helper/event-emitter';
import CssInput from './css-input';

// const mockedClass = <jest.Mock<EventEmitter>>EventEmitter;

describe('CssInput:', () => {
  const eventEmitterMocked = jest.mocked(new EventEmitter());
  const eventEmitterEmitMock = jest.fn();
  eventEmitterMocked.emit = eventEmitterEmitMock;

  const answer = 'test-answer';
  const cssInputTest = new CssInput(eventEmitterMocked, answer);
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('onEnter ', () => {
    test('should call onCheck when Enter', () => {
      const event = new KeyboardEvent('keyup', { key: 'Enter' });
      cssInputTest.onEnter(event);
      expect(eventEmitterEmitMock.mock.calls).toHaveLength(1);
      expect(eventEmitterEmitMock.mock.calls[0][0]).toEqual('event: check-answer');
    });

    test('should not call onCheck when not Enter', () => {
      const event = new KeyboardEvent('keyup', { key: 'W' });
      cssInputTest.onEnter(event);
      expect(eventEmitterEmitMock).not.toHaveBeenCalled();
    });
  });

  describe('onFocusInput ', () => {
    test('should call html input focus', () => {
      const HTMLInputElement = document.createElement('input');
      const inputFocusMock = jest.fn();
      HTMLInputElement.focus = inputFocusMock;
      cssInputTest.input = HTMLInputElement;
      cssInputTest.onFocusInput();
      expect(inputFocusMock).toHaveBeenCalled();
    });
  });
});
