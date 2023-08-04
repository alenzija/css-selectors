import EventEmitter from '../../dom-helper/event-emitter';
import createElement from '../../dom-helper/create-element';

import Footer from '../footer/footer';
import GameTable from '../game-table/game-table';
import HTMLViewer from '../html-viewer/html-viewer';
import LevelsDescription from '../level-description/level-description';
import levels from '../../levels';
import Windowsill from '../windowsill/windowsill';
import CssInput from '../css-input/css-input';
import Nav from '../nav/nav';
import Editor from '../editor/editor';
import Header from '../header/header';

import './app.scss';

export default class App {
  private footer = new Footer();

  private gameTable: GameTable | null = null;

  private viewer: HTMLViewer | null = null;

  private levelDescription: LevelsDescription | null = null;

  private cssInput: CssInput | null = null;

  private nav: Nav | null = null;

  public currentLevelNumber = 0;

  public countLevels = levels.length;

  public eventEmitter = new EventEmitter();

  private header = new Header(this.eventEmitter);

  private editor: HTMLElement;

  private withHelp = false;

  constructor() {
    this.initLocalStorage();
    this.currentLevelNumber = this.getCurrentFromLocalStorage();
    this.eventChangeLevel();
    this.eventRightAnswer();
    this.eventCheckAnswer();
    this.editor = createElement('div', 'editor');
    this.eventEmitter.subscribe('event: help-end', () => {
      this.withHelp = true;
    });
  }

  private static changeAnimation(
    element: HTMLElement,
    newAnimationName: string,
    animationName?: string,
  ): void {
    const flag = animationName && element.classList.contains(animationName);
    if (flag) element.classList.remove(animationName);
    element.classList.add(newAnimationName);
    element.addEventListener('animationend', () => {
      element.classList.remove(newAnimationName);
      if (flag) element.classList.add(animationName);
    });
  }

  private static isRightAnswer(
    parentElement: HTMLElement,
    checkedElements: HTMLElement[],
  ): boolean {
    const animatedElementsCount = parentElement.querySelectorAll('.animated').length;
    if (animatedElementsCount === checkedElements.length && checkedElements.every((item) => item.classList.contains('animated'))) {
      return true;
    }
    return false;
  }

  private eventCheckAnswer(): void {
    this.eventEmitter.subscribe(('event: check-answer'), (data: number | string | undefined) => {
      if (typeof data === 'number' || !data) return;
      if (!Number.isNaN(+data)) {
        const index = +data;
        if (index > 0 && index <= this.countLevels) {
          this.eventEmitter.emit('event: change-level', index - 1);
        } else App.changeAnimation(this.editor, 'shake');
        return;
      }
      try {
        const windowsillElement = document.querySelector('windowsill') as HTMLElement;
        const selectorElements = windowsillElement.querySelectorAll<HTMLElement>(`${data}:not(img)`);
        if (selectorElements && selectorElements.length > 0) {
          if (App.isRightAnswer(windowsillElement, [...selectorElements])) {
            this.eventEmitter.emit('event: right-answer', undefined);
          } else selectorElements.forEach((item) => App.changeAnimation(item, 'shake', 'animated'));
        } else App.changeAnimation(this.editor, 'shake');
      } catch (e) {
        App.changeAnimation(this.editor, 'shake');
      }
    });
  }

  private eventRightAnswer(): void {
    this.eventEmitter.subscribe(('event: right-answer'), () => {
      document.onanimationend = (e: AnimationEvent): void => {
        if (e.animationName === 'hidden') {
          const arrChecked = this.getCheckedArrayFromLocalStorage();
          arrChecked[this.currentLevelNumber] = this.withHelp ? 'help' : 'check';
          App.setCheckedArrayInLocalStorage(arrChecked);
          localStorage.setItem('checkedLevelsArray', JSON.stringify(arrChecked));
          if (this.currentLevelNumber + 1 < this.countLevels) {
            this.currentLevelNumber += 1;
            App.setCurrentInLocalStorage(this.currentLevelNumber);
            this.render();
          } else {
            this.gameTable?.showWin();
            App.setCurrentInLocalStorage(this.currentLevelNumber);
            this.eventEmitter.emit('event: last-level', undefined);
          }
        }
      };
    });
  }

  private eventChangeLevel(): void {
    this.eventEmitter.subscribe('event: change-level', (data: number | string | undefined): void => {
      if (typeof data === 'number') {
        this.withHelp = false;
        this.currentLevelNumber = data;
        App.setCurrentInLocalStorage(this.currentLevelNumber);
        this.render();
      }
    });
  }

  public initLocalStorage(): void {
    const cur = localStorage.getItem('currentLevelNumber');
    if (!cur) localStorage.setItem('currentLevelNumber', this.currentLevelNumber.toString());

    const arr = localStorage.getItem('checkedLevelsArray');
    if (!arr) {
      const chekedArr = new Array(this.countLevels);
      localStorage.setItem('checkedLevelsArray', JSON.stringify(chekedArr));
    }
  }

  private getCurrentFromLocalStorage(): number {
    const cur = localStorage.getItem('currentLevelNumber');
    if (cur) {
      return +cur;
    }
    return this.currentLevelNumber;
  }

  private getCheckedArrayFromLocalStorage(): (string | null)[] {
    const arr = localStorage.getItem('checkedLevelsArray');
    if (arr) {
      return JSON.parse(arr);
    }
    const chekedArr = new Array(this.countLevels);
    return chekedArr;
  }

  private static setCurrentInLocalStorage(index: number): void {
    localStorage.setItem('currentLevelNumber', index.toString());
  }

  private static setCheckedArrayInLocalStorage(arr: (string | null)[]): void {
    localStorage.setItem('checkedLevelsArray', JSON.stringify(arr));
  }

  public start(): void {
    this.render();
  }

  public render(): void {
    document.body.innerHTML = '';
    this.editor.innerHTML = '';
    this.withHelp = false;
    const currentLevel = levels[this.currentLevelNumber];
    const windowsill = new Windowsill(currentLevel.windowsill, this.eventEmitter);
    const container = createElement('div', 'container');
    const wrapper = createElement('div', 'wrapper-right');
    const levelMenu = createElement('div', 'level-menu');

    this.levelDescription = new LevelsDescription(currentLevel.description);
    this.cssInput = new CssInput(this.eventEmitter, levels[this.currentLevelNumber].answer);
    this.gameTable = new GameTable(windowsill, currentLevel.title);
    this.viewer = new HTMLViewer(windowsill);
    this.nav = new Nav(levels, this.currentLevelNumber, this.eventEmitter);

    levelMenu.append(this.nav.getElement(), this.levelDescription.getElement());
    this.editor.append(Editor.initEditor('CSS Editor', 'style.css', this.cssInput.getElement(), 'light'), Editor.initEditor('HTML Viewer', 'windowsill.html', this.viewer.getElement()));

    wrapper.append(
      this.header.getElement(),
      this.gameTable.getElement(),
      this.editor,
      this.footer.getElement(),
    );
    container.append(wrapper, levelMenu);
    document.body.append(container);
    this.cssInput.onFocusInput();
  }
}
