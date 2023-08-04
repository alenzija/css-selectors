import { Level } from '../../types';
import createElement from '../../dom-helper/create-element';
import EventEmitter from '../../dom-helper/event-emitter';
import LevelsList from '../levels-list/levels-list';

import './nav.scss';

export default class Nav {
  private count: number;

  private types: string[];

  private nextButton: HTMLButtonElement;

  private prevButton: HTMLButtonElement;

  private title: HTMLElement;

  private element: HTMLElement;

  public eventEmitter: EventEmitter;

  private burger: HTMLElement;

  private status: HTMLImageElement;

  private levelsList: LevelsList;

  constructor(private levels: Level[], public currentLevel: number, eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.currentLevel = currentLevel;
    this.count = levels.length;
    this.types = levels.map((item) => item.description.type);
    this.nextButton = createElement('button', 'nav__button');
    this.prevButton = createElement('button', 'nav__button');
    this.status = createElement('img', 'nav__status');
    this.title = createElement('div', 'nav__title');
    this.element = createElement('div', 'nav');
    this.burger = createElement('div', 'burger');
    this.levelsList = new LevelsList(levels, currentLevel, eventEmitter);
    this.init();
    this.eventEmitter.subscribe('event: last-level', () => {
      this.initStatus();
    });
  }

  private initBurger(): void {
    for (let i = 0; i < 3; i += 1) {
      const line = createElement('span', 'burger__line');
      this.burger.append(line);
      this.burger.onclick = (): void => {
        if (this.burger.classList.contains('show')) {
          this.burger.classList.remove('show');
          this.eventEmitter.emit('event: hide-levels', undefined);
        } else {
          this.burger.classList.add('show');
          this.eventEmitter.emit('event: show-levels', undefined);
        }
      };
    }
  }

  private initPrevButton(): void {
    this.prevButton.textContent = '<';
    this.prevButton.addEventListener('click', () => {
      this.currentLevel = this.currentLevel - 1 <= 0 ? 0 : this.currentLevel - 1;
      this.initTitle();
      this.eventEmitter.emit('event: change-level', this.currentLevel);
    });
  }

  private initNextButton(): void {
    this.nextButton.textContent = '>';
    this.nextButton.addEventListener('click', () => {
      this.currentLevel = this.currentLevel + 1 > this.count - 1
        ? this.count - 1 : this.currentLevel + 1;
      this.initTitle();
      this.eventEmitter.emit('event: change-level', this.currentLevel);
    });
  }

  private initTitle(): void {
    this.title.textContent = `Level ${this.currentLevel + 1} of ${this.count}`;
  }

  private initStatus(): void {
    this.status.src = './check.png';
    this.status.alt = 'status';
    const arrChecked = localStorage.getItem('checkedLevelsArray');
    if (arrChecked) {
      if (JSON.parse(arrChecked)[this.currentLevel] === 'check') this.status.classList.add('check');
      if (JSON.parse(arrChecked)[this.currentLevel] === 'help') this.status.classList.add('help');
    }
  }

  private init(): void {
    this.initTitle();
    this.initStatus();
    this.initPrevButton();
    this.initNextButton();
    this.initBurger();
    const wprapperLeft = createElement('div', 'nav__wrapper');
    const wrapperRight = createElement('div', 'nav__wrapper');
    wprapperLeft.append(this.title, this.status);
    wrapperRight.append(this.prevButton, this.nextButton, this.burger);
    this.element.append(wprapperLeft, wrapperRight, this.levelsList.getElement());
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
