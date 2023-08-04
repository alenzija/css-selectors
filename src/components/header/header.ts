import createElement from '../../dom-helper/create-element';
import EventEmitter from '../../dom-helper/event-emitter';

import './header.scss';

export default class Header {
  private header: HTMLElement;

  private logo: HTMLImageElement;

  private title: HTMLElement;

  private helpButton: HTMLButtonElement;

  constructor(public eventEmitter: EventEmitter) {
    this.header = createElement('div', 'header');
    this.logo = createElement('img', 'header__logo');
    this.title = createElement('div', 'header__title');
    this.helpButton = createElement('button', 'header__help-button');
    this.init();
  }

  private initLogo(): void {
    this.logo.src = './flower.png';
    this.logo.alt = 'logo image';
  }

  private initButton(): void {
    this.helpButton.textContent = 'Help';
    this.helpButton.addEventListener('click', () => {
      this.helpButton.disabled = true;
      this.eventEmitter.emit('event: help', undefined);
    });
    this.eventEmitter.subscribe('event: onDisabled', () => {
      this.helpButton.disabled = false;
    });
    this.eventEmitter.subscribe('event: last-level', () => {
      this.helpButton.disabled = true;
    });
    this.eventEmitter.subscribe('event: change-level', () => {
      this.helpButton.disabled = false;
    });
  }

  private init(): void {
    this.initLogo();
    this.initButton();
    this.title.textContent = 'CSS Selectors';
    const wrapper = createElement('div', 'header__wrapper');
    wrapper.append(this.logo, this.title);
    this.header.append(wrapper, this.helpButton);
  }

  public getElement(): HTMLElement {
    return this.header;
  }
}
