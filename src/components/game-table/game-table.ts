import createElement from '../../dom-helper/create-element';
import Windowsill from '../windowsill/windowsill';

import './window.scss';
import './windowsill.scss';
import './game-table.scss';

export default class GameTable {
  private game: HTMLElement;

  private windowElement: HTMLElement;

  private windowsillElement: HTMLElement;

  constructor(public windowsill: Windowsill, private title: string) {
    this.title = title;
    this.windowsill = windowsill;
    this.game = createElement('div', 'game');
    this.windowElement = createElement('window');
    this.windowsillElement = createElement('windowsill');
    this.init();
  }

  public init(): void {
    const titleElement = createElement('h2', 'game__title');
    titleElement.textContent = this.title;
    this.game.append(titleElement, this.windowElement);
    this.windowsill.elements.forEach((item) => {
      this.windowsillElement.append(item.getElement());
    });
    this.game.append(this.windowsillElement);
  }

  public showWin(): void {
    this.windowsillElement.innerHTML = '';
    this.windowsillElement.textContent = 'You did it! You rock at CSS.';
  }

  public getElement(): HTMLElement {
    return this.game;
  }
}
