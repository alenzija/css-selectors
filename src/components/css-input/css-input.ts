import createElement from '../../dom-helper/create-element';
import EventEmitter from '../../dom-helper/event-emitter';

import './css-input.scss';

export default class CssInput {
  private element: HTMLElement;

  public input: HTMLInputElement;

  private button: HTMLButtonElement;

  constructor(public eventEmitter: EventEmitter, private answer: string) {
    this.eventEmitter = eventEmitter;
    this.answer = answer;
    this.input = createElement('input', 'css-input__input');
    this.input.addEventListener('blur', () => this.onFocusInput());
    this.button = createElement('button', 'css-input__button');
    this.element = createElement('div', 'css-input');
    this.init();
    document.onkeyup = this.onEnter;
  }

  public onEnter = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') this.onCheck();
  };

  private onCheck = (): void => {
    this.eventEmitter.emit('event: check-answer', this.input.value);
  };

  public onFocusInput(): void {
    this.input.focus();
  }

  public initButton(): void {
    this.button.textContent = 'Enter';
    this.button.addEventListener('click', this.onCheck);
  }

  public createTimer = (arr: string[], index: number): NodeJS.Timer => {
    let i = index;
    const timerId = setInterval(() => {
      this.input.value += arr[i];
      if (i === arr.length - 1) {
        clearInterval(timerId);
        this.eventEmitter.emit('event: onDisabled', undefined);
        this.eventEmitter.emit('event: help-end', undefined);
        this.input.disabled = false;
      } else i += 1;
    }, 500);
    return timerId;
  };

  private init(): void {
    this.initButton();
    const comment1 = createElement('div', 'css-input__comment');
    comment1.innerHTML = '{<br>/* Styles would go here. */<br>}';
    const comment2 = createElement('div', 'css-input__comment');
    comment2.innerHTML = '/*<br>Type a number to skip to a level.<br> Ex → "5" for level 5 <br>*/';
    const wrapper = createElement('div', 'css-input__wrapper');
    wrapper.append(this.input, this.button);
    this.element.append(wrapper, comment1, comment2);
    this.eventEmitter.subscribe('event: help', () => {
      this.input.value = '';
      this.input.disabled = true;
      this.createTimer(this.answer.split(''), 0);
    });
    this.eventEmitter.subscribe('event: last-level', () => {
      this.input.value = '';
    });
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
