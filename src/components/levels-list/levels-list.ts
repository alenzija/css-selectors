import { Level } from '../../types';
import createElement from '../../dom-helper/create-element';
import EventEmitter from '../../dom-helper/event-emitter';

import LevelItem from '../levels-item/levels-item';

import './levels-list.scss';

export default class LevelsList {
  private types: LevelItem[];

  private element: HTMLElement;

  private buttonReset: HTMLButtonElement;

  constructor(
    private levels: Level[],
    public currentLevel: number,
    public eventEmitter: EventEmitter,
  ) {
    this.currentLevel = currentLevel;
    this.types = levels.map((item, i) => new LevelItem(item.description.type, i));
    this.element = createElement('div', 'levels-list');
    this.buttonReset = createElement<HTMLButtonElement>('button', 'levels-list__button');
    this.init();
    this.eventEmitter = eventEmitter;
    this.eventEmitter.subscribe('event: last-level', () => {
      this.initStatus();
    });
  }

  private initButton(): void {
    this.buttonReset.textContent = 'Reset Progress';
    this.buttonReset.onclick = (): void => {
      this.element.classList.remove('show');
      setTimeout(() => {
        localStorage.removeItem('checkedLevelsArray');
        this.eventEmitter.emit('event: change-level', this.currentLevel);
      }, 400);
    };
  }

  private static createTitle(): HTMLElement {
    const title = createElement('h2', 'levels-list__title');
    title.textContent = 'Choose a level';
    return title;
  }

  private initStatus(): void {
    const chekedArr = localStorage.getItem('checkedLevelsArray');
    if (chekedArr) {
      JSON.parse(chekedArr).forEach((item: null | false, i: number) => {
        if (item) {
          if (item === 'check') this.types[i].setCheck();
          if (item === 'help') this.types[i].setHelp();
        }
      });
    }
  }

  private init(): void {
    this.element.append(LevelsList.createTitle());
    this.types.forEach((item, i) => {
      item.getElement().addEventListener('click', () => {
        this.element.classList.remove('show');
        setTimeout(() => {
          this.eventEmitter.emit('event: change-level', i);
        }, 400);
      });
      this.element.append(item.getElement());
    });
    this.initStatus();
    this.types[this.currentLevel].setCurrent();
    this.initButton();
    this.element.append(this.buttonReset);
    this.eventEmitter.subscribe('event: show-levels', () => {
      this.element.classList.add('show');
    });
    this.eventEmitter.subscribe('event: hide-levels', () => {
      this.element.classList.remove('show');
    });
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
