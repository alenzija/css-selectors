import createElement from '../../dom-helper/create-element';
import './levels-item.scss';

export default class LevelItem {
  private element: HTMLElement;

  private status: HTMLImageElement;

  constructor(private type: string, private index: number) {
    this.element = createElement('div', 'levels-item');
    this.type = type;
    this.index = index;
    this.status = createElement<HTMLImageElement>('img', 'levels-item__status');
    this.status.src = './check.png';
    this.status.alt = 'status';
    this.init();
  }

  public setCheck(): void {
    this.status.classList.add('check');
  }

  public setCurrent(): void {
    this.element.classList.add('current');
  }

  public setHelp(): void {
    this.status.classList.add('help');
  }

  private init(): void {
    const number = createElement('div', 'level-item__number');
    number.textContent = `${this.index + 1}`;
    const title = createElement('div', 'levels-item__title');
    title.textContent = this.type;
    this.element.append(this.status, number, title);
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
